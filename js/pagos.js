var total = 1000;
accounting.settings.currency.symbol="S/"
accounting.settings.currency.format.neg = "%s -%v"

$("#importe-venta").val(accounting.formatMoney(total));
$("#total-cobrado").val(accounting.formatMoney(0));
$("#faltante").val(accounting.formatMoney(total));
$("#vuelto").val(accounting.formatMoney(0));

$("#importe-redondeo").val(accounting.formatMoney(0));
$("#recargo-pago").val(accounting.formatMoney(0));

$(".btn-pago-credito").click(function(){
  $("#importe-modal-credito").val($("#faltante").val());
});

$("#entregado-modal-credito").change(function(){
  $(this).val(accounting.formatMoney($(this).val()));
});

$("#modal-credito-aceptar").click(function(){
  agregar_pago("Crédito " + $("#cuotas-modal-credito").val());

  var ultimo_pago = $("#lista-pagos").find(".card").last();
  var valor_entregado = $("#entregado-modal-credito").val();
  var input_entregado = ultimo_pago.find(".entregado-pago");

  input_entregado.val(valor_entregado);
  input_entregado.data("value", accounting.unformat(valor_entregado));

  actualiza_totales(parseFloat(accounting.unformat(valor_entregado)));

  $("#modal-credito").modal("hide");
});

$("#aceptar-pagos").click(function(){
  var faltante = accounting.unformat($("#faltante").val());
  if (faltante > 0){
    showMessage("danger", "Importe de venta faltante.", "Error", "icon-ban");
  }else{
    $("#modal-pdf").modal("show");
  }
});


function pago_manual(){
  var money_val = accounting.unformat(accounting.formatMoney($(this).val()));
  var difference = money_val - parseFloat($(this).data("value"));

  actualiza_totales(difference);

  $(this).val(accounting.formatMoney(money_val));
  $(this).data("value", money_val);
}

function actualiza_importes_pago() {
  var pagos = $("#lista-pagos").find(".card");
  var importe_venta = accounting.unformat($("#importe-venta").val());
  var prev_monto_entregado = 0;

  for (var i=0;i<pagos.length;i++){
    var pago = pagos[i];

    importe_venta = importe_venta - prev_monto_entregado;
    $(pago).find(".importe-pago").text(accounting.formatMoney(importe_venta));

    prev_monto_entregado = accounting.unformat($(pago).find(".entregado-pago").val());
    console.log(prev_monto_entregado);
  }
}

function eliminar_pago(){
  var card = $(this).parents(".card")[0];
  var monto_entregado = accounting.unformat($(card).find(".entregado-pago").val());

  actualiza_totales(monto_entregado*-1);
  $(".tooltip").remove();
  card.remove();

  var ultimo_pago = $("#lista-pagos").find(".card").last();
  ultimo_pago.find(".entregado-pago").prop("disabled", false);

  actualiza_importes_pago();
}
$(".eliminar-pago").click(eliminar_pago);

function agregar_pago(forma_pago){
  var template = $('<div class="card">' + 
    '<div class="row">' +
      '<div class="col details-col">' +
        '<div class="payment-box">' +
          '<div class="form-group row">' +
            '<label class="col-md-2 col-form-label forma-pago"></label>' +
            '<div class="col-md-2">' +
              '<input type="text" class="form-control form-control-sm referencia" placeholder="Referencia">' +
            '</div>' +
            '<label class="col-md-2 col-form-label">| Importe: </label>' +
            '<label class="col-md-2 col-form-label importe-pago"></label>' +
            '<label class="col-md-2 col-form-label">| Entregado: </label>' +
            '<div class="col-md-2">' +
              '<input type="text" class="form-control form-control-sm entregado-pago" data-value="0">' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="col-lg-auto buttons-col">' +
        '<button class="btn btn-sm btn-danger eliminar-pago">' +
          '<i class="icon-trash"></i>' +
        '</button>' +
      '</div>' +
    '</div>' +
  '</div>');

  template.find(".forma-pago").text(forma_pago);
  template.find(".entregado-pago").change(pago_manual);
  template.find(".eliminar-pago").click(eliminar_pago);

  var importe_faltante = accounting.formatMoney($("#faltante").val());
  template.find(".importe-pago").text(importe_faltante);

  $("#lista-pagos").append(template);
}


