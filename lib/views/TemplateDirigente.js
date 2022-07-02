export function headerDirigente() {
    return /* html */`
    <nav aria-label="breadcrumb ">
        <ol class="breadcrumb navegacionColor rounded mt-2" >
            <li class="breadcrumb-item active text-light m-auto" aria-current="page" >
                <h4 class="text-center m-2"><i class="fa fa-flag"></i> DIRIGENTES</h4>
            </li>
        </ol>
    </nav>`;
}

//buscar Dirigente
export function BusquedaDirigente(props) {
    return /*html*/ `
     <div class="container">
      <div class="row d-flex justify-content-center" id="containerBusquedaDirigente">
          <div class="form-group">
            <input list="searchDirigenteList" type="text" class="form-control" id="searchDirigente" placeholder="Prueba">
            <datalist id="searchDirigenteList">
              
            </datalist>
            <div class="col">
            <div class="d-flex justify-content-center" id="botonesDirigente" style="margin-top:5px">
              <button type="button" id="btnBuscarDirigente" class="btn btn-success  btn btnBuscar" data-toggle="tooltip" > Buscar </button>
              <button type="button" id="btnModalAggDirigente" class="btn btn-warning  btn btnNewDirigente"  data-toggle="tooltip" style="margin-left: 5px;" style="margin-left: 5px;"><i class="fas fa-plus"></i>Nuevo Dirigente</button>
              </div>
            </div>
          </div>
        
        </div>
  </div>
      `;
}


//crear tabla Dirigente
export function tablaDirigente(props) {
    //console.log('esto es:', props)
    //console.log(props);
    let retorno = ``;
    props.forEach((element) => {
        retorno += /*html*/ `
          <tr>
            <td data-id="#: "> ${element.id_dirigente} </td>
            <td data-id="NOMBRE: "> ${element.nombre} </td>
            <td data-id="DESCR: "> ${element.telefono} </td>
         <td class="d-flex justify-content-center"> 
             <button style="margin-right: 5px;" id="${element.id_dirigente}" 0 data-id = 0 class="btn btn-info btnNewViewEditDirigente mr-2 " title="Ver Dirigente"><i class="fa fa-eye" aria-hidden="true" style="font-size: 20px;"></i></button>
             <button id="${element.id_dirigente}" data-id = 0 class="btn btn-danger btnEliminarDirigente mr-2 " title="Eliminar Dirigente"><i class="fa fa-trash-o" aria-hidden="true" style="font-size: 20px;"></i></button>
         </td>
          </tr>`;
    });

    return /*html*/ `
      <div class="container-fluid  mt-4">
      <h4 class="text-center" style="color:white">LISTA DIRIGENTES</h4>
  
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


//modal nuevo/editar Dirigente
export function modalNuevoEditarDirigente() {
    return /*html*/ `
    <div class="modal fade" id="modalNuevoEditarDirigente2"  tabindex="-1" role="dialog" aria-labelledby="DirigenteModalLabel" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog modal-xl" role="document" style="max-width:1300px;">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title  m-auto" id="clientesNuevoEditar">NUEVOS DIRIGENTES</h5>
            </div>
            <div class="modal-body" style="font-style: normal">
                <div class="tab-content" id="nav-tabContent">
                    <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                    <form>
                            <div class="row">
                                <div class="col">
                                    <div class="form-group">
                                        <label for="inpNombreDirigente" style="text-transform:uppercase; color:red">NOMBRE:</label>
                                        <input type="text" class="form-control" id="inpNombreDirigente" style="text-transform:uppercase">
                                        <small class="form-text text-muted">Este campo es obligatorio.</small>
                                    </div>

                                    <label for="lblDropDownComando" style="text-transform:uppercase; color:red">Comandos:</label>
                                    <select id= "selectComando" class="form-select" aria-label="Default select example">
                                        <option id="selectDefaultComando" selected></option>
                                    </select>

                                    <div class="form-group">
                                        <label for="lblTelefono" style="text-transform:uppercase; color:red" >Cedula de Identidad:</label>
                                        <input type="text" class="form-control" id="inpCiDirigente" style="text-transform:uppercase">
                                        <small class="form-text text-muted">Este campo es obligatorio.</small>
                                    </div>
                                    <div class="form-group">
                                    <label for="lblTelefono" style="text-transform:uppercase; color:red" >TELEFONO:</label>
                                    <input type="text" class="form-control" id="inpTelefonoDirigente" style="text-transform:uppercase">
                                    <small class="form-text text-muted">Este campo es obligatorio.</small>
                                </div>

                                    <div class="form-group">
                                    <label for="lblCedula" style="text-transform:uppercase; color:red" >PASSWORD :</label>
                                    <input type="text" class="form-control" id="inpCiPasswordDirigente" style="text-transform:uppercase">
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
                <button id="btnCerrarNuevoDirigente" type="button" class="btn btn-danger">Cerrar</button>
                <button id="btnGuardarNuevoDirigente" type="button" class="btn btn-primary">Guardar</button>
                <button id="btnGuardarEditarDirigente" type="button" class="btn btn-primary">Editar</button>
                
            </div>
        </div>
    </div>
</div>`;
}


