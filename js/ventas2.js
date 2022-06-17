/*
 * Configuraciones
 */

accounting.settings.currency.format = { pos: '%s %v', neg: '%s (%v)', zero: '%s 0.00' }
accounting.settings.currency.symbol = "S/";
accounting.settings.currency.format.neg = "%s -%v";

$("#filtro-moneda").change(function(){
  if ($("#filtro-moneda option:selected").text() == "Soles") {
	  accounting.settings.currency.symbol = "S/";
	  accounting.settings.currency.format.neg = "%s -%v";

		$("#venta-subtotal").val(accounting.formatMoney($("#venta-subtotal").val()));
		$("#venta-descuento").val(accounting.formatMoney($("#venta-descuento").val()));
		$("#venta-igv").val(accounting.formatMoney($('#venta-igv').val()));
		$("#venta-total").val(accounting.formatMoney($("#venta-total").val()));
	}else{
	 	accounting.settings.currency.symbol = "$";
	 	accounting.settings.currency.format.neg = "%s -%v";

		$("#venta-subtotal").val(accounting.formatMoney($("#venta-subtotal").val()));
		$("#venta-descuento").val(accounting.formatMoney($("#venta-descuento").val()));
		$("#venta-igv").val(accounting.formatMoney($('#venta-igv').val()));
		$("#venta-total").val(accounting.formatMoney($("#venta-total").val()));
	}
});

$("#venta-subtotal").val(accounting.formatMoney(0));
$("#venta-descuento").val(accounting.formatMoney(0));
$("#venta-igv").val(accounting.formatMoney(0));
$("#venta-total").val(accounting.formatMoney(0));

$('.modal').on('show.bs.modal', function (e) {
  $('.tooltip').remove();
});


$("#limpiar-filtro-cliente").hide();

/*
 * Funciones del spinner de articulo
 */

function actualizarArticulo (input) {
  // Obtener cantidad
  var cantidad = validarEntero(input.val()) || 0;
  // Obtener precio unitario
  var codigo = obtenerCodigoArticulo(input.prop('id'));
  var precio = articulos[codigo].precio;
  // Modificar texto
  var total = accounting.formatMoney(cantidad * precio);
  input.siblings('.nodo-articulo-total').text(total);
}

function disminuirArticulo () {
  // Cambiar el input
  var input = $(this).siblings('input');
  var cantidad = validarEntero(input.val()) || 0;
  input.val((cantidad > 1) ? (cantidad - 1) : null);
  // Actualizar valor total
  actualizarArticulo(input);
}

function aumentarArticulo () {
  // Cambiar el input
  var input = $(this).siblings('input');
  var cantidad = validarEntero(input.val()) || 0;
  input.val(cantidad + 1);
  // Actualizar valor total
  actualizarArticulo(input);
}

function restaurarArticulo () {
  $(this).siblings('.spinner-input').children('input').val('');
  $('.tooltip').remove();
}

function borrarArticulo () {
  if (confirm('¿Está seguro(a) de quitar este artículo?')) {
    // Quitar tarjeta
    var card = $(this).parents('.card');
    card.hide(500, function () {
      card.remove();
    });
    // Mostrar mensaje
    showMessage('info', 'Artículo removido.', '', 'icon-check');
  }
  $('.tooltip').remove();
}

/*
 * Nodos del articulo
 */

