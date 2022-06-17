/*
 * Configuraciones
 */

accounting.settings.currency.format = { pos: '%s %v', neg: '%s (%v)', zero: '%s 0.00' }

$('.modal').on('show.bs.modal', function (e) {
	$('.tooltip').remove();
});

var subtotal = 0;

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
	1: { nombre: 'Adulto Extranjero Subida y Bajada', /* tipo: 'Two way', */ precio: 24 },
	2: { nombre: 'Adulto Extranjero Subida o Bajada', /* tipo: 'One way', */ precio: 12 },
	3: { nombre: 'Adulto Nacional Subida y Bajada', /* tipo: 'Two way', */ precio: 15 },
	4: { nombre: 'Adulto Nacional Subida o Bajada', /* tipo: 'One way', */ precio: 8 },
	5: { nombre: 'Niño Extranjero Subida y Bajada', /* tipo: 'Two way', */ precio: 12 },
	6: { nombre: 'Niño Extranjero Subida o Bajada', /* tipo: 'One way', */ precio: 7 },
	7: { nombre: 'Niño Nacional Subida y Bajada (5 a 11 años)', /* tipo: 'Two way', */ precio: 8 },
	8: { nombre: 'Niño Nacional Subida o Bajada (5 a 11 años)', /* tipo: 'Two way', */ precio: 5 },
	9: { nombre: 'Estudiante Subida y Bajada (12 a 17 años o SUNEDU vigente)', /* tipo: 'Two way', */ precio: 10 },
	10: { nombre: 'Estudiante Subida o Bajada (12 a 17 años o SUNEDU vigente)', /* tipo: 'One way', */ precio: 6 }
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
	'</div>');

	// Colocar valores
	template.find('.nodo-articulo-codigo').text(codigo);
	template.find('.nodo-articulo-nombre').text(articulo.nombre);
	template.find('.nodo-articulo-precio').text(accounting.formatMoney(articulo.precio));
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
			subtotal += (articulo.precio * valor);
			$('#venta-subtotal').val(accounting.formatMoney(subtotal));
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
	var codigo = parseInt($(this).val());
	// Crear el nodo y adjuntarlo a la lista
	if (lista.length > 0 && !isNaN(codigo)) insertarArticuloPorCodigo(codigo, lista, false);
	else showMessage('danger', 'Ingrese un código de artículo válido.', 'Error', 'icon-ban');

	// Limpiar el campo
	$(this).val('').blur();
});

function insertarArticuloPorCodigo(codigo, lista, esModal, valor = null) {
	var articulo = articulos[codigo];
	if (!articulo) {
		showMessage('default', 'No se encontró ningún artículo.');
		return false;
	}
	lista.prepend(crearNodoArticulo(codigo, articulo, esModal, valor));
	return true;
}

/*
 * Buscar articulo en el modal
 */

$('#modal-articulo-buscar').click(function () {
	var lista = $('#busqueda-articulos');
	var input = $('#filtro-articulo-modal');
	var codigo = parseInt(input.val());

	// Caso 1: Se ingreso un numero, buscar por codigo
	if (!isNaN(codigo)) insertarArticuloPorCodigo(codigo, lista, true);
	// Caso 2: Lo ingresado no es un numero, buscar por nombre
	else {
		// Buscar por nombre
		var encontrado = insertarArticuloPorNombre(input.val(), lista, true);
		if (encontrado) {
			// Mostrar solo los 4 primeros resultados
			var tarjetas = lista.children();
			for (var i = 4; i < tarjetas.length; i++) {
				$(tarjetas[i]).addClass('d-none');
			}
			// Cambiar texto de paginado
			$('#pagina-articulo-actual').text('1');
			$('#pagina-articulo-total').text(Math.ceil(tarjetas.length / 4));
		}
	}

	// Limpiar el campo
	input.val('').blur();
});

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

function obtenerCodigoArticulo (identificador) {
	return validarEntero(identificador.substring(identificador.lastIndexOf('-') + 1)) || 0;
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

$(".grid-footer .square").click(botonFooter);

/*
 * Seleccionar Cliente
 */

function datosCliente(){

  var nro_cliente = $(this).val();

  $("#cliente-nro-doc").val(nro_cliente);
  $("#modal-datos-cliente").modal("show");
}

$("#filtro-cliente").change(datosCliente);

$("#agregar-direccion").click(function(){

  var departamento = $("#direccion-departamento option:selected").text();
  var provincia = $("#direccion-provincia option:selected").text();
  var distrito = $("#direccion-distrito option:selected").text();

  var direccion = $("#direccion-descripcion").val();
  var tipo_direccion = $("#direccion-tipo option:selected").text();

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
          '<strong> Ubigeo: </strong>' +
          '<span class="ubigeo"></span>' +
          '<span class="separator">|</span>' +
        '</div>' +
        '<div class="d-inline-block">' +
          '<strong> Direccion: </strong>' +
          '<span class="direccion"></span>' +
          '<span class="separator">|</span>' +
        '</div>' +
        '<div class="d-inline-block">' +
          '<strong> Tipo Direccion: </strong>' +
          '<span class="tipo-direccion"></span>' +
          '<span class="separator">|</span>' +
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

  $("#modal-datos-clientes").modal("hide");
});

function eliminar_direccion(){
  var card = $(this).parents(".card")[0];
  card.remove();
}

$("#aceptar-datos-cliente").click(function(){
  var direccion_card = $("input[name='direcciones-cliente']:checked").parents(".card")[0];

  var nro_documento = $("#cliente-nro-doc").val();
  var nombre = $("#cliente-nombre").val();
  var direccion = $("#direccion-descripcion").val();

  $("#filtro-cliente").val(nro_documento + " - " + nombre + " - " + direccion);
});




