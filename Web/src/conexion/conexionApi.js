const APIURL = 'http://localhost:8080';

//Realiza una solicitud GET a la ruta http://localhost:8080/equipos, obtiene los datos de respuesta del servidor en formato JSON
export async function getEquipos() {
    const reqOpcionMethod = {
        method: 'GET',
    };
    const resPage = await fetch(`${APIURL}/equipos`, reqOpcionMethod);
    const resJson = await resPage.json();

    return resJson;
}

//envía datos actualizados sobre un equipo específico al servidor utilizando una solicitud PUT y devuelve la respuesta del servidor.
export async function editarUNequipo(idEquipo, tipoDato, valor) {
    const reqOpcionMethod = {
        method: 'PUT',
        body: JSON.stringify({ tipoDato, valor }),
        headers: {'Content-Type': 'application/json',},
    };
        const resPage = await fetch(`${APIURL}/mostrar_equipo/${idEquipo}/${tipoDato}/${valor}/editar`, reqOpcionMethod);
        return resPage;
}

//obtiene información sobre un equipo específico haciendo una solicitud GET al servidor y devuelve los datos del equipo en formato JSON
export async function getUNequipo(idEquipo) {
    const reqOpcionMethod = {
        method: 'GET',
    };

    const resPage = await fetch(`${APIURL}/mostrar_equipo/${idEquipo}/ver`, reqOpcionMethod);
    const resJson = await resPage.json();

    return resJson; 
}

//proporciona una confirmación al usuario antes de eliminar un equipo específico. Si el usuario confirma la eliminación, 
//se realiza una solicitud DELETE al servidor para eliminar el equipo y luego se redirige al usuario a la página principal del sitio web.
export async function eliminarEquipo(idEquipo){
    const respuesta = confirm('¡¿BORRAR?!');
    if(!respuesta){
        return;
    }

    const reqOpcionMethod = {
        method: 'DELETE',
    };
    await fetch(`${APIURL}/borrar/${idEquipo}`, reqOpcionMethod);

    window.location.href = '/';
}

