function actualiza_botones(data){
  var botones = $(".grid-index").find(".square-info");
  for (var i=0;i< botones.length; i++){
    var boton = $(botones[i]);
    var data_boton = data[i];

    var nombre = data_boton.split(" - ")[0];
    var rol = data_boton.split(" - ")[1];

    var template = '<div class="d-table"><div class="d-table-cell"><strong class="username">'+
      nombre + '</strong><br>'
    if (rol != undefined){
      template = template + '<span class="rol">' + rol + '</span>';
    }
    template += '</div></div>';
    boton.html(template);
  }
}

/* Data Inicial de botones de tiendas */
var data_inicial = [];
data_inicial.push("Tienda 1");
data_inicial.push("Tienda 2");
data_inicial.push("Tienda 3");
data_inicial.push("Tienda 4");
data_inicial.push("Tienda 5");
data_inicial.push("Tienda 6");
data_inicial.push("Tienda 7");
data_inicial.push("Tienda 8");
data_inicial.push("Tienda 9");
data_inicial.push("Tienda 10");
data_inicial.push("Tienda 11");
data_inicial.push("Tienda 12");
data_inicial.push("Tienda 13");
data_inicial.push("Tienda 14");

actualiza_botones(data_inicial);
$(".square-info").click(boton_tienda);

function boton_anterior() {
  console.log("anterior - " + $(this).data("tipo"));
  var data = []
  if ($(this).data("tipo") == "tienda") {
    var primer_boton = $(".grid-index").find(".square").first();
    primer_boton.addClass("square-info").removeClass("bg-dark square-anterior");

    var segundo_boton = $(".grid-index").find(".square:eq(1)");
    segundo_boton.addClass("square-info").removeClass("bg-dark square-anterior");

    var ultimo_boton = $(".grid-index").find(".square").last();
    ultimo_boton.data("tipo", "tienda");

    data.push("Tienda 1");
    data.push("Tienda 2");
    data.push("Tienda 3");
    data.push("Tienda 4");
    data.push("Tienda 5");
    data.push("Tienda 6");
    data.push("Tienda 7");
    data.push("Tienda 8");
    data.push("Tienda 9");
    data.push("Tienda 10");
    data.push("Tienda 11");
    data.push("Tienda 12");
    data.push("Tienda 13");
    data.push("Tienda 14");

    $(".square-info").off("click").on("click", boton_tienda);
  } else if ($(this).data("tipo") == "usuario") {
    var segundo_boton = $(".grid-index").find(".square:eq(1)");
    segundo_boton.addClass("square-info").removeClass("bg-dark square-anterior");


    data.push("Usuario 1 - Vendedor");
    data.push("Usuario 2 - Cajero");
    data.push("Usuario 3 - Despachador");
    data.push("Usuario 4 - Vendedor-Cajero");
    data.push("Usuario 5 - Cajero-Despachador");
    data.push("Usuario 6 - Vendedor-Cajero-Despachador");
    data.push("Usuario 7 - Rol del usuario");
    data.push("Usuario 8 - Rol del usuario");
    data.push("Usuario 9 - Rol del usuario");
    data.push("Usuario 10 - Rol del usuario");
    data.push("Usuario 11 - Rol del usuario");
    data.push("Usuario 12 - Rol del usuario");
    data.push("Usuario 13 - Rol del usuario");
    data.push("Usuario 14 - Rol del usuario");
    data.push("Usuario 15 - Rol del usuario");
  }

  actualiza_botones(data);
};

function boton_usuario(){
  console.log("usuario");

  $("#login-username").data("username", $(this).find(".username").text());
  $("#login-username").data("rol", $(this).find(".rol").text());

  $("#login-username").val($(this).find(".username").text());
}

function boton_tienda(){
  console.log("tienda");
  var data = []

  var primer_boton = $(".grid-index").find(".square").first();
  primer_boton.addClass("bg-dark square-anterior").removeClass("square-info");
  primer_boton.find(".d-table-cell").html('<i class="icon-rewind" style="transform:  rotatez(90deg)"></i>');
  primer_boton.data("tipo", "tienda");
  primer_boton.off("click").on("click", boton_anterior);

  var ultimo_boton = $(".grid-index").find(".square").last();
  ultimo_boton.data("tipo", "usuario");

  data.push("Usuario 1 - Vendedor");
  data.push("Usuario 2 - Cajero");
  data.push("Usuario 3 - Despachador");
  data.push("Usuario 4 - Vendedor-Cajero");
  data.push("Usuario 5 - Cajero-Despachador");
  data.push("Usuario 6 - Vendedor-Cajero-Despachador");
  data.push("Usuario 7 - Rol del usuario");
  data.push("Usuario 8 - Rol del usuario");
  data.push("Usuario 9 - Rol del usuario");
  data.push("Usuario 10 - Rol del usuario");
  data.push("Usuario 11 - Rol del usuario");
  data.push("Usuario 12 - Rol del usuario");
  data.push("Usuario 13 - Rol del usuario");
  data.push("Usuario 14 - Rol del usuario");
  data.push("Usuario 15 - Rol del usuario");

  $(".square-info").off("click").on("click", boton_usuario);
  actualiza_botones(data);


}

