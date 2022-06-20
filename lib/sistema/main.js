import { home } from "../sistema/home.js";
import { puntero } from "../sistema/Puntero.js";
import { persona } from "../sistema/Persona.js";
import { lista } from "../sistema/Lista.js";
import { movimiento } from "../sistema/movimiento.js";
import { comando } from "../sistema/comando.js";
import { dirigente } from "../sistema/dirigente.js";
import { logIn } from "../sistema/login.js";
import { api_get_usuario } from "../apis/apiUsers.js";
import { ListaVotantes } from "../sistema/ListaVotantes.js";


let view = {};
let model = {};

console.log("render");

logIn(view, model)


// singIn(model, view)

//home(view, model)
async function singIn(model, view) {

    model = {}

    //llamada a la api_get_usuario
    let usuario = await getAllUsuarios()

    let btnLog = document.getElementById('enterBtn');
    btnLog.addEventListener('click', (e) => {
        let email = document.getElementById('inpUsuario').value.trim();
        let password = document.getElementById('inpPassword').value.trim();

        let usuarioFiltrado = usuario.filter(user => user.email == email)
        //console.log(usuarioFiltrado[0].email);

        if (email == '' && password == '') {
            Swal.fire({
                icon: 'error',
                title: "Campos Vacios!",
                confirmButtonText: "OK",
                confirmButtonColor: "#6F8EAD",
            })
        } else {
            if (usuarioFiltrado.length > 0) {
                if (usuarioFiltrado[0].email == email && usuarioFiltrado[0].password == password) {
                    model.user = usuarioFiltrado[0].email
                    home(view, model);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: "Usuario o Contraseña Incorrecta",
                        confirmButtonText: "OK",
                        confirmButtonColor: "#6F8EAD",
                    })
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: "Usuario o Contraseña Incorrecta",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#6F8EAD",
                })
            }
        }
        //let userConfirmado = usuarioFiltrado[0].email; 
    })
}

async function getAllUsuarios() {
    let usuarios = await api_get_usuario();
    let { result } = usuarios
    return result
}

let btnLog = document.getElementById('enterBtn');
btnLog.addEventListener('click', (e) => {
    
    let rol = document.getElementById('dropdownMenuButton1');
    Swal.fire({
        title: 'Demo Elije Usuario?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Dirigente',
        denyButtonText: `Puntero`,

    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
        console.log('Dirigente');
            home(view, model);
            sessionStorage.setItem('rol', 'dirigente');
            
            let listaMovimientosBtn = document.getElementById('listaMovimientosBtn')
            listaMovimientosBtn.style.display = 'none';
            let ComandoBtn = document.getElementById('ComandoBtn')
            ComandoBtn.style.display = 'none';


        } else if (result.isDenied) {
      
            home(view, model);
            sessionStorage.setItem('rol', 'puntero');

            let listaMovimientosBtn = document.getElementById('listaMovimientosBtn')
            listaMovimientosBtn.style.display = 'none';
            let ComandoBtn = document.getElementById('ComandoBtn')
            ComandoBtn.style.display = 'none';
            let dirigenteBtn = document.getElementById('dirigenteBtn')
            dirigenteBtn.style.display = 'none';
            let punteroBtn = document.getElementById('punteroBtn')
            punteroBtn.style.display = 'none';



            console.log('puntero');
        }else  {
            console.log('cancelado');
            home(view, model);
            sessionStorage.setItem('rol', 'admin');
        }
        })


})

document.addEventListener('ready', event => {
    if (event.detail == 'listaPuntero') {
        puntero(view, model);

    } else if (event.detail == 'listaPersonas') {
        persona(view, model);

    } else if (event.detail == 'listaListaCorreli') {
        lista(view, model);

    } else if (event.detail == 'listaSistema') {


    } else if (event.detail == 'exit') {
        home(view, model);

    } else if (event.detail == 'listaMovimientos') {

        movimiento(view, model);
    } else if (event.detail == 'listaComando') {

        comando(view, model);
    } else if (event.detail == 'listaDirigente') {

        dirigente(view, model);
    }
    else if (event.detail == 'listaListaVotantes') {

        ListaVotantes(view, model);
    }
}) 