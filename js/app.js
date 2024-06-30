//MOCKUP DB CONNECTION is directly available
//console.log(autos)

//SELECTORS
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

//CREATING THE HTML OPTION ELEMENT DEPENDING OF THE CONTENT OF THE DB
const years = document.createElement('option');
const max = new Date().getFullYear();
// const min = max - 10;
//CODE TO GET THE MINIMUM YEAR IN THE AUTOS ARRAY
let minYear = Math.min(...autos.map(auto => auto.year));
const min = minYear;
//CODE TO CREATE THE OPTIONS IN THE YEAR SELECTOR
for(let i = max; i >  min; i--) {
    const option =  document.createElement('option');
    option.value = i;
    option.innerText = i;
    document.querySelector('#year').appendChild(option);
}

//FILL DATA FOR OPTIONS SELECTION === THE MANUFACTURER OF THE CARS
//Creating new array with unique values
const uniqueMarcas = [...new Set(autos.map(auto => auto.marca))];
// console.log(uniqueMarcas);
for(let marca of uniqueMarcas){
    const option = document.createElement('option');
    option.value = marca;
    option.innerText = marca;
    document.querySelector('#marca').appendChild(option);
}

// Datos para la busqueda
const datosBusqueda = {
    marca : '',
    year: '',
    minimo : '',
    maximo: '',
    puertas: '',
    transmision:'',
    color:''
}

//EVENT LISTENERS
document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos);
});

// Event Listeners para el formulario
marca.addEventListener('input', e => {
    datosBusqueda.marca = e.target.value;

    // Mandar llamar la función de filtrar Autos
    filtrarAuto();
});

year.addEventListener('input', e => {
    //PARSES THE VALUE OF THE SELECTOR INTO A NUMBER
    datosBusqueda.year = Number(e.target.value);
    // Mandar llamar la función de filtrar Autos
    filtrarAuto();
});

minimo.addEventListener('input', e => {
    datosBusqueda.minimo = Number(e.target.value);
    // Mandar llamar la función de filtrar Autos
    filtrarAuto();
});


maximo.addEventListener('input', e => {
    datosBusqueda.maximo = Number(e.target.value);
    // Mandar llamar la función de filtrar Autos
    filtrarAuto();
});


puertas.addEventListener('input', e => {
    datosBusqueda.puertas = Number(e.target.value);
    // Mandar llamar la función de filtrar Autos
    filtrarAuto();
});

transmision.addEventListener('input', e => {
    datosBusqueda.transmision = e.target.value
    // Mandar llamar la función de filtrar Autos
    filtrarAuto();
});

color.addEventListener('input', e => {
    datosBusqueda.color = e.target.value
    // Mandar llamar la función de filtrar Autos
    filtrarAuto();
});

//FUNCTIONS
function limpiarHTML() {
    // Leer el elemento Resultado
    const contenedor = document.querySelector('#resultado');

    // limpiar los resultados anteriores
    while(contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }
}

//SHOW RESULTS FUNCTION - its parameter is thre result of the filter
function mostrarAutos(autos){
    //CLEARS THE RESULT CONTAINER FROM PREVIOUS RESULTS
    limpiarHTML();

    //RESULT CONTAINER
    const contenedor = document.querySelector('#resultado');

    //tests
    // autos.forEach(auto => {
        // const {marca, modelo, year, puertas, transmision, color} = auto;
        // console.log(auto); //retuns all keys:values in one object
        // console.log(marca, modelo, year, puertas, transmision, color); //returns values
        // console.log({marca}, {modelo}, {year}, {puertas}, {transmision}, {color}); //retuns objects=keys:values
    // });
    //tests end

    //DYNAMIC CONSTRUCTION OF HTML FOR RESULT HEADERS
    autos.forEach(auto => {
        const autoHTML = document.createElement('p');
        autoHTML.innerHTML = `
            <p>${auto.marca} ${auto.modelo} - ${auto.year} - ${auto.puertas} Puertas - Transmisión: ${auto.transmision} - Precio: ${auto.precio} - Color: ${auto.color}</p>
        `;
        contenedor.appendChild(autoHTML);
    })
}


//NO RESULTS FUNCTION
function noResultado() {
    limpiarHTML();

    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.appendChild(document.createTextNode('No hay Resultados'));
    document.querySelector('#resultado').appendChild(noResultado);
}

function filtrarAuto() {
   const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);

//    console.log(resultado);
   if(resultado.length){
        mostrarAutos(resultado);
   } else {
       noResultado();
   }
}

// Aplica los filtros
function filtrarMarca(auto) {
    if(datosBusqueda.marca){
        return auto.marca === datosBusqueda.marca;
    } 
    return auto;
}
function filtrarYear(auto) {
    // const {year} = datosBusqueda;
    if(datosBusqueda.year){
        return auto.year === datosBusqueda.year;
    }
    return auto;
}

function filtrarMinimo(auto) {
    if(datosBusqueda.minimo){
        return auto.precio >= datosBusqueda.minimo;
    }
    return auto;
}
function filtrarMaximo(auto) {
    if(datosBusqueda.maximo){
        return auto.precio <= datosBusqueda.maximo;
    }
    return auto;
}
function filtrarPuertas(auto) {
    if(datosBusqueda.puertas){
        return auto.puertas === datosBusqueda.puertas;
    }
    return auto;
}

function filtrarTransmision(auto) {
    if(datosBusqueda.transmision){
        return auto.transmision === datosBusqueda.transmision;
    } 
    return auto;
}

function filtrarColor(auto){
    if(datosBusqueda.color){
        return auto.color === datosBusqueda.color;
    } 
    return  auto;
}


