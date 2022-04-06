import * as UI from "./interfaz.js"
import {API} from "./api.js"


UI.formulario.addEventListener('submit',buscarCancion);

function buscarCancion(e){
    e.preventDefault();

    //Obtener datos del formulario
    const artista = document.querySelector("#artista").value
    const cancion = document.querySelector("#cancion").value

    if(artista===""||cancion===""){
        UI.mensajes.textContent = ("Todos los campos son obligatorios");
        UI.mensajes.classList.add("error");

        setTimeout(()=>{
            UI.mensajes.textConent="";
            UI.mensajes.classList.remove("error");
        },3000);
        return;
    }
    //Consultar API
    const busqueda= new API(artista,cancion);
    busqueda.consultarAPI();
};
