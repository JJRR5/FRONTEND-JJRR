const container = document.querySelector(".container");
const result = document.querySelector("#resultado");
const form = document.querySelector("#formulario");

window.addEventListener('load',()=>{
    form.addEventListener('submit',buscarClima);
});

function buscarClima(e){
    e.preventDefault();

    //Validar
    const ciudad = document.querySelector("#ciudad").value;
    const pais = document.querySelector("#pais").value;
    if(pais==="" || ciudad===""){
        //Error
        printAlert("Ambos campos son obligatorios");
        return;
    }
    //Consultar API
    consultarAPI(ciudad,pais);
};

function consultarAPI(ciudad,pais){
    //Key que neceistamos para poder consultar la API
    const appID = "e9d94e73452048a5faad99c3542ef047";

    //Forma de hacerle un request a la API
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`;
    
    //Muestra el spinner 
    spinnner();
    
    fetch(url)
        .then(respuesta=>respuesta.json())
        .then(datos=>{
            //Limpiar el HTML previo
            limpiarHTML();
            if(datos.cod==="404"){
                printAlert("Ciudad no encontrada");
                return;
            }
            //Imprime la respuesta de la API
            mostrarClima(datos);
        })
        .catch(error=>{
            printAlert(error)
        })
};
//Destructuring doble desde una función
function mostrarClima({name,main:{temp,temp_max,temp_min}}){
    const celcius = centigrados(temp)
    const celciusMax = centigrados(temp_max)
    const celciusMin = centigrados(temp_min)

    const nombreCiudad = document.createElement("p");
    nombreCiudad.textContent = `Clima en: ${name}`;
    nombreCiudad.classList.add("text-2xl","font-bold");

    const tempActual = document.createElement("p");
    tempActual.innerHTML=`${celcius} &#8451;`;//entidad para grados celcius
    tempActual.classList.add("font-bold","text-6xl");

    const tempMax = document.createElement("p");
    tempMax.innerHTML=`Max:${celciusMax} &#8451;`;//entidad para grados celcius
    tempMax.classList.add("text-xl");

    const tempMin = document.createElement("p");
    tempMin.innerHTML=`Min:${celciusMin} &#8451;`;//entidad para grados celcius
    tempMin.classList.add("text-xl");


    const resultadoDiv = document.createElement("div");
    resultadoDiv.classList.add("text-center","text-white");
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(tempActual);
    resultadoDiv.appendChild(tempMax);
    resultadoDiv.appendChild(tempMin);

    result.appendChild(resultadoDiv);
};

////////////HELPERS////////////////////////
function centigrados(temperatura){
    return parseInt(temperatura-273.15);
};

function printAlert(mensaje){
    const error = document.querySelector(".error");
    if(!error){
        const alerta = document.createElement("div");
        alerta.classList.add("bg-red-100","border-red-400","text-red-700","px-4","py-3","rounded","max-w-md","mx-auto","mt-6","text-center");
        // alerta.textContent = mensaje;
        alerta.innerHTML= `
            <strong class="font-bold error">Error!</strong>
            <span class="block">${mensaje}</span>
        `;
        container.appendChild(alerta);

        setTimeout(()=>{
            alerta.remove()
        },3000);
    }
};

function limpiarHTML(){
    while(result.firstChild){
        result.removeChild(result.firstChild);
    }
};

function spinnner(){
    limpiarHTML();
    const divSpinner= document.createElement("div");
    divSpinner.classList.add("sk-fading-circle");

    divSpinner.innerHTML = `
    <div class="sk-circle1 sk-circle"></div>
    <div class="sk-circle2 sk-circle"></div>
    <div class="sk-circle3 sk-circle"></div>
    <div class="sk-circle4 sk-circle"></div>
    <div class="sk-circle5 sk-circle"></div>
    <div class="sk-circle6 sk-circle"></div>
    <div class="sk-circle7 sk-circle"></div>
    <div class="sk-circle8 sk-circle"></div>
    <div class="sk-circle9 sk-circle"></div>
    <div class="sk-circle10 sk-circle"></div>
    <div class="sk-circle11 sk-circle"></div>
    <div class="sk-circle12 sk-circle"></div>
    `;

    result.appendChild(divSpinner);
};
///////////////////////////////////
