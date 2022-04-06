//Form fields
const mascotaInput = document.querySelector("#mascota");
const propietarioInput = document.querySelector("#propietario");
const telefonoInput = document.querySelector("#telefono");
const fechaInput = document.querySelector("#fecha");
const horaInput = document.querySelector("#hora");
const sintomasInput = document.querySelector("#sintomas");

let edit;

//UI
const formulario = document.querySelector("#nueva-cita");
const contenedorCitas = document.querySelector("#citas");

//Classes
class Citas{
    constructor(){
        this.citas = [];
    }
    addCita(cita){
        //creates a copy of the citas array and add the object cita 
        this.citas = [...this.citas,cita];
    }


    deleteCita(id){
        this.citas = this.citas.filter(cita=> cita.id !== id);
    }

    editQuote(citaNew){
        
        this.citas = this.citas.map(cita => cita.id === citaNew.id ? citaNew : cita)
    }
}
class UI{
    printingAlert(message,type){
        //Create the div
        const divMessage = document.createElement("div");
        divMessage.classList.add("text-center","alert","d-block","col-12");

        //Add a class depending on the type
        if(type==="error"){
            divMessage.classList.add("alert-danger");
        }else{
            divMessage.classList.add("alert-success");
        }

        divMessage.textContent = message; 
        //Adding into the DOM
        document.querySelector("#contenido").insertBefore(divMessage,document.querySelector(".agregar-cita"));
        setTimeout(()=>{
            divMessage.remove();
        },3000);
    }

    //we add {} to destructur the object 
    printingQuote({citas}){
        this.cleanHTML();
        citas.forEach(cita=>{
            const {mascota,propietario,telefono,fecha,hora,sintomas,id} = cita;
            const divCita = document.createElement("div");
            divCita.classList.add("cita", "p-3");
            divCita.dataset.id = id;

            //Scripting
            const mascotaP = document.createElement("h2");
            mascotaP.classList.add("card-title","font-weight-bolder");
            mascotaP.textContent = mascota;

            const propietarioP = document.createElement("p");
            propietarioP.innerHTML = `
                <span class="font-weight-bolder">Propietario: </span> ${propietario}
            `;

            const telefonoP = document.createElement("p");
            telefonoP.innerHTML = `
                <span class="font-weight-bolder">Telefóno: </span> ${telefono}
            `;

            const fechaP = document.createElement("p");
            fechaP.innerHTML = `
                <span class="font-weight-bolder">Fecha: </span> ${fecha}
            `;

            const horaP = document.createElement("p");
            horaP.innerHTML = `
                <span class="font-weight-bolder">Hora: </span> ${hora}
            `;

            const sintomasP = document.createElement("p");
            sintomasP.innerHTML = `
                <span class="font-weight-bolder">Sintomas: </span> ${sintomas}
            `;

            //Delte Button
            const btnDelete = document.createElement("button");
            btnDelete.classList.add("btn","btn-danger","mr-2");
            btnDelete.innerHTML='Eliminar X';
            //Edit Button
            const btnEdit = document.createElement("button");
            btnEdit.classList.add("btn","btn-info");
            btnEdit.innerHTML = "Editar";


            btnDelete.onclick = () => deleteQuote(id);

            btnEdit.onclick = () => editQuote(cita);

            //Adding the h2 into divCita
            divCita.appendChild(mascotaP);
            divCita.appendChild(propietarioP);
            divCita.appendChild(telefonoP);
            divCita.appendChild(fechaP);
            divCita.appendChild(horaP);
            divCita.appendChild(sintomasP);
            divCita.appendChild(btnDelete);
            divCita.appendChild(btnEdit);
            //Adding the quotes into HTML
            contenedorCitas.appendChild(divCita);
        })
    }
    cleanHTML(){
        while(contenedorCitas.firstChild){
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
    };
}
//instantiate
const administrarCitas = new Citas();
const ui = new UI();


//Events
eventListeners();
function eventListeners(){
    mascotaInput.addEventListener('input',datosCita);
    propietarioInput.addEventListener('input',datosCita);
    telefonoInput.addEventListener('input',datosCita);
    fechaInput.addEventListener('input',datosCita);
    horaInput.addEventListener('input',datosCita);
    sintomasInput.addEventListener('input',datosCita);

    formulario.addEventListener('submit',nuevaCita);
};


//Object with the info
const citaObj ={
    mascota:"",
    propietario:"",
    telefono:"",
    fecha:"",
    hora:"",
    sintomas:""
}

//Adding data to the citaObj
function datosCita(e){
    // e.target.name = HTML with an attribute called name
    citaObj[e.target.name] = e.target.value;
};

//Valid the inputs of the form and add a new quote
function nuevaCita(e){
    e.preventDefault(); //Prevents the submit aciton
    
    // Destructuring the citaObj object
    const {mascota,propietario,telefono,fecha,hora,sintomas} = citaObj;
    //validate
    if(mascota ==="" || propietario ==="" || telefono ==="" || fecha ==="" || hora ==="" || sintomas ===""){
        ui.printingAlert("Todos los campos son obligatorios","error");
        return;
    }
    if(edit){
        ui.printingAlert("Editado correctamente");

        //Edit the object with the new info
        administrarCitas.editQuote({...citaObj});

        //Returning the text Button
        formulario.querySelector("button[type='submit']").textContent = "Crear Cita";

        //Edition mode = false
        edit = false;
    }else{
        //Generate an ID for each quote
        citaObj.id = Date.now();

        //Creating a new quote passing a copy of the original object
        administrarCitas.addCita({...citaObj});

        //Added correctly
        ui.printingAlert("Se agrego correctamente");
    }

    //Restarting the obj
    restartObj();

    //Restarting the form
    formulario.reset();

    //Show the HTML
    ui.printingQuote(administrarCitas);

};

//Restarting the object
function restartObj(){
    citaObj.mascota = "";
    citaObj.propietario = "";
    citaObj.telefono = "";
    citaObj.fecha = "";
    citaObj.hora = "";
    citaObj.sintomas = "";
};

function deleteQuote(id){
    // Delete the quote
    administrarCitas.deleteCita(id);
    // Shows a message
    ui.printingAlert("Cita eliminada correctamente");
    // Reload the quotes
    ui.printingQuote(administrarCitas);
}

//Load the data and the edition mode
function editQuote(cita){
    const {mascota,propietario,telefono,fecha,hora,sintomas,id} = cita;

    //Fill the inputs 
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    //Filling the object 
    citaObj.mascota =mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora =hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id

    //Change the text button
    formulario.querySelector("button[type='submit']").textContent = "Guardar Cambios";
    edit = true;
};