import { editarUNequipo, getUNequipo, eliminarEquipo } from "./src/conexion/conexionApi.js";
import { esconderFormulario, editarEquipo, borrarEquipo, getIDurl, informacioEquipo, eventoBtnEditar } from "./UI/muestraEquipo.js";

async function iniciar() {
    informacioEquipo(await getUNequipo(getIDurl()));
    borrarEquipo(eliminarEquipo);
    editarEquipo();
    esconderFormulario();
    eventoBtnEditar(editarUNequipo);
}

iniciar();