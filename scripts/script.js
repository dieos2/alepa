jQuery.get("includes/_header.html", function (data) {
    jQuery("header").append(data);

});

jQuery.get("includes/_menuLateral.html", function (data) {
    jQuery("#menu").append(data);

});

jQuery.get("includes/_footer.html", function (data) {
    jQuery("footer").html(data);
})




