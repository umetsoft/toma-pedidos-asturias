/*
 * Mostrar u ocultar el password dependiendo del estado actual
 */

var button = document.getElementById('show-password');
if (button) button.addEventListener('click', function () {
  var password = document.getElementById('login-password');
  if (password) {
    if (password.type == 'password') {
      password.type = 'text';
      button.text = 'Ocultar';
    } else {
      password.type = 'password';
      button.text = 'Mostrar';
    }
  }
});

/*
 * Inicio de sesion temporal
 */

var login = document.getElementById('login-submit');
if (login) login.addEventListener('click', function (event) {
  var username = $("#login-username").data("username")
  var rol = $("#login-username").data("rol")
  console.log(rol);

  if (username) {
    loading_start();
    setTimeout(function(){
      loading_stop();
      setTimeout(function(){
        if (rol == "Vendedor"){
          window.location.href = 'vendedor-ventas.html';
        }
        if (rol == "Vendedor-Cajero"){
          window.location.href = 'vendedor-cajero-ventas.html';
        }
        if (rol == "Cajero"){
          window.location.href = 'cajero-pendientes-pago.html';
        }
        if (rol == "Despachador") {
          window.location.href = 'despachador-pendientes-despacho.html';
        }
        if (rol == "Cajero-Despachador") {
          window.location.href = 'cajero-despachador-pendientes.html';
        }
        if (rol == "Vendedor-Cajero-Despachador") {
          window.location.href = 'vendedor-cajero-despachador-ventas.html';
        }
      }, 1000);
    }, 5000);
  }
  event.preventDefault();
});
