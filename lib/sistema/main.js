import { home } from "../sistema/home.js";
import { puntero } from "../sistema/Puntero.js";
import { persona } from "../sistema/Persona.js";
import { lista } from "../sistema/Lista.js";
import { movimiento } from "../sistema/movimiento.js";
import { comando } from "../sistema/comando.js";
import { dirigente } from "../sistema/dirigente.js";
let view = {};
let model = {};

console.log("render");

home(view, model)

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
}) 