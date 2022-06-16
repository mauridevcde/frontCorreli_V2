import { render } from '../others/renderizado.js';
import { addNavBarFunctions, spinnerRender } from '../others/utils.js';
import { headerPersona, formularioPersona } from '../views/TemplatePersona.js'
import { navbar } from '../views/templatesHome.js'
import { api_get_OldCorreli_By_Ci, api_get_NewCorreli_by_Ci, api_get_NewPersona_by_Ci, api_post_nuevaPersona } from '../apis/apiPersonas.js';
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
    imagen();
    await BuscarColo_o_PorCi();
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

let cargaImagen;
function imagen() {
    let inpFile = document.getElementById('inpFileNewProducto');
    //let previewContainer = document.getElementById('imagePreviewNewProducto');
    let previewImage = document.querySelector('.imgPreviewImageNewProducto');
    let previewDefaultText = document.querySelector('.imgPreviewTextNewProducto');

    inpFile.addEventListener('change', function () {
        let file = this.files[0];
        //console.log("the file", file);
        if (file) {
            let reader = new FileReader();
            previewDefaultText.style.display = 'none';
            previewImage.style.display = 'block';
            reader.addEventListener('load', function () {
                //console.log("the reader", reader);
                previewImage.setAttribute('src', this.result);
                cargaImagen = this.result;
            });
            reader.readAsDataURL(file);
        } else {
            previewDefaultText.style.display = null;
            previewImage.style.display = null;
            previewImage.setAttribute('src', '');
        }

    });
}

async function BuscarColo_o_PorCi() {
    await buscarPorCedula()

    async function buscarPorCedula() {

        //recopilando datos
        let ci = document.getElementById('searchCiColorado');
        let btnBuscar = document.getElementById('btnBuscarCliente');
        let btnEditar = document.getElementById('btnActualizarNewCorreli');
        let btnGuardar = document.getElementById('btnGuardarNewCorreli');
        let btnNuevaPersona = document.getElementById('btnNewCorreli');

        btnBuscar.addEventListener('click', async () => {
            //llamando a las apis
            let New_Persona = await get_NewPersonaByCi(ci.value);

            if (New_Persona.length > 0) {
                //open formulario de new_persona

                console.log('nueva persona Editar');
            } else {
                //Llamada de APIS
                let New_Correli = await get_NewCorreliByCi(ci.value);

                if (New_Correli.length > 0) {
                    //open formulario de new_correli
                    console.log('nuevo new_correli Editar');
                } else {
                    //Llamadas de APIs
                    let Old_Correli = await get_OldCorreliByCi(ci.value);

                    if (Old_Correli.length > 0) {
                        //open formulario de old_correli
                        console.log('old correli ADD new_correli');

                    } else {
                        //open formulario de new_persona
                        console.log('Nueva ADD new_persona');

                        let n_cedula = document.getElementById('searchCiColorado').value
                        let nombre = document.getElementById('inputName').value
                        let apellido = document.getElementById('inputSurname').value
                        let telefono = document.getElementById('inputTelefonoPersonas').value
                        let email = document.getElementById('inputCorreo').value
                        let distrito = document.getElementById('inputDistrito').value
                        let partido = document.getElementById('inputPartido').value
                        let latitud = document.getElementById('contactLat').value
                        let longitud = document.getElementById('contactLng').value
                        let observaciones = document.getElementById('textAreaObs').value

                        let nuevaPersona = {

                            n_cedula: n_cedula,
                            nombre: nombre,
                            apellido: apellido,
                            telefono: telefono,
                            email: email,
                            distrito: distrito,
                            partido: partido,
                            latitud: latitud,
                            longitud: longitud,
                            observaciones: observaciones

                        }
                        console.log('nueva persona', nuevaPersona);
                        //console.log(transportadora)
                        swal.fire({
                            title: 'No Existe Correli',
                            text: "Deseas crear un nuevo Correli?",
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: '¡Sí, Crear!'
                        }).then((result) => {
                            if (result.value) {
                                btnNuevaPersona.addEventListener('click', async () => {
                                    if (validaObject(nuevaPersona)) {
                                        //console.log("true");
                                        post_nuevaPersona(nuevaPersona).then((res) => {
                                            if (res.message == 'ok') {
                                                Swal.fire({
                                                    icon: 'success',
                                                    title: "Nueva Persona Agregada!",
                                                    confirmButtonText: "OK",
                                                    confirmButtonColor: "#6F8EAD",
                                                });
                                            }
                                        })
                                    } else {
                                        Swal.fire({
                                            icon: 'error',
                                            title: "Algún Campo Vacio!",
                                            confirmButtonText: "OK",
                                            confirmButtonColor: "#6F8EAD",
                                        });
                                    };
                                })
                            }
                        }
                        )
                    }
                }
            }
        })
    }

    function limpiarCampos() {
        document.getElementById('inputName').value = "";
        document.getElementById('inputSurname').value = "";
        document.getElementById('inputDate').value = "";
        document.getElementById('inputPartido').value = "";
        document.getElementById('inputDireccion').value = "";
        document.getElementById('inputDepartamento').value = "";
        document.getElementById('inputDistrito').value = "";
        document.getElementById('inputLocalidad').value = "";
        document.getElementById('inputMesa').value = "";
        document.getElementById('inputOrden').value = "";
        document.getElementById('inputZona').value = "";
        //!=======================PERSONAS================================!

        document.getElementById('inputTelefonoPersonas').value = "";
        document.getElementById('inputCorreo').value = "";
        document.getElementById('contactLat').value = "";
        document.getElementById('contactLng').value = "";
        document.getElementById('textAreaObs').value = "";
    }
}


//apis
async function get_OldCorreliByCi(ci) {
    let oldCorreli = await api_get_OldCorreli_By_Ci(ci);
    if (oldCorreli.message === "ok") {
        let { result } = oldCorreli;
        return result
    }
}

async function get_NewCorreliByCi(ci) {
    let newCorreli = await api_get_NewCorreli_by_Ci(ci);
    if (newCorreli.message === "ok") {
        let { result } = newCorreli;
        return result
    }
}

async function get_NewPersonaByCi(ci) {
    let newPersona = await api_get_NewPersona_by_Ci(ci);
    if (newPersona.message === "ok") {
        let { result } = newPersona;
        return result
    }
}

async function post_nuevaPersona(datos) {
    let nuevaPersona = await api_post_nuevaPersona(datos);
    return nuevaPersona;
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