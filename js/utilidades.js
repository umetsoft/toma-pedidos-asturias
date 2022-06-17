/*
 * Inputs tipo fecha y hora
 */

$('.date-input').focus(function() {
	$(this).prop('type', 'date');
});
$('.date-input').blur(function() {
	if (!this.value) $(this).prop('type', 'text');
});

$('.time-input').focus(function () {
	$(this).prop('type', 'time');
});
$('.time-input').blur(function() {
	if (!this.value) $(this).prop('type', 'text');
});

try {
	$.extend(true, $.fn.datetimepicker.defaults, {
		icons: {
			time: 'icon-clock',
		},
		format: "D/MM/YYYY, h:mm a",
		tooltips: {
			selectMonth: 'Seleccionar Mes',
			selectTime: 'Seleccionar Hora',
			incrementHour: 'Incrementar Hora',
			decrementHour: 'Decrementar Hora',
			incrementMinute: 'Incrementar Minutos',
			decrementMinute: 'Decrementar Minutos',
			togglePeriod: 'Intercambiar AM PM',
			pickHour: 'Escoger Hora',
			pickMinute: "Escoger Minutos",
		}
	});

	$(".datetimepicker-input").datetimepicker();
} catch (e) {
	console.log('Error trying to load date time picker');
}

// Boton de limpieza
$('button[type="reset"]').click(function() {
	// Obtener formulario de referencia
	var form = $(this).parents('.search-box');
	// Para todos los inputs de fecha del formulario, regresarlos a formato de texto
	form.find('.date-input').prop('type', 'text').val('');
	form.find('.time-input').prop('type', 'text').val('');
});

/*
 * Inputs de comentarios y observaciones
 */

/* var lastWidth = $(window).width();
$(window).resize(function () {
	var width = $(this).width();
	if (width !== lastWidth) {
		// Cambiar los textareas
		if (width <= 568) $('textarea').prop('rows', 3);
		else $('textarea').prop('rows', 2);
		// Actualizar lastWidth
		lastWidth = width;
	}
}); */

/*
 * Ver y ocultar filtros
 */

$('#filter-button').click(function () {
	var filter = $(this);
	var search = $('.search-box');
	if (search.css('display') === 'none') {
		search.show(500);
		filter.text('Ocultar filtros');
	} else {
		search.hide(500);
		filter.text('Ver filtros');
	}
});

/*
 * Notificaciones
 */

$(function () {
	var href = window.location.href;
	var path = href.substring(href.lastIndexOf('/') + 1);
	// Notificacion para guardar borrador de cierre de caja
	if (path === 'usuario-cajas.html?borrador') showMessage('success', 'Borrador guardado.', 'Éxito', 'icon-circle-check');
	// Notificacion para registrar cierre de caja
	if (path === 'usuario-cajas.html?grabar') showMessage('success', 'Cierre de caja guardado.', 'Éxito', 'icon-circle-check');
});

function showMessage(myClass, myMessage, myTitle, myIcon) {
	iziToast.show({
		class: 'iziToast-' + myClass || '',
		title: myTitle || '',
		message: myMessage || 'Mensaje',
		animateInside: false,
		position: 'topRight',
		progressBar: false,
		icon: myIcon || '',
		timeout: 3200,
		transitionIn: 'fadeInLeft',
		transitionOut: 'fadeOut',
		transitionInMobile: 'fadeIn',
		transitionOutMobile: 'fadeOut'
	});
}

/*
 * Funciones de validacion
 */

function validarEntero (dato, mensajeNoExiste, mensajeNoValido, validarPositivo = true) {
	var valor = parseInt(dato);
	if (isNaN(valor) || (validarPositivo && valor <= 0)) {
		if (mensajeNoExiste || mensajeNoValido) showMessage('danger', mensajeNoValido || mensajeNoExiste, 'Error', 'icon-ban');
		return null;
	}
	return valor;
}

/* 

function validarDecimal(dato, mensajeNoExiste, mensajeNoValido, validarPositivo = true) {
	var valor = parseFloat(dato);
	if (isNaN(valor) || (validarPositivo && valor <= 0)) {
		showMessage('danger', mensajeNoValido || mensajeNoExiste, 'Error', 'icon-ban');
		return null;
	}
	// Convertir a 2 decimales antes de retornar
	return Math.round(valor * 100) / 100;
}

function validarFecha(dato, mensajeNoExiste, mensajeNoValido) {
	var valor = validarDato(dato, mensajeNoExiste);
	if (!valor) return null;
	// Verificar si es el estandar ISO de fechas (aaaa-mm-dd)
	var fecha = valor.split('-');
	if ((fecha.length === 3) && (fecha[0].length === 4) && (fecha[1].length === 2) && (fecha[2].length === 2))
		return fecha[2] + '/' + fecha[1] + '/' + fecha[0];
	// Verificar si es una fecha colocada manualmente (dd/mm/aaaa)
	fecha = valor.split('/');
	if ((fecha.length === 3) && (fecha[0].length === 2) && (fecha[1].length === 2) && (fecha[2].length === 4))
		return valor;
	// Si no es ninguna de estas, mostrar mensaje de error
	showMessage('danger', mensajeNoValido || mensajeNoExiste, 'Error', 'icon-ban');
	return null;
} */

/*
 * Reloj
 */

function clock () {
	var today = new Date();
	var formatTime = function (n) {
		return (n < 10) ? ('0' + n) : n;
	}
	var hours = formatTime(today.getHours());
	var minutes = formatTime(today.getMinutes());
	var seconds = formatTime(today.getSeconds());
	$('.clock').text(hours + ':' + minutes + ':' + seconds);
	setTimeout(clock, 500);
}
$(clock);
