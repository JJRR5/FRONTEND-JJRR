(function(){
    let DB;
    const formulario = document.querySelector("#formulario");
    document.addEventListener('DOMContentLoaded',()=>{
        //Contectarse a db
        conectarDB();
    });

    formulario.addEventListener('submit',validarCliente);

    function validarCliente(e){
        e.preventDefault();
        
        //Leer todos los inputs
        const nombre = document.querySelector("#nombre").value;
        const email = document.querySelector("#email").value;
        const telefono = document.querySelector("#telefono").value;
        const empresa = document.querySelector("#empresa").value;

        if(nombre === "" || email ==="" || telefono ===""|| empresa===""){
            imprimirAlerta("Todos los campos son obligatorios","error");
            return;
        }

        //Crear un objeto con la info con ObjectLiteralEndhandsmen
        const cliente = {
            nombre,
            email,
            telefono,
            empresa,
            id: Date.now()
        }

        crearCliente(cliente);
        
    }

    function crearCliente(cliente){
        //Seleccionamos nuestra DB y determinamos el permiso
        const transaction = DB.transaction(["crm"],"readwrite");
        const objectStore = transaction.objectStore("crm");

        objectStore.add(cliente);
        transaction.onerror= ()=>{
            imprimirAlerta("Hubo un error","error");
        }
        //oncomplete se usa cuando se logro la transacción
        transaction.oncomplete = ()=>{
            imprimirAlerta("Cliente agregado correctamente");
            setTimeout(()=>{
                //navegar entre paginas con js
                window.location.href = "index.html"
            },3000);
        }
    };
})();