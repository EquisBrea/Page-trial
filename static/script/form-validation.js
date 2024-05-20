const formRegister=document.getElementById("formContacto")
const inputNombre=document.getElementById("nombre");
const inputApellido=document.getElementById("apellido");
const inputEmail=document.getElementById("email");
const offeredeService=document.getElementById("offered-service");
const comments=document.getElementById("comentarios");
const terminos= document.getElementById("terms");
const errorName=document.getElementById("error-name");
const errorLastname=document.getElementById("error-lastname");
const errorEmail = document.getElementById("error-email");
const formError=document.getElementById("error-final");
const errorTerminos=document.getElementById("error-terms");

const errorTemplate ="Error - "
console.log("Hello World")

formRegister.addEventListener("submit" , e=>{
    e.preventDefault();
    let warning="";
    let valor=false;
    formError.innerHTML="";
    let regexEmail=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
    if(inputNombre.value.length<2){
       warning+=`El nombre es demasiado corto<br>`
       errorName.innerHTML = warning;
       valor=true;
       warning = "";
    }

    if(inputApellido.value.length<2){
        warning+=`El apellido es demasiado corto<br>`
        errorLastname.innerHTML = warning;
        valor=true;
        warning = "";
    }
    
    if(!regexEmail.test(inputEmail.value)){
        warning+=`El email no es valido<br>`
        valor=true;
        errorEmail.innerHTML = warning
        warning = "";
    }
    if(offeredeService.value=="default"){
        warning+=`Elija una opcion <br>`
        valor=true;
    }

    if (!terminos.checked) {
        warning+= `Debe aceptar nuestros términos y condiciones`;
        valor=true;
        errorTerminos.innerHTML = warning; 
        warning = ""
    }
    
    if(valor){
        formError.innerHTML= warning + `Revise los campos indicados`;
    }else{
        formError.innerHTML="Enviado";
        formRegister.reset();
    }
    })