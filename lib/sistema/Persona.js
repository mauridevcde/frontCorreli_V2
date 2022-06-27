import { render } from '../others/renderizado.js';
import { addNavBarFunctions, spinnerRender } from '../others/utils.js';
import { headerPersona, formularioPersona } from '../views/TemplatePersona.js'
import { navbar } from '../views/templatesHome.js'
import { api_get_OldCorreli_By_Ci, api_get_NewCorreli_by_Ci, api_get_NewPersona_by_Ci, api_post_nuevaPersona, api_update_nuevaPersona, api_update_NewCorreli, api_post_new_Correli } from '../apis/apiPersonas.js';
import { ListaVotantes } from '../sistema/ListaVotantes.js'

import { api_get_LocalidadAll, api_get_DistritoAll, api_get_ZonaAll } from "../apis/apiVariablesSis.js";


export function persona() {
    inicioPersona()
}

async function inicioPersona() {

    let view = {};
    view.navbar = navbar();
    view.header = headerPersona(); //header con icono
    view.formulario = formularioPersona(); //formulario de persona

    render(view, true);

    addNavBarFunctions();

    mapInit();
    seleccion_Departamento()
}



async function seleccion_Departamento() {

    let estadoInicial = {
        distrito: [],
        Localidad: []
    }

    let distritoApi = await getAllDistritos();
    let localidadesApi = await getAllLocalidades();

    estadoInicial.distrito = distritoApi
    estadoInicial.Localidad = localidadesApi

    let selectMovDepartamento = document.getElementById("selectMovDepartamento")

    let optionDistrito = document.getElementById('selectMovDistrito');
    let DistritoRender = ``;

    let optionLocalidad = document.getElementById('selectMovLocalidad');
    let LocalidadRender = ``;

    selectMovDepartamento.addEventListener("change", function (e) {
        if (selectMovDepartamento.value == 10) {

            estadoInicial.distrito.forEach(element => {
                if (element.depart == 10) {
                    DistritoRender += `<option value="${element.distrito}" selected>${element.descrip}</option>`
                }
            })

            optionDistrito.innerHTML = DistritoRender
            DistritoRender = ``;

            optionDistrito.addEventListener("change", function (e) {

                estadoInicial.Localidad.forEach(element => {

                    if (element.distrito == optionDistrito.value) {
                        LocalidadRender += `<option value="${element.distrito}" selected>${element.descrip}</option>`
                    }
                })

                optionLocalidad.innerHTML = LocalidadRender
                LocalidadRender = ``;

            })

        }
    })
}


//! validador de campos vacios
function validaObject(datos) {
    let conta = 0;
    for (const property in datos) {
        if (datos[property] == '' || datos[property] == null || datos[property] == undefined) {
            conta++;
        }
    }
    if (conta > 0) { return false; } else { return true; }
}

function mapInit() {
    var map = L.map('map').fitWorld();
    map.locate({
        setView: true,
        maxZoom: 16
    });

    function onLocationFound(location) {
        console.log("lo que devuelve onLocationFound", location);
        //var radius = location.accuracy;
        const coords = location.latlng;
        const marker = L.marker(coords, {
            draggable: true
        }).addTo(map);

        document.querySelector('#contactLat').value = location.latitude;
        document.querySelector('#contactLng').value = location.longitude;


        marker.on('dragend', function (e) {
            document.getElementById('contactLat').value = marker.getLatLng().lat;
            document.getElementById('contactLng').value = marker.getLatLng().lng;
        });
    }

    map.on('locationfound', onLocationFound);

    const tileURL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';

    L.tileLayer(tileURL).addTo(map);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {
        foo: 'bar',
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
}


//*apis*
async function getAllDistritos() {
    const response = await api_get_DistritoAll();
    if (response.message == 'ok') {
        let { result } = response;
        return result;
    } else {
        swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo obtener los datos'
        })
    }
}

async function getAllZonas() {
    const response = await api_get_ZonaAll();
    if (response.message == 'ok') {
        let { result } = response;
        return result;
    } else {
        swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo obtener los datos'
        })
    }
}

async function getAllLocalidades() {
    const response = await api_get_LocalidadAll();
    if (response.message == 'ok') {
        let { result } = response;
        return result;
    } else {
        swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo obtener los datos'
        })
    }
}



