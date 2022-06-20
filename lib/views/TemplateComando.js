export function headerComando() {
    return /* html */`
    <nav aria-label="breadcrumb ">
        <ol class="breadcrumb navegacionColor rounded mt-2" >
            <li class="breadcrumb-item active text-light m-auto" aria-current="page" >
                <h4 class="text-center m-2"><i class="fa fa-flag"></i> COMANDOS</h4>
            </li>
        </ol>
    </nav>`;
}

//buscar Comando
export function BusquedaComando(props) {
    return /*html*/ `
      <div class="container">
          <div class="row d-flex justify-content-center" id="containerBusquedaComando">
            
              <div class="col-3"> 
                <div class="form-group">
                  <input list="searchClienteList" type="text" class="form-control" id="searchCliente" placeholder="Buscar Comando">
                  <datalist id="searchClienteList">
                    
                  </datalist>
                </div> 
              </div>
              <div class="col-3">
                <div class="form-group mx-auto">
                  <input list="searchCiudadList" type="text" class="form-control" id="searchCiudad" placeholder="Buscar Comando">
                  <datalist id="searchPlanList">
                    
                  </datalist>
                            </div>
                        </div>
              <div class="col-3">
              <div class="form-group">
                <input list="searchProvinciaList" type="text" class="form-control" id="searchProvincia" placeholder="Buscar Comando">
                <datalist id="searchProvinciaList">
                  
                </datalist>
              </div>
            </div>
            <div class="col">
              <div class="d-flex justify-content-start" id="botonesComando">
                <button type="button" id="btnBuscarComando" class="btn btn-success  btn btnBuscar" data-toggle="tooltip" > Buscar </button>
                <button type="button" id="btnModalAggComando" class="btn btn-warning  btn btnNewComando"  data-toggle="tooltip" style="margin-left: 5px;" style="margin-left: 5px;"><i class="fas fa-plus"></i> Nuevo Comando  </button>
                </div>
              </div>
            </div>
  
      </div>
      `;
}


//crear tabla Comando
export function tablaComando(props) {
    //console.log('esto es:', props)
    //console.log(props);
    let retorno = ``;
    props.forEach((element) => {
        retorno += /*html*/ `
          <tr>
            <td data-id="#: "> ${element.id_comando} </td>
            <td data-id="NOMBRE: "> ${element.nombre} </td>
            <td data-id="DESCR: "> ${element.fecha_creado} </td>
         <td class="d-flex justify-content-center"> 
             <button style="margin-right: 5px;" id="${element.id_comando}" 0 data-id = 0 class="btn btn-info btnNewViewEditComando mr-2 " title="Ver Comando"><i class="fa fa-eye" aria-hidden="true" style="font-size: 20px;"></i></button>
             <button id="${element.id_comando}" data-id = 0 class="btn btn-danger btnEliminarComando mr-2 " title="Eliminar Comando"><i class="fa fa-trash-o" aria-hidden="true" style="font-size: 20px;"></i></button>
         </td>
          </tr>`;
    });

    return /*html*/ `
      <div class="container-fluid  mt-4">
      <h4 class="text-center" style="color:white">LISTA COMANDOS</h4>
  
      <table  class="table table-striped table-bordered table-hover table-sortable justify-center" style="width:100%; background-color: white;" >
      
          <thead class="formBG text-center">
              <tr>
                  <th scope="col">#</th>
                  <th scope="col">NOMBRE</th>
                  <th scope="col">FECHA</th>
                    <th scope="col">ACCIONES</th>
              </tr> 
          </thead>    
          <tbody class="text-center">
             ${retorno}
          </tbody>
    </table>
   
    </div> `;
}


//modal nuevo/editar Comando
export function modalNuevoEditarComando() {
    return /*html*/ `
    <div class="modal fade" id="modalNuevoEditarComando2"  tabindex="-1" role="dialog" aria-labelledby="ComandoModalLabel" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog modal-xl" role="document" style="max-width:1300px;">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title  m-auto" id="clientesNuevoEditar">NUEVOS COMANDOS</h5>
            </div>
            <div class="modal-body" style="font-style: normal">
                <div class="tab-content" id="nav-tabContent">
                    <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                    <form>
                            <div class="row">
                                <div class="col">
                                    <div class="form-group">
                                        <label for="inpNombreComando" style="text-transform:uppercase; color:red">NOMBRE:</label>
                                        <input type="text" class="form-control" id="inpNombreComando" style="text-transform:uppercase">
                                        <small class="form-text text-muted">Este campo es obligatorio.</small>
                                    </div>
                                    
                                    <div class="form-group">
                                <label for="lblmov" style="text-transform:uppercase; color:red">MOVIMIENTO:</label>
                                <select id= "selectMovEditar" class="form-select" aria-label="Default select example">
                                    <option id="selectDefault" selected></option>
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
                <button id="btnCerrarNuevoComando" type="button" class="btn btn-danger">Cerrar</button>
                <button id="btnGuardarNuevoComando" type="button" class="btn btn-primary">Guardar</button>
                <button id="btnGuardarEditarComando" type="button" class="btn btn-primary">Editar</button>
                
            </div>
        </div>
    </div>
</div>`;
}

