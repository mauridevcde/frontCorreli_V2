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
            
              <div class="col-3"> 
                <div class="form-group">
                  <input list="searchClienteList" type="text" class="form-control" id="searchCliente" placeholder="Buscar ListaVotantes">
                  <datalist id="searchClienteList">
                    
                  </datalist>
                </div> 
              </div>
              <div class="col-3">
                <div class="form-group mx-auto">
                  <input list="searchCiudadList" type="text" class="form-control" id="searchCiudad" placeholder="Buscar ListaVotantes">
                  <datalist id="searchPlanList">
                    
                  </datalist>
                            </div>
                        </div>
              <div class="col-3">
              <div class="form-group">
                <input list="searchProvinciaList" type="text" class="form-control" id="searchProvincia" placeholder="Buscar ListaVotantes">
                <datalist id="searchProvinciaList">
                  
                </datalist>
              </div>
            </div>
            <div class="col">
              <div class="d-flex justify-content-start" id="botonesListaVotantes">
                <button type="button" id="btnBuscarListaVotantes" class="btn btn-success  btn btnBuscar" data-toggle="tooltip" > Buscar </button>
                <button type="button" id="btnModalAggListaVotantes" class="btn btn-warning  btn btnNewListaVotantes"  data-toggle="tooltip" style="margin-left: 5px;" style="margin-left: 5px;"><i class="fas fa-plus"></i> Nuevo ListaVotantes  </button>
                </div>
              </div>
            </div>
  
      </div>
      `;
}


//crear tabla ListaVotantes
export function tablaListaVotantes(props) {
    //console.log('esto es:', props)
    //console.log(props);
    let retorno = ``;
    props.forEach((element) => {
        retorno += /*html*/ `
          <tr>
            <td data-id="#: "> 1 </td>
            <td data-id="NOMBRE: ">  343443 </td>
            <td data-id="DESCR: "> JUAN PEREZ </td>
         <td class="d-flex justify-content-center"> 
             <button style="margin-right: 5px;" id="${element.id_puntero}" 0 data-id = 0 class="btn btn-info btnNewViewEditListaVotantes mr-2 " title="Ver ListaVotantes"><i class="fa fa-eye" aria-hidden="true" style="font-size: 20px;"></i></button>
             <button id="${element.id_puntero}" data-id = 0 class="btn btn-danger btnEliminarListaVotantes mr-2 " title="Eliminar ListaVotantes"><i class="fa fa-trash-o" aria-hidden="true" style="font-size: 20px;"></i></button>
         </td>
          </tr>
          <tr>
            <td data-id="#: "> 2 </td>
            <td data-id="NOMBRE: "> 4343434 </td>
            <td data-id="DESCR: "> JOSE CAÑETE </td>
         <td class="d-flex justify-content-center"> 
             <button style="margin-right: 5px;" id="${element.id_puntero}" 0 data-id = 0 class="btn btn-info btnNewViewEditListaVotantes mr-2 " title="Ver ListaVotantes"><i class="fa fa-eye" aria-hidden="true" style="font-size: 20px;"></i></button>
             <button id="${element.id_puntero}" data-id = 0 class="btn btn-danger btnEliminarListaVotantes mr-2 " title="Eliminar ListaVotantes"><i class="fa fa-trash-o" aria-hidden="true" style="font-size: 20px;"></i></button>
         </td>
          </tr>
          <tr>
          <td data-id="#: "> 3 </td>
          <td data-id="NOMBRE: "> 4343434 </td>
          <td data-id="DESCR: "> ANA GONZALEZ </td>
       <td class="d-flex justify-content-center"> 
           <button style="margin-right: 5px;" id="${element.id_puntero}" 0 data-id = 0 class="btn btn-info btnNewViewEditListaVotantes mr-2 " title="Ver ListaVotantes"><i class="fa fa-eye" aria-hidden="true" style="font-size: 20px;"></i></button>
           <button id="${element.id_puntero}" data-id = 0 class="btn btn-danger btnEliminarListaVotantes mr-2 " title="Eliminar ListaVotantes"><i class="fa fa-trash-o" aria-hidden="true" style="font-size: 20px;"></i></button>
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
                  <th scope="col">#</th>
                  <th scope="col">CI</th>
                  <th scope="col">NOMBRE</th>
                    <th scope="col">ACCIONES</th>
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
                <h5 class="modal-title  m-auto" id="clientesNuevoEditar">NUEVOS LISTA VOTANTES</h5>
            </div>
            <div class="modal-body" style="font-style: normal">
                <div class="tab-content" id="nav-tabContent">
                    <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                    <form>
                            <div class="row">
                                <div class="col">
                                    <div class="form-group">
                                        <label for="inpNombreListaVotantes" style="text-transform:uppercase; color:red">NOMBRE - Apellido :</label>
                                        <input type="text" class="form-control" id="inpNombreListaVotantes" style="text-transform:uppercase">
                                        <small class="form-text text-muted">Este campo es obligatorio.</small>
                                    </div>
                                    <div class="form-group">
                                        <label for="lblTelefono" style="text-transform:uppercase; color:red" >Telefono / Whatsapp :</label>
                                        <input type="text" class="form-control" id="inpTelefonoListaVotantes" style="text-transform:uppercase">
                                        <small class="form-text text-muted">Este campo es obligatorio.</small>
                                    </div>
                                    <div class="form-group">
                                        <label for="lblCedula" style="text-transform:uppercase; color:red" >Cedula de Identidad :</label>
                                        <input type="text" class="form-control" id="inpCiListaVotantes" style="text-transform:uppercase">
                                        <small class="form-text text-muted">Este campo es obligatorio.</small>
                                    </div>
                                    <div class="form-group">
                                        <label for="lblEmail" style="text-transform:uppercase; color:red" >Email / Correo :</label>
                                        <input type="text" class="form-control" id="inpEmailListaVotantes" style="text-transform:uppercase">
                                        <small class="form-text text-muted">Este campo es obligatorio.</small>
                                    </div>
                                    <div class="form-group">
                                        <label for="lblPassword" style="text-transform:uppercase; color:red" >Password :</label>
                                        <input type="password" class="form-control" id="inpPasswordListaVotantes" style="text-transform:uppercase">
                                        <small class="form-text text-muted">Este campo es obligatorio.</small>
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
                <button id="btnCerrarNuevoListaVotantes" type="button" class="btn btn-danger">Cerrar</button>
                <button id="btnGuardarNuevoListaVotantes" type="button" class="btn btn-primary">Guardar</button>
                <button id="btnGuardarEditarListaVotantes" type="button" class="btn btn-primary">Editar</button>
                
            </div>
        </div>
    </div>
</div>`;
}


