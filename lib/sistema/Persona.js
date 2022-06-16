import { render } from '../others/renderizado.js';
import { addNavBarFunctions, spinnerRender } from '../others/utils.js';
import { headerPersona, formularioPersona } from '../views/TemplatePersona.js'
import { navbar } from '../views/templatesHome.js'
import { api_get_colorados_By_Ci, api_get_personas_by_Ci } from '../apis/apiPersonas.js';
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
    buscarPorCedula()

    function buscarPorCedula() {
        //! campos a ser usados
        let ci = document.getElementById('searchCiColorado');
        let btnBuscar = document.getElementById('btnBuscarCliente');
        let btnGuardarCorreli = document.getElementById('btnGuardarNewCorreli');
        let btnEditar = document.getElementById('btnActualizarNewCorreli');
        let btnNewCorreli = document.getElementById('btnNewCorreli');

        //! al inicio oculto los botones de guardar y editar
        btnGuardarCorreli.style.visibility = 'hidden';
        btnEditar.style.visibility = 'hidden';

        btnBuscar.addEventListener('click', async function () { //al dar click en buscar 
           
            limpiarCampos() //limpia los campos

            // validacion del numero de cedula
            if (ci.value == "" || ci.value == null || ci.value == undefined) { 
                swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Ingrese un numero de ci campo vacio',
                    confirmButtonText: 'ok'
                })
                //oculta los botones 
                btnGuardarCorreli.style.visibility = 'hidden';
                btnEditar.style.visibility = 'hidden';
            } else {

                spinnerRender() //renderiza el spinner

                let personasAll = await getPersonasPorCi(ci.value); // consulta a la nueva DB
                let datosColorados = await getColoradosPorCi(ci.value); // consulta a la vieja DB

                //comprueba si existe datos en la DB nueva, si existe muestra los datos en el formulario, si no existe muestra un mensaje de error
                if (personasAll.length > 0) { 

                    //caso exista datos en la DB nueva, muestra los datos en el formulario TODOS

                    //!======================= Inicio datosColorados================================!
                    document.getElementById('inputName').value = datosColorados[0].nombre;
                    document.getElementById('inputSurname').value = datosColorados[0].apellido;
                    document.getElementById('inputDate').value = datosColorados[0].c_fenaci;
                    document.getElementById('inputPartido').value = datosColorados[0].n_partido;
                    document.getElementById('inputDireccion').value = datosColorados[0].direccion;
                    document.getElementById('inputDepartamento').value = datosColorados[0].depart;
                    document.getElementById('inputDistrito').value = datosColorados[0].distrito;
                    document.getElementById('inputLocalidad').value = datosColorados[0].localidad;
                    document.getElementById('inputMesa').value = datosColorados[0].mesa;
                    document.getElementById('inputOrden').value = datosColorados[0].orden;
                    document.getElementById('inputZona').value = datosColorados[0].zona;
                    //!======================= Fin datosColorados================================!

                    //!======================= Inicio personasAll================================!
                    document.getElementById('inputTelefonoPersonas').value = personasAll[0].telefono;
                    document.getElementById('inputCorreo').value = personasAll[0].email;
                    document.getElementById('contactLat').value = personasAll[0].latitud;
                    document.getElementById('contactLng').value = personasAll[0].longitud;
                    document.getElementById('textAreaObs').value = personasAll[0].observaciones;
                    //!======================= fin personasAll================================!

                    //oculta y muestra los botones
                    btnGuardarCorreli.style.visibility = 'hidden';
                    btnEditar.style.visibility = 'visible';
                    Swal.fire({
                        icon: 'success',
                        title: 'Bien hecho!',
                        text: 'Se encontro el Correli!',
                        confirmButtonColor: '#C12329',
                        confirmButtonText: 'Aceptar',
                    })

                } else {
                    //caso no exista datos en la DB nueva, muestra un mensaje de error

                    //valida los datos de la DB vieja.
                    if (datosColorados == null || datosColorados == "" || datosColorados == undefined) {
                        //caso ocurra algun error...

                        //oculta botones
                        btnGuardarCorreli.style.visibility = 'hidden';
                        btnEditar.style.visibility = 'hidden';

                        swal.close() //cierra spinner de carga

                        //si no existe datos en la DB vieja, muestra un mensaje.
                        const swalWithBootstrapButtons = Swal.mixin({
                            customClass: {
                                confirmButton: 'btn btn-success',
                                cancelButton: 'btn btn-danger'
                            },
                            buttonsStyling: false
                        })
                        
                        swalWithBootstrapButtons.fire({
                            title: 'Ops...',
                            text: "No existe ese correli!",
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonText: 'Nuevo Correli',
                            cancelButtonText: 'Cerrar',
                            reverseButtons: true
                        }).then((result) => {
                            //!cargar nuevo correli
                            if (result.isConfirmed) {
                                swalWithBootstrapButtons.fire(
                                    'Perfecto!',
                                    'Crearemos un Nuevo Correli',
                                    'success'
                                )
                                btnNewCorreli.style.visibility = 'visible';
                            } else if (
                                /* Read more about handling dismissals below */
                                result.dismiss === Swal.DismissReason.cancel
                            ) {
                                swalWithBootstrapButtons.fire(
                                    'Gracias!',
                                    'Vuelva a Consultar Pronto!',
                                    'error'
                                )
                            }
                        })
                    } else {
                        //caso que encuentre datos en la DB vieja.

                        //oculta botones
                        btnEditar.style.visibility = 'hidden';
                        btnGuardarCorreli.style.visibility = 'visible';

                        swal.close() //cierra spinner de carga

                        swal.fire({
                            icon: 'warning',
                            title: 'Oops...',
                            text: 'Faltan Campos por llenar!',
                        });

                        //carga los datos de la DB vieja en el formulario.
                        document.getElementById('inputName').value = datosColorados[0].nombre;
                        document.getElementById('inputSurname').value = datosColorados[0].apellido;
                        document.getElementById('inputDate').value = datosColorados[0].c_fenaci;
                        document.getElementById('inputPartido').value = datosColorados[0].n_partido;
                        document.getElementById('inputDireccion').value = datosColorados[0].direccion;
                        document.getElementById('inputDepartamento').value = datosColorados[0].depart;
                        document.getElementById('inputDistrito').value = datosColorados[0].distrito;
                        document.getElementById('inputLocalidad').value = datosColorados[0].localidad;
                        document.getElementById('inputMesa').value = datosColorados[0].mesa;
                        document.getElementById('inputOrden').value = datosColorados[0].orden;
                        document.getElementById('inputZona').value = datosColorados[0].zona;

                    }
                }
            }
        });
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
async function getColoradosPorCi(ci) {
    let colorados = await api_get_colorados_By_Ci(ci);
    if (colorados.message === "ok") {
        let { result } = colorados;
        return result
    }
}

async function getPersonasPorCi(ci) {
    let personas = await api_get_personas_by_Ci(ci);
    if (personas.message === "ok") {
        let { result } = personas;
        return result
    }
}