(function(){
    let DB;
    let idCliente;
    const nombreImput = document.querySelector("#nombre");
    const emailImput = document.querySelector("#email");
    const telefonoImput = document.querySelector("#telefono");
    const empresaImput = document.querySelector("#empresa");

    const formulario = document.querySelector("#formulario");


    document.addEventListener("DOMContentLoaded",()=>{
        conectarDB();

        //Actualiza el registro de la DB 
        formulario.addEventListener("submit",actualizarCliente);

        //Verificar el ID de la URL
        //Busca el parametro del query string de una URl => ?id=1643124959080
        const parametrosURL = new URLSearchParams(window.location.search);
        //Con get obtenemos el valor del parametro que estamos buscando
        idCliente = parametrosURL.get("id");
        //Si el ID existe llamo la función
        if(idCliente){
            //Se retarda 1s la función para que de tiempo a conectarse con la DB
            setTimeout(()=>{
                obtenerCliente(idCliente);
            },100);
        }
    });

    function actualizarCliente(e){
        e.preventDefault();
        if(nombreImput.value ==="" || email.value ==="" || telefono.value===""||empresa.value==""){
            imprimirAlerta("Todos los campos son obligatorios","error");
        }

        //Actualizar cliente
        const clienteActualizado = {
            nombre : nombreImput.value,
            email : emailImput.value,
            telefono : telefonoImput.value,
            empresa : empresaImput.value,
            id: Number(idCliente) //ID tiene que ser number
        }

        const transaction = DB.transaction(["crm"],"readwrite");
        const objectStore = transaction.objectStore("crm");

        objectStore.put(clienteActualizado);

        transaction.oncomplete = () =>{
            imprimirAlerta("Editado correctamente");
            setTimeout(()=>{
                window.location.href = "index.html";
            },3000);
        }

        transaction.onerror = ()=>{
            imprimirAlerta("Hubo un error","error");
            
        }
    };

    function obtenerCliente(id){
        //Se conecta a la DB en modo lecutra
        const transaction = DB.transaction(["crm"],"readonly");
        //Crea el object store
        const objectStore = transaction.objectStore("crm");
        //Abre el cursor
        const cliente = objectStore.openCursor();
        //se pasa el evento onsuccess al cursor y se iguala a una función donde se trae todos los datos de la busqueda 
        cliente.onsuccess = function(e){
            const cursor = e.target.result;

            if(cursor){
                //Si un ID de toda la busqueda corresponde al ID de la URL se trae todos los datos
                if(cursor.value.id === Number(id)){
                    //Se pasa todo el objeto seleccionado a una función
                    llenarFormulario(cursor.value);
                }
                cursor.continue();
            }
        }
    };
    
    function llenarFormulario(datosCliente){
        const {nombre,email,telefono,empresa} = datosCliente;

        nombreImput.value = nombre;
        emailImput.value = email;
        telefonoImput.value = telefono;
        empresaImput.value =empresa;
    }

    function conectarDB(){
        //Se conecta a la DB 
        const abrirConexion = window.indexedDB.open("crm",1)

        abrirConexion.onerror = function(){
            console.log("Hubo un error");
        }

        abrirConexion.onsuccess = function(){
            DB = abrirConexion.result;

        }
    };




})();