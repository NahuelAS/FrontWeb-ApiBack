const APIURL = 'http://localhost:8080';

export async function getEquipos() {
    const reqOpcionMethod = {
        method: 'GET',
    };
    const resPage = await fetch(`${APIURL}/equipos`, reqOpcionMethod);
    const resJson = await resPage.json();

    return resJson;
}

export async function getUNequipo(idEquipo) {
    const reqOpcionMethod = {
        method: 'GET',
    };

    const resPage = await fetch(`${APIURL}/equipos/${idEquipo}`, reqOpcionMethod);
    const resJson = await resPage.json();

    return resJson;
}