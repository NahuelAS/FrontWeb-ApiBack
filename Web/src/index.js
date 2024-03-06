import { getEquipos } from "./conexion/conexionApi.js";
import { mostrarEquipos } from "./UI/vistaEquipos.js";

function paginaDelEquipo(equipo) {
    window.location.href = `Web/Templates/equipo?id=${equipo.id}`;
}

async function iniciar() {
    mostrarEquipos(await getEquipos(), paginaDelEquipo);
}

iniciar();