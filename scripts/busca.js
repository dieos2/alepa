function buscaAPI(urlB, temp, resu) {

    var url = urlB,
        callback = typeof retorno !== 'undefined' ? retorno : null;

    url += jQuery('#pesquisaForm').serialize();

    jQuery.get(url)
             .done(function (data) {
               
                 process(data.resultado, callback, temp, resu);
                 
                 jQuery('.paginador').pagination({
                     items: data.total,
                     itemsOnPage: data.itens,
                     cssStyle: 'light-theme',
                     prevText: 'Anterior',
                     nextText: 'Próximo',
                     onPageClick: function (page) {
                         jQuery.get(urlB + jQuery('#pesquisaForm').serialize() + '&page=' + page)
                             .done(function (d) {
                                 
                                 process(d.resultado, callback, temp, resu);
                                 jQuery('.paginador').pagination('updateItems', d.total);
                             });
                     }
                 });
                
             });

    jQuery('.itensPagina').on("change",function () {
      
        itens = jQuery(this).val();
        jQuery('.itensPagina, #itens').val(itens);
        jQuery('.paginador').pagination('updateItemsOnPage', itens);
    });

    jQuery('#pesquisaForm').submit(function (e) {
       
        e.preventDefault();
        
        jQuery('.paginador').pagination('updateItemsOnPage', jQuery('#itens').val());
    });

    jQuery("#dataIni").datepicker({
        defaultDate: "+1w",
        dateFormat: 'dd/mm/yy',
        dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
        dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S', 'D'],
        dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
        monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        nextText: 'Próximo',
        prevText: 'Anterior',
        onClose: function (selectedDate) {
            jQuery("#dataFim").datepicker("option", "minDate", selectedDate);
        }
    });
    jQuery("#dataFim").datepicker({
        defaultDate: "+1w",
        dateFormat: 'dd/mm/yy',
        dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
        dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S', 'D'],
        dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
        monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        nextText: 'Próximo',
        prevText: 'Anterior',
        onClose: function (selectedDate) {
            jQuery("#dataIni").datepicker("option", "maxDate", selectedDate);
        }
    });
};
function buscaAPIComSlide(urlB, temp, resu) {
  
    var url = urlB,
        callback = typeof retorno !== 'undefined' ? retorno : null;

    url += jQuery('#pesquisaForm').serialize();

    jQuery.get(url)
             .done(function (data) {

                 process(data.resultado, callback, temp, resu);

                 var pageAnterior = 0;
                 jQuery('.paginadorSlider').pagination({
                     items: data.total,
                     itemsOnPage: data.itens,
                     cssStyle: 'light-theme',
                     prevText: '<',
                     nextText: '>',
                     displayedPages: 0,
                     edges: 0,
                     onPageClick: function (page) {
                         jQuery.get(urlB + jQuery('#pesquisaForm').serialize() + '&page=' + page)
                             .done(function (d) {
                              
                                 if (pageAnterior < page) {
                                     jQuery("#" + resu).hide("slide", { direction: "left" }, 500);
                                 } else {
                                     jQuery("#" + resu).hide("slide", { direction: "rigth" }, 500);
                                 }

                                 process(d.resultado, callback, temp, resu, page, pageAnterior);
                                 jQuery('.paginadorSlider').pagination('updateItems', d.total);
                                 pageAnterior = page;
                             });
                     }
                 });
             });

    jQuery('.itensPagina').on("change", function () {
       
        itens = jQuery(this).val();
        jQuery('.itensPagina, #itens').val(itens);
        jQuery('.paginador').pagination('updateItemsOnPage', itens);
    });

    jQuery('#pesquisaForm').submit(function (e) {
      
        e.preventDefault();

        jQuery('.paginador').pagination('updateItemsOnPage', jQuery('#itens').val());
    });

    jQuery("#dataIni").datepicker({
        defaultDate: "+1w",
        dateFormat: 'dd/mm/yy',
        dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
        dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S', 'D'],
        dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
        monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        nextText: 'Próximo',
        prevText: 'Anterior',
        onClose: function (selectedDate) {
            jQuery("#dataFim").datepicker("option", "minDate", selectedDate);
        }
    });
    jQuery("#dataFim").datepicker({
        defaultDate: "+1w",
        dateFormat: 'dd/mm/yy',
        dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
        dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S', 'D'],
        dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
        monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        nextText: 'Próximo',
        prevText: 'Anterior',
        onClose: function (selectedDate) {
            jQuery("#dataIni").datepicker("option", "maxDate", selectedDate);
        }
    });
};
function buscaAPITimeLine(urlB, temp, resu) {
  
    var url = urlB,
        callback = typeof retorno !== 'undefined' ? retorno : null;

    url += jQuery('#pesquisaForm').serialize();

    jQuery.get(url)
             .done(function (data) {

                 process(data.resultado, callback, temp, resu);

           
                 var pageAnterior = 0;
                 jQuery('.paginadorTimeLine').pagination({
                     items: data.total,
                     itemsOnPage: data.itens,
                     cssStyle: 'light-theme',
                     prevText: '<',
                     nextText: '>',
                     displayedPages: 0,
                     edges: 0,
                     onPageClick: function (page) {
                         jQuery.get(urlB + jQuery('#pesquisaForm').serialize() + '&page=' + page)
                             .done(function (d) {
                             
                                 if (pageAnterior < page) {
                                     jQuery("#" + resu).hide("slide", { direction: "left" }, 500);
                                 } else {
                                     jQuery("#" + resu).hide("slide", { direction: "rigth" }, 500);
                                 }
                                
                                 process(d.resultado, callback, temp, resu, page, pageAnterior);
                                 jQuery('.paginadorTimeLine').pagination('updateItems', d.total);
                                 pageAnterior = page;
                             });
                     }
                 });
             });

    jQuery('.itensPagina').on("change", function () {
       
        itens = jQuery(this).val();
        jQuery('.itensPagina, #itens').val(itens);
        jQuery('.paginador').pagination('updateItemsOnPage', itens);
    });

    jQuery('#pesquisaForm').submit(function (e) {
      
        e.preventDefault();

        jQuery('.paginador').pagination('updateItemsOnPage', jQuery('#itens').val());
    });

    jQuery("#dataIni").datepicker({
        defaultDate: "+1w",
        dateFormat: 'dd/mm/yy',
        dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
        dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S', 'D'],
        dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
        monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        nextText: 'Próximo',
        prevText: 'Anterior',
        onClose: function (selectedDate) {
            jQuery("#dataFim").datepicker("option", "minDate", selectedDate);
        }
    });
    jQuery("#dataFim").datepicker({
        defaultDate: "+1w",
        dateFormat: 'dd/mm/yy',
        dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
        dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S', 'D'],
        dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
        monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        nextText: 'Próximo',
        prevText: 'Anterior',
        onClose: function (selectedDate) {
            jQuery("#dataIni").datepicker("option", "maxDate", selectedDate);
        }
    });
};
function process(data, callback,temp, resu, page, pageAnterior) {
  
    var template = jQuery.templates("#" + temp);
  
    var html = template.render(data, { format: formataData,formataHora:formataHora, formataDataSemHora:formataDataSemHora, formataDatInternaTimeline: formataDatInternaTimeline, formatitulo: formataTituloParaLink, folder: formataPastaAudio, getMesData: getMesData, formaTexto: formataTextoParaHiperLink, formataDataTimeline: formataDataTimeline });
    
       
        jQuery("#" + resu).html(html);
        if (resu == "conteudoAgenda") {
            MontaAgenda();
        }
        if (pageAnterior < page) {
           jQuery("#" + resu).show("slide", { direction: "rigth" }, 500);
        } else {
            
  jQuery("#" + resu).show("slide", { direction: "left" }, 500);
          
        }
      
       
        setTimeout(function () { jQuery('.t_line_m').find('a').first().click(); }, 1000);
            
      
       
    
   
     
    if (callback) {
        callback();
    }
 
  
   
  
}



