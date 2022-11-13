
// BLOQUE VARIABLES Y CONSTANTES

const formulario = document.querySelector('.formulario');
const informacion = [];
var contador = []; 
var cont_click=0;
const enviar = document.querySelector('#enviar');
const div_resultados = document.querySelector('.div-resultados');
const resultados = document.querySelector('#resultados');
const modal = document.querySelector('.modal');
const cerrar_modal = document.querySelector('.cerrar-modal');

// BLOQUE FUNCIONES

// Sweet alert de error
const mostrarAlertaError = (icono, titulo, mensaje) =>{
    Swal.fire({
        icon: icono,
        title: titulo,
        text: mensaje
    })
}

// Sweet alert correcto
const mostrarAlertaCorrecto = (icono, titulo) =>{
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    
    Toast.fire({
        icon: icono,
        title: titulo
    })
}

// Se utiliza para añadir los contadores en sus respectivos td
const mostrarResultado = (mensaje, td, div) =>{
    const celda = document.querySelector("."+td);
    const contenedor = document.querySelector("."+div);
    celda.innerHTML = "";
    contenedor.innerHTML = "";
    celda.innerHTML = mensaje;
    contenedor.innerHTML = mensaje;
}

// Muestra el modal y se añaden los resultados con la funcion anterior
const mensajeResultados = (e)=>{
    e.preventDefault();
    modal.classList.add('modal--show');
    
    mostrarResultado(contador[1],"td-personasmy","div-personasmy");

    for(var i = 0; i < 6; i++) {
        mostrarResultado(contador[0][i],"td-"+i,"div-"+i);
    }

    mostrarResultado(contador[2][0],"td-masculino","div-masculino");
    mostrarResultado(contador[2][1],"td-femenino","div-femenino");

    mostrarResultado(contador[3],"td-personaspv","div-personaspv");

    mostrarResultado(contador[4][0],"td-laplaya","div-laplaya");
    mostrarResultado(contador[4][1],"td-malambo","div-malambo");
    mostrarResultado(contador[4][2],"td-galapa","div-galapa");
    mostrarResultado(contador[4][3],"td-barranquilla","div-barranquilla");

}

// Cierra el modal
const cerrarModal = (e)=>{
    e.preventDefault();
    modal.classList.remove('modal--show');
}


// Funcion para almacenar los valores en cada uno de los contadores, retorna un contador general
const contadores = (datos) =>{

    var i, f;
    var cont_cursos = [0,0,0,0,0,0], mayor_e= 0, cont_sexo = [0,0], per_vul= 0, cont_ubi = [0,0,0,0];
    var matriz_contador = [];

    for(i=0; i<datos.length; i++){

        var valores = Object.values(datos[i]);

        for(f=0; f<8; f++){

            //Personas por curso
            if(f==2){
                if(valores[2]=="6"){
                    cont_cursos[0]+=1;
                }
                else if(valores[2]=="7"){
                    cont_cursos[1]+=1;
                }
                else if(valores[2]=="8"){
                    cont_cursos[2]+=1;
                }
                else if(valores[2]=="9"){
                    cont_cursos[3]+=1;
                }
                else if(valores[2]=="10"){
                    cont_cursos[4]+=1;
                }
                else{
                    cont_cursos[5]+=1;
                }
            }
            

            //Personas mayores de edad
            if(f==3){
                if(valores[3]>=18){
                    mayor_e+=1;
                }
            }
            

            //Personas por genero
            if(f==4){
                if(valores[4]=="Masculino"){
                    cont_sexo[0]+=1;
                }
                else{
                    cont_sexo[1]+=1;
                }
            }
            

            //Personas vulnerables
            if(f==6){
                if(valores[6]=="Si"){
                    per_vul+=1;
                }
            }
            

            //Personas por ubicación
            if(f==7){
                if(valores[7]=="La playa"){
                    cont_ubi[0]+=1;
                }
                else if(valores[7]=="Malambo"){
                    cont_ubi[1]+=1;
                }
                else if(valores[7]=="Barranquilla"){
                    cont_ubi[2]+=1;
                }
                else{
                    cont_ubi[3]+=1;
                }
            }
            

        }
    }

    matriz_contador = [cont_cursos, mayor_e, cont_sexo, per_vul, cont_ubi];

    return matriz_contador;

}

const validarFormulario = (e) =>{
    e.preventDefault();
    
    const nombres = document.querySelector('#nombres').value;
    const apellidos = document.querySelector('#apellidos').value;
    const curso = document.querySelector('#curso').value;
    const edad = document.querySelector('#edad').value;
    var sexo = document.querySelector('input[name="sexo"]:checked');
    if(sexo == null){
        sexo="";
    }
    else{
        sexo = sexo.value;
    }
    var e_civil = document.querySelector('input[name="e_civil"]:checked');
    if(e_civil == null){
        e_civil = "";
    }
    else{
        e_civil = e_civil.value;
    }

    var p_vulnerable = document.querySelector('input[name="p_vulnerable"]:checked');
    if(p_vulnerable == null){
        p_vulnerable = "";
    }
    else{
        p_vulnerable = p_vulnerable.value;
    }

    const ubicacion = document.querySelector('#ubicacion').value;

    if([nombres,apellidos,curso,edad,sexo,e_civil,p_vulnerable,ubicacion].includes("")){
        mostrarAlertaError("error","Error","Todos los campos son obligatorios");
        return;
    }

    //Pasó la validacón
    mostrarAlertaCorrecto("success","Datos guardados");
    cont_click+=1;

    // Se utiliza para mostrar el boton resultados despues de ingresar uhn valor en adelante
    if(cont_click>=1){
        div_resultados.style.display = 'block';
    }

    //Objeto literal
    const datos = {
        nombres,
        apellidos,
        curso,
        edad,
        sexo,
        e_civil,
        p_vulnerable,
        ubicacion
    }

    formulario.reset();
    informacion.push(datos);

    //Se le asigna a una matriz global lo que retorna la funcion
    contador = contadores(informacion);
}


//ESCUCHAR EVENTOS 

enviar.addEventListener("click", validarFormulario);

resultados.addEventListener("click", mensajeResultados);

// Evento boton "X"
cerrar_modal.addEventListener("click", cerrarModal);