function obtenerPaginaActual(){
  return window.location.pathname.split("/").pop();
}

/* Factura link */
$("#factura-link").off("click").on("click", function(){
  var cod_cliente = $("#filtro-cliente").val().split("-")[0].trim();

  if (cod_cliente.length != 11){
    showMessage('danger', 'Debe ingresar un RUC válido.', 'Error', 'icon-ban');
  } else {
    var nombre = $("#filtro-cliente").val().split("-")[1].trim();
    var direccion = $("#filtro-cliente").val().split("-")[2].trim();
    var tipo_doc = "Factura"

    if (obtenerPaginaActual() == "vendedor-cajero-despachador-ventas.html") {
      window.location.href = "vendedor-cajero-despachador-pago-factura.html";
    }else{
      window.location.href = "vendedor-cajero-pago-factura.html";
    }
  }
});

/* Boton boleta */
$("#boleta-link").off("click").on("click", function(){

  var cliente_seleccionado = $("#filtro-cliente").val().split("-").length == 3 ? true : false;

  var tipo_doc = "Boleta"
  var total = accounting.unformat($("#venta-total").val());
  if (total >= 700 && !cliente_seleccionado){
    showMessage('danger', 'Debe seleccionar un cliente para ventas mayores a S/.700', 'Error', 'icon-ban');
  } else {
    if (cliente_seleccionado){
      var cod_cliente = $("#filtro-cliente").val().split("-")[0].trim();
      var nombre = $("#filtro-cliente").val().split("-")[1].trim();
      var direccion = $("#filtro-cliente").val().split("-")[2].trim();
    }else {
      var cod_cliente = "";
      var nombre = "";
      var direccion = "";
    }

    if (obtenerPaginaActual() == "vendedor-cajero-despachador-ventas.html") {
      window.location.href = "vendedor-cajero-despachador-pago-boleta.html";
    } else {
      window.location.href = "vendedor-cajero-pago-boleta.html";
    }

    //mostrarResumenVenta(cod_cliente, nombre, direccion, tipo_doc);
  }

});

$("#ver-pendientes-pago").click(function(){
  window.location.href = "cajero-pendientes-pago.html";
});

