import { editarUNequipo, getUNequipo, eliminarEquipo } from "./conexion/conexionApi.js";
import { esconderFormulario, editarEquipo, borrarEquipo, getIDurl, informacionEquipo, eventoBtnEditar } from "./UI/muestraEquipo.js";

async function iniciar() {
    informacionEquipo(await getUNequipo(getIDurl()));
    borrarEquipo(eliminarEquipo);
    editarEquipo();
    esconderFormulario();
    eventoBtnEditar(editarUNequipo);
}

iniciar();