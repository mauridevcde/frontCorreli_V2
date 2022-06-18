
//header lista producto
export async function headerLista() {
    return /* html */`
    <nav aria-label="breadcrumb ">
        <ol class="breadcrumb navegacionColor rounded mt-2" >
            <li class="breadcrumb-item active text-light m-auto" aria-current="page" >
                <h4 class="text-center m-2"><i class="fa fa-list"></i> Lista</h4>
            </li>
        </ol>
    </nav>`;
}

//buscar Lista
export function BusquedaLista(props) {
    return /*html*/ `
      <div class="container">
          <div class="row d-flex justify-content-center" id="containerBusquedaLista">
            
              <div class="col-3"> 
                <div class="form-group">
                  <input list="searchClienteList" type="text" class="form-control" id="searchCliente" placeholder="Buscar Lista">
                  <datalist id="searchClienteList">
                    
                  </datalist>
                </div>
              </div>
              <div class="col-3">
                <div class="form-group mx-auto">
                  <input list="searchCiudadList" type="text" class="form-control" id="searchCiudad" placeholder="Buscar Lista">
                  <datalist id="searchPlanList">
                    
                  </datalist>
                            </div>
                        </div>
              <div class="col-3">
              <div class="form-group">
                <input list="searchProvinciaList" type="text" class="form-control" id="searchProvincia" placeholder="Buscar Lista">
                <datalist id="searchProvinciaList">
                  
                </datalist>
              </div>
            </div>
            <div class="col">
              <div class="d-flex justify-content-start" id="botonesLista">
                <button type="button" id="btnBuscar" class="btn btn-success  btn btnBuscar" data-toggle="tooltip" > Buscar </button>
                <button type="button" id="btnModalAggLista" class="btn btn-warning  btn btnNewLista"  data-toggle="tooltip" style="margin-left: 5px;" style="margin-left: 5px;"><i class="fas fa-plus"></i> Nuevo Lista  </button>
                </div>
  
              </div>
  
            </div>
  
      </div>
      `;
}


//crear tabla Lista
export function tablaLista(props) {
    //console.log('esto es:', props)
    //console.log(props);
    let retorno = ``;
    props.forEach((element) => {
        retorno += /*html*/ `
          <tr>
            <td data-id="#: "> ${element.id_lista} </td>
            <td data-id="NOMBRE: "> ${element.fecha_creado} </td>
            <td data-id="DESCR: "> ${element.descripcion} </td>
         <td class="d-flex justify-content-center"> 
             <button style="margin-right: 5px;" id="${element.id_lista}" 0 data-id = 0 class="btn btn-info btnNewViewEditLista mr-2 " title="Ver Lista"><i class="fa fa-eye" aria-hidden="true" style="font-size: 20px;"></i></button>
             <button id="${element.id_lista}" data-id = 0 class="btn btn-danger btnEliminarLista mr-2 " title="Eliminar Lista"><i class="fa fa-trash-o" aria-hidden="true" style="font-size: 20px;"></i></button>
         </td>
          </tr>`;
    });

    return /*html*/ `
      <div class="container-fluid  mt-4">
      <h4 class="text-center" style="color:white">LISTA </h4>
  
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


//modal nuevo/editar Lista
export function modalNuevoEditarLista() {
    return /*html*/ `
    <div class="modal fade" id="modalNuevoEditarLista"  tabindex="-1" role="dialog" aria-labelledby="ListaModalLabel" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog modal-xl" role="document" style="max-width:1300px;">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title  m-auto" id="ListaNuevoEditar">NUEVAS LISTAS</h5>
            </div>
            <div class="modal-body" style="font-style: normal">
                <div class="tab-content" id="nav-tabContent">
                    <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                    <form>
                            <div class="row">
                                <div class="col">
                                    <div class="form-group">
                                        <label for="inpNombreLista" style="text-transform:uppercase; color:red">NOMBRE LISTA :</label>
                                        <input type="text" class="form-control" id="inpNombreLista" style="text-transform:uppercase">
                                        <small class="form-text text-muted">Este campo es obligatorio.</small>
                                    </div>
                            
                                    <div class="form-group">
                                        <label for="lblDirigente" style="text-transform:uppercase; color:red" >DIRIGENTE :</label>
                                        <input type="text" class="form-control" id="inpDirigente" style="text-transform:uppercase">
                                        <small class="form-text text-muted">Este campo es obligatorio.</small>
                                    </div>
                            
                                    <div class="form-group">
                                    <label for="lblDropDownMovimiento" style="text-transform:uppercase; color:red">Elija MOVIMIENTO :</label>
                                    <select id= "selectMovimiento" class="form-select" aria-label="Default select example">
                                        <option id="selectDefaultMovimiento" selected></option>
                                    </select>
                                    </div>
               
                                    <div class="form-group">
                                    <label for="lblDropDownPuntero" style="text-transform:uppercase; color:red">Elija PUNTERO :</label>
                                    <select id= "selectPuntero" class="form-select" aria-label="Default select example">
                                        <option id="selectDefaultPuntero" selected></option>
                                    </select>
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
                <button id="btnCerrarNuevoLista" type="button" class="btn btn-danger">Cerrar</button>
                <button id="btnGuardarNuevoLista" type="button" class="btn btn-primary">Guardar</button>
                <button id="btnGuardarEditarLista" type="button" class="btn btn-primary">Editar</button>
                
            </div>
        </div>
    </div>
</div>`;
}

