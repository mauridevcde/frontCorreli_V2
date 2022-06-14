export async function headerFaccion() {
    return /* html */`
    <nav aria-label="breadcrumb ">
        <ol class="breadcrumb navegacionColor rounded mt-2" >
            <li class="breadcrumb-item active text-light m-auto" aria-current="page" >
                <h4 class="text-center m-2"><i class="fa fa-flag"></i> Facciones</h4>
            </li>
        </ol>
    </nav>`;
}

//buscar Cliente
export async function BusquedaFaccion(props) {
    return /*html*/ `
      <div class="container">
          <div class="row d-flex justify-content-center">
            
              <div class="col-3"> 
                <div class="form-group">
                  <input list="searchClienteList" type="text" class="form-control" id="searchCliente" placeholder="Buscar Cliente">
                  <datalist id="searchClienteList">
                    
                  </datalist>
                </div>
              </div>
              <div class="col-3">
                <div class="form-group mx-auto">
                  <input list="searchCiudadList" type="text" class="form-control" id="searchCiudad" placeholder="Buscar Ciudad">
                  <datalist id="searchPlanList">
                    
                  </datalist>
                            </div>
                        </div>
              <div class="col-3">
              <div class="form-group">
                <input list="searchProvinciaList" type="text" class="form-control" id="searchProvincia" placeholder="Buscar Provincia">
                <datalist id="searchProvinciaList">
                  
                </datalist>
              </div>
            </div>
                      
  
            <div class="col">
              <div class="d-flex justify-content-start">
                <button type="button" id="btnBuscar" class="btn btn-success  btn btnBuscar" data-toggle="tooltip" > Buscar </button>
                <button type="button" id="btnModalAggCliente" class="btn btn-warning  btn btnAggCliente"  data-toggle="tooltip" style="margin-left: 5px;" style="margin-left: 5px;"><i class="fas fa-plus"></i> Nuevo Cliente </button>
                </div>
  
              </div>
  
            </div>
  
      </div>
      `;
  }
  