var articulos = {
  A0000001: { nombre: 'Nombre de Artículo de código A0000001', 
              /* tipo: 'Two way', */
              precio: 20 },
  A0000002: { nombre: 'Nombre de Artículo de código A0000002', 
              /* tipo: 'Two way', */
              precio: 20 },
  A0000003: { nombre: 'Nombre de Artículo de código A0000003', 
              /* tipo: 'Two way', */
              precio: 20 },
  A0000004: { nombre: 'Nombre de Artículo de código A0000004', 
              /* tipo: 'Two way', */
              precio: 20 },
  A0000005: { nombre: 'Nombre de Artículo de código A0000005', 
              /* tipo: 'Two way', */
              precio: 20 },
  A0000006: { nombre: 'Nombre de Artículo de código A0000006', 
              /* tipo: 'Two way', */
              precio: 20 },
  B0000006: { nombre: 'Nombre de Artículo de código B0000006', 
              /* tipo: 'Two way', */
              precio: 20 },

  B0000007: { nombre: 'Nombre de Artículo de código B0000007', 
              /* tipo: 'Two way', */
              precio: 20 },
}

 // 2: { nombre: 'Adulto Extranjero Subida o Bajada', /* tipo: 'One way', */ precio: 12 },
 // 3: { nombre: 'Adulto Nacional Subida y Bajada', /* tipo: 'Two way', */ precio: 15 },
 // 4: { nombre: 'Adulto Nacional Subida o Bajada', /* tipo: 'One way', */ precio: 8 },
 // 5: { nombre: 'Niño Extranjero Subida y Bajada', /* tipo: 'Two way', */ precio: 12 },
 // 6: { nombre: 'Niño Extranjero Subida o Bajada', /* tipo: 'One way', */ precio: 7 },
 // 7: { nombre: 'Niño Nacional Subida y Bajada (5 a 11 años)', /* tipo: 'Two way', */ precio: 8 },
 // 8: { nombre: 'Niño Nacional Subida o Bajada (5 a 11 años)', /* tipo: 'Two way', */ precio: 5 },
 // 9: { nombre: 'Estudiante Subida y Bajada (12 a 17 años o SUNEDU vigente)', /* tipo: 'Two way', */ precio: 10 },
 // 10: { nombre: 'Estudiante Subida o Bajada (12 a 17 años o SUNEDU vigente)', /* tipo: 'One way', */ precio: 6 }


function toggleStock(){
  var stocks = $(this).parents('.card').find('.articulo-stock');

  console.log(stocks);

  stocks.toggle('display');
}

function crearNodoArticulo (codigo, articulo, esModal, valor = null) {
  // Crear nodo
  var template = $('<div class="card">' +
    '<div class="text-lg">' +
      '<strong class="nodo-articulo-codigo"></strong> <span class="separator">|</span> ' +
      '<strong class="nodo-articulo-nombre"></strong> <span class="separator">|</span> ' +
      '<strong class="nodo-articulo-precio"></strong>' +
    '</div>' +
    '<div class="row">' +
      '<div class="col details-col">' +
        '<strong>Fabricante:</strong> Nombre del fabricante <span class="separator">|</span> ' +
        '<strong>Stock:</strong> <span class="nodo-articulo-stock">200</span> <span class="separator">|</span> ' +
        '<strong>Proveedor:</strong> Nombre del proveedor' +
      '</div>' +
      '<div class="col-lg-auto buttons-col">' +
        '<div class="spinner-input">' +
          '<span class="d-sm-none">Cantidad:</span>' +
          '<button class="btn-outline-secondary disminuir-articulo">-</button> ' +
          '<input type="number" class="nodo-articulo-cantidad" placeholder="0"> ' +
          '<button class="btn-outline-secondary aumentar-articulo">+</button> ' +
          '<div class="d-sm-none mb-1"></div><span class="separator d-sm-inline d-none">|</span> ' +
          'Total: <strong class="text-lg nodo-articulo-total"></strong>' +
        '</div>' +
        '<button class="btn btn-sm btn-info restaurar-articulo" data-toggle="tooltip" data-placement="top"' +
          'data-original-title="Restaurar cantidad"><i class="icon-cross"></i></button>' +
        '<button class="btn btn-sm btn-outline-secondary stock-articulo" data-toggle="tooltip"' +
          'data-placement="top" data-original-title="Ver stock"><i class="icon-eye"></i></button>' +
        '<button class="btn btn-sm btn-danger borrar-articulo" data-toggle="tooltip"' +
          'data-placement="top" data-original-title="Eliminar"><i class="icon-trash"></i></button>' +
      '</div>' +
    '</div>' +
    '<div class="articulo-stock">' +
      '<hr class="my-1">' +
      '<ul class="simple-list">' +
        '<li>' +
          '<div class="card-item">' +
            '<strong>Almacén:</strong> Nombre del almacén <span class="separator">|</span>' +
          '</div>' +
          '<div class="card-item">' +
            '<strong>Stock:</strong> 20 <span class="separator">|</span>' +
          '</div>' +
          '<div class="card-item">' +
            '<strong>Stock solicitado:</strong> 70 <span class="separator">|</span>' +
          '</div>' +
          '<div class="card-item">' +
            '<strong>Stock comprometido:</strong> 10 <span class="separator">|</span>' +
          '</div>' +
          '<div class="card-item">' +
            '<strong>Stock disponible:</strong> 80' +
          '</div>' +
        '</li>' +
        '<li>' +
          '<div class="card-item">' +
            '<strong>Almacén:</strong> Nombre del almacén <span class="separator">|</span>' +
          '</div>' +
          '<div class="card-item">' +
            '<strong>Stock:</strong> 20 <span class="separator">|</span>' +
          '</div>' +
          '<div class="card-item">' +
            '<strong>Stock solicitado:</strong> 70 <span class="separator">|</span>' +
          '</div>' +
          '<div class="card-item">' +
            '<strong>Stock comprometido:</strong> 10 <span class="separator">|</span>' +
          '</div>' +
          '<div class="card-item">' +
            '<strong>Stock disponible:</strong> 80' +
          '</div>' +
        '</li>' +

      '</ul>' +
    '</div>' +
  '</div>');

  // Colocar valores
  template.find('.nodo-articulo-codigo').text(codigo);
  template.find('.nodo-articulo-nombre').text(articulo.nombre);
  template.find('.nodo-articulo-precio').text(accounting.formatMoney(articulo.precio));
  template.find('.articulo-stock').hide();
  template.find('.stock-articulo').click(toggleStock);

  var total = (valor) ? (articulo.precio * valor) : 0;
  template.find('.nodo-articulo-total').text(accounting.formatMoney(total));
  // Colocar eventos e IDs del input
  var input_cantidad = template.find('.nodo-articulo-cantidad');
  input_cantidad.prop('id', codigo).val(valor).on('input', function () { actualizarArticulo($(this)); });

  template.find('.disminuir-articulo').click(disminuirArticulo);
  template.find('.aumentar-articulo').click(aumentarArticulo);
  template.find('.restaurar-articulo').click(restaurarArticulo).tooltip();
  // Eventos que dependen si el nodo va a un modal o no
  if (esModal) {
    template.find('.borrar-articulo').remove();
    template.find('.stock-articulo').tooltip();
  } else {
    template.find('.borrar-articulo').click(borrarArticulo).tooltip();
    template.find('.stock-articulo').remove();
    // Actualizar subtotales
    if (valor) {
      var total_ventas = accounting.unformat($('#venta-total').val());
      total_ventas += (articulo.precio * valor);
      $('#venta-total').val(accounting.formatMoney(total_ventas));
      var igv = 1.18;
      $('#venta-subtotal').val(accounting.formatMoney(total_ventas/igv));
      $('#venta-igv').val(accounting.formatMoney(total_ventas - total_ventas/igv));
    }
  }

  return template;
}

