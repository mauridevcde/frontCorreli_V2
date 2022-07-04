import { home } from "../sistema/home.js";
import { spinnerRender } from "../others/utils.js";
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
import { api_get_PunteroAll } from "../apis/apiPuntero.js";

import { api_get_grupoByPuntero, api_get_grupoByDirigentes, api_get_all_id_grupo } from "../apis/apiListas.js";

import { api_get_DirigenteAll } from "../apis/apiDirigente.js"

let view = {};
let model = {};

console.log("render");


if (localStorage.length > 0) {
    if (localStorage.getItem('rol') == 'puntero') {

        home(view, model);
        let listaMovimientosBtn = document.getElementById('listaMovimientosBtn')
        listaMovimientosBtn.style.display = 'none';

        let ComandoBtn = document.getElementById('ComandoBtn')
        ComandoBtn.style.display = 'none';

        let dirigenteBtn = document.getElementById('dirigenteBtn')
        dirigenteBtn.style.display = 'none';

        let punteroBtn = document.getElementById('punteroBtn')
        punteroBtn.style.display = 'none';

        let listaBtn = document.getElementById('listaBtn')
        listaBtn.style.display = 'none';

        let SistemaBtn = document.getElementById('SistemaBtn')
        SistemaBtn.style.display = 'none';

        let insertarTipoNivel = document.getElementById('insertarTipoNivel');
        insertarTipoNivel.textContent = 'puntero'

    } else if (localStorage.getItem('rol') == 'dirigente') {

        home(view, model);
        let dirigenteBtn = document.getElementById("dirigenteBtn");
        dirigenteBtn.style.display = "none";

        let listaMovimientosBtn = document.getElementById('listaMovimientosBtn')
        listaMovimientosBtn.style.display = 'none';

        let ComandoBtn = document.getElementById('ComandoBtn')
        ComandoBtn.style.display = 'none';

        let SistemaBtn = document.getElementById('SistemaBtn')
        SistemaBtn.style.display = 'none';

        let insertarTipoNivel = document.getElementById('insertarTipoNivel');
        insertarTipoNivel.textContent = 'dirigente'

    } else {

        home(view, model);

        let SistemaBtn = document.getElementById('SistemaBtn')
        SistemaBtn.style.display = 'grid';

        let insertarTipoNivel = document.getElementById('insertarTipoNivel');
        insertarTipoNivel.textContent = 'admin'
    }

} else {
    localStorage.clear();
    logIn(view, model)
    await singIn()
}




//home(view, model)

