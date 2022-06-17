var e_key = jQuery.Event("keyup");
e_key.which = 13;
$("#filtro-articulo-codigo").val("A0000001");
$("#filtro-articulo-codigo").trigger(e_key);

$("#filtro-articulo-codigo").val("A0000002");
$("#filtro-articulo-codigo").trigger(e_key);

$("#filtro-articulo-codigo").val("A0000003");
$("#filtro-articulo-codigo").trigger(e_key);

$("#filtro-cliente").val("20553028982 - QTC S.A.C - AV. SIMÓN BOLIVAR 2150");
$("#filtro-cliente").change();
