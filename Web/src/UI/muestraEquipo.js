//Recibe un objeto y se encarga de mostrar los resultados en el
//archivo mostrar_equipo.html 
export function informacionEquipo(equipos) {
    console.log(equipos); //Devuelve Un Objeto con los datos de UN equipo.
    const imgEscudos = document.querySelectorAll('.escudo');
    const imgUrl = equipos.crestUrl;

    if(imgUrl !== undefined && imgUrl.startsWith('https://')) { //Pregunta si la imagen existe y si empieza con una URL
        imgEscudos.forEach(imgEscudo => imgEscudo.src = imgUrl); //si empieza con la URL quiere decir que es de la api
    } else {
        imgEscudos.forEach(imgEscudo => imgEscudo.src = '/' + imgUrl); //si no pone una / y el nombe quedaria (API/uploads/imgs/imagen.png) 
    }

    //se capturan los datos y distribuyen a sus respectivos lugares en el html
    const nombres = document.querySelectorAll('#nombre');
    const nomEquipo = equipos.name;
    nombres.forEach(nombre => nombre.textContent = nomEquipo);
    
    
    document.querySelector('#nombreCorto').textContent = equipos.shortName;
    document.querySelector('#abreviatura').textContent = equipos.tla;
    document.querySelector('#colores').textContent = equipos.clubColors;
    // document.querySelector('#pais').textContent = equipos.area.name; //! falta Solucionar
    document.querySelector('#direccion').textContent = equipos.address;
    document.querySelector('#estadio').textContent = equipos.venue;
    document.querySelector('#telefono').textContent = equipos.phone;
    document.querySelector('#web').href = equipos.website;
    document.querySelector('#web').textContent = equipos.website;
    document.querySelector('#fundacion').textContent = equipos.founded;

}

//buscar la url y captura al id (http://localhost:8081/Web/Templates/mostrar_equipo?id=812) en este caso traeria 812.
export function getIDurl() {
    let paramsURL = new URLSearchParams(window.location.search);
    let id = paramsURL.get('id');
    return id; 
}

//escucha los clics en el botón de borrado y, cuando se hace clic, 
//invoca una función de devolución de llamada (equipoSeleccionadoCB) con el ID del equipo seleccionado como argumento.
export function borrarEquipo(equipoSeleccionadoCB = () => { } ) {
    const btnBorrar = document.querySelector('.borrar');
    btnBorrar.addEventListener('click', () => equipoSeleccionadoCB(getIDurl()));
}

//escucha los clics en todos los elementos con la clase "editar" y, cuando se hace clic en uno de estos elementos, 
//invoca una función (datosEditar) con información relevante sobre el elemento clicado y el ID del equipo para manejar la edición del equipo correspondiente.
export function eventoBtnEditar(callBack = () => { }) {
    const paramsURL = new URLSearchParams(window.location.search);
    const id = paramsURL.get('id');
    const btnEditar = document.querySelectorAll('.editar');
    btnEditar.forEach((element) => {
        element.addEventListener('click', () => {
            datosEditar(element, callBack, id);
        });
    });
}

//busca en el formulario de mostrar_equipo.html si en algun input hay algun valor y si lo hay los envia para editar. 
function datosEditar(element, callBack, id) {
        if(element.classList.contains('.custom-file')) {
            const valor = document.querySelector('#file-upload').file[0];
            eventImg(id);
        }
        if(element.classList.contains('editarNombre')) {
            const valor = document.querySelector('#nombre-upd');            
            callBack(id, "name", valor.value);
        }
        if(element.classList.contains('editarNombreCorto')) {
            const valor = document.querySelector('#nombreCorto-upd');
            callBack(id, "shortName", valor.value);
        }
        if(element.classList.contains('editarAbreviatura')) {
            const valor = document.querySelector('#abreviatura-upd');
            callBack(id, "tla", valor.value);
        }
        if(element.classList.contains('editarColores')) {
            const valor = document.querySelector('#colores-upd');
            callBack(id, "clubColors", valor.value);
        }
        // if(element.classList.contains('editarPais')) {
        //     const valor = document.querySelector('#pais'); //! Solucionar
        //     callBack(id, "area.name", valor.value);
        // }
        if(element.classList.contains('editarDireccion')) {
            const valor = document.querySelector('#direccion-upd');
            callBack(id, "address", valor.value);
        }
        if(element.classList.contains('editarEstadio')) {
            const valor = document.querySelector('#estadio-upd');
            callBack(id, "venue", valor.value);
        }
        if(element.classList.contains('editarTelefono')) {
            const valor = document.querySelector('#telefono-upd');
            callBack(id, "phone", valor.value);
        }
        if(element.classList.contains('editarWeb')) {
            const valor = document.querySelector('#web-upd');
            callBack(id, "website", valor.value);
        }
        if(element.classList.contains('editarFundacion')) {
            const valor = document.querySelector('#fundacion-upd');
            callBack(id, "founded", valor.value);
        }
    }

//? ----
function eventImg(id) {
    const form = document.querySelector('formulario-subir');
    form.addEventListener('submit', function() {
        const ACTURL = `http://localhost:8080/subirImagen/${id}`;
        form.action = ACTURL;
    });
}

//Estas funciones manipulan el formulario de edicion para mostrarse o no cuando se requiera.
export function editarEquipo() {
    document.querySelector('.edit').onclick = function (e) {
        mostrarBtn();
    }
}
function mostrarBtn() {
    document.querySelector('#formulario-subir').style.display = 'block';
    document.querySelector('#close').style.display = 'block';
}


export function esconderFormulario() {
    document.querySelector('#close').onclick = function(e) {
        ocultarBtn();
    }
}

function ocultarBtn() {
    document.querySelector('#formulario-subir').style.display = 'none';
    document.querySelector('#close').style.display = 'none';
}