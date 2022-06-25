import { home } from "../sistema/home.js";
import { puntero } from "../sistema/Puntero.js";
import { persona } from "../sistema/Persona.js";
import { lista } from "../sistema/Lista.js";
import { movimiento } from "../sistema/movimiento.js";
import { comando } from "../sistema/comando.js";
import { dirigente } from "../sistema/dirigente.js";
import { logIn } from "../sistema/login.js";
import { Sistema } from "../sistema/sistema.js";
import { ListaVotantes } from "../sistema/ListaVotantes.js";
import { api_get_usuario_forCi } from "../apis/apiUsers.js";

let view = {};
let model = {};

console.log("render");



//ogIn(view, model)
//await singIn()


home(view, model)

async function singIn(model, view) {
    model = {}
    let btnLog = document.getElementById('enterBtn2');
    btnLog.addEventListener('click', async (e) => {
        //llamada a la api_get_usuario
        let email = document.getElementById('inpUsuario').value.trim();
        let password = document.getElementById('inpPassword').value.trim();
        let usuario2 = await getUsuarioForCi(email, password);
        if (usuario2 == null || usuario2 == undefined) {
            Swal.fire({
                icon: 'error',
                title: "Usuario o Contraseña Incorrecta",
                confirmButtonText: "OK",
                confirmButtonColor: "#6F8EAD",
            })
        } else {

            let usuarioFiltrado = usuario2.filter(user => user.ci == email)
            if (email == '' && password == '') {
                Swal.fire({
                    icon: 'error',
                    title: "Campos Vacios!",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#6F8EAD",
                })
            } else {
                if (usuarioFiltrado.length > 0) {
                    if (usuarioFiltrado[0].ci == email && usuarioFiltrado[0].pass == password) {
                        let rol = usuarioFiltrado[0].nivel
                        if (rol === 'dirigente') {

                            console.log('Dirigente');

                            localStorage.setItem("rol", rol);
                            localStorage.setItem("user", usuarioFiltrado[0].nombre)

                            home(view, model);

                            let dirigenteBtn = document.getElementById("dirigenteBtn");
                            dirigenteBtn.style.display = "none";

                            let listaMovimientosBtn = document.getElementById('listaMovimientosBtn')
                            listaMovimientosBtn.style.display = 'none';

                            let ComandoBtn = document.getElementById('ComandoBtn')
                            ComandoBtn.style.display = 'none';

                            let insertarTipoNivel = document.getElementById('insertarTipoNivel');
                            insertarTipoNivel.textContent = rol

                        } else if (rol === 'puntero') {

                            console.log('Dirigente');
                            localStorage.setItem("user", usuarioFiltrado[0].nombre)
                            sessionStorage.setItem('rol', 'puntero');

                            home(view, model);

                            let listaMovimientosBtn = document.getElementById('listaMovimientosBtn')
                            listaMovimientosBtn.style.display = 'none';

                            let ComandoBtn = document.getElementById('ComandoBtn')
                            ComandoBtn.style.display = 'none';

                            let dirigenteBtn = document.getElementById('dirigenteBtn')
                            dirigenteBtn.style.display = 'none';

                            let punteroBtn = document.getElementById('punteroBtn')
                            punteroBtn.style.display = 'none';

                            let insertarTipoNivel = document.getElementById('insertarTipoNivel');
                            insertarTipoNivel.textContent = rol

                        } else {


                            localStorage.setItem('rol', 'admin');

                            localStorage.setItem("user", usuarioFiltrado[0].nombre)
                            home(view, model);

                            let SistemaBtn = document.getElementById('SistemaBtn')
                            SistemaBtn.style.visibility = 'visible';

                            let insertarTipoNivel = document.getElementById('insertarTipoNivel');
                            insertarTipoNivel.textContent = rol
                        }
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
        }
    })
}

async function getUsuarioForCi(ci, pass) {
    let usuario = await api_get_usuario_forCi(ci, pass);

    if (usuario.message == 'ok') {
        let { result } = usuario
        return result
    } else {
        swal.fire({
            icon: 'error',
            title: "Usuario o Contraseña incorrecto",
        });
    }
}

document.addEventListener('ready', event => {
    if (event.detail == 'listaPuntero') {

        puntero(view, model);
    } else if (event.detail == 'listaPersonas') {

        persona(view, model);
    } else if (event.detail == 'listaListaCorreli') {

        lista(view, model);
    } else if (event.detail == 'listaSistema') {

        Sistema(view, model);
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