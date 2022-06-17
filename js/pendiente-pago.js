/* Links entre paginas */

$("#seleccionar-pendiente-pago").click(function(){
  var pag_actual = window.location.pathname.split("/").pop();

  var tipo_doc = $("#detalle-venta").find(".tipo-doc").text().trim();
  if (pag_actual == "cajero-pendientes-pago.html"){
    console.log("actual");
    if (tipo_doc == "Factura:"){
      window.location.href = "cajero-pago-factura.html";
    }
    if (tipo_doc == "Boleta:"){
      window.location.href = "cajero-pago-boleta.html";
    }
  }
});