async function singIn(model, view) {
    model = {}
    let btnLog = document.getElementById('enterBtn2');
    btnLog.addEventListener('click', async (e) => {
        spinnerRender()
        //llamada a la api_get_usuario
        let email = document.getElementById('inpUsuario').value.trim();
        let password = document.getElementById('inpPassword').value.trim();


        let usuario2 = await getUsuarioForCi(email, password); //inicio de sesion

        //all dirigente
        if (usuario2 == null || usuario2 == undefined) {
            console.log('mensaje 4')
            Swal.fire({
                icon: 'error',
                title: "Usuario o Contraseña Incorrecta 1",
                confirmButtonText: "OK",
                confirmButtonColor: "#6F8EAD",
            })
        } else {

            let usuarioFiltrado = usuario2.filter(user => user.ci == email)

            if (email == '' && password == '') {
                console.log('mensaje 1')
                Swal.fire({
                    icon: 'error',
                    title: "Campos Vacios!",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#6F8EAD",
                })
            } else {
                if (usuarioFiltrado.length > 0) {
                    console.log('mensaje cuando existe usuarios y ellos son: ', usuarioFiltrado)
                    if (usuarioFiltrado[0].ci == email && usuarioFiltrado[0].pass == password) {
                        swal.close()

                        localStorage.clear();

                        localStorage.setItem('rol', 'admin');

                        localStorage.setItem("user", usuarioFiltrado[0].nombre)

                        let allIdGrupos = await getAll_Id_Grupo()

                        console.log("🚀 ~ file: main.js ~ line 75 ~ btnLog.addEventListener ~ allIdGrupos", allIdGrupos)

                        if (allIdGrupos != false) {

                            localStorage.setItem("id_grupo_AddLista", JSON.stringify(allIdGrupos));

                        } else {
                            localStorage.setItem('id_grupo_AddLista', "noExiste")
                        }


                        home(view, model);

                        let SistemaBtn = document.getElementById('SistemaBtn')
                        SistemaBtn.style.display = 'grid';

                        let insertarTipoNivel = document.getElementById('insertarTipoNivel');
                        insertarTipoNivel.textContent = 'admin'
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: "Usuario o Contraseña Incorrecta 2",
                            confirmButtonText: "OK",
                            confirmButtonColor: "#6F8EAD",
                        })
                    }

                } else {
                    //caso que sea dirigente
                    let allDirigentes = await getAllDirigentes()
                    console.log('llamada a all dirigentes:', allDirigentes);

                    if (allDirigentes.length > 0) {
                        swal.close()
                        let dirigenteFiltrado = allDirigentes.filter(dirigente => dirigente.ci == email)

                        console.log('mensaje cuando existe dirigentes y ellos son: ', dirigenteFiltrado)

                        if (dirigenteFiltrado.length > 0) {

                            if (dirigenteFiltrado[0].ci == email && dirigenteFiltrado[0].pass == password) {
                                //caso encuentre el dirigente

                                localStorage.clear();

                                localStorage.setItem("rol", 'dirigente');
                                localStorage.setItem("user", dirigenteFiltrado[0].nombre)

                                let idDirigente = dirigenteFiltrado[0].id_dirigente
                                let grupoByDirigentes = await getDirigentesByDirigentes(idDirigente)

                                console.log('puntero');
                                localStorage.clear();

                                localStorage.setItem('rol', 'dirigente');
                                localStorage.setItem("user", dirigenteFiltrado[0].nombre)


                                if (grupoByDirigentes != false) {

                                    localStorage.setItem("id_grupo_AddLista", JSON.stringify(grupoByDirigentes));

                                } else {
                                    localStorage.setItem('id_grupo_AddLista', "noExiste")
                                }

                                home(view, model);

                                let dirigenteBtn = document.getElementById("dirigenteBtn");
                                dirigenteBtn.style.display = "none";

                                let listaMovimientosBtn = document.getElementById('listaMovimientosBtn')
                                listaMovimientosBtn.style.display = 'none';

                                let ComandoBtn = document.getElementById('ComandoBtn')
                                ComandoBtn.style.display = 'none';

                                let SistemaBtn = document.getElementById('SistemaBtn')
                                SistemaBtn.style.display = 'none';

                                let insertarTipoNivel = document.getElementById('insertarTipoNivel');
                                insertarTipoNivel.textContent = 'dirigente'

                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: "Usuario o Contraseña Incorrecta 2",
                                    confirmButtonText: "OK",
                                    confirmButtonColor: "#6F8EAD",
                                })
                            }

                        } else {
                            let punterosAll = await getAllPunteros();
                            if (punterosAll.length > 0) {

                                let punterosFiltrados = punterosAll.filter(puntero => puntero.ci == email)

                                if (punterosFiltrados.length > 0) {
                                    if (punterosFiltrados[0].ci == email && punterosFiltrados[0].pass == password) {
                                        swal.close()
                                        let idPuntero = punterosFiltrados[0].id_puntero
                                        let grupoBypuntero = await getGrupoByPuntero(idPuntero)

                                        console.log('puntero');
                                        localStorage.clear();

                                        localStorage.setItem('rol', 'puntero');
                                        localStorage.setItem("user", punterosFiltrados[0].nombre)


                                        if (grupoBypuntero != false) {

                                            localStorage.setItem("id_grupo_AddLista", JSON.stringify(grupoBypuntero));

                                        } else {
                                            localStorage.setItem('id_grupo_AddLista', "noExiste")
                                        }

                                        home(view, model);

                                        let listaMovimientosBtn = document.getElementById('listaMovimientosBtn')
                                        listaMovimientosBtn.style.display = 'none';

                                        let ComandoBtn = document.getElementById('ComandoBtn')
                                        ComandoBtn.style.display = 'none';

                                        let dirigenteBtn = document.getElementById('dirigenteBtn')
                                        dirigenteBtn.style.display = 'none';

                                        let punteroBtn = document.getElementById('punteroBtn')
                                        punteroBtn.style.display = 'none';

                                        let listaBtn = document.getElementById('listaBtn')
                                        listaBtn.style.display = 'none';

                                        let SistemaBtn = document.getElementById('SistemaBtn')
                                        SistemaBtn.style.display = 'none';

                                        let insertarTipoNivel = document.getElementById('insertarTipoNivel');
                                        insertarTipoNivel.textContent = 'puntero'
                                    } else {
                                        Swal.fire({
                                            icon: 'error',
                                            title: "Usuario o Contraseña Incorrecta 3",
                                            confirmButtonText: "OK",
                                            confirmButtonColor: "#6F8EAD",
                                        })
                                    }

                                } else {
                                    Swal.fire({
                                        icon: 'error',
                                        title: "Usuario no existe",
                                        confirmButtonText: "OK",
                                        confirmButtonColor: "#6F8EAD",
                                    })
                                }
                            }
                        }
                    }
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
            title: "error usuario ",
        });
    }
}
async function getAllPunteros() {
    let usuario = await api_get_PunteroAll();

    if (usuario.message == 'ok') {
        let { result } = usuario
        return result
    } else {
        swal.fire({
            icon: 'error',
            title: "error punteros",
        });
    }
}
async function getAllDirigentes() {
    let usuario = await api_get_DirigenteAll();

    if (usuario.message == 'ok') {
        let { result } = usuario
        return result
    } else {
        swal.fire({
            icon: 'error',
            title: "error dirigentes",
        });
    }
}
async function getGrupoByPuntero(id) {


    let usuario = await api_get_grupoByPuntero(id);

    console.log('estoy en grupos: ', usuario)


    if (usuario.message == 'ok') {
        let { result } = usuario
        if (result.length > 0) {
            return result
        } else {
            return false
        }
    } else {
        swal.fire({
            icon: 'error',
            title: "error grupos",
        });
    }
}


async function getDirigentesByDirigentes(id) {


    let usuario = await api_get_grupoByDirigentes(id);

    console.log('estoy en grupos: ', usuario)


    if (usuario.message == 'ok') {
        let { result } = usuario
        if (result.length > 0) {
            return result
        } else {
            return false
        }
    } else {
        swal.fire({
            icon: 'error',
            title: "error grupos",
        });
    }
}
async function getAll_Id_Grupo() {


    let usuario = await api_get_all_id_grupo();

    console.log('estoy en all id Grupos: ', usuario)


    if (usuario.message == 'ok') {
        let { result } = usuario
        if (result.length > 0) {
            return result
        } else {
            return false
        }
    } else {
        swal.fire({
            icon: 'error',
            title: "error all id Grupos",
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
    } else if (event.detail == 'listaLogOut') {

        console.log('es Log out')
        localStorage.clear();
        location.reload()
    }
}) 