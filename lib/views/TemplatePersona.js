
//header lista producto
export function headerPersona() {
    return /* html */`
    <nav aria-label="breadcrumb ">
        <ol class="breadcrumb navegacionColor rounded mt-2" >
            <li class="breadcrumb-item active text-light m-auto" aria-current="page" >
                <h4 class="text-center m-2"><i class="fa fa-users"></i> Votantes</h4>
            </li>
        </ol>
    </nav>`;
}

export function formularioPersona() {
    return /* html */`
        <div class="container-fluid" >
            <div class="d-flex justify-content-center mt-3">
            </div>
            <div class=" rounded mb-4" >
                <div class="container">
                <div class="mb-3 mb-3">
                <label for="exampleInputEmail1" class="form-label">CI</label>
                <div class="form-row " style="display: flex; justify-content: center;">
                <div class="col-3" style="width: 100%; display: flex;">
                    <input type="text" class="form-control" id="searchCiColorado" placeholder="">
                    <datalist id="searchPlanList">
                    </datalist>
                    <button type="button" id="btnBuscarCliente" class="btn  btn btnBuscar" data-toggle="tooltip" style="margin-left: 5px; background-color:#C12329; color: #FFFFFF" > Buscar </button>
                </div>
            </div>
            </div>
                    <div id="contNombre" class="mb-3 mt-3">
                        <label  for="exampleInputEmail1" class="form-label"  >Nombre</label>
                        <input type="text" class="form-control" id="inputName" >
                    </div>
                    <div id="contApellido" class="mb-3 mt-3">
                        <label for="exampleInputEmail1" class="form-label" >Apellido</label>
                        <input type="text" class="form-control" id="inputSurname" >
                    </div>
                    <div id="contFechaNacimiento" class="mb-3 mt-3">
                        <label for="exampleInputEmail1" class="form-label" >Fecha De Nacimiento</label>
                        <input type="text" class="form-control" id="inputDate" >
                    </div>
                    <div id="contPartido" lass="mb-3 mt-3">
                    <label for="exampleInputEmail1" class="form-label" >Partido</label>
                    <input type="text" class="form-control" id="inputPartido" >

                </div>
                    <div id="contDireccion" class="mb-3 mt-3">
                    <label for="exampleInputEmail1" class="form-label" >Direccion</label>
                    <input type="text" class="form-control" id="inputDireccion" >
                    
                    </div>

                    <div  class="mb-3 mt-3">
                        <label for="selectMovDepartamento" style="color: white;">Departamento:</label>
                            <select id= "selectMovDepartamento" class="form-select" aria-label="Default select example">
                                <option value="0" >Seleccionar un Departamento...</option>
                                <option value="10" >Alto Parana</option>
                            </select>
                    </div>

                    <div  class="mb-3 mt-3">
                        <label for="selectMovDepartamento" style="color: white;">Distrito:</label>
                            <select id= "selectMovDistrito" class="form-select" aria-label="Default select example">
                                
                            </select>
                    </div>


                <div  class="mb-3 mt-3">
                    <label for="selectMovDepartamento" style="color: white;">Localidad:</label>
                        <select id= "selectMovLocalidad" class="form-select" aria-label="Default select example">
                            
                        </select>
                </div>

                    <div id="contMesa" class="mb-3 mt-3">
                        <label for="exampleInputEmail1" class="form-label" >Mesa</label>
                        <input type="text" class="form-control" id="inputMesa" >
                    </div>

                    <div id="contOrden" class="mb-3 mt-3">
                        <label for="exampleInputEmail1" class="form-label" >Orden</label>
                        <input type="text" class="form-control" id="inputOrden" >
                    </div>

                    <div id="contZona" class="mb-3 mt-3">
                        <label for="exampleInputEmail1" class="form-label" >Zona</label>
                        <input type="text" class="form-control" id="inputZona" >
                    </div>

                    <div id="contTelefono" class="mb-3 mt-3">
                    <label for="exampleInputEmail1" class="form-label">Telefono</label>
                    <input type="text" class="form-control" id="inputTelefonoPersonas">

                </div>
                <div id="contCorreo" class="mb-3 mt-3">
                <label for="exampleInputEmail1" class="form-label">Correo</label>
                <input type="text" class="form-control" id="inputCorreo">
            </div>
                    <div id="contImagen" class="mb-3 mt-3">
                        <label for="exampleInputEmail1" class="form-label">Foto</label>
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
                        <span class="imgPreviewTextNewProducto">No hay imagenes</span>
                        </div>
                    </div>
                    </div>
                    <div id="contMapa1" class="mb-3 mt-3">
                        <label for="exampleInputEmail1" class="form-label">Indica tu dirección en el mapa</label>
                        <div id="map"></div>

                    </div>

                    <div id="contLatitud" class="row mb-3 mt-3">
                        <div class="col">
                            <label for="contactLat" class="mr-2">Latitud</label>
                            <input class="form-control mr-2" id="contactLat" name="contactLat" >
                        </div>

                        <div id="contLongitud" class="col">
                            <label for="contactLng" class="mr-2">Longitud</label>
                            <input class="form-control mr-2" id="contactLng" name="contactLng" >
                        </div>

                    </div>
      
                    <div  id="contObs" class="mb-3 mt-3">
                        <label for="textAreaObs">Observaciones</label>
                        <textarea class="form-control" placeholder="Agregue una observación" id="textAreaObs"></textarea>
                        

                    </div>
                    <div class="mb-4 d-flex justify-content-center" style="gap: 10px;">
                        <button type="submit" class="btn btn-primary" id="btnGuardarNewCorreli"><i class="fas fa-check"></i> Guardar</button>
                        
                        <button type="submit" class="btn btn-primary" id="btnActualizarNewCorreli"><i class="fas fa-check"></i> Editar Nueva Persona</button>

                        <button type="submit" class="btn btn-primary" id="btnNewCorreli";"><i class="fas fa-check"></i> Cargar Nueva Persona</button>

                        <button type="submit" class="btn btn-primary" id="btnNewCorreliEditar";"><i class="fas fa-check"></i> Editar New Correli</button>

                        <button type="submit" class="btn btn-primary" id="btnNewCorreliNuevo";"><i class="fas fa-check"></i> Cargar Nuevo Correli</button>

                        <button type="submit" class="btn btn-success" id="btnEnviarListaVotantes";"><i class="fas fa-check"></i> Enviar Lista Votantes</button>

                    </div>
                </div>
            </div>
        </div>
    
    `;
}