/*
 * Agregar un articulo a la lista mediante el filtro de numero de articulo
 */

$('#filtro-articulo-codigo').on('keyup touchend', function (e) {
  // Ejecutar la funcion apenas se presione Enter (PCs) o se pierda el foco (móviles)
  if (e && e.which !== 13) return;

  // Obtener los datos
  var lista = $('#lista-articulos');
  var codigo = $(this).val();
  // Crear el nodo y adjuntarlo a la lista
  insertarArticuloPorCodigo(codigo, lista, false, 1);
  //if (lista.length >= 0)) insertarArticuloPorCodigo(codigo, lista, false);
  //else showMessage('danger', 'Ingrese un código de artículo válido.', 'Error', 'icon-ban');

  // Limpiar el campo
  $(this).val('').blur();
});

function insertarArticuloPorCodigo(codigo, lista, esModal, valor=null) {
  var articulo = articulos[codigo]; if (!articulo) {
    showMessage('default', 'No se encontró ningún artículo.');
    return false;
  }
  lista.prepend(crearNodoArticulo(codigo, articulo, esModal, valor));
  return true;
}

/*
 * Buscar articulo en el modal
 */

function buscarArticulo(){
  var lista = $('#busqueda-articulos');
  var input = $("#filtro-articulo-modal");
  lista.children().remove();

  var buscado = input.val();

  if (buscado == ""){
    for (var key in articulos){
      lista.append(crearNodoArticulo(key, articulos[key], true));
    }
  } else{
    for (var key in articulos){
      var cad_busqueda = articulos[key].nombre.includes(buscado);

      if (cad_busqueda){
        lista.append(crearNodoArticulo(key, articulos[key], true));
      }
    }
  }
  var tarjetas = lista.children();
  for (var i = 4; i < tarjetas.length; i++) {
    $(tarjetas[i]).addClass('d-none');
  }
  // Cambiar texto de paginado
  $('#pagina-articulo-actual').text('1');
  $('#pagina-articulo-total').text(Math.ceil(tarjetas.length / 4));
}

