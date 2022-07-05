export function headerListaVotantes() {
    return /* html */`
    <nav aria-label="breadcrumb ">
        <ol class="breadcrumb navegacionColor rounded mt-2" >
            <li class="breadcrumb-item active text-light m-auto" aria-current="page" >
                <h4 class="text-center m-2"><i class="fa fa-flag"></i> LISTA VOTANTES</h4>
            </li>
        </ol>
    </nav>`;
}

//buscar ListaVotantes
export function BusquedaListaVotantes(props) {
    return /*html*/ `
      <div class="container">
        <div class="row d-flex justify-content-center" id="containerBusquedaListaVotantes">
            <div class="form-group">
                <input list="searchDirigenteList" type="text" class="form-control" id="searchListaVotantes" placeholder="Prueba">
                <datalist id="searchDirigenteList">
                
                </datalist>
                <div class="col">
                <div class="d-flex justify-content-center" id="botonesDirigente" style="margin-top:5px">
                <button type="button" id="btnBuscarListaVotantes" class="btn btn-success  btn btnBuscar" data-toggle="tooltip" > Buscar </button>
                </div>
                </div>
            </div>
            
            </div>
        </div>
      `;
}


//crear tabla ListaVotantes
export function tablaListaVotantes(props) {
    console.log('esto es:', props)
    //console.log(props);
    let retorno = ``;
    props.forEach((element) => {
        retorno += /*html*/ `
          <tr>
            <td data-id="Cedula: ">${element.n_cedula}</td>
            <td data-id="nombre: ">${element.nombre} </td>
            <td data-id="apellido: ">${element.apellido} </td>
            <td data-id="apellido: ">${element.telefono} </td>
            <td data-id="direccion: ">${element.direccion} </td>
         <td class="d-flex justify-content-center"> 
             <button style="margin-right: 5px;" id="${element.n_cedula}" value="${element.id_lista}" 0 data-id = 0 class="btn btn-info btnNewViewEditListaVotantes mr-2 " title="Ver ListaVotantes"><i class="fa fa-eye" aria-hidden="true" style="font-size: 20px;"></i></button>
             <button id="${element.n_cedula}" value="${element.id_lista}" data-id = 0 class="btn btn-danger btnEliminarListaVotantes mr-2 " title="Eliminar ListaVotantes"><i class="fa fa-trash-o" aria-hidden="true" style="font-size: 20px;"></i></button>
         </td>
          </tr>
          `;
    });

    return /*html*/ `
      <div class="container-fluid  mt-4">
      <h4 class="text-center" style="color:white">LISTA LISTA VOTANTES</h4>
  
      <table  class="table table-striped table-bordered table-hover table-sortable justify-center" style="width:100%; background-color: white;" >
      
          <thead class="formBG text-center">
              <tr>
                  <th scope="col">Ci</th>
                  <th scope="col">nombre</th>
                  <th scope="col">apellido</th>
                    <th scope="col">direccion</th>
                    <th scope="col">Acciones</th>

              </tr> 
          </thead>    
          <tbody class="text-center">
             ${retorno}
          </tbody>
    </table>
   
    </div> `;
}


