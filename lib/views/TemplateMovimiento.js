export function headerMovimiento() {
    return /* html */`
    <nav aria-label="breadcrumb ">
        <ol class="breadcrumb navegacionColor rounded mt-2" >
            <li class="breadcrumb-item active text-light m-auto" aria-current="page" >
                <h4 class="text-center m-2"><i class="fa fa-flag"></i> MOVIMIENTOS</h4>
            </li>
        </ol>
    </nav>`;
}

//buscar movimiento
export function BusquedaMovimiento(props) {
    return /*html*/ `
      <div class="container">
      <div class="row d-flex justify-content-center" id="containerBusquedamovimiento">
          <div class="form-group">
            <input list="searchDirigenteList" type="text" class="form-control" id="searchDirigente" placeholder="Prueba">
            <datalist id="searchDirigenteList">
              
            </datalist>
            <div class="col">
            <div class="d-flex justify-content-center" id="botonesDirigente" style="margin-top:5px">
              <button type="button" id="btnBuscarMovimiento" class="btn btn-success  btn btnBuscar" data-toggle="tooltip" > Buscar </button>
              <button type="button" id="btnModalAggmovimiento" class="btn btn-warning  btn btnNewmovimiento"  data-toggle="tooltip" style="margin-left: 5px;" style="margin-left: 5px;"><i class="fas fa-plus"></i>Nuevo Movimiento</button>
              </div>
            </div>
          </div>
        
        </div>
  </div>
      `;
}


//crear tabla movimiento
export function tablaMovimiento(props) {
    //console.log('esto es:', props)
    //console.log(props);
    let retorno = ``;
    props.forEach((element) => {
        retorno += /*html*/ `
          <tr>
            <td data-id="#: "> ${element.id_movimiento} </td>
            <td data-id="NOMBRE: "> ${element.nombre} </td>
            <td data-id="DESCR: "> ${element.descripcion} </td>
         <td class="d-flex justify-content-center"> 
             <button style="margin-right: 5px;" id="${element.id_movimiento}" 0 data-id = 0 class="btn btn-info btnNewViewEditmovimiento mr-2 " title="Ver movimiento"><i class="fa fa-eye" aria-hidden="true" style="font-size: 20px;"></i></button>
             <button id="${element.id_movimiento}" data-id = 0 class="btn btn-danger btnEliminarmovimiento mr-2 " title="Eliminar movimiento"><i class="fa fa-trash-o" aria-hidden="true" style="font-size: 20px;"></i></button>
         </td>
          </tr>`;
    });

    return /*html*/ `
      <div class="container-fluid  mt-4">
      <h4 class="text-center" style="color:white">LISTA MOVIMIENTOS</h4>
  
      <table  class="table table-striped table-bordered table-hover table-sortable justify-center" style="width:100%; background-color: white;" >
      
          <thead class="formBG text-center">
              <tr>
                  <th scope="col">#</th>
                  <th scope="col">NOMBRE</th>
                  <th scope="col">DESCRIPCION</th>
                    <th scope="col">ACCIONES</th>
              </tr> 
          </thead>    
          <tbody class="text-center">
             ${retorno}
          </tbody>
    </table>
    
    </div> `;
}


//modal nuevo/editar movimiento
export function modalNuevoEditarMovimiento() {
  return /*html*/ `
    <div class="modal fade" id="modalNuevoEditarmovimiento"  tabindex="-1" role="dialog" aria-labelledby="movimientoModalLabel" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog modal-xl" role="document" style="max-width:1300px;">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title  m-auto" id="clientesNuevoEditar">NUEVO MOVIMIENTO</h5>
            </div>
            <div class="modal-body" >
                <div class="tab-content" id="nav-tabContent">
                    <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                    <form>
                            <div class="row">
                                <div class="col">
                                    <div class="form-group">
                                        <label for="lblNombre" style="text-transform:uppercase; color:black">NOMBRE</label>
                                        <input type="text" class="form-control" id="inpNombreFraccion" style="text-transform:uppercase">
                                        <small class="form-text text-muted">Este campo es obligatorio.</small>
                                    </div>
                                    <div class="form-group">
                                        <label for="lbldoc" style="text-transform:uppercase; color:black">descripcion</label>
                                        <input type="text" class="form-control" id="inpDesFraccion" style="text-transform:uppercase">
                                        <small class="form-text text-muted">Este campo es obligatorio.</small>
                                    </div>

                                    <div class="form-group">
                                        <label for="lblprov" style="text-transform:uppercase; color:black">localidad:</label>
                                        <select id= "selectProvNuevoFraccion" class="form-select" aria-label="Default select example">
                                            <option id="selectDefaultNuevoFraccion" selected></option>
                                        </select>
                                        <br>
                                        <div class="form-group">
                                        <label for="lblObs" style="text-transform:uppercase; color:black">Observaciones</label>
                                        <input type="text" class="form-control" id="inpObsNuevoCliente" style="text-transform:uppercase">
                                    </div>
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
                <button id="btnCerrarNuevomovimiento" type="button" class="btn btn-danger">Cerrar</button>
                <button id="btnGuardarNuevomovimiento" type="button" class="btn btn-primary">Guardar</button>
                <button id="btnGuardarEditarmovimiento" type="button" class="btn btn-primary">Editar</button>
                
            </div>
        </div>
    </div>
</div>`;
}