$("#filtro-articulo-modal").change(buscarArticulo);

$('#modal-articulo-buscar').click(buscarArticulo);

//$('#modal-articulo-buscar').click(function () {
//  var lista = $('#busqueda-articulos');
//  var input = $('#filtro-articulo-modal');
//
//  if (input.val() == ""){
//    for (var key in articulos) {
//    }
//
//    var tarjetas = lista.children();
//    for (var i = 4; i < tarjetas.length; i++) {
//      $(tarjetas[i]).addClass('d-none');
//    }
//    // Cambiar texto de paginado
//    $('#pagina-articulo-actual').text('1');
//    $('#pagina-articulo-total').text(Math.ceil(tarjetas.length / 4));
//  }else {
//    var codigo = parseInt(input.val());
//
//    // Caso 1: Se ingreso un numero, buscar por codigo
//    if (!isNaN(codigo)) insertarArticuloPorCodigo(codigo, lista, true);
//    // Caso 2: Lo ingresado no es un numero, buscar por nombre
//    else {
//      // Buscar por nombre
//      var encontrado = insertarArticuloPorNombre(input.val(), lista, true);
//      if (encontrado) {
//        // Mostrar solo los 4 primeros resultados
//        var tarjetas = lista.children();
//        for (var i = 4; i < tarjetas.length; i++) {
//          $(tarjetas[i]).addClass('d-none');
//        }
//        // Cambiar texto de paginado
//        $('#pagina-articulo-actual').text('1');
//        $('#pagina-articulo-total').text(Math.ceil(tarjetas.length / 4));
//      }
//    }
//  }
//  // Limpiar el campo
//  input.val('').blur();
//});

function insertarArticuloPorNombre (nombre, lista, esModal, valor = null) {
  if (nombre.length < 3) {
    showMessage('danger', 'Ingrese por lo menos 3 caracteres para la búsqueda.', 'Error', 'icon-ban');
    return false;
  }
  // Buscar articulo
  var encontrado = false;
  for (var key in articulos) {
    if (articulos[key].nombre.includes(nombre)) {
      lista.prepend(crearNodoArticulo(key, articulos[key], esModal, valor));
      encontrado = true;
    }
  }
  // Ver si se encontro
  if (!encontrado) showMessage('default', 'No se encontró ningún artículo.');
  return encontrado;
}

/*
 * Agregar articulos del modal a la pantalla principal
 */

$('#agregar-articulos').click(function () {
  var lista_modal = $('#busqueda-articulos')
  var inputs = lista_modal.find('.nodo-articulo-cantidad');
  var lista_articulos = $('#lista-articulos');

  // Verificar los inputs
  var encontrado = false;
  for (var i = 0; i < inputs.length; i++) {
    // Obtener el valor
    var valor = validarEntero(inputs[i].value);
    if (!valor) continue;
    encontrado = true;
    // Obtener el codigo
    var codigo = obtenerCodigoArticulo(inputs[i].id);
    if (!codigo) continue;
    // Crear el nodo
    var articulo = insertarArticuloPorCodigo(codigo, lista_articulos, false, valor);
  }
  if (!encontrado) return showMessage('danger', 'Ingrese una cantidad a por lo menos un artículo.', 'Error', 'icon-ban');

  // Cerrar el modal y limpiar los campos
  $('#modal-articulos').modal('hide');
  lista_modal.children().remove();
  $('#pagina-articulo-actual').text(0);
  $('#pagina-articulo-total').text(0);
  showMessage('info', 'Artículos agregados.', null, 'icon-check');
});

$("#modal-articulos").on('hidden.bs.modal', function(e) {
  setTimeout(function(){$('#filtro-articulo-codigo').focus();}, 10);
});

$(".modal").on("hidden.bs.modal", function(e) {
  setTimeout(function(){$('#filtro-articulo-codigo').focus();}, 10);
});


$("#modal-articulos").on("shown.bs.modal", function(){
  setTimeout(function(){$('#filtro-articulo-modal').focus();}, 10);
});

function obtenerCodigoArticulo (identificador) {
  return identificador.substring(identificador.lastIndexOf('-') + 1);
}

/* 
 * Botones de footer
 */

function botonFooter(){
  var href = $(this).data('href');
  if (!(typeof href === 'undefined' || !href)){
    window.location.href = href;
  }
}