function formataData(data) {
   
    var d = new Date(data);
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    var hour = d.getHours();
    var min = d.getMinutes();
    if (day < 10)
        day = "0" + day;
    if (month < 10)
        month = "0" + month;
    if (hour < 10)
        hour = '0' + hour;
    if (min < 10)
        min = '0' + min;
    var date = day + "/" + month + "/" + year + " | " + hour + ":" + min;

    return date;
}
function formataDataSemHora(data) {

    var d = new Date(data);
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    var hour = d.getHours();
    var min = d.getMinutes();
    if (day < 10)
        day = "0" + day;
    if (month < 10)
        month = "0" + month;
    if (hour < 10)
        hour = '0' + hour;
    if (min < 10)
        min = '0' + min;
    var date = day + "/" + month + "/" + year;

    return date;
}
function formataTituloParaLink(titulo) {
  
    var novoTitulo = titulo;
    return novoTitulo.replace(/ /g, "-");;
}
function formataPastaAudio(data) {
   
    var d = new Date(data);
    
    var day = d.getUTCDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    if (day < 10)
        day = "0" + day;
    if (month < 10)
        month = "0" + month;

    var pasta = day + "." + month + "." + year;

    return pasta;
}
function formataTextoParaHiperLink(texto, filtros) {
    var hiperTexto = texto;
    
    var RegExp = /[\[\"|\"\]]/g;
      filtros = filtros.split(',');
      
        for (var i = 0; filtros.length > i; i++) {
            
            var filtro = filtros[i].replace(RegExp, "");
          

            hiperTexto = hiperTexto.replace(filtro + " ", "<a style='text-decoration: underline ' href='/Noticias/" + filtro + "'> " + filtro + "</a> ");
           
        } return hiperTexto;

  
   
   
}
function formataTexto(texto) {
    var hiperTexto = texto;

     hiperTexto = hiperTexto.replace(filtro + " ", "<a style='text-decoration: underline ' href='/Noticias/" + filtro + "'> " + filtro + "</a> ");

     return hiperTexto;




}
String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
function formataClasse(chapeu) {
    var classe = chapeu.toLowerCase();

    var tags = ['esporte', 'cidadania', 'infraestrutura', 'investimentos', 'planejamento'];
    if (tags.indexOf(classe) < 0) {
        switch (chapeu) {
            case 'promoção social':
                classe = 'promocao_social';
                break;
            case 'saúde':
                classe = 'saude';
                break;
            case 'segurança':
                classe = 'seguranca';
                break;
            case 'educação':
                classe = 'educacao';
                break;
            default:
                classe = 'cidadania';
        }
    }

    return classe;
}
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function criaPlayerDeAudio() {
    jQuery(".cp-container").each(function () {
        var id = $(this).attr("data-id");
        var data = $(this).attr("data-data");
        var arquivo = $(this).attr("data-arquivo");
        var myCirclePlayer = new CirclePlayer("#jquery_jplayer_"+$(this).attr("data-id"),
            {
                m4a: "http://www.redepara.com.br/imagens/anexo/"+data+"/"+arquivo,
              
            }, {
                cssSelectorAncestor: "#cp_container_" + $(this).attr("data-id")
            });
    });
}
function compare(a,b) {
  if (a.last_nom < b.last_nom)
    return -1;
  if (a.last_nom > b.last_nom)
    return 1;
  return 0;
}
function formataDataTimeline(data) {

    var d = new Date(data);
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    var hour = d.getHours();
    var min = d.getMinutes();
    if (day < 10)
        day = "0" + day;
    if (month < 10)
        month = "0" + month;
    if (hour < 10)
        hour = '0' + hour;
    if (min < 10)
        min = '0' + min;
    var date = month + "/" + day + "/" + year;

    return date;
}
function getMesData(data) {

    var d = new Date(data);
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    var hour = d.getHours();
    var min = d.getMinutes();

    if (day < 10)
        day = "0" + day;

    var date = month;

    return date;
}
function formataHora(data) {
    debugger;
    var d = new Date(data);
    var day = d.getUTCDate();
    var month = d.getUTCMonth() + 1;
    var year = d.getUTCFullYear();
    var hour = d.getUTCHours();
    var min = d.getUTCMinutes();
    if (hour < 10)
        hour = '0' + hour;
    if (min < 10)
        min = '0' + min;
    return hour + ":" + min;
}
function formataDatInternaTimeline(data) {

    var d = new Date(data);
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    var hour = d.getHours();
    var min = d.getMinutes();
    if (day < 10)
        day = "0" + day;
    NomeMes = new Array(12)
    NomeMes[1] = "Janeiro"
    NomeMes[2] = "Fevereiro"
    NomeMes[3] = "Março"
    NomeMes[4] = "Abril"
    NomeMes[5] = "Maio"
    NomeMes[6] = "Junho"
    NomeMes[7] = "Julho"
    NomeMes[8] = "Agosto"
    NomeMes[9] = "Setembro"
    NomeMes[10] = "Outubro"
    NomeMes[11] = "Novembro"
    NomeMes[12] = "Dezembro"
    var date = day + " " +NomeMes[month];

    return date;
}
function MontaAgenda() {
    almg.Agenda('#js_sideCalhome');

    //Repartir largura:
    var calLarg = $("#js_sideCalhome").outerWidth();
    var calNumb = $("#js_sideCalhome li").length;
    $("#js_sideCalhome li").css("width", calLarg / calNumb);

    //Exibir li (No css, era invisivel para evitar o flick antes da reparticao de largura)
    $("#js_sideCalhome li").css("visibility", "visible");

}