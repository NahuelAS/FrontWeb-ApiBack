export function informacioEquipo(equipo) {
    const imgEscudo = document.querySelectorAll('.escudo');
    const imgUrl = equipo.crestUrl;

    if(imgUrl !== undefined && imgUrl.startsWhit('http://')) {
        imgEscudo.src = `${equipo.crestUrl}`;
    } else {
        imgEscudo.src = `/${equipo.crestUrl}`;
    }

    document.querySelector('#nombre').textContent = `${equipo.name}`;
    document.querySelector('#nombreCorto').textContent = `${equipo.shortName}`;
    document.querySelector('#abreviatura').textContent = `${equipo.tla}`;
    document.querySelector('#colores').textContent = `${equipo.clubColors}`;
    document.querySelector('#pais').textContent = `${equipo.area.name}`;
    document.querySelector('#direccion').textContent = `${equipo.address}`;
    document.querySelector('#estadio').textContent = `${equipo.venue}`;
    document.querySelector('#telefono').textContent = `${equipo.phone}`;
    document.querySelector('#web').href = `${equipo.website}`;
    document.querySelector('#web').textContent = `${equipo.website}`;
    document.querySelector('#fundacion').textContent = `${equipo.founded}`;
}


export function getIDurl() {
    const paramsURL = new URLSearchParams(window.location.search);
    const id = paramsURL.get('id');
    return id; 
}

export function borrarEquipo(equipoSeleccionadoCB = () => {} ) {
    const btnBorrar = document.querySelector('.borrar');
    btnBorrar.addEventListener('click', () => equipoSeleccionadoCB(getIDurl()));
}

export function eventoBtnEditar(callBack = () => {}) {
    const paramsURL = new URLSearchParams(window.location.search);
    const id = paramsURL.get('id'); 
    const btn = document.querySelector('.editar');
    btn.forEach((element) => {
        element.addEventListener('click', () => {
            datosEditar(element, callBack, id);
        });
    });
}

function datosEditar(element, callBack, id) {
    if(element.classList.contains('.custom-file')) {
        const valor = document.querySelector('#file-upload').file[0];
        evenImg(id);
    }
    if(element.classList.contains('editarNombre')) {
        const valor = document.querySelector('#nombre');
        callBack(id, "name", valor.value);
    }
    if(element.classList.contains('editarNombreCorto')) {
        const valor = document.querySelector('#nombreCorto');
        callBack(id, "shortName", valor.value);
    }
    if(element.classList.contains('editarAbreviatura')) {
        const valor = document.querySelector('#abreviatura');
        callBack(id, "tla", valor.value);
    }
    if(element.classList.contains('editarColores')) {
        const valor = document.querySelector('#colores');
        callBack(id, "clubColors", valor.value);
    }
    if(element.classList.contains('editarPais')) {
        const valor = document.querySelector('#pais');
        callBack(id, "area.name", valor.value);
    }
    if(element.classList.contains('editarDireccion')) {
        const valor = document.querySelector('#direccion');
        callBack(id, "address", valor.value);
    }
    if(element.classList.contains('editarEstadio')) {
        const valor = document.querySelector('#estadio');
        callBack(id, "venue", valor.value);
    }
    if(element.classList.contains('editarTelefono')) {
        const valor = document.querySelector('#telefono');
        callBack(id, "phone", valor.value);
    }
    if(element.classList.contains('editarWeb')) {
        const valor = document.querySelector('#web');
        callBack(id, "website", valor.value);
    }
    if(element.classList.contains('editarFundacion')) {
        const valor = document.querySelector('#fundacion');
        callBack(id, "founded", valor.value);
    }
}

function evenImg(id) {
    const form = document.querySelector('formulario-subir');
    form.addEventListener('submit', function() {
        const ACTURL = `http://localhost:8080/subirImagen/${id}`;
        form.action = ACTURL;
    });
}

export function editarEquipo() {
    const btnEdit = document.querySelector('.edit');
    btnEdit.addEventListener('click', () => {
        const mod = document.querySelector('.formulario');
        mod.style.display = 'absolute';
    });
}

export function esconderFormulario() {
    const esconderForm = document.querySelector('.close');
    const form = document.querySelector('formulario');
    esconderForm.addEventListener('click', () => {
        form.style.display = 'none';
    });
}
