//Variables y selectores
const formulario = document.querySelector("#agregar-gasto");
const gastoListado = document.querySelector("#gastos ul");




//Eventos
eventListeners();
function eventListeners(){
    document.addEventListener('DOMContentLoaded',preguntarPresupuesto);
    formulario.addEventListener("submit",agregarGasto);
};



//Clases
class Presupuesto{
    constructor (presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }

    //Methods
    nuevoGasto(gasto){
        this.gastos = [...this.gastos,gasto];
        this.calcularRestante();
        
    }

    calcularRestante(){
        const gastado = this.gastos.reduce((total,gasto)=>total +gasto.cantidad,0); //pasamos el arreglo gastos e itera sobre todos los elementos de gasto.cantidad y se lo suma a total, e iniciamos el array en la posicion 0
        this.restante = this.presupuesto - gastado;
    }
    eliminarGasto(id){
        this.gastos = this.gastos.filter(gasto=>gasto.id !==id);
        this.calcularRestante();
    }
}
class UI{
    insertarPresupuesto(cantidad){
        //Destructuring al objeto
        const {presupuesto,restante} = cantidad;
        //Creando HTML
        document.querySelector("#total").textContent=presupuesto;
        document.querySelector("#restante").textContent=restante;

    }

    imprimirAlerta(mensaje,tipo){
        //crear el div
        const divMensaje = document.createElement("div");
        divMensaje.classList.add("text-center","alert");
        if(tipo === "error"){
            divMensaje.classList.add("alert-danger");
        }else{
            divMensaje.classList.add("alert-success");
        }
        //Mensaje de error
        divMensaje.textContent = mensaje;

        //Insertar en el HTML
        document.querySelector(".primario").insertBefore(divMensaje,formulario);
        //Eliminar el HTML
        setTimeout(()=>{
            divMensaje.remove();
        },3000);
    }

    agregarGastoListado(gastos){
        this.limpiarHTML(); //Elimina el HTML previo
        gastos.forEach(gasto=>{
            const {cantidad,nombre,id}=gasto;

            //Crear un LI
            const nuevoGasto = document.createElement("li");
            nuevoGasto.className = "list-group-item d-flex justify-content-between align-items-center";
            nuevoGasto.dataset.id = id;

            //Agregar el HTML del gasto
            nuevoGasto.innerHTML = `${nombre} <span class="badge badge-primary badge-pill">$ ${cantidad} </span>`;

            //Botón para borrar el gasto
            const btnBorrar = document.createElement("button");
            btnBorrar.className = "btn btn-danger borrar-gasto";
            btnBorrar.textContent = "X";
            btnBorrar.onclick = ()=>{
                eliminarGasto(id);
            }
            nuevoGasto.appendChild(btnBorrar);

            //Agregar al HTML
            gastoListado.appendChild(nuevoGasto);
        })
    }
    limpiarHTML(){
        while(gastoListado.firstChild){
            gastoListado.removeChild(gastoListado.firstChild);
        }
    }
    actualizarRestante(restante){
        document.querySelector("#restante").textContent=restante;
    }
    comprobarPresupuesto(presupuestoOBJ){
        const {presupuesto,restante} = presupuestoOBJ;
        const restanteDiv = document.querySelector(".restante");
        //Comprobar 75%
        if((presupuesto / 4) > restante){
            restanteDiv.classList.remove("alert-success","alert-warning");
            restanteDiv.classList.add("alert-danger");
        }else if((presupuesto / 2) > restante){
            restanteDiv.classList.remove("alert-success");
            restanteDiv.classList.add("alert-warning");
        }
        else{
            restanteDiv.classList.remove("alert-danger","alert-warning");
            restanteDiv.className="alert-success";
        }
        //Si el total es 0 o menor  
        if(restante <= 0){
            ui.imprimirAlerta("El presupuesto se ha agotado","error");
            formulario.querySelector("button[type='submit']").disabled = true;
            return;
        }
    }
}
//Instanciar
const ui = new UI();
let presupuesto;

//Funciones
function preguntarPresupuesto(){
    const presupuestoUsuario = prompt("Cual es tu presupuesto");
    if(presupuestoUsuario === "" || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <=0){
        window.location.reload(); //Se recarga el objeto window
    }

    //Presupuesto valido
    presupuesto = new Presupuesto(presupuestoUsuario);
    ui.insertarPresupuesto(presupuesto);//todo el objeto
    
};

//Añade gastos
function agregarGasto(e){
    e.preventDefault();

    //Leer datos del formulario
    const nombre = document.querySelector("#gasto").value;
    const cantidad = Number(document.querySelector("#cantidad").value);

    //Validar
    if(nombre===""||cantidad===""){
        ui.imprimirAlerta("Ambos campos son obligatorios","error");
        return;
    }else if(cantidad<=0||isNaN(cantidad)){
        ui.imprimirAlerta("Cantidad invalida","error");
        return;
    }
    //Genrar un objeto con el gasto
    const gasto = {nombre,cantidad,id:Date.now()};
    presupuesto.nuevoGasto(gasto);

    //Mensaje OK
    ui.imprimirAlerta("Gasto agregado correctamente");

    //Imprimir los gastos
    const {gastos,restante}=presupuesto;
    ui.agregarGastoListado(gastos);

    ui.actualizarRestante(restante);

    ui.comprobarPresupuesto(presupuesto);
    //Reinicia el formulario
    formulario.reset();

};

function eliminarGasto(id){
    //Los elimina del objeto
    presupuesto.eliminarGasto(id);
    //Elimina los gastos del HTML
    const {gastos,restante} = presupuesto;
    ui.agregarGastoListado(gastos);
    ui.actualizarRestante(restante);
    ui.comprobarPresupuesto(presupuesto);
};