
function seleccionar_documento(){
  /* Resalta tarjeta */
  $(".listado-documentos").find(".card").removeClass("card-selected");
  $(this).addClass("card-selected");

  var tipo_doc = $(this).find(".tipo-doc").text();
  var nro_doc = $(this).find(".nro-doc").text();
  var fecha_hora = $(this).find(".fecha-hora").text();
  var cliente = $(this).find(".cliente").text();
  var importe = $(this).find(".importe").text();
  var estado = $(this).find(".estado-doc").text();
  /* Copia datos del documento en el detalle */

  $("#detalle-venta").find(".tipo-doc").text(tipo_doc);
  $("#detalle-venta").find(".nro-doc").text(nro_doc);
  $("#detalle-venta").find(".fecha-hora").text(fecha_hora);
  $("#detalle-venta").find(".cliente").text(cliente);
  $("#detalle-venta").find(".estado-doc").text(estado);

  $("#resumen").find(".total-venta").text(importe);
}

$(".listado-documentos .card").click(seleccionar_documento);

$(".listado-documentos .card:eq(0)").trigger("click");