function boton_siguiente(){
  console.log("siguiente - " + $(this).data("tipo"));
  var data = []
  if ($(this).data("tipo") == "usuario"){
    var segundo_boton = $(".grid-index").find(".square:eq(1)");
    segundo_boton.removeClass("square-info").addClass("bg-dark square-anterior");
    segundo_boton.find(".d-table-cell").html('<i class="icon-rewind"></i>');
    segundo_boton.data("tipo", "usuario");
    segundo_boton.off("click").on("click", boton_anterior);

    data.push("Usuario 14 - Rol del usuario");
    data.push("Usuario 15 - Rol del usuario");
    data.push("Usuario 16 - Rol del usuario");
    data.push("Usuario 17 - Rol del usuario");
    data.push("Usuario 18 - Rol del usuario");
    data.push("Usuario 19 - Rol del usuario");
    data.push("Usuario 20 - Rol del usuario");
    data.push("Usuario 21 - Rol del usuario");
    data.push("Usuario 22 - Rol del usuario");
    data.push("Usuario 23 - Rol del usuario");
    data.push("Usuario 24 - Rol del usuario");
    data.push("Usuario 25 - Rol del usuario");
    data.push("Usuario 26 - Rol del usuario");

  } else if ($(this).data("tipo") == "tienda"){

    var primer_boton = $(".grid-index").find(".square").first();
    primer_boton.removeClass("square-info").addClass("bg-dark square-anterior");
    primer_boton.find(".d-table-cell").html('<i class="icon-rewind"></i>');
    primer_boton.data("tipo", "tienda");
    primer_boton.off("click").on("click", boton_anterior);

    data.push("Tienda 15");
    data.push("Tienda 16");
    data.push("Tienda 17");
    data.push("Tienda 18");
    data.push("Tienda 19");
    data.push("Tienda 20");
    data.push("Tienda 21");
    data.push("Tienda 22");
    data.push("Tienda 23");
    data.push("Tienda 24");
    data.push("Tienda 25");
    data.push("Tienda 26");
    data.push("Tienda 27");
    data.push("Tienda 28");
    data.push("Tienda 29");
  }
  actualiza_botones(data);
}

$(".square-siguiente").click(boton_siguiente);

//function loading(event) {
//  event.preventDefault();
//  iziToast.show({
//    message: '<div style="display: flex"><picture class="continuousSpinner"><svg width="300px" height="199px" viewBox="0 0 337 199" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="logoLoader" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><path d="M137.786542,164.068722 C150.853552,128.261749 165.3206,125.006569 194.254695,122.216416 L282.923696,118.031185 C302.990891,117.101134 314.191186,102.220314 316.524581,87.8045194 C318.857975,73.8537507 312.791149,56.6478026 294.123991,49.6724182 C290.390559,48.2773413 286.190449,47.3472901 281.990338,46.4172388 L123.319494,23.6309832 C107.919089,21.3058551 92.5186832,25.4910857 80.3850304,34.7915982 C68.2513776,44.0921107 59.8511565,57.5778538 57.5177617,72.9236994 L34.650493,231.032412 C33.7171351,237.542771 33.7171351,244.053129 35.117172,250.563488 C38.3839246,265.909334 50.5175774,277.069949 66.8513408,278 C67.7846987,278 69.1847355,278 70.1180934,278 C85.0518199,278 98.1188306,269.164513 103.718978,254.748719 L137.786542,164.068722 C137.786542,164.068722 137.786542,164.068722 137.786542,164.068722 Z M290.857238,57.5778538 C305.324286,63.1581613 308.591038,76.1788788 307.191001,85.4793913 C305.790965,95.2449294 298.324101,107.335596 282.457017,107.800621 L229.722295,111.055801 L238.122516,49.2073926 L281.05698,55.2527257 C283.857054,55.7177513 287.590485,56.6478026 290.857238,57.5778538 Z M94.8520779,251.493539 C89.7186095,265.444308 77.1182777,269.164513 67.7846987,268.699488 C58.4511196,267.769436 47.2508247,262.189129 44.450751,248.703386 C43.5173931,243.123078 43.0507142,238.007796 43.9840721,232.427489 L50.0508985,189.180106 L113.052557,202.665849 L94.8520779,251.493539 Z M116.785989,193.365336 L51.9176143,179.414568 L66.8513408,73.8537507 C68.7180566,61.2980588 75.2515619,49.6724182 85.9851778,41.7669826 C94.385399,35.2566238 104.652336,32.0014444 114.919273,32.0014444 C117.252668,32.0014444 119.586062,32.0014444 121.919457,32.4664701 L228.322258,47.8123157 L219.922037,111.520826 L193.321337,112.915903 C162.987205,116.171083 143.853368,120.356313 128.919641,161.278568 L116.785989,193.365336 Z" id="Shape-Copy" fill="#00D4A5" fill-rule="nonzero" transform="translate(175.500000, 150.500000) rotate(37.000000) translate(-175.500000, -150.500000) "></path></g></svg></picture></div>',
//    progressBar: true,
//    overlay: true,
//    pauseOnHover: false,
//    timeout: false,
//    position: "center",
//    backgroundColor: "rgba(0, 0, 0, 0.05)",
//  });
//}
