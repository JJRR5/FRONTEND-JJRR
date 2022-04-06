(function(){
    let DB;
    const listadoClientes = document.querySelector("#listado-clientes");
    document.addEventListener("DOMContentLoaded",()=>{
        crearDB();
        //Si se abre la base de datos significa que ya esta creada
        if(window.indexedDB.open("crm",1)){
            leerDatos();
        }
        listadoClientes.addEventListener("click",eliminarRegistro);
})
    function eliminarRegistro(e){
        //Preguntamos por la clase de eliminar que se agrega al crear los registros para saber que elemento eliminar
        if(e.target.classList.contains("eliminar")){
            //dataset accedemos a atributos personalizados en este caso data-cliente
            const idEliminar = Number(e.target.dataset.cliente);
            
            //confirm retorna true o false
            const confirmar = confirm("¿Estas seguro que quieries eliminar el cliente?");
            if(confirmar){
                const transaction = DB.transaction(["crm"],"readwrite");
                const objectStore = transaction.objectStore("crm");
                objectStore.delete(idEliminar);

                transaction.oncomplete = () => {
                    //Lo eliminamos del DOM
                    e.target.parentElement.parentElement.remove();
                    alert("Usuario eliminado correctamente");
                }

                transaction.onerror = () => {
                    
                }
            }
        }
        
    };
    //Crea la base de datos 
    function crearDB(){
        const crearDB = window.indexedDB.open("crm",1);

        crearDB.onerror = function(){
            console.log("Hubo un error");
        };
        crearDB.onsuccess = function(){
            DB = crearDB.result;
        }
        //Solo se ejecuta una vez
        crearDB.onupgradeneeded = function(e){
            const db = e.target.result;
            const objectStore = db.createObjectStore("crm",{keyPath:"id",autoincrement:true});

            objectStore.createIndex("nombre","nombre",{unique:false});
            objectStore.createIndex("email","email",{unique:true});
            objectStore.createIndex("telefono","telefono",{unique:false});
            objectStore.createIndex("empresa","empresa",{unique:false});
            objectStore.createIndex("id","id",{unique:true});

            console.log("db lista y creada");
        }
    };

    function leerDatos(){
        const abrirConex = window.indexedDB.open("crm",1);

        abrirConex.onerror = function(){
            console.log("Hubo un error");
        }
        abrirConex.onsuccess = function(){
            DB = abrirConex.result;
            const objectStore = DB.transaction("crm").objectStore("crm");

            objectStore.openCursor().onsuccess = function(e){
                const cursor = e.target.result;

                if(cursor){
                    const {nombre,empresa,email,telefono,id} = cursor.value;
                    
                    listadoClientes.innerHTML += ` <tr>
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${nombre} </p>
                        <p class="text-sm leading-10 text-gray-700"> ${email} </p>
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                        <p class="text-gray-700">${telefono}</p>
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
                        <p class="text-gray-600">${empresa}</p>
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                        <a href="editar-cliente.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
                        <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900 eliminar">Eliminar</a>
                    </td>
                </tr>`; // href="editar-cliente.html?id=${id}" ? query string => sirve para pasar variables en URl

                    cursor.continue();
                }else{
                    console.log("Sin registros");
                }
            }
        }
    }
})();