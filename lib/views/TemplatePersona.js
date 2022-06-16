
//header lista producto
export function headerPersona() {
    return /* html */`
    <nav aria-label="breadcrumb ">
        <ol class="breadcrumb navegacionColor rounded mt-2" >
            <li class="breadcrumb-item active text-light m-auto" aria-current="page" >
                <h4 class="text-center m-2"><i class="fa fa-users"></i> Personas</h4>
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
                <label for="exampleInputEmail1" class="form-label">CI/DNI</label>
                <div class="form-row " style="display: flex; justify-content: center;">
                <div class="col-3" style="width: 100%; display: flex;">
                    <input type="text" class="form-control" id="searchCiColorado" placeholder="">
                    <datalist id="searchPlanList">
                    </datalist>
                    <button type="button" id="btnBuscarCliente" class="btn  btn btnBuscar" data-toggle="tooltip" style="margin-left: 5px; background-color:#C12329; color: #FFFFFF" > Buscar </button>
                </div>
            </div>
            </div>
                    <div class="mb-3 mt-3">
                        <label for="exampleInputEmail1" class="form-label">Nombre</label>
                        <input type="text" class="form-control" id="inputName">
                    </div>
                    <div class="mb-3 mt-3">
                        <label for="exampleInputEmail1" class="form-label">Apellido</label>
                        <input type="text" class="form-control" id="inputSurname">
                    </div>
                    <div class="mb-3 mt-3">
                        <label for="exampleInputEmail1" class="form-label">Fecha De Nacimiento</label>
                        <input type="text" class="form-control" id="inputDate" >
                    </div>
                    <div class="mb-3 mt-3">
                    <label for="exampleInputEmail1" class="form-label">Partido</label>
                    <input type="text" class="form-control" id="inputPartido">

                </div>
                    <div class="mb-3 mt-3">
                    <label for="exampleInputEmail1" class="form-label">Direccion</label>
                    <input type="text" class="form-control" id="inputDireccion">
                    
                    </div>

                    <div class="mb-3 mt-3">
                        <label for="exampleInputEmail1" class="form-label">Departamento</label>
                        <input type="text" class="form-control" id="inputDepartamento">

                    </div>

                    <div class="mb-3 mt-3">
                        <label for="exampleInputEmail1" class="form-label">Distrito</label>
                        <input type="text" class="form-control" id="inputDistrito">
                    </div>
                    <div class="mb-3 mt-3">
                        <label for="exampleInputEmail1" class="form-label">Localidad</label>
                        <input type="text" class="form-control" id="inputLocalidad">
                    </div>
                    <div class="mb-3 mt-3">
                        <label for="exampleInputEmail1" class="form-label">Mesa</label>
                        <input type="text" class="form-control" id="inputMesa">
                    </div>
                    <div class="mb-3 mt-3">
                        <label for="exampleInputEmail1" class="form-label">Orden</label>
                        <input type="text" class="form-control" id="inputOrden">
                    </div>
                    <div class="mb-3 mt-3">
                        <label for="exampleInputEmail1" class="form-label">Zona</label>
                        <input type="text" class="form-control" id="inputZona">
                    </div>
                    <div class="mb-3 mt-3">
                    <label for="exampleInputEmail1" class="form-label">Telefono</label>
                    <input type="text" class="form-control" id="inputTelefonoPersonas">

                </div>
                <div class="mb-3 mt-3">
                <label for="exampleInputEmail1" class="form-label">Correo</label>
                <input type="text" class="form-control" id="inputCorreo">
            </div>
                    <div class="mb-3 mt-3">
                        <label for="exampleInputEmail1" class="form-label">Foto</label>
                        <style>
                        .image-preview45 {
                            max-width:50%;
                            max-height:auto;
                            min-height:100px;
                            border:2px solid #dddddd;
                            margin-top:15px;
                            objet-fit:cover;
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
                    
                    <div class= "mb-3">
                        <input type="file" name="inpFile" id="inpFileNewProducto">
                        <div class="image-preview45" id="imagePreviewNewProducto">
                        <img src="" alt="" class="imgPreviewImageNewProducto">
                        <span class="imgPreviewTextNewProducto">No hay imagenes</span>
                        </div>
                    </div>
                    </div>
                    
          
                   
                    <div class="mb-3 mt-3">
                        <label for="exampleInputEmail1" class="form-label">Indica tu dirección en el mapa</label>
                        <div id="map"></div>

                    </div>

                    <div class="row mb-3 mt-3">
                        <div class="col">
                            <label for="contactLat" class="mr-2">Latitud</label>
                            <input class="form-control mr-2" id="contactLat" name="contactLat" readonly>
                        </div>

                        <div class="col">
                            <label for="contactLng" class="mr-2">Longitud</label>
                            <input class="form-control mr-2" id="contactLng" name="contactLng" readonly>
                        </div>

                    </div>
      
                    <div class="mb-3 mt-3">
                        <label for="textAreaObs">Observaciones</label>
                        <textarea class="form-control" placeholder="Agregue una observación" id="textAreaObs"></textarea>
                        

                    </div>
                    <div class="mb-3 d-flex justify-content-center">
                        <button type="submit" class="btn btn-primary" id="btnGuardarNewCorreli"><i class="fas fa-check"></i> Guardar</button>
                        <button type="submit" class="btn btn-primary" id="btnActualizarNewCorreli"><i class="fas fa-check"></i> Editar</button>
                        <button type="submit" class="btn btn-primary" id="btnNewCorreli" style="visibility: hidden;"><i class="fas fa-check"></i> Nuevo Correli</button>
                    </div>
                </div>
            </div>
        </div>
    
    `;
}