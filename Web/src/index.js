import { getEquipos } from "./conexion/conexionApi";
import { mostrarEquipos } from "./UI/vistaEquipos";

function paginaDelEquipo(equipo) {
    window.location.href = `Web/Templates/equipo?id=${equipo.id}`;
}

async function iniciar() {
    mostrarEquipos(await getEquipos(), paginaDelEquipo);
}

iniciar();