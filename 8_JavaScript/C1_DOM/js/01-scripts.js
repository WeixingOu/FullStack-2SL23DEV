/* let elemento;
elemento = document;
elemento = document.head;
elemento = document.body;
console.log(elemento); */

/* const header = document.getElementsByClassName('header');
const formulario = document.getElementById('formulario');
console.log(formulario) */

/* const h1 = document.querySelector('h1');
h1.style.backgroundColor = 'red'
const card = document.querySelector('.card');
card.classList.add('nueva-clase'); */

/* const navegacion = document.querySelector('.navegacion');
console.log(navegacion.childNodes); // text a text a ...
console.log(navegacion.children); // a a a ...
console.log(navegacion.parentElement); // header
console.log(navegacion.nextElementSibling); // null */

// .remove
// navegacion.removeChild( navegacion.children[2]);

const enlace = document.createElement('A');
enlace.textContent = 'Nuevo Enlace' // <a>Nuevo Enlace</a>
enlace.href = '/nuevo-enlace';
enlace.target = '_blank';
console.log(enlace);
const navegacion = document.querySelector('.navegacion');
// navegacion.appendChild(enlace);
navegacion.insertBefore(enlace, navegacion.children[1]);
console.log(navegacion);
// classlist ___.src ___.alt
const miFuncion = () => alert('Diste Click');
enlace.onclick = miFuncion;

const btnFlotante = document.querySelector('.btn-flotante');
const footer = document.querySelector('.footer');
btnFlotante.addEventListener('click', mostrarOcultarFooter);

function mostrarOcultarFooter() {
    if ( footer.classList.contains('activo')) {
        footer.classList.remove('activo');
    } else {
        footer.classList.add('activo');
    }
}