//$(".grid-footer .square").click(botonFooter);

/*
 * Seleccionar Cliente
 */

function datosCliente(){
  var nro_cliente = $('#filtro-cliente').val();

  if (nro_cliente.split("-").length == 3){
    nro_cliente = nro_cliente.split("-")[0].trim();
  }

  if (nro_cliente.length == 8){
    $("#datos-cliente-titulo").text("Datos del Cliente - Persona Natural")
    $(".datos-cliente-natural").show();
    $(".datos-cliente-juridica").hide();
    $(".datos-cliente-otros").hide();

  }else if (nro_cliente.length == 11){
    $("#datos-cliente-titulo").text("Datos del Cliente - Persona Jurídica")
    $(".datos-cliente-juridica").show();
    $(".datos-cliente-natural").hide();
    $(".datos-cliente-otros").hide();

  }else {
    $("#datos-cliente-titulo").text("Datos del Cliente - Otros")
    $(".datos-cliente-otros").show();
    $(".datos-cliente-natural").hide();
    $(".datos-cliente-juridica").hide();
  }

  $("#cliente-nro-doc").val(nro_cliente);
  $("#modal-datos-cliente").modal("show");
  $("#listado-direcciones-cliente").find(".card").remove();
}

$("#filtro-cliente").keypress(function(e){
  if (e.which == 13){
    var cod_cliente = $(this).val();
    for (var idx in clientes){
      var cliente = clientes[idx];
      if (cod_cliente == cliente.codigo){
        $("#filtro-cliente").val(cliente.codigo + " - " + cliente.nombre + " - " + cliente.direccionPrincipal);
        return;
      }
    }
    datosCliente();
  }
});


function agregarDireccion(departamento, provincia, distrito, direccion, tipo_direccion){
  var template = $('<div class="card">' +
    '<div class="row">' +
      '<div class="col-auto checkbox-col">' +
        '<div class="custom-control custom-radio">' +
          '<input class="custom-control-input" type="radio" name="direcciones-cliente">' +
          '<label class="custom-control-label"></label>' +
        '</div>' +
      '</div>' +
      '<div class="col details-col">' +
        '<div class="d-inline-block">' +
          '<strong> Tipo Dirección</strong>' +
          '<span class="separator">|</span>' +
          '<span class="tipo-direccion"></span>' +
          '<span class="separator">|</span>' +
          '<span class="direccion"></span>' +
          '<span class="separator">|</span>' +
          '<span class="ubigeo"></span>' +
        '</div>' +
      '</div>' +
      '<div class="col-auto buttons-col">' +
        '<button class="btn btn-sm btn-danger eliminar-direccion">' +
          '<i class="icon-trash"></i>' +
        '</button>' +
      '</div>' +
    '</div>'+ 
    '</div>');

  template.find(".ubigeo").text(departamento + " - " + provincia + " - " + distrito);
  template.find(".direccion").text(direccion);
  template.find(".tipo-direccion").text(tipo_direccion);

  var nro_direcciones = $("#listado-direcciones-cliente .card").length
  template.find(".custom-control-input").attr('id', "direccion-cliente-"+ nro_direcciones);
  template.find(".custom-control-label").attr('for', "direccion-cliente-"+ nro_direcciones);

  if (nro_direcciones == 0 ){
    template.find(".custom-control-input").attr("checked", true);
  }

  template.find(".eliminar-direccion").click(eliminar_direccion);
  $("#listado-direcciones-cliente").append(template);
}

$("#agregar-direccion").click(function(){

  var departamento = $("#direccion-departamento option:selected").text();
  var provincia = $("#direccion-provincia option:selected").text();
  var distrito = $("#direccion-distrito option:selected").text();

  var direccion = $("#direccion-descripcion").val();
  var tipo_direccion = $("#direccion-tipo option:selected").text();
  agregarDireccion(departamento, provincia, distrito, direccion, tipo_direccion);
});

function eliminar_direccion(){
  var card = $(this).parents(".card")[0];
  card.remove();
}

