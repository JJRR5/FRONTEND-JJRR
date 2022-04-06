//Constructores
function Seguro(marca,year,tipo){
    this.marca=marca;
    this.year=year;
    this.tipo=tipo;
}
//Realiza la cotización con los datos
Seguro.prototype.cotizarSeguro = function(){
    /*
        1 = Americano 1.15
        2 = Asiatico 1.05
        3 = Europeo 1.35
    */
    let cantidad;
    const base = 2000;
    switch(this.marca){
        case "1":
            cantidad = base*1.15;
        break;
        case "2":
            cantidad = base*1.05;
        break;
        case "3":
            cantidad = base*1.35;
        break;
        default:
        break;
    }
    //Leer el año
    const diferencia = new Date().getFullYear() - this.year;
    //Cada año que la diferencia es mayor la cantidad se reduce un 3% el valor del seguro
    cantidad -= ((diferencia*3)*cantidad)/100;
    // Si el seguro es basico se multiplica por un 30% mas 
    // Si el seguro es completo se multiplica por un 50% mas 
    if(this.tipo ==="basico"){
        cantidad *= 1.30;
    }else{
        cantidad *= 1.50;
    }
    return cantidad;
};

function UI(){

}
//Llena las opciones de los años
UI.prototype.llenarOpciones = ()=>{
    const max= new Date().getFullYear(), //2022
        min = max-20; //2002

    //Seleccionas el input con las opciones
    const selectYear = document.querySelector("#year");

    //Se generan las opciones usando un for
    for(let i = max;i>min;i--){
        let option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option); // se insertan las opciones
    }
}
//Muestra alertas en pantalla
UI.prototype.mostrarMensaje = (mensaje,tipo)=>{
    const div = document.createElement("div");

    if(tipo === "error"){
        div.classList.add("error");
    }else{
        div.classList.add("correcto");
    }

    div.classList.add("mensaje","mt-10");
    div.textContent = mensaje;

    //Insertar en el HTML
    const formulario = document.querySelector("#cotizar-seguro");
    formulario.insertBefore(div,document.querySelector("#resultado"));
    setTimeout(()=>{
        div.remove();
    },3000);
}

//Prototipe para mostrar el resultado en la interface
UI.prototype.mostrarResultado = (total,seguro)=>{
    const {marca,year,tipo} = seguro
    let textoMarca;
    switch(marca){
        case "1":
            textoMarca = "Americano";
            break;
        case "2":
            textoMarca = "Asiatico";
            break;
        case "3":
            textoMarca = "Europeo";
            break;
        default:
        break;
    }
    //Crear el resultado
    const div = document.createElement("div");
    div.classList.add("mt-10");

    div.innerHTML = ` 
        <p class = "header">Tu RESUMEN</p>
        <p class="font-bold">Marca: <span class="font-normal">  ${textoMarca}</p></span>
        <p class="font-bold">Año: <span class="font-normal">  ${year}</p></span>
        <p class="font-bold">Tipo: <span class="font-normal capitalize">  ${tipo}</p></span>
        <p class="font-bold">Total: <span class="font-normal"> $ ${total}</p></span>
    `
    const resultadoDiv = document.querySelector("#resultado");
    

    //Mostrar el spinner
    const spinner = document.querySelector("#cargando");
    spinner.style.display = "block";
    setTimeout(()=>{
        spinner.style.display="none"; //Se oculta el spinner
        resultadoDiv.appendChild(div); //Despúes se muestra el resultado
    },3000);
    
}

//Instancias UI
const ui = new UI();

//eventListeners
document.addEventListener("DOMContentLoaded",()=>{
    ui.llenarOpciones(); //Llena el select con los años 
});


eventListeners();
function eventListeners(){
    const formulario = document.querySelector("#cotizar-seguro");
    formulario.addEventListener('submit',cotizarSeguro);
};

function cotizarSeguro(e){
    e.preventDefault();
    //Leer marca seleccionada 
    const marca = document.querySelector("#marca").value;
    //Leer el año seleccionado
    const year = document.querySelector("#year").value;
    //Leer el tipo de cobertura
    const tipo = document.querySelector("input[name='tipo']:checked").value;
    
    if(marca ==="" || year === "" || tipo === ""){
        ui.mostrarMensaje("Faltan datos por completar","error");
        return; //detiene la función
    }
    ui.mostrarMensaje("Cotizando...","correcto");
    //Ocultar las cotizaciones previas
    const resultados = document.querySelector("#resultado div");
    if(resultados != null){
        resultados.remove();
    }
    //Instanciar el seguro
    const seguro = new Seguro(marca,year,tipo);
    const total = seguro.cotizarSeguro();
    //Utilizar el prototype que va a cotizar
    ui.mostrarResultado(total,seguro);
};