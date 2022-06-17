accounting.settings.currency.symbol="S/"
accounting.settings.currency.format.neg = "%s -%v"

function seleccionar_documento(){
  /* Resalta tarjeta */
  $(".listado-documentos").find(".card").removeClass("card-selected");
  $(this).addClass("card-selected");

  var tipo_doc = $(this).find(".tipo-doc").text();
  var nro_doc = $(this).find(".nro-doc").text();
  var fecha_hora = $(this).find(".fecha-hora").text();
  var cliente = $(this).find(".cliente").text();
  var importe = $(this).find(".importe").text();
  /* Copia datos del documento en el detalle */

  $("#detalle-venta").find(".tipo-doc").text(tipo_doc);
  $("#detalle-venta").find(".nro-doc").text(nro_doc);
  $("#detalle-venta").find(".fecha-hora").text(fecha_hora);
  $("#detalle-venta").find(".cliente").text(cliente);

  var num_importe = accounting.unformat(importe);

  $("#resumen").find(".total-venta").text(accounting.formatMoney(num_importe));
  $("#resumen").find(".total-igv").text(accounting.formatMoney(num_importe - num_importe/1.18));
  $("#resumen").find(".total-subtotal").text(num_importe/1.18);
}

$(".listado-documentos .card").click(seleccionar_documento);

$(".listado-documentos .card:eq(0)").trigger("click");

$("#seleccionar-venta").click(function(){
  var href = "vendedor-ventas-llenado.html";
  window.location.href = href;
});

$("#seleccionar-cotizacion").click(function(){
  var href = "vendedor-ventas-llenado.html";
  window.location.href = href;
});

$("#volver-venta").click(function(){
  window.location.href = "vendedor-ventas.html";
});

