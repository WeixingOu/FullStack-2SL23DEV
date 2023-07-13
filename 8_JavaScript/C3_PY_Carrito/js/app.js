// Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];
const notificacionCarrito = document.querySelector('#notificacion-carrito');

cargarEvtListeners();
function cargarEvtListeners() {
    listaCursos.addEventListener('click', agregarCurso);
    carrito.addEventListener('click', eliminarCurso);
    vaciarCarritoBtn.addEventListener('click',vaciarCarrito);
}

// Functions
function vaciarCarrito(e) {
    e.preventDefault();
    articulosCarrito = [];
    anadirNotificacion(articulosCarrito.length);
    carritoHtml();
}

function anadirNotificacion() {
    const cantidadTotal = articulosCarrito.reduce((total, curso) => {
        return total + curso.cantidad;
    }, 0);
    notificacionCarrito.setAttribute('data-cantidadnotificacion', cantidadTotal);
    if (cantidadTotal > 0) {
        notificacionCarrito.classList.add('notificacion-carrito--visible');
    } else {
        notificacionCarrito.classList.remove('notificacion-carrito--visible');
    }
}

function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCursos(cursoSeleccionado);
        anadirNotificacion(articulosCarrito.length);
    }
}

function eliminarCurso(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        articulosCarrito = articulosCarrito.filter( curso => {
            if (curso.id === cursoId) {
                if (curso.cantidad > 1) {
                    curso.cantidad--;
                    return curso;
                } else {
                    articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);
                }
            } else {
                return curso;
            }
        });
        anadirNotificacion(articulosCarrito.length);
        carritoHtml();
    }   
}

function leerDatosCursos(curso) {
    const infoCurso = {
        imagen: curso.querySelector('.imagen-curso').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );
    if (existe) {
        const cursos = articulosCarrito.map( curso => {
            if( curso.id === infoCurso.id ) {
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }
        });
        articulosCarrito = [...cursos];
    } else {
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    carritoHtml();
}

function carritoHtml() {
    limpiarHtml();

    articulosCarrito.forEach( curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML  = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a hre="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>
        `;

        contenedorCarrito.appendChild(row);
    })
}

function limpiarHtml() {
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}
