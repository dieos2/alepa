var almg = {};

if(typeof(console) == 'undefined') console = { log : function(){} };

if(!$("pageAgenda").length){
	
	almg.Agenda = (function declare_agenda($) {
		
		//Funcao para habilitar/desabilitar botoes da esteira
		function trocarBotoes(idAtual){
			//alert(idAtual + " / " + events.length);
			if(idAtual == events.length-1){
				$(".js_sideCalNext").removeClass("active");
			}else{
				$(".js_sideCalNext").addClass("active");
			}
			if(idAtual == 0){
				$(".js_sideCalPrev").removeClass("active");
			}else{
				$(".js_sideCalPrev").addClass("active");
			}
		}
		
		var that = function prepare_agenda (selector, options) {
			// Temos que esperar até que a altura de todos os eventos esteja calculada
			setTimeout(function wait () {
				construct_agenda(selector, options);
			}, 600);
		}, defaults = {
			tipo: 'diaria'
		};
	
		function construct_agenda (selector, options) {
			options = $.extend(true, {}, defaults, options);
	
			var parent = $(selector), top = 0,
			j = 0,
			agora = options.hora,
			current = undefined,
			first = undefined;
		
			if(agora == null)
			agora = new Date().getHours();
	
			if (!parent.length) {
				console.error('Objeto nao encontrado para seletor:', selector);
				return false;
			}
	
			// Guardando alguns elmenetos
			tabs.element = parent.find('.js_sideCalTabs');
			slider.element = parent.find('.js_sideCalRegua');
			conveyor.element = parent.find('.js_sideCalSlider');
			var paginacao = parent.find('.js_sideCalNav');
	
			// Salvando configurações
			that.config = options;
	
			// Definir posição inicial da esteira
			conveyor.element.css({
				'top': '0px',
				'position': 'relative'
			});
	
			// Pegar posição da esteira em relação com o documento
			conveyor.offset = conveyor.element.offset();
	
			var contEvents=0;
			// Apenas para modo diario
			if (options.tipo == "diaria") {
				// Verificar casos em que não há eventos
				// @todo criar funcao para gerar codigo de um evento
		
				if (!conveyor.element.find('[data-period="js_sideCalTab_manha"]').length){
					conveyor.element.prepend('<div class="js_sideCalItem js_sideCalVazioManha js_sideCalNota evento notice vazioManha" data-hora="07:00" data-period="js_sideCalTab_manha">Não existem eventos para o período da manhã.</div> <div class=></div>');
					contEvents++;
				}

				// Não há eventos a noite
				if (!conveyor.element.find('[data-period="js_sideCalTab_noite"]').length) {
					// E não há eventos atarde
					if (!conveyor.element.find('[data-period="js_sideCalTab_tarde"]').length) {
						conveyor.element.append('<div class="js_sideCalItem js_sideCalVazioTarde js_sideCalNota evento notice vazioTarde" data-hora="12:00" data-period="js_sideCalTab_tarde">Não existem eventos para o período da tarde.</div>');
						contEvents++;
					}
					conveyor.element.append('<div class="js_sideCalItem js_sideCalVazioNoite js_sideCalNota evento notice vazioNoite" data-hora="18:00" data-period="js_sideCalTab_noite">Não existem eventos para o período da noite.</div>');
					contEvents++;
		
				// Ha eventos a noite
				} else {
					// Não há eventos a tarde
					if (!conveyor.element.find('[data-period="js_sideCalTab_tarde"]').length){
						conveyor.element.find('[data-period="js_sideCalTab_noite"]:first').before('<div class="js_sideCalItem js_sideCalVazioTarde js_sideCalNota evento notice vazioTarde" data-hora="12:00" data-period="js_sideCalTab_tarde">Não existem eventos para o período da tarde.</div>');
						contEvents++;
					}
				}
			}
	
			if (contEvents > 2){
				conveyor.element.find('.js_sideCalItem').remove();
			}
	
			// Criar eventos
	
			$("a.vejaMais").on("click",function(e){
				e.preventDefault();
				var $this = $(this)
				$this.parent().css("maxHeight","");
				$this.remove();
			});
	
			conveyor.element.find('.js_sideCalItem').each(function (i, ele) {
				var event = $(ele),
					hora = event.attr('data-hora'),
					h = hour.to_int(hora),
					textoEvento = $(ele).find('p').last();
				
				// Criando eventos
				
				events[j] = {
					id: j,
					element: event,
					period: event.attr('data-period'),
					hour: hora,
					offset: event.offset()
				};
	
				// Selecionando evento atual
				//if (current == undefined){
				//	current = events[j];
				//}
	
				if (h == agora && current == undefined){
					current = events[j];
				}
	
				// Procurando por eventos nas proximas horas, somente se for hoje
				if (!current) {
					for (var k = 0; k < 5; k++) {
						if (h == agora + k && !event.hasClass('js_sideCalNota')) {
							current = events[hora];
						}
					}
				}
	
				// Caso evento não tenha hora, criamos uma id para ele
				event.attr('data-id', j);
		
				// Guarda a posição inicial do conveyor
				if (i == 0) first = events[j];
			
				j++;
			});
	
	
			// Armazenar quantidade de eventos
			events.length = j;
	
	
			// Somento quando calendário esta mostrando dia
			if (options.tipo == "diaria") {
				// Encontramos o evento mais proximo de agora?
				if (!current) current = events.period(period(agora));
		
				// Bindando eventos das abas
				tabs.element.click(tabs.click);
				tabs.element.css("cursor","pointer");
		
				// Fix do problema de width do ie 7
				tabs.element.css ('width', tabs.element.parent().width() + 'px');
				slider.element.css ('width', slider.element.parent().width() + 'px');
				parent.find('.footer').css ('width', parent.find('.footer').parent().width() + 'px');
		
			} else {
				current = first;
			}
	
	
			// Ativar controles de paginação
			paginacao.click(paginar);
		
			// Colocar no estado certo dependendo do dia se houver eventos
			conveyor.current = first;	
			that.select(current.hour, false, current.id);
		
			// Ativar/desativar botoes da esteira
			//trocarBotoes(current.id);
		
			return that;
	
		}
	
		var conveyor = {
			current: 0,
			offset: {},
			to: function conveyor_to (id) {
					//var event = (id !== false && id !== undefined && events.by_id(id)) ||  events[hour];
	
					var event = events.by_id(id);
	
					// Caso a id do evento não seja encontrada, significa que o cara clicou na mesma aba
					if (!event) return;
	
					// Caso haja dois eventos na mesma hora, temos de pegar o offset do anterior
					if ((conveyor.current.id == event.id) && (event.id > 0)){
						event = events.by_id(event.id - 1);
					}
					
					//Ancoragem, slide, moveto, scrollto: Aguardar o carregamento para que os elementos fiquem nas devidas posicoes (agora isso é feito na chamada do js em inc_agenda_lateral.jsp)
					//jQuery(document).ready(function(){ //jQuery(window).load(function(){
						var position = event.offset.top - conveyor.offset.top;
						conveyor.element.stop(true, true).animate({top: - position + 'px'});
					//});
	
					conveyor.current = event;
				}
		},
		slider = {
			to: function slide_to (stamp) {
				// Resetando minutos
				stamp = stamp.substring(0, 2) + ':00';
				
				// Selecionar hora correspondente
				slider.element.find('.js_sideCalHora').removeClass('select')
				.filter('[data-hora="' + stamp + '"]').addClass('select');

				// Exibir lista de horarios correspondente
				slider.show(period(stamp));
			},
			show: function display_period(period) {
				var show = slider.element.find('.' + period);
	
				if (show.is(':hidden')) {
					slider.element.find('.js_sideCalHoras:visible').hide();
					show.show();
				}
			}
		},
		tabs = {
			select: function tabs_select (name) {
				var textoVazio = 'Não existem eventos para o período da ';
				if (name == 'js_sideCalTab_manha') {
					conveyor.element.find('.js_sideCalVazioManha').html(textoVazio + 'manhã');
					conveyor.element.find('.js_sideCalVazioTarde').html('&nbsp;');
					conveyor.element.find('.js_sideCalVazioNoite').html('&nbsp;');
	
				}
				if (name == 'js_sideCalTab_tarde') {
					conveyor.element.find('.js_sideCalVazioManha').html('&nbsp;');
					conveyor.element.find('.js_sideCalVazioTarde').html(textoVazio + 'tarde');
					conveyor.element.find('.js_sideCalVazioNoite').html('&nbsp;');
	
				}
				if (name == 'js_sideCalTab_noite') {
					conveyor.element.find('.js_sideCalVazioManha').html('&nbsp;');
					conveyor.element.find('.js_sideCalVazioTarde').html('&nbsp;');
					conveyor.element.find('.js_sideCalVazioNoite').html(textoVazio + 'noite');
				}
	
				tabs.element.removeClass('js_sideCalTab_manha js_sideCalTab_tarde js_sideCalTab_noite')
					.addClass(name)
					//Achar <a>'s com a clas 'tab'
					.find('a.js_sideCalTab')
					//Filtrar somente pelo 'name'
					.filter('.' + name)
					//Colocar class 'select' no <li> e remover dos demais <li>'s
					.parents("li").addClass('select').siblings().removeClass('select');
			},
			click: function tabs_click (event) {
				var target = $(event.target).is("a") ? $(event.target) : $(event.target).children("a");
				if(target.attr("class").indexOf("select")==-1){ //verifica se o link clicado ja foi selecionado anteriormente, ou seja, se ele tem a class selet
					that.select(target.attr('data-tab'), true);
				}
			}
		},
		events = {
			next: function next_event (event) {
				return events.get('next', event);
			},
			previous: function previous_event (event) {
				return events.get('prev', event);
			},
			// private
			get: function get_event (method, event) {
				var sibling = event.element[method+"All"]('.js_sideCalItem').first();
				if (sibling.length) return events[sibling.attr('data-id')];
				return false;
			},
			// public
			period: function first_event (period) {
				//    for (var hour in events) {
				//	if (events[hour].period == period) return events[hour];
				//    }
	
				for(var id in events) {
					if(events[id].period == period) {
						return events[id];
					}
				}
	
				console.error('events.period:: Período invalido informado:', period);
			},
			by_id: function search_event(id) {
			//    for (var hour in events) {
			//	if (events[hour].id == id) return events[hour];
			//   }
				return events[id];
			//	return false;
			},
			nearest: function near_in_time(h) {
		//	    for (var hour in events) {
		//		if (events[hour].id == id) return events[hour];
		//	    }
				return false;
			}
		};
	
		that.select = function agenda_select (time, convert, idEvento) {
		// Selecionar periodo ?
	
		//if (!time && !id) return;
		if(idEvento == null || idEvento == undefined){
			for(var id in events) {
				if(events[id].period == time){ idEvento = events[id].id; break;}
			}
		}
		conveyor.to(idEvento);
		if (convert) time = events.period(time).hour;
		// Se estivermos no dia, selecionar outros elementos
		if (that.config.tipo == "diaria") {
			slider.to(time);
			tabs.select(period(time));
			
			// Ativar/desativar botoes da esteira
			trocarBotoes(idEvento);
		}
		};
	
		function paginar (event) {
			var target = $(event.target), current = conveyor.current,
			//next = undefined, previous = undefined;
			next = events.next(conveyor.current);
			previous = events.previous(conveyor.current);
			
			if (target.hasClass('js_sideCalNext')) {	
				if(next){ that.select(next.hour, false, next.id); }
				
				// Ativar/desativar botoes da esteira
				//trocarBotoes(current.id + 1);
			}else{
				if (previous){ that.select(previous.hour, false, previous.id); }
				
				// Ativar/desativar botoes da esteira
				//trocarBotoes(current.id - 1);
			}
		}
	
		function period (hours) {
			if (typeof hours == 'string') hours = hour.to_int(hours);
		
			if(hours == undefined || hours == null || hours < 0) hours = (new Date()).getHours();
		
			if (hours < 12) return 'js_sideCalTab_manha';
			else if (hours < 18) return 'js_sideCalTab_tarde';
			else return 'js_sideCalTab_noite';
		}
	
		function hour (period) {
			switch (period) {
				case 'js_sideCalTab_manha': return '07:00';
				case 'js_sideCalTab_tarde': return '12:00';
				case 'js_sideCalTab_noite': return '18:00';
				default: return false;
			}
		}
	
		hour.to_int = function hour_to_int (hour) {
			return hour && parseInt(hour.replace(/0(\d)/, '$1'));
		}
		return that;
	})(jQuery);
	
}