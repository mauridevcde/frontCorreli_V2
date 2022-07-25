export function headerPuntero() {
    return /* html */`
    <nav aria-label="breadcrumb ">
        <ol class="breadcrumb navegacionColor rounded mt-2" >
            <li class="breadcrumb-item active text-light m-auto" aria-current="page" >
                <h4 class="text-center m-2"><i class="fa fa-flag"></i> PUNTEROS</h4>
            </li>
        </ol>
    </nav>`;
}

//buscar Puntero
export function BusquedaPuntero(props) {
    return /*html*/ `
      <div class="container">
      <div class="row d-flex justify-content-center" id="containerBusquedaPuntero">
          <div class="form-group">
            <input list="searchDirigenteList" type="text" class="form-control" id="searchPuntero" placeholder="Prueba">
            <datalist id="searchDirigenteList">
              
            </datalist>
            <div class="col">
            <div class="d-flex justify-content-center" id="botonesDirigente" style="margin-top:5px">
              <button type="button" id="btnBuscarPuntero" class="btn btn-success  btn btnBuscar" data-toggle="tooltip" > Buscar </button>
              <button type="button" id="btnModalAggPuntero" class="btn btn-warning  btn btnNewPuntero"  data-toggle="tooltip" style="margin-left: 5px;" style="margin-left: 5px;"><i class="fas fa-plus"></i>Nuevo Puntero</button>
              </div>
            </div>
          </div>
        
        </div>
  </div>
      `;
}


//crear tabla Puntero
export function tablaPuntero(props) {
    //console.log('esto es:', props)
    //console.log(props);
    let retorno = ``;



    if (!localStorage.getItem('id_dirigente')) {
        props.forEach((element) => {
            retorno += /*html*/ `
              <tr>
                <td data-id="#: "> ${element.id_puntero} </td>
                <td data-id="NOMBRE: "> ${element.nombre} </td>
                <td data-id="DESCR: "> ${element.telefono} </td>
             <td class="d-flex justify-content-center"> 
                 <button style="margin-right: 5px;" id="${element.id_puntero}" 0 data-id = 0 class="btn btn-info btnNewViewEditPuntero mr-2 " title="Ver Puntero"><i class="fa fa-eye" aria-hidden="true" style="font-size: 20px;"></i></button>
                 <button id="${element.id_puntero}" data-id = 0 class="btn btn-danger btnEliminarPuntero mr-2 " title="Eliminar Puntero"><i class="fa fa-trash-o" aria-hidden="true" style="font-size: 20px;"></i></button>
             </td>
              </tr>`;
        });

        return /*html*/ `
          <div class="container-fluid  mt-4">
          <h4 class="text-center" style="color:white">LISTA PUNTEROS</h4>
      
          <table  class="table table-striped table-bordered table-hover table-sortable justify-center" style="width:100%; background-color: white;" >
          
              <thead class="formBG text-center">
                  <tr>
                      <th scope="col">#</th>
                      <th scope="col">NOMBRE</th>
                      <th scope="col">TELEFONO</th>
                      <th scope="col">ACCIONES</th>
                  </tr> 
              </thead>    
              <tbody class="text-center">
                 ${retorno}
              </tbody>
        </table>
       
        </div> `;
    } else {
        //console.log('ESTOY EN EL HTML Y TENGO ESTOS DATOS',props)
        let punteroPorDirigente = props;

        punteroPorDirigente.forEach((element) => {
            retorno += /*html*/ `
              <tr>
                <td data-id="#: "> ${element.id_puntero} </td>
                <td data-id="NOMBRE: "> ${element.nombre} </td>
                <td data-id="DESCR: "> ${element.telefono} </td>
             <td class="d-flex justify-content-center"> 
                 <button style="margin-right: 5px;" id="${element.id_puntero}" 0 data-id = 0 class="btn btn-info btnNewViewEditPuntero mr-2 " title="Ver Puntero"><i class="fa fa-eye" aria-hidden="true" style="font-size: 20px;"></i></button>
                 <button id="${element.id_puntero}" data-id = 0 class="btn btn-danger btnEliminarPuntero mr-2 " title="Eliminar Puntero"><i class="fa fa-trash-o" aria-hidden="true" style="font-size: 20px;"></i></button>
             </td>
              </tr>`;

        });

        return /*html*/ `
          <div class="container-fluid  mt-4">
          <h4 class="text-center" style="color:white">LISTA PUNTEROS</h4>
      
          <table  class="table table-striped table-bordered table-hover table-sortable justify-center" style="width:100%; background-color: white;" >
          
              <thead class="formBG text-center">
                  <tr>
                      <th scope="col">#</th>
                      <th scope="col">NOMBRE</th>
                      <th scope="col">TELEFONO</th>
                      <th scope="col">ACCIONES</th>
                  </tr> 
              </thead>    
              <tbody class="text-center">
                 ${retorno}
              </tbody>
        </table>
       
        </div> `;
    }
}


//modal nuevo/editar Puntero
export function modalNuevoEditarPuntero() {
    return /*html*/ `
    <div class="modal fade" id="modalNuevoEditarPuntero2"  tabindex="-1" role="dialog" aria-labelledby="PunteroModalLabel" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog modal-xl" role="document" style="max-width:1300px;">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title  m-auto" id="clientesNuevoEditar">NUEVOS PUNTEROS</h5>
            </div>
            <div class="modal-body" style="font-style: normal">
                <div class="tab-content" id="nav-tabContent">
                    <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                    <form>
                            <div class="row">
                                <div class="col">
                                    <div class="form-group">
                                        <label for="inpNombrePuntero" style="text-transform:uppercase; color:red">NOMBRE - Apellido :</label>
                                        <input type="text" class="form-control" id="inpNombrePuntero" style="text-transform:uppercase">
                                        <small class="form-text text-muted">Este campo es obligatorio.</small>
                                    </div>
                                    <div class="form-group">
                                        <label for="lblTelefono" style="text-transform:uppercase; color:red" >Telefono / Whatsapp :</label>
                                        <input type="text" class="form-control" id="inpTelefonoPuntero" style="text-transform:uppercase">
                                        <small class="form-text text-muted">Este campo es obligatorio.</small>
                                    </div>
                                    <div class="form-group">
                                        <label for="lblCedula" style="text-transform:uppercase; color:red" >Cedula de Identidad :</label>
                                        <input type="text" class="form-control" id="inpCiPuntero" style="text-transform:uppercase">
                                        <small class="form-text text-muted">Este campo es obligatorio.</small>
                                    </div>
                                    <div class="form-group">
                                        <label for="lblEmail" style="text-transform:uppercase; color:red" >Email / Correo :</label>
                                        <input type="text" class="form-control" id="inpEmailPuntero" style="text-transform:uppercase">
                                        <small class="form-text text-muted">Este campo es obligatorio.</small>
                                    </div>
                                    <div class="form-group">
                                        <label for="lblPassword" style="text-transform:uppercase; color:red" >Password :</label>
                                        <input type="password" class="form-control" id="inpPasswordPuntero" style="text-transform:uppercase">
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
                <button id="btnCerrarNuevoPuntero" type="button" class="btn btn-danger">Cerrar</button>
                <button id="btnGuardarNuevoPuntero" type="button" class="btn btn-primary">Guardar</button>
                <button id="btnGuardarEditarPuntero" type="button" class="btn btn-primary">Editar</button>
                
            </div>
        </div>
    </div>
</div>`;
}


