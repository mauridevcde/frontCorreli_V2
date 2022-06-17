import { render } from '../others/renderizado.js';
import { addNavBarFunctions, spinnerRender } from '../others/utils.js';
import { headerPersona, formularioPersona } from '../views/TemplatePersona.js'
import { navbar } from '../views/templatesHome.js'
import { api_get_OldCorreli_By_Ci, api_get_NewCorreli_by_Ci, api_get_NewPersona_by_Ci, api_post_nuevaPersona, api_update_nuevaPersona } from '../apis/apiPersonas.js';
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
    imagen()
    await BuscarColo_o_PorCi();
}

let cargaImagen;
function imagen() {
    let inpFile = document.getElementById('inpFileNewProducto');
    //let previewContainer = document.getElementById('imagePreviewNewProducto');
    let previewImage = document.querySelector('.imgPreviewImageNewProducto');
    let previewDefaultText = document.querySelector('.imgPreviewTextNewProducto');

    inpFile.addEventListener('change', function () {
        const file = this.files[0];

        //console.log("the file", file);
        if (file) {
            const reader = new FileReader();

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
        btnGuardar.style.display = 'none';
        btnEditar.style.display = 'none'
        btnNuevaPersona.style.display = 'none';

        btnBuscar.addEventListener('click', async () => {

            //llamando a las apis
            let New_Persona = await get_NewPersonaByCi(ci.value);


            if (New_Persona.length > 0) {

                //open formulario de new_persona

                console.log("la persona son estas", New_Persona[0]);
                let id_new_persona = New_Persona[0].id_new_persona;
                document.getElementById('searchCiColorado').value = New_Persona[0].n_cedula;
                document.getElementById('inputName').value = New_Persona[0].nombre;
                document.getElementById('inputSurname').value = New_Persona[0].apellido;
                document.getElementById('inputTelefonoPersonas').value = New_Persona[0].telefono;
                document.getElementById('inputCorreo').value = New_Persona[0].email;
                document.getElementById('inputDistrito').value = New_Persona[0].distrito;
                document.getElementById('inputPartido').value = New_Persona[0].partido;
                document.getElementById('contactLat').value = New_Persona[0].latitud;
                document.getElementById('contactLng').value = New_Persona[0].longitud;
                document.getElementById('textAreaObs').value = New_Persona[0].observaciones;

                let previewImage = document.getElementById('imagePreviewNewProducto');
                //blob mysql to base64

                // let datito = foto;
                // console.log("datito 1:", foto);
                // let imagen2 = '';

                // datito = datito.data.forEach(element => {
                //     element = String.fromCharCode(element);
                //     imagen2 = imagen2 + element;
                // });

                //previewImage.innerHTML = `<img src="${imagen2}" class="img-fluid" id="imagePreviewNewProducto"> `;

                swal.fire({
                    title: 'Existe!',
                    text: "Existe la Persona!",
                    icon: 'success',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: '¡ok!'
                }).then((result) => {
                    btnEditar.style.display = 'grid'
                    btnEditar.addEventListener('click', async () => {
                        let n_cedula2 = document.getElementById('searchCiColorado').value
                        let nombre2 = document.getElementById('inputName').value
                        let apellido2 = document.getElementById('inputSurname').value
                        let telefono2 = document.getElementById('inputTelefonoPersonas').value
                        let email2 = document.getElementById('inputCorreo').value
                        let distrito2 = document.getElementById('inputDistrito').value
                        let partido2 = document.getElementById('inputPartido').value
                        let latitud2 = document.getElementById('contactLat').value
                        let longitud2 = document.getElementById('contactLng').value
                        let observaciones2 = document.getElementById('textAreaObs').value

                        let nuevaPersonaCampos = {
                            id_new_persona: id_new_persona,
                            n_cedula: n_cedula2,
                            nombre: nombre2,
                            apellido: apellido2,
                            telefono: telefono2,
                            email: email2,
                            distrito: distrito2,
                            partido: partido2,
                            latitud: latitud2,
                            longitud: longitud2,
                            observaciones: observaciones2
                        }
                        console.log("🚀 ~ file: Persona.js ~ line 142 ~ btnEditar.addEventListener ~ nuevaPersona", nuevaPersonaCampos)

                        if (validaObject(nuevaPersonaCampos)) {

                            put_updateNuevaPersona(nuevaPersonaCampos).then((res) => {
                                if (res.message == 'ok') {
                                    Swal.fire({
                                        icon: 'success',
                                        title: "Persona Modificada con Exito!",
                                        confirmButtonText: "OK",
                                        confirmButtonColor: "#6F8EAD",
                                    })

                                }
                            })
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: "Algún Campo Vacio!",
                                confirmButtonText: "OK",
                                confirmButtonColor: "#6F8EAD",
                            })
                            console.log("false");
                        };
                    })
                })


                let contFechaNacimiento = document.getElementById('contFechaNacimiento');
                let contDireccion = document.getElementById('contDireccion');
                let contDepartamento = document.getElementById('contDepartamento');
                let contLocalidad = document.getElementById('contLocalidad');
                let contMesa = document.getElementById('contMesa');
                let contOrden = document.getElementById('contOrden');
                let contZona = document.getElementById('contZona');

                contFechaNacimiento.style.display = 'none';
                contDireccion.style.display = 'none';
                contDepartamento.style.display = 'none';
                contLocalidad.style.display = 'none';
                contMesa.style.display = 'none';
                contZona.style.display = 'none';
                contOrden.style.display = 'none';
                btnGuardar.style.display = 'none';
                btnEditar.style.display = 'none';

                console.log('nueva persona Editar');

            } else {
                //Llamada de APIS
                let New_Correli = await get_NewCorreliByCi(ci.value);

                if (New_Correli.length > 0) {
                    let Old_Correli = await get_OldCorreliByCi(ci.value);

                    //open formulario de new_correli
                    console.log('nuevo new_correli Editar');
                    let id_new_correli = New_Correli[0].id_new_correli;
                    document.getElementById('searchCiColorado').value = New_Correli[0].n_cedula;//
                    document.getElementById('inputTelefonoPersonas').value = New_Correli[0].telefono;//
                    document.getElementById('inputCorreo').value = New_Correli[0].email;//
                    document.getElementById('contactLat').value = New_Correli[0].latitud;//
                    document.getElementById('contactLng').value = New_Correli[0].longitud;//
                    document.getElementById('textAreaObs').value = New_Correli[0].observaciones;//

                    let Objeto_New_Correli = {
                        cedula: New_Correli[0].n_cedula,
                        telefono: New_Correli[0].telefono,
                        email: New_Correli[0].email,
                        latitud: New_Correli[0].latitud,
                        longitud: New_Correli[0].longitud,
                        observaciones: New_Correli[0].observaciones
                    }

                    let cedulaComparacion = document.getElementById('searchCiColorado').value;
                    let telefonoComparacion = document.getElementById('inputTelefonoPersonas').value;
                    let emailComparacion = document.getElementById('inputCorreo').value;
                    let latitudComparacion = document.getElementById('contactLat').value;
                    let longitudComparacion = document.getElementById('contactLng').value;
                    let observacionesComparacion = document.getElementById('textAreaObs').value;

                    let Objeto_Comparacion_New_Correli = {
                        cedula: cedulaComparacion,
                        telefono: telefonoComparacion,
                        email: emailComparacion,
                        latitud: latitudComparacion,
                        longitud: longitudComparacion,
                        observaciones: observacionesComparacion
                    }

                    console.log("🚀 ~ file: Persona.js ~ line 20 ~ Old_Correli", Old_Correli)
                    document.getElementById('inputName').value = Old_Correli[0].nombre;
                    document.getElementById('inputSurname').value = Old_Correli[0].apellido;
                    document.getElementById('inputDate').value = Old_Correli[0].c_fenaci;
                    document.getElementById('inputPartido').value = Old_Correli[0].n_partido;
                    document.getElementById('inputDireccion').value = Old_Correli[0].direccion;
                    document.getElementById('inputDepartamento').value = Old_Correli[0].depart;
                    document.getElementById('inputDistrito').value = Old_Correli[0].distrito;
                    document.getElementById('inputLocalidad').value = Old_Correli[0].localidad;
                    document.getElementById('inputMesa').value = Old_Correli[0].mesa;
                    document.getElementById('inputOrden').value = Old_Correli[0].orden;
                    document.getElementById('inputZona').value = Old_Correli[0].zona;

                    let Objeto_Old_Correli = {
                        nombre: Old_Correli[0].nombre,
                        apellido: Old_Correli[0].apellido,
                        fechaNacimiento: Old_Correli[0].c_fenaci,
                        partido: Old_Correli[0].n_partido,
                        direccion: Old_Correli[0].direccion,
                        departamento: Old_Correli[0].depart,
                        distrito: Old_Correli[0].distrito,
                        localidad: Old_Correli[0].localidad,
                        mesa: Old_Correli[0].mesa,
                        orden: Old_Correli[0].orden,
                        zona: Old_Correli[0].zona
                    }
                    //==================prueba objetos================================

                 
                } else {
                    //Llamadas de APIs
                    let Old_Correli = await get_OldCorreliByCi(ci.value);

                    if (Old_Correli.length > 0) {
                        //open formulario de old_correli
                        console.log('old correli ADD new_correli');



                    } else {
                        //open formulario de new_persona
                        console.log('Nueva ADD new_persona');
                        limpiarCamposPersona()

                        let contDireccion = document.getElementById('contDireccion');
                        let contDepartamento = document.getElementById('contDepartamento');
                        let contLocalidad = document.getElementById('contLocalidad');
                        let contMesa = document.getElementById('contMesa');
                        let contOrden = document.getElementById('contOrden');
                        let contZona = document.getElementById('contZona');
                        btnNuevaPersona.style.display = 'grid';

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

                                contDireccion.style.display = 'none';
                                contDepartamento.style.display = 'none';
                                contLocalidad.style.display = 'none';
                                contMesa.style.display = 'none';
                                contZona.style.display = 'none';
                                contOrden.style.display = 'none';

                                btnGuardar.style.display = 'none';
                                btnEditar.style.display = 'none';

                                btnNuevaPersona.addEventListener('click', async () => {
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
                                    let foto = cargaImagen
                                    let nuevaPersona = {

                                        n_cedula: n_cedula,
                                        nombre: nombre,
                                        apellido: apellido,
                                        telefono: telefono,
                                        email: email,
                                        distrito: distrito,
                                        foto: foto,
                                        partido: partido,
                                        latitud: latitud,
                                        longitud: longitud,
                                        observaciones: observaciones

                                    }

                                    if (validaObject(nuevaPersona)) {
                                        //console.log("true");
                                        console.log(nuevaPersona);
                                        post_nuevaPersona(nuevaPersona).then((res) => {
                                            if (res.message == 'ok') {
                                                Swal.fire({
                                                    icon: 'success',
                                                    title: "Nueva Persona Agregada!",
                                                    confirmButtonText: "OK",
                                                    confirmButtonColor: "#6F8EAD",
                                                });
                                                limpiarCamposPersona()
                                                limpiarCamposNewCorreli()
                                                limpiarCamposPostNewPersona()
                                                inicioPersona()
                                            } else {
                                                Swal.fire({
                                                    icon: 'error',
                                                    title: "Error al agregar la persona!",
                                                    confirmButtonText: "OK",
                                                    confirmButtonColor: "#6F8EAD",
                                                });

                                            }

                                        })

                                    } else {
                                        console.log(nuevaPersona);
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
    function limpiarCamposPostNewPersona() {
        contNombre.style.display = 'grid';
        contDireccion.style.display = 'grid';
        contDepartamento.style.display = 'grid';
        contLocalidad.style.display = 'grid';
        contMesa.style.display = 'grid';
        contOrden.style.display = 'grid';
        contZona.style.display = 'grid';
    }

    function limpiarCamposNewCorreli() {
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
    }
    function limpiarCamposPersona() {
        //!=======================PERSONAS================================!
        document.getElementById('inputName').value = "";
        document.getElementById('inputPartido').value = "";
        document.getElementById('inputTelefonoPersonas').value = "";
        document.getElementById('inputSurname').value = "";
        document.getElementById('inputDistrito').value = "";
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

async function put_updateNuevaPersona(nuevaPersona) {
    let newPersonaUpdate = await api_update_nuevaPersona(nuevaPersona)

    return newPersonaUpdate

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