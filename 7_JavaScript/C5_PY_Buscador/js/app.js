const resultado = document.querySelector('#resultado');

const marca = document.querySelector('#marca');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

const year = document.querySelector('#year');
const maxYear = new Date().getFullYear();
const minYear = maxYear - 10;

const datoBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: '',
}

document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos);
    llenarSelectAnio();
});

marca.addEventListener('change', e => {
    datoBusqueda.marca = e.target.value;
    filtrarAuto();
})

year.addEventListener('change', e => {
    datoBusqueda.year = e.target.value;
    filtrarAuto();
})

minimo.addEventListener('change', e => {
    datoBusqueda.minimo = e.target.value;
    filtrarAuto();
})
maximo.addEventListener('change', e => {
    datoBusqueda.maximo = e.target.value;
    filtrarAuto();
})
puertas.addEventListener('change', e => {
    datoBusqueda.puertas = e.target.value;
    filtrarAuto();
})
transmision.addEventListener('change', e => {
    datoBusqueda.transmision = e.target.value;
    filtrarAuto();
})
color.addEventListener('change', e => {
    datoBusqueda.color = e.target.value;
    filtrarAuto();
})

function mostrarAutos(autos) {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
    autos
    .sort((a, b) => {
        // Ordenar por año de forma descendente
        if (a.year !== b.year) {
            return b.year - a.year;
        }
        // Si los años son iguales, ordenar por precio ascendente
        return a.precio - b.precio;
        })
    .forEach(({ marca, modelo, year, puertas, transmision, precio, color }) => {
        const autoHTML = document.createElement('P');
        autoHTML.textContent = `
            ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmision: ${transmision} - Precio: ${precio} - Color: ${color} 
        `;
        resultado.appendChild(autoHTML);
    });
}

function llenarSelectAnio() {
    for(let i = maxYear; i > minYear; i--) {
        const opcion = document.createElement('OPTION');
        opcion.value = i;
        opcion.textContent= i;
        year.appendChild(opcion);
    }
}

function filtrarAuto() {
    const resultado = autos.filter(auto =>
        filtrarPorPropiedad(auto, 'marca', datoBusqueda.marca) &&
        filtrarPorPropiedad(auto, 'year', parseInt(datoBusqueda.year)) &&
        filtrarPorPropiedad(auto, 'precio', datoBusqueda.minimo) &&
        filtrarPorPropiedad(auto, 'precio', datoBusqueda.maximo) &&
        filtrarPorPropiedad(auto, 'puertas', datoBusqueda.puertas) &&
        filtrarPorPropiedad(auto, 'transmision', datoBusqueda.transmision) &&
        filtrarPorPropiedad(auto, 'color', datoBusqueda.color)
    );

    if(resultado.length){
        mostrarAutos(resultado);
    } else {
        const contenedor = document.querySelector('#resultado');
        while(contenedor.firstChild) {
            contenedor.removeChild(contenedor.firstChild);
        }
        const noResultado = document.createElement('div');
        noResultado.classList.add('alerta', 'error');
        noResultado.appendChild(document.createTextNode('No hay Resultados'));
        document.querySelector('#resultado').appendChild(noResultado);
    }
} 

function filtrarPorPropiedad(auto, propiedad, valor) {
    if (valor) {
        return auto[propiedad] === valor;
    }
    return auto;
}

// function filtrarMarca(auto) {
//     if(datoBusqueda.marca){
//         return auto.marca === datoBusqueda.marca;
//     } 
//     return auto;
// }
// function filtrarYear(auto) {
//     if(datoBusqueda.year){
//         return auto.year === parseInt(datoBusqueda.year);
//     }
//     return auto;
// }

// function filtrarMinimo(auto) {
//     if(datoBusqueda.minimo){
//         return auto.precio >= datoBusqueda.minimo;
//     }
//     return auto;
// }
// function filtrarMaximo(auto) {
//     if(datoBusqueda.maximo){
//         return auto.precio <= datoBusqueda.maximo;
//     }
//     return auto;
// }
// function filtrarPuertas(auto) {
//     if(datoBusqueda.puertas){
//         return auto.puertas === datoBusqueda.puertas;
//     }
//     return auto;
// }
// function filtrarTransmision(auto) {
//     if(datoBusqueda.transmision){
//         return auto.transmision === datoBusqueda.transmision;
//     } 
//     return auto;
// }
// function filtrarColor(auto){
//     if(datoBusqueda.color){
//         return auto.color === datoBusqueda.color;
//     } 
//     return  auto;
// }