$(".btn-pago").click(function (){
  var forma_pago = $(this).data("value");
  $(".entregado-pago").prop("disabled", true);

  if (forma_pago != "Crédito"){
    agregar_pago(forma_pago);
  }
});

$(".grid-pago .square").click(function(){
  var ultimo_pago = $("#lista-pagos").find(".card").last();

  if (ultimo_pago.length == 0){
    return;
  }

  var input_entregado = ultimo_pago.find(".entregado-pago");

  var prev_entregado = accounting.unformat(input_entregado.val());
  var valor_boton = parseFloat($(this).data('value'));
  var nuevo_entregado = accounting.formatMoney(prev_entregado + valor_boton);

  input_entregado.val(nuevo_entregado);
  input_entregado.data("value", accounting.unformat(nuevo_entregado));

  actualiza_totales(valor_boton);
});

function actualiza_totales(pago) {
  var importe_venta = $("#importe-venta");
  var total_cobrado = $("#total-cobrado");
  var faltante = $("#faltante");
  var vuelto = $("#vuelto");

  var nuevo_total_cobrado = accounting.unformat(total_cobrado.val()) + pago;
  var nuevo_faltante = accounting.unformat(importe_venta.val()) - nuevo_total_cobrado;

  total_cobrado.val(accounting.formatMoney(nuevo_total_cobrado));
  if (nuevo_faltante >= 0){
    faltante.val(accounting.formatMoney(nuevo_faltante));
    vuelto.val(accounting.formatMoney(0));
  } else {
    vuelto.val(accounting.formatMoney(nuevo_faltante * -1));
    faltante.val(accounting.formatMoney(0));
  }
}


var pag_actual = window.location.pathname.split("/").pop();
if (pag_actual == "vendedor-cajero-pago-factura.html"){
  $("#filtro-cliente").val("33333333333 - NOMBRE DEL CLIENTE 3 (RUC) - DIRECCION 1 DEL CLIENTE");
}else if (pag_actual == "vendedor-cajero-pago-boleta.html") {
  $("#filtro-cliente").val("11111111 - NOMBRE DEL CLIENTE 1 (DNI) - DIRECCION 1 DEL CLIENTE");
}

$("#filtro-cliente").change();


/* Links entre paginas */

function obtenerPaginaActual(){
  return window.location.pathname.split("/").pop();
}

$("#cancelar-pagos").click(function(){
  var pag_actual = obtenerPaginaActual();
  if (pag_actual == "cajero-pago-factura.html" ||
      pag_actual == "cajero-pago-boleta.html"){

    window.location.href = "cajero-pendientes-pago.html";
  }
});

$("#aceptar-pdf-pagos").click(function(){
  var pag_actual = obtenerPaginaActual();
  console.log(pag_actual);
  if (pag_actual == "cajero-pago-factura.html" ||
      pag_actual == "cajero-pago-boleta.html"){
    window.location.href = "cajero-pendientes-pago.html";
  }else if (pag_actual == "vendedor-cajero-pago-boleta.html" ||
            pag_actual == "vendedor-cajero-pago-factura.html") {
    window.location.href = "vendedor-cajero-ventas.html";
  }else if (pag_actual == "cajero-despachador-pago.html") {
    window.location.href = "cajero-despachador-pendientes.html"
  }else if (pag_actual == "vendedor-cajero-despachador-pago-factura.html" ||
            pag_actual == "vendedor-cajero-despachador-pago-boleta.html" ){
    window.location.href = "vendedor-cajero-despachador-ventas.html"
  }
});

$("#aceptar-pagos").click(function(){
  var pag_actual = obtenerPaginaActual();

  if (pag_actual == "cajero-despachador-pago.html" ||
      pag_actual == "vendedor-cajero-despachador-pago-boleta.html" ||
      pag_actual == "vendedor-cajero-despachador-pago-factura.html"){
    $("#modal-pago-despacho").modal("show");
  }
});