$("#aceptar-datos-cliente").click(function(){

  if ($("input[name='direcciones-cliente']:checked").length == 0){
    showMessage('danger', 'Seleccionar al menos una dirección de entrega.', '', 'icon-ban');
      return;
  }

  var direccion_card = $("input[name='direcciones-cliente']:checked").parents(".card")[0];

  var nro_documento = $("#cliente-nro-doc").val();

  var nombre = "";
  if ($("#cliente-nombre").is(":visible")){
    nombre = $("#cliente-nombre").val() + " " +
      $("#cliente-apellido-paterno").val() + " " +
      $("#cliente-apellido-materno").val();
  } else if ($("#cliente-razon-social").is(":visible")){
    nombre = $("#cliente-razon-social").val();
  } else if ($("#cliente-nombre-otros").is(":visible")){
    nombre = $("#cliente-nombre-otros").val();
  }

  var direccion = $(direccion_card).find(".direccion").text();

  $("#filtro-cliente").val(nro_documento + " - " + nombre + " - " + direccion);
  $("#modal-datos-cliente").modal("hide");
});

$('#filtro-articulo-codigo').focus();


/*
 * Buscar Cliente
 */

// Asigna el focus al input de codigo al cerrar el modal
$("#modal-clientes").on('hidden.bs.modal', function(e) {
  setTimeout(function(){$('#filtro-articulo-codigo').focus();}, 10);
});

// Focus al input de busqueda
$("#modal-clientes").on("shown.bs.modal", function(){
  setTimeout(function(){$('#filtro-cliente-modal').focus();}, 10);
});

// Buscar cadena cliente

var clientes = [
  {
    codigo: "11111111",
    nombre: "NOMBRE DEL CLIENTE 1 (DNI)",
    direccionPrincipal: "DIRECCION 1 DEL CLIENTE",
    direccion1: "DIRECCION 1 DEL CLIENTE",
    direccion2: "DIRECCION 2 DEL CLIENTE",
    telefono: "999999999",
  },
  {
    codigo: "22222222",
    nombre: "Nombre del Cliente 2 (DNI)",
    direccionPrincipal: "DIRECCION 1 DEL CLIENTE",
    direccion1: "DIRECCION 1 DEL CLIENTE",
    direccion2: "DIRECCION 2 DEL CLIENTE",
    telefono: "999999999",
  },
  {
    codigo: "33333333333",
    nombre: "Nombre del Cliente 3 (RUC)",
    direccionPrincipal: "DIRECCION 1 DEL CLIENTE",
    direccion1: "DIRECCION 1 DEL CLIENTE",
    direccion2: "DIRECCION 2 DEL CLIENTE",
    telefono: "999999999",
  }
]

$("#modal-cliente-buscar").click(buscarClientes);

function buscarClientes(){
  var cadena_busqueda = $('#filtro-cliente-modal').val();
  var clientes_filtrados = []

  if (cadena_busqueda == ""){
    clientes_filtrados = clientes
  } else {
    for (var idx in clientes){
      cliente = clientes[idx];
      console.log(cadena_busqueda);
      if ((cliente.codigo + cliente.nombre).includes(cadena_busqueda)){
        clientes_filtrados.push(cliente);
      }
    }
  }

  mostrarClientesFiltrados(clientes_filtrados);
  $("#pagina-cliente-actual").text("1");
  $("#pagina-cliente-total").text("1");

}

$("#filtro-cliente-modal").keypress(function(e){
  if (e.which == 13){
    buscarClientes();
  }
});

