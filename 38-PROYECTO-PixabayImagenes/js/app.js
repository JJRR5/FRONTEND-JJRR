
const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario");
const paginacion = document.querySelector("#paginacion");

let iterador;
let paginaActual=1;

const registrosPorPagina = 40;
let totalPaginas;
window.onload=()=>{
    formulario.addEventListener('submit',validarFormulario)
}

function validarFormulario(e){
    e.preventDefault();
    const busqueda = document.querySelector("#termino").value;
    if(busqueda ===""){
        alerta("Agrega un término de busqueda");
        return;
    }
    buscarImagenes();
};

function alerta(mensaje){
    const error = document.querySelector(".error");
    if(!error){
        const alerta = document.createElement("p");
        alerta.classList.add("bg-red-100","border-red-400","text-red-700","px-4","py-3","rounded","max-w-lg","mx-auto","mt-6","text-center","error");
        alerta.innerHTML = `
            <strong class="font-bold">Error!!!!</strong>
            <span class="block sm:inline">${mensaje}</span>
        `;
        formulario.appendChild(alerta);
        setTimeout(()=>{
            alerta.remove();
        },3000);
    }
};

function buscarImagenes(){
    const busqueda = document.querySelector("#termino").value;
    const key="25446218-97dfc51801523a5f6ac7d9f4a";
    console.log(paginaActual);
    const url= `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page="${registrosPorPagina}&page=${paginaActual}";`
    fetch(url)
        .then(respuesta=>respuesta.json())
        .then(respuesta=>{
            totalPaginas = calcularPaginas(respuesta.totalHits)
            mostrarImagenes(respuesta.hits)
        });
};

function calcularPaginas(total){
    return parseInt(Math.ceil(total/registrosPorPagina));
};

function mostrarImagenes(imagenes){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
    //Iterar sobre el arreglo de imagenes
    imagenes.forEach(imagen=>{
        const {previewURL,likes,views,largeImageURL} =imagen

        resultado.innerHTML += `
        <div class="w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4">
            <div class="bg-white">
                <img class="w-full" src="${previewURL}">
                <div class="p-4 text-center">
                    <p class="font-bold"> ${likes} <span class="font-light">👍</span> </p>
                    <p class="font-bold"> ${views} <span class="font-light">Views</span> </p>
                    <a 
                    class="block w-full bg-blue-800 hover:bg-blue-500 text-white uppercase font-bold rounded mt-5 p-1"
                    target="_blank" rel="noopener noreferrer" href="${largeImageURL}"> Ver Imagen </a>
                </div>
            </div>
        </div>
        `
    });

    //Limpiar el paginador previo
    while(paginacion.firstChild){
        paginacion.removeChild(paginacion.firstChild);
    }
    //Generamos el nuevo paginador
    impirmirPaginador();
};

//Paginador dinamico
function impirmirPaginador(){
    iterador = crearPaginador(totalPaginas);
    while(true){
        const{value,done}=iterador.next();
        if(done) return;
        //Caso contraio, genera un botón por cada elemento en el generador
        const button = document.createElement("a");
        button.href = "#";
        button.dataset.pagina = value; //Número de paginas
        button.textContent = value;
        button.classList.add("siguiente","bg-yellow-400","px-4","py-1","mr-2","font-bold","mb-4","rounded")
        button.onclick = ()=>{
            console.log(value);
            paginaActual =value;
            buscarImagenes()
        }
        paginacion.appendChild(button);
    }
};

//Generador que va a registrar la cantidad de elementos dependiendo de las paginas 
function *crearPaginador(total){
    for (let i=1;i<=total;i++){
        yield i;
    }
};
