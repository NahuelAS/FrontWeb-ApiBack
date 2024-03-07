const APIURL = 'http://localhost:8080';

export async function getEquipos() {
    const reqOpcionMethod = {
        method: 'GET',
    };
    const resPage = await fetch(`${APIURL}/equipos`, reqOpcionMethod);
    const resJson = await resPage.json();

    return resJson;
}

export async function editarUNequipo(idEquipo, tipoDato, valor) {
    const reqOpcionMethod = {
        method: 'PUT',
        body: JSON.stringify({ tipoDato, valor }),
        headers: {'Content-Type': 'application/json',},
    };
        const resPage = await fetch(`${APIURL}/mostrar_equipo/${idEquipo}/${tipoDato}/${valor}/editar`, reqOpcionMethod);
        return resPage;
}


export async function getUNequipo(idEquipo) {
    const reqOpcionMethod = {
        method: 'GET',
    };

    const resPage = await fetch(`${APIURL}/mostrar_equipo/${idEquipo}/ver`, reqOpcionMethod);
    const resJson = await resPage.json();

    return resJson; 
}

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