//modal nuevo/editar ListaVotantes
export function modalNuevoEditarListaVotantes() {
    return /*html*/ `
    <div class="modal fade" id="modalNuevoEditarListaVotantes2"  tabindex="-1" role="dialog" aria-labelledby="ListaVotantesModalLabel" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog modal-xl" role="document" style="max-width:1300px;">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title  m-auto" id="clientesNuevoEditar">DATOS DEL VOTANTE</h5>
            </div>
            <div class="modal-body" style="font-style: normal">
                <div class="tab-content" id="nav-tabContent">
                    <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" >
                    <form>
                            <div class="row">
                                <div class="col">
                                <div id="contCi" class="mb-3 mt-3">
                                <label  for="exampleInputEmail1" class="form-label" style="color:red" >CI</label>
                                <input type="text" class="form-control" id="searchCiColorado" >
                            </div>
                                <div id="contNombre" class="mb-3 mt-3">
                                <label  for="exampleInputEmail1" class="form-label"  style="color:red">Nombre</label>
                                <input type="text" class="form-control" id="inputName" >
                            </div>
                            <div id="contApellido" class="mb-3 mt-3">
                                <label for="exampleInputEmail1" class="form-label" style="color:red">Apellido</label>
                                <input type="text" class="form-control" id="inputSurname" >
                            </div>
                            <div id="contFechaNacimiento" class="mb-3 mt-3">
                                <label for="exampleInputEmail1" class="form-label" style="color:red">Fecha De Nacimiento</label>
                                <input type="date" class="form-control" id="inputDate" >
                            </div>
                            <div  id="contSexo" class="mb-3 mt-3">
                            <label for="selectMovSexo"  style="color:red">Sexo:</label>
                                <select id= "selectMovSexo" class="form-select" aria-label="Default select example">
                                    <option value="" >Seleccionar Sexo...</option>
                                    <option value="M" >Masculino</option>
                                    <option value="F" >Femenino</option>
                                </select>
                        </div>
                        <div  id="contNacionalidad" class="mb-3 mt-3">
                        <label for="selectMovNacionalidad" style="color:red"">Nacionalidad:</label>
                            <select id= "selectMovNacionalidad" class="form-select" aria-label="Default select example">
                                <option value="" >Seleccionar Nacionalidad...</option>
                                <option value="P" >Paraguayo</option>
                                <option value="E" >Extranjero</option>
                            </select>
                    </div>
                            <div id="contPartido" lass="mb-3 mt-3">
                            <label for="exampleInputEmail1" class="form-label" style="color:red">Partido</label>
                            <input type="text" class="form-control" id="inputPartido" >
        
                        </div>
        
                            <div id="contDireccion" class="mb-3 mt-3">
                            
                            <label for="exampleInputEmail1" class="form-label" style="color:red" >Direccion</label>
                            <input type="text" class="form-control" id="inputDireccion" >
                            
                            </div>
        
                            <div  id="contDepartamento" class="mb-3 mt-3">
                                <label for="selectMovDepartamento" style="color:red">Departamento:</label>
                                    <select id= "selectMovDepartamento" class="form-select" aria-label="Default select example">
                                        <option value="0" >Seleccionar un Departamento...</option>
                                        <option value="10" >Alto Parana</option>
                                    </select>
                            </div>
        
                            <div id="contDistrito"  class="mb-3 mt-3">
                                <label for="selectMovDistrito" style="color:red"">Distrito:</label>
                                    <select id= "selectMovDistrito" class="form-select" aria-label="Default select example">
                                        
                                    </select>
                            </div>
        
        
                        <div  id="contLocalidad" class="mb-3 mt-3">
                            <label for="selectMovLocalidad" style="color:red"">Localidad:</label>
                                <select id= "selectMovLocalidad" class="form-select" aria-label="Default select example">
                                    
                                </select>
                        </div>
        
                         
                            <div id="contTelefono" class="mb-3 mt-3">
                            <label for="exampleInputEmail1" class="form-label" style="color:red">Telefono</label>
                            <input type="text" class="form-control" id="inputTelefonoPersonas">
        
                        </div>
                        <div id="contCorreo" class="mb-3 mt-3">
                        <label for="exampleInputEmail1" class="form-label" style="color:red">Correo</label>
                        <input type="text" class="form-control" id="inputCorreo">
                    </div>
                            <div id="contImagen" class="mb-3 mt-3">
                                <label for="exampleInputEmail1" class="form-label" style="color:red">Foto</label>
                                <style>
                                .image-preview45 {
                                    max-width:50%;
                                    max-height:auto;
                                    min-height:100px;
                                    border:2px solid #dddddd;
                                    margin-top:15px;
        
                                        /* Default text */
                                    align-items: center;
                                    justify-content: center;
                                    font-weight: bold;
                                    color: #cccccc;
                                }
                            
                            .imgPreviewImageNewProducto {
                                display: none;
                                width: 50%;
                            }
                                </style>
                            
                            <div id="contImagen2" class= "mb-3">
                                <input type="file" name="inpFile" id="inpFileNewProducto">
                                <div class="image-preview45" id="imagePreviewNewProducto">
                                <img src="" alt="" id="imgPreviewImageNewProducto2" class="imgPreviewImageNewProducto">
                                <span class="imgPreviewTextNewProducto" style="color:red">No hay imagenes</span>
                                </div>
                            </div>
                            </div>
                            <div id="contMapa1" class="mb-3 mt-3">
                                <label for="exampleInputEmail1" class="form-label" style="color:red">Indica tu dirección en el mapa</label>
                                <div id="map"></div>
        
                            </div>
        
                            <div  class="row mb-3 mt-3">
                                <div id="contLatitud" class="col">
                                    <label for="contactLat" class="mr-2" style="color:red">Latitud</label>
                                    <input class="form-control mr-2" id="contactLat" name="contactLat" >
                                </div>
        
                                <div id="contLongitud" class="col">
                                    <label for="contactLng" class="mr-2" style="color:red">Longitud</label>
                                    <input class="form-control mr-2" id="contactLng" name="contactLng" >
                                </div>
        
                            </div>
              
                            <div  id="contObs" class="mb-3 mt-3">
                                <label for="textAreaObs" style="color:red">Observaciones</label>
                                <textarea class="form-control" placeholder="Agregue una observación" id="textAreaObs"></textarea>
                                
        
                            </div>
                                </div>
                            
                            <div class="row">
                                <div class="col">
                                    
                                                             
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
            <div class="modal-footer">
                <button id="btnCerrarNuevoListaVotantes2" type="button" class="btn btn-danger">Cerrar</button>
                
            </div>
        </div>
    </div>
</div>`;
}


export function modalGruposLista() {
    return /* html */`

    <div class="modal fade" id="modalSeleccionarGrupoLista"  tabindex="-1" role="dialog" aria-labelledby="ComandoModalLabel" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog modal-xl" role="document" style="max-width:500px;">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title  m-auto" id="clientesNuevoEditar">SELECCIONE EL GRUPO</h5>
            </div>
            <div class="modal-body" style="font-style: normal">
                <div class="tab-content" id="nav-tabContent">
                    <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                    <form>
                            <div class="row">
                                <div class="col">

                                    <div class="form-group">
                                <label for="lblmov" style="text-transform:uppercase; color:black">Grupo:</label>
                                <select id="selectMovGrupoLista" class="form-select" aria-label="Default select example">
                                     <option id="selectDefaultMovimiento" selected>seleccione el grupo...</option>
                                </select>

                                </div>
                            
                            <div class="row">
                                <div class="col">
                                    
                                                             
                                    </div>
                                </div>
                                
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                    <button id="btnGuardarNuevoGrupoLista" type="button" class="btn btn-primary">Consultar</button>                  
                </div>
        </div>
    </div>
</div>
    `
}