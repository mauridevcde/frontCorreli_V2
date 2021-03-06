
//header lista producto
export function headerLista() {
    return /* html */`
    <nav aria-label="breadcrumb ">
        <ol class="breadcrumb navegacionColor rounded mt-2" >
            <li class="breadcrumb-item active text-light m-auto" aria-current="page" >
                <h4 class="text-center m-2"><i class="fa fa-list"></i> GRUPO</h4>
            </li>
        </ol>
    </nav>`;
}

//buscar Lista
export function BusquedaLista(props) {
    return /*html*/ `
      <div class="container">
      <div class="row d-flex justify-content-center" id="containerBusquedaLista">
          <div class="form-group">
            <input list="searchDirigenteList" type="text" class="form-control" id="searchLista" placeholder="Prueba">
            <datalist id="searchListaList">
              
            </datalist>
            <div class="col">
            <div class="d-flex justify-content-center" id="botonesDirigente" style="margin-top:5px">
              <button type="button" id="btnBuscarLista" class="btn btn-success  btn btnBuscar" data-toggle="tooltip" > Buscar </button>
              <button type="button" id="btnModalAggLista" class="btn btn-warning  btn btnNewLista"  data-toggle="tooltip" style="margin-left: 5px;" style="margin-left: 5px;"><i class="fas fa-plus"></i>Nuevo Grupo</button>
              </div>
            </div>
          </div>
        
        </div>
  </div>
      `;
}


//crear tabla Lista
export function tablaLista(props) {
    console.log('esto es:', props)
    //console.log(props);
    let retorno = ``;
    if (!localStorage.getItem('id_dirigente')) {
        
        props.forEach((element) => {
            retorno += /*html*/ `
          <tr>
            <td data-id="#: "> ${element.id_grupo} </td>
            <td data-id="NOMBRE: "> ${element.nombre} </td>
            <td data-id="DESCR: "> ${element.fecha_creado} </td>
         <td class="d-flex justify-content-center"> 
             <button style="margin-right: 5px;" id="${element.id_grupo}" 0 data-id = 0 class="btn btn-info btnNewViewEditLista mr-2 " title="Ver Lista"><i class="fa fa-eye" aria-hidden="true" style="font-size: 20px;"></i></button>
             <button id="${element.id_grupo}" data-id = 0 class="btn btn-danger btnEliminarLista mr-2 " title="Eliminar Lista"><i class="fa fa-trash-o" aria-hidden="true" style="font-size: 20px;"></i></button>
         </td>
          </tr>`;
        });

        return /*html*/ `
      <div class="container-fluid  mt-4">
      <h4 class="text-center" style="color:white">GRUPO </h4>
  
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
   
    </div> `
    } else {
        
        console.log('esto es dentro de nueva sentencia:', props)
        let gruposPorDirigente = props
        gruposPorDirigente.forEach((element) => {
            console.log('elementos de gruposPorDirigentes', element)
            retorno += /*html*/ `
          <tr>
            <td data-id="#: "> ${element.grupos.id_grupo} </td>
            <td data-id="NOMBRE: "> ${element.grupos.nombre} </td>
         <td class="d-flex justify-content-center"> 
             <button style="margin-right: 5px;" id="${element.grupos.id_grupo}" 0 data-id = 0 class="btn btn-info btnNewViewEditLista mr-2 " title="Ver Lista"><i class="fa fa-eye" aria-hidden="true" style="font-size: 20px;"></i></button>
             <button id="${element.grupos.id_grupo}" data-id = 0 class="btn btn-danger btnEliminarLista mr-2 " title="Eliminar Lista"><i class="fa fa-trash-o" aria-hidden="true" style="font-size: 20px;"></i></button>
         </td>
          </tr>`;
        });
        
        return /*html*/ `
      <div class="container-fluid  mt-4">
      <h4 class="text-center" style="color:white">GRUPO </h4>
  
      <table  class="table table-striped table-bordered table-hover table-sortable justify-center" style="width:100%; background-color: white;" >
      
          <thead class="formBG text-center">
              <tr>
                  <th scope="col">#</th>
                  <th scope="col">NOMBRE</th>
                    <th scope="col">ACCIONES</th>
              </tr> 
          </thead>    
          <tbody class="text-center">
             ${retorno}
          </tbody>
    </table>
   
    </div> `
    }
}

//modal nuevo/editar Lista
export function modalNuevoEditarLista() {
    return /*html*/ `
    <div class="modal fade" id="modalNuevoEditarLista"  tabindex="-1" role="dialog" aria-labelledby="ListaModalLabel" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog modal-xl" role="document" style="max-width:1300px;">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title  m-auto" id="ListaNuevoEditar">NUEVO GRUPO</h5>
            </div>
            <div class="modal-body" style="font-style: normal">
                <div class="tab-content" id="nav-tabContent">
                    <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                    <form>
                                <div class="row">
                                    <div class="col">
                                    
                                        <div class="form-group">
                                            <label for="inpNombreLista" style="text-transform:uppercase; color:red">NOMBRE GRUPO:</label>
                                            <input type="text" class="form-control" id="inpNombreLista" style="text-transform:uppercase">
                                            <small class="form-text text-muted">Este campo es obligatorio.</small>
                                        </div>
                                                            
                                        <div class="form-group">
                                        <label for="lblDropDownDirigente" style="text-transform:uppercase; color:red">Elija Dirigente:</label>
                                        <select id= "selectDirigente" class="form-select" aria-label="Default select example">
                                            <option id="selectDefaultDirigente" selected></option>
                                        </select>
                                        <small class="form-text text-muted">Este campo es obligatorio.</small>
                                        </div>

                                        <div class="form-group">
                                        <label for="lblDropDownMovimiento" style="text-transform:uppercase; color:red">Elija COMANDO:</label>
                                        <select id= "selectMovimiento" class="form-select" aria-label="Default select example">
                                            <option id="selectDefaultMovimiento" selected></option>
                                        </select>
                                        <small class="form-text text-muted">Este campo es obligatorio.</small>
                                        </div>
                
                                        <div class="form-group">
                                        <label for="lblDropDownPuntero" style="text-transform:uppercase; color:red">Elija PUNTERO:</label>
                                        <select id= "selectPuntero" class="form-select" aria-label="Default select example">
                                            <option id="selectDefaultPuntero" selected></option>
                                        </select>
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
                <button id="btnCerrarNuevoLista" type="button" class="btn btn-danger">Cerrar</button>
                <button id="btnGuardarNuevoLista" type="button" class="btn btn-primary">Guardar</button>
                <button id="btnGuardarEditarLista" type="button" class="btn btn-primary">Editar</button>
                
            </div>
        </div>
    </div>
</div>`;
}

