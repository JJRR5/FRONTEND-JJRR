import * as UI from "./interfaz.js"

export class API{
    constructor(artista,cancion){
        this.artista = artista;
        this.cancion = cancion;
    }
    consultarAPI(){
        const url = `https://api.lyrics.ovh/v1/${this.artista}/${this.cancion}`

        fetch(url)
            .then(respuesta=>respuesta.json())
            .then(letra=>{
                if(letra.lyrics){
                    const {lyrics}=letra;
                    UI.resultado.textContent = lyrics;
                    UI.heading.textContent = `Song: ${this.cancion} Artist: ${this.artista}`
                }else{
                    UI.mensajes.textContent = "Music unavailable";
                    UI.mensajes.classList.add("error");
                    setTimeout(()=>{
                        UI.mensajes.textContent = "";
                        UI.mensajes.classList.remove("error");
                    },3000);
                }
            })
            .catch(error=>console.log(error))
    }
}