function mostrarClientesFiltrados(clientes_filtrados){
  var lista = $("#busqueda-clientes");
  lista.find(".card").remove();

  for (var idx in clientes_filtrados){
    var template = $('<div class="card card-cliente">' +
      '<div class="text-lg">' +
        '<strong class="nodo-cliente-codigo"></strong> <span class="separator">|</span> ' +
        '<strong class="nodo-cliente-nombre"></strong>' +
      '</div>' + 
      '<div class="row">' +
        '<div class="col details-col">' +
          '<strong> Teléfono: </strong><span class="nodo-cliente-telefono"></span><span class="separator">|</span>' +
          '<strong>Dirección entrega: </strong><span class="nodo-cliente-direccion-principal"></span><span class="separator">|</span>' +
        '</div>' +
        '<div class="col-lg-auto buttons-col">' +
          '<button class="btn btn-sm btn-outline-secondary direcciones-cliente" data-toggle="tooltip"' +
                   'data-placement="top" data-original-title="Ver direcciones"><i class="icon-eye"></i></button>' +
        '</div>' +
      '</div>' +
      '<div class="cliente-direcciones">' +
        '<hr class="my-1">' +
          '<div class="row">' +
            '<div class="col-auto checkbox-col">' +
              '<div class="custom-control custom-radio">' +
                '<input class="custom-control-input" type="radio" name="direcciones-cliente" id="direccion-1">' +
                '<label class="custom-control-label" for="direccion-1"></label>' +
              '</div>' +
            '</div>' +
            '<strong>Tipo Dirección: </strong> DESPACHO <span class="separator">|</span><span class="direccion-entrega">DIRECCION 1 DEL CLIENTE</span>' +
          '</div>' +
          '<div class="row">' +
            '<div class="col-auto checkbox-col">' +
              '<div class="custom-control custom-radio">' +
                '<input class="custom-control-input" type="radio" name="direcciones-cliente" id="direccion-2">' +
                '<label class="custom-control-label" for="direccion-2"></label>' +
              '</div>' +
            '</div>' +
            '<strong>Tipo Dirección: </strong> DESPACHO <span class="separator">|</span><span class="direccion-entrega">DIRECCION 2 DEL CLIENTE</span>' +
          '</div>' +
      '</div>' +
      '</div>');

    cliente = clientes_filtrados[idx];
    template.find(".nodo-cliente-codigo").text(cliente.codigo);
    template.find(".nodo-cliente-nombre").text(cliente.nombre);
    template.find(".nodo-cliente-telefono").text(cliente.telefono);
    template.find(".nodo-cliente-direccion-principal").text(cliente.direccionPrincipal);

    template.find(".custom-control-input:first").attr('id', "cliente-" + idx + "-direccion-1");
    template.find(".custom-control-input:first").attr('name', "cliente-" + idx + "-direcciones-cliente");
    template.find(".custom-control-label:first").attr('for', "cliente-" + idx + "-direccion-1");

    template.find(".custom-control-input:last").attr('id', "cliente-" + idx + "-direccion-2");
    template.find(".custom-control-label:last").attr('for', "cliente-" + idx + "-direccion-2");
    template.find(".custom-control-input:last").attr('name', "cliente-" + idx + "-direcciones-cliente");

    template.find("input[name='cliente-" + idx + "-direcciones-cliente']").change(seleccionarDireccion);
    template.find("#cliente-" + idx + "-direccion-1").attr("checked", true);

    template.find(".cliente-direcciones").hide();

    // Boton ver direcciones
    template.find('.direcciones-cliente').tooltip();
    template.find(".direcciones-cliente").click(function(){
      $(this).parents(".card:first").find(".cliente-direcciones").toggle("show");
    });

    template.click(function(){
      $("#busqueda-clientes").find(".card").removeClass("card-selected");
      $(this).addClass("card-selected");
    });
    lista.append(template);
  }
}

function seleccionarDireccion(){
  var direccion = $(this).parents('.row:first').find(".direccion-entrega").text();

  $(this).parents('.card:first').find('.nodo-cliente-direccion-principal').text(direccion);
}

$("#aceptar-cliente").click(function(){
  var selected = $("#busqueda-clientes").find(".card-selected");

  if (selected.length == 0) {
    showMessage("danger", "Debe escoger un cliente", "Error", "icon-ban");
  }else {
    var nro_documento = selected.find(".nodo-cliente-codigo").text();
    var nombre = selected.find(".nodo-cliente-nombre").text();
    var direccion = selected.find(".nodo-cliente-direccion-principal").text();

    $("#filtro-cliente").val(nro_documento + " - " + nombre + " - " + direccion);
  }

  $("#filtro-cliente").trigger("change");
  $("#modal-clientes").modal("hide");
});

function mostrarResumenVenta(codigo, nombre, direccion, tipo_doc){
  $("#modal-resumen-venta").find(".modal-title").text("Resumen de Venta - " + tipo_doc);
  $("#modal-resumen-venta").find(".cod-cliente").text(codigo);
  $("#modal-resumen-venta").find(".nombre-cliente").text(nombre);
  $("#modal-resumen-venta").find(".direccion-cliente").text(direccion);

  $("#modal-resumen-venta").find(".subtotal").text($("#venta-subtotal").val());

  $("#modal-resumen-venta").find(".descuento").text($("#venta-descuento").val());
  $("#modal-resumen-venta").find(".igv").text($("#venta-igv").val());
  $("#modal-resumen-venta").find(".total").text($("#venta-total").val());

  $("#modal-resumen-venta").modal("show");
}

