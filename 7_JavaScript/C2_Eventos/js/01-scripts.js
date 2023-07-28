document.addEventListener('DOMContentLoaded', () => {
    console.log('Documento Listo')
})

const nav = document.querySelector('.navegacion');

nav.addEventListener('mouseenter', () => {
    console.log('entrando')
})
// mousedown mouseup dblclik

const busqueda = document.querySelector('.busqueda');
busqueda.addEventListener('keydown', (evt) => {
    console.log(evt.target.value) // lo q usaurio esta escribiendo
})
// keyout 
// blur: entrar y salir
// copy
// paste 
// cut
// input all

const formilario = document.querySelector('#formulario');
formilario.addEventListener('submit', (evt) => {
    evt.preventDefault();
})

window.addEventListener('scroll', () => {
    console.log('scrolling...');
    const scrollPX = window.scrollY;
    console.log(scrollPX);

    const premium = document.querySelector('.premium');
    const ubicacion = premium.getBoundingClientRect();
    console.log(ubicacion);
})

const cardDiv = document.querySelector('.card');

cardDiv.addEventListener('click', evt => {
    console.log(evt.target.classList);
})