const form = document.querySelector("#formulario");
const criptcoins = document.querySelector("#criptomonedas");
const monedaSelect = document.querySelector("#moneda");
const result = document.querySelector(".resultado");

const objBusqueda = {
    moneda:"",
    criptomoneda:""
}

//Crear un promise
const obtenerCripto = criptomonedas => new Promise(resolve=>{
    resolve(criptomonedas);
});

window.onload=()=>{
    consultarCripto();
    form.addEventListener('submit',validateForm);
    criptcoins.addEventListener("change",leerValor);
    monedaSelect.addEventListener("change",leerValor);

};


function consultarCripto(){
    const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"
    fetch(url)
        .then(respuesta=>respuesta.json())
        .then(resultado=>obtenerCripto(resultado.Data))
        .then(criptomonedas=>selectCripto(criptomonedas))
}
function selectCripto(criptomonedas){
    criptomonedas.forEach(cripto=>{
        const {FullName,Name}=cripto.CoinInfo;
        const option = document.createElement("option");
        option.value = Name;
        option.textContent= FullName;
        criptcoins.appendChild(option);
    })
};

function leerValor(e){
    //Obtienes el 
    objBusqueda[e.target.name] = e.target.value;

};
function validateForm(e){
    e.preventDefault();
    //validar
    const {moneda,criptomoneda} = objBusqueda
    if(moneda===""||criptomoneda===""){
        mostrarAlerta("Ambos campos son obligatorios");
        return;
    }
    //Consultar la API con los resultados
    consultarAPI();
};

function consultarAPI(){
    limpiarHTML();
    const {moneda,criptomoneda} = objBusqueda
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

    spinner();

    fetch(url)
        .then(respuesta=>respuesta.json())
        .then(cotizacion=>mostrarHTML(cotizacion.DISPLAY[criptomoneda][moneda]))
};
function mostrarHTML(cotizacion){
    const {PRICE,HIGHDAY,LOWDAY,CHANGEPCT24HOUR,LASTUPDATE} = cotizacion

    const precio = document.createElement("p");
    precio.classList.add("precio");
    precio.innerHTML = `El precio es: <span>${PRICE}</span>`;

    const precioAlto = document.createElement("p");
    precioAlto.innerHTML = `<p> Precio más alto del día <span>${HIGHDAY}</span>`;

    const precioBajo = document.createElement("p");
    precioBajo.innerHTML = `<p> Precio más bajo del día <span>${LOWDAY}}</span>`;

    const precioCambio = document.createElement("p");
    precioCambio.innerHTML = `<p> Variación últimas 24 horas <span>${CHANGEPCT24HOUR}%</span>`;

    const actualizacion = document.createElement("p");
    actualizacion.innerHTML = `<p> Última actualización <span>${LASTUPDATE}</span>`;

    result.appendChild(precio);
    result.appendChild(precioAlto);
    result.appendChild(precioBajo);
    result.appendChild(precioCambio);
    result.appendChild(actualizacion);
}

function limpiarHTML(){
    while(result.firstChild){
        result.removeChild(result.firstChild);
    }
};

function mostrarAlerta(msj){
    const error = document.querySelector(".error");
    if(!error){
        const divMsj = document.createElement("div");
        divMsj.classList.add("error");
        divMsj.textContent =msj;
        form.appendChild(divMsj);
        setTimeout(()=>{
            divMsj.remove();
        },3000);
    }
};

function spinner(){
    limpiarHTML();

    const spinner = document.createElement("div");
    spinner.classList.add("spinner");

    spinner.innerHTML = `
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>`;

    result.appendChild(spinner);
}