/* Factura link */
$("#factura-link").click(function(){
  var cod_cliente = $("#filtro-cliente").val().split("-")[0].trim();

  if (cod_cliente.length != 11){
    showMessage('danger', 'Debe ingresar un RUC válido.', 'Error', 'icon-ban');
  } else {
    var nombre = $("#filtro-cliente").val().split("-")[1].trim();
    var direccion = $("#filtro-cliente").val().split("-")[2].trim();
    var tipo_doc = "Factura"

    mostrarResumenVenta(cod_cliente, nombre, direccion, tipo_doc);
  }
});

/* Boton boleta */
$("#boleta-link").click(function(){

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

    mostrarResumenVenta(cod_cliente, nombre, direccion, tipo_doc);
  }
});


$("#aceptar-venta").click(function(){
  showMessage("info", "Venta registrada.", "", "icon-check");
  $("#modal-resumen-venta").modal("hide");
  $("#filtro-cliente").val("");
  $("#lista-articulos").find(".card").remove();
  $("#venta-total").val(accounting.formatMoney(0));
  $("#venta-subtotal").val(accounting.formatMoney(0));
  $("#venta-igv").val(accounting.formatMoney(0));
});

/* Limpiar filtro cliente */
$("#filtro-cliente").change(function (){
  if ($(this).val().split("-").length == 3){
    $("#buscar-cliente").hide();
    $("#limpiar-filtro-cliente").show();
    $("#mostrar-datos-cliente").show();
  }else{
    console.log($(this).val().split("-").length);
    $("#buscar-cliente").show();
    $("#limpiar-filtro-cliente").hide();
    $("#mostrar-datos-cliente").hide();
  }
});

$("#limpiar-filtro-cliente").click(function(){
  $("#filtro-cliente").val("");
  $("#filtro-cliente").trigger("change");
  $(".tooltip").remove();
});

/* Ver datos cliente */
$("#mostrar-datos-cliente").click(function(){
  datosCliente();

  var nro_doc = $("#filtro-cliente").val().split("-")[0].trim();
  var nombre = $("#filtro-cliente").val().split("-")[1].trim();
  var direccion_principal = $("#filtro-cliente").val().split("-")[2].trim();

  if (nro_doc.length == 8){
    $("#cliente-nombre").val(nombre);
  }else if (nro_doc.length == 11){
    $("#cliente-razon-social").val(nombre);
  }else {
    $("#cliente-nombre-otros").val(nombre);
  }
  $("#cliente-telefono").val("99999999");
  $("#cliente-email").val("email@email.com");

  agregarDireccion("Lima", "Lima", "Lima", "DIRECCION 1 DEL CLIENTE", "DESPACHO");
  agregarDireccion("Lima", "Lima", "Lima", "DIRECCION 2 DEL CLIENTE", "DESPACHO");
});

$("#ventas-espera").click(function(){
  var href = $(this).data('href');
  if (!(typeof href === 'undefined' || !href)){
    window.location.href = href;
  }
});


/* Botones */
$(".botones-1").show();
$(".botones-2").hide();
$(".botones-3").hide();

$("#ver-mas-1").click(function(){
  $(".botones-1").hide();
  $(".botones-2").show();
  $(".botones-3").hide();
});

$("#ver-mas-2").click(function(){
  $(".botones-1").hide();
  $(".botones-2").hide();
  $(".botones-3").show();
});

$("#ver-mas-3").click(function(){
  $(".botones-1").show();
  $(".botones-2").hide();
  $(".botones-3").hide();
});

/* Cotizacion */
$("#cotizacion").click(function(){
  if ($("#filtro-cliente").val() == "") {
    showMessage("danger", "Debe seleccionar un cliente", "", "icon-ban");
  }else{
    $("#modal-cotizacion").modal("show");
  }
});

$("#aceptar-cotizacion").click(function(){
  $("#modal-cotizacion").modal("hide");
  $("#modal-pdf-cotizacion").modal("show");
});

$("#aceptar-pdf-cotizacion").click(function(){
  $("#modal-pdf-cotizacion").modal("hide");
});

$("#orden-venta").click(function(){
  showMessage("info", "La orden de venta se guardó correctamente.", "", "icon-check");
});

$("#ver-cotizaciones").click(function(){
  window.location.href = "vendedor-listado-cotizaciones.html";
});

$("#ver-ordenes-venta").click(function (){
  window.location.href = "vendedor-ventas-espera.html";
});

$("#historial-ventas").click(function(){
  window.location.href = "vendedor-listado-ventas.html";
});

