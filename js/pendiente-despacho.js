/* Links entre paginas */

$("#seleccionar-pendiente-despacho").click(function(){
  var pag_actual = window.location.pathname.split("/").pop();

  var tipo_doc = $("#detalle-venta").find(".tipo-doc").text().trim();
  if (pag_actual == "despachador-pendientes-despacho.html"){
    $("#modal-despacho").modal("show");
  }
});

$("#seleccionar-pendiente").click(function(){
  var pag_actual = window.location.pathname.split("/").pop();
  if (pag_actual == "cajero-despachador-pendientes.html"){
    var estado_doc = $("#detalle-venta").find(".estado-doc").text().trim();
    if (estado_doc == "Pendiente Pago"){
      window.location.href = "cajero-despachador-pago.html";
    } else if (estado_doc == "Pendiente Despacho") {
      $("#modal-pago-despacho").modal("show");
    }
  }
});

$("#aceptar-pdf-despacho").click(function(){
  var pag_actual = window.location.pathname.split("/").pop();

  if (pag_actual == "despachador-pendientes-despacho.html"){
    showMessage("info", "Documento despachado.", "", "icon-check");
  }
});
