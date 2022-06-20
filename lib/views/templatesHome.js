export function toast(props) {
  return /* html */ `
    <div aria-live="polite" aria-atomic="true" style="position: relative;" >
		<div id="myToast" class="toast" style="position: absolute; top: 0; right: 0;" data-autohide="true">
			    <div class="toast-header bg-success">
			      <img src="" class="rounded mr-2" alt="">
			      <strong class="mr-auto text-white">${props.title}</strong>
			      <small class="text-white">${props.id}</small>
			      <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
			        <span aria-hidden="true">&times;</span>
			      </button>
			    </div>
                
			    <div class="toast-body">
			     
			    </div>
		</div>
	</div>
            ` /*  ${props.content} */;
}

//BARRAS DE NAVEGACION
export function navBarPrincipal(props) {
  //navBar principal

  return /*html */ `
    <div class="container" >
        <div class="card text-center" style="margin-top: 15%;box-shadow: 5px 5px 10px rgba(0,0,0,0.2); border-color: #C44D4D ; border-radius: 6px">
            <div class="card-header text-muted" style=" background-color: #C44D4D; color: white">
              <i class="fas fa-home" style="color: white;"></i> <a  style="color: white;">INICIO</a>
            </div>
            <div class="card-body">
                <img src="../lib/img/partidoColorado.png" width="240px" style="border-radius:10px; box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;" />

               <div class="contenedorBotonesNavPrincipal">
               <p class="card-text"></p>
               <a  id="listaMovimientosBtn" class="btn btn-info  btn-lg text-white" style="background-color:#E2504C; border-color:#E2504C; box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;" >
               <i class="fa fa-flag" aria-hidden="true"></i>
               <br>Movimiento</a>
               
                <a  id="ComandoBtn" class="btn btn-success  btn-lg text-white" style="background-color: #EC2300; border-color: #EC2300; box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;" >
                <i class="fa fa-pencil-square" aria-hidden="true"></i>
                <br>Comando</a>

                <a  id="dirigenteBtn" class="btn btn-success  btn-lg text-white" style="background-color: #EC2300; border-color: #EC2300; box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;" >
                <i class="fa fa-pencil-square" aria-hidden="true"></i>
                <br>Dirigente</a>
               
                 <a  id="listaBtn" class="btn btn-info  btn-lg text-white" style="background-color:#E2504C; border-color:#E2504C; box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;" >
                 <i class="fa fa-list" aria-hidden="true"></i>
                <br>Grupo</a>
                              
               <a  id="punteroBtn" class="btn btn-success  btn-lg text-white" style="background-color: #EC2300; border-color: #EC2300; box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;" >
               <i class="fa fa-pencil-square" aria-hidden="true"></i>
               <br>Puntero</a>

               <a  id="personasBtn" class="btn btn-info  btn-lg text-white" style="background-color:#E03557; border-color:#E03557; box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;"  >
               <i class="fa fa-users" aria-hidden="true"></i>
               <br>Votantes</a>

               <a  id="ListaVotantesBtn" class="btn btn-info  btn-lg text-white" style="background-color:#E03557; border-color:#E03557; box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;"  >
               <i class="fa fa-users" aria-hidden="true"></i>
               <br>Lista de Votantes</a>


               <a  id="SistemaBtn" class="btn btn-info  btn-lg text-white" style="visibility:hidden;background-color:#EB8A87; border-color:#EB8A87; box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;" >
               <i class="fa fa-cog" aria-hidden="true"></i>
               <br>Sistema</a>
               </div>
                </div>
                    <div class="card-footer text-muted" style=" background-color: #C44D4D ; border-color: #C44D4D">
                      <a  style="color: white;">${props.user}</a>
                    </div>
                </div>
        </div>
    </div>
    ` /* ${props.userEmail} */;
}

export function navbar(props) {
  let dirigenteRender = ``;

  if (sessionStorage.getItem('rol') == 'dirigente') {
    dirigenteRender =  /*html*/`
    <div>
    <nav class="navbar navbar-expand-lg navbar-light navegacion-Prin" style="background-image: linear-gradient(-225deg, #FFFEFF 0%, #D7FFFE 100%);">

      <div class="navbar-brand" id="logoNavBarSecundario" style="margin-left: 80px;">
       
        <img src="../lib/img/partidoColorado.png" style="border-radius: 5px;" width="130px" />
      </div>
      
        <a class="navbar-brand" href="#"></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav" style="gap: 5px;">

          <a  id="listaMovimientosBtn2" class="btn btn-info  btn-lg text-white" style="display:none;background-color:#E2504C; border-color:#E2504C; box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;" >
          <i class="fa fa-flag" aria-hidden="true"></i>
          <br>Movimiento</a>

          <a  id="ComandoBtn2" class="btn btn-info  btn-lg text-white" style="display:none;background-color:#E2504C; border-color:#E2504C; box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;" >
          <i class="fa fa-flag" aria-hidden="true"></i>
          <br>Comando</a>

          <a  id="dirigenteBtn2" class="btn btn-info  btn-lg text-white" style="background-color:#E2504C; border-color:#E2504C; box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;" >
          <i class="fa fa-flag" aria-hidden="true"></i>
          <br>Dirigente</a>
          
          <a  id="listaBtn2" class="btn btn-info  btn-lg text-white" style="background-color:#E2504C; border-color:#E2504C; box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;" >
          <i class="fa fa-list" aria-hidden="true"></i>
          <br>Grupo</a>

          <a  id="punteroBtn2" class="btn btn-success  btn-lg text-white" style="background-color: #EC2300; border-color: #EC2300; box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;" >
          <i class="fa fa-pencil-square" aria-hidden="true"></i>
          <br>Puntero</a>

          <a  id="personasBtn2" class="btn btn-info  btn-lg text-white" style="background-color:#E03557; border-color:#E03557; box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;"  >
          <i class="fa fa-users" aria-hidden="true"></i>
          <br>Votantes</a>

          <a  id="ListaVotantesBtn2" class="btn btn-info  btn-lg text-white" style="background-color:#E03557; border-color:#E03557; box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;"  >
          <i class="fa fa-users" aria-hidden="true"></i>
          <br>Lista de Votantes</a>

          <a  id="SistemaBtn2" class="btn btn-info  btn-lg text-white" style="visibility:hidden;background-color:#EB8A87; border-color:#EB8A87; box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;" >
          <i class="fa fa-cog" aria-hidden="true" ></i>
          <br>Sistema</a> 
                           
          </ul>
      </div>
      <div class="ms-auto p-2 bd-highlight" >
            Usuario
      </div>
    </nav>
  </div>  
    `
    return dirigenteRender;
  }else if (sessionStorage.getItem('rol') == 'puntero') {

    dirigenteRender =  /*html*/`
    <div>
    <nav class="navbar navbar-expand-lg navbar-light navegacion-Prin" style="background-image: linear-gradient(-225deg, #FFFEFF 0%, #D7FFFE 100%);">

      <div class="navbar-brand" id="logoNavBarSecundario" style="margin-left: 80px;">
       
        <img src="../lib/img/partidoColorado.png" style="border-radius: 5px;" width="130px" />
      </div>
      
        <a class="navbar-brand" href="#"></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav" style="gap: 5px;">
          
          <a  id="listaMovimientosBtn2" class="btn btn-info  btn-lg text-white" style="display:none;background-color:#E2504C; border-color:#E2504C; box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;" >
          <i class="fa fa-flag" aria-hidden="true"></i>
          <br>Movimiento</a>

          <a  id="ComandoBtn2" class="btn btn-info  btn-lg text-white" style="display:none;background-color:#E2504C; border-color:#E2504C; box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;" >
          <i class="fa fa-flag" aria-hidden="true"></i>
          <br>Comando</a>

          <a  id="dirigenteBtn2" class="btn btn-info  btn-lg text-white" style="display:none;background-color:#E2504C; border-color:#E2504C; box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;" >
          <i class="fa fa-flag" aria-hidden="true"></i>
          <br>Dirigente</a>
          
          <a  id="listaBtn2" class="btn btn-info  btn-lg text-white" style="background-color:#E2504C; border-color:#E2504C; box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;" >
          <i class="fa fa-list" aria-hidden="true"></i>
          <br>Grupo</a>

          <a  id="punteroBtn2" class="btn btn-success  btn-lg text-white" style="display:none;background-color: #EC2300; border-color: #EC2300; box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;" >
          <i class="fa fa-pencil-square" aria-hidden="true"></i>
          <br>Puntero</a>

          <a  id="personasBtn2" class="btn btn-info  btn-lg text-white" style="background-color:#E03557; border-color:#E03557; box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;"  >
          <i class="fa fa-users" aria-hidden="true"></i>
          <br>Votantes</a>

          <a  id="ListaVotantesBtn2" class="btn btn-info  btn-lg text-white" style="background-color:#E03557; border-color:#E03557; box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;"  >
          <i class="fa fa-users" aria-hidden="true"></i>
          <br>Lista de Votantes</a>

          <a  id="SistemaBtn2" class="btn btn-info  btn-lg text-white" style="display:none;background-color:#EB8A87; border-color:#EB8A87; box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;" >
          <i class="fa fa-cog" aria-hidden="true" ></i>
          <br>Sistema</a> 
                           
          </ul>
      </div>
      <div class="ms-auto p-2 bd-highlight" >
            Usuario
      </div>
    </nav>
  </div>  
    `
    return dirigenteRender;
  }else if (sessionStorage.getItem('rol') == 'admin'){
    dirigenteRender =  /*html*/`
    <div>
    <nav class="navbar navbar-expand-lg navbar-light navegacion-Prin" style="background-image: linear-gradient(-225deg, #FFFEFF 0%, #D7FFFE 100%);">

      <div class="navbar-brand" id="logoNavBarSecundario" style="margin-left: 80px;">
       
        <img src="../lib/img/partidoColorado.png" style="border-radius: 5px;" width="130px" />
      </div>
      
        <a class="navbar-brand" href="#"></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav" style="gap: 5px;">

          <a  id="listaMovimientosBtn2" class="btn btn-info  btn-lg text-white" style="background-color:#E2504C; border-color:#E2504C; box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;" >
          <i class="fa fa-flag" aria-hidden="true"></i>
          <br>Movimiento</a>

          <a  id="ComandoBtn2" class="btn btn-info  btn-lg text-white" style="background-color:#E2504C; border-color:#E2504C; box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;" >
          <i class="fa fa-flag" aria-hidden="true"></i>
          <br>Comando</a>

          <a  id="dirigenteBtn2" class="btn btn-info  btn-lg text-white" style="background-color:#E2504C; border-color:#E2504C; box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;" >
          <i class="fa fa-flag" aria-hidden="true"></i>
          <br>Dirigente</a>
          
          <a  id="listaBtn2" class="btn btn-info  btn-lg text-white" style="background-color:#E2504C; border-color:#E2504C; box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;" >
          <i class="fa fa-list" aria-hidden="true"></i>
          <br>Grupo</a>

          <a  id="punteroBtn2" class="btn btn-success  btn-lg text-white" style="background-color: #EC2300; border-color: #EC2300; box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;" >
          <i class="fa fa-pencil-square" aria-hidden="true"></i>
          <br>Puntero</a>

          <a  id="personasBtn2" class="btn btn-info  btn-lg text-white" style="background-color:#E03557; border-color:#E03557; box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;"  >
          <i class="fa fa-users" aria-hidden="true"></i>
          <br>Votantes</a>

          <a  id="ListaVotantesBtn2" class="btn btn-info  btn-lg text-white" style="background-color:#E03557; border-color:#E03557; box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;"  >
          <i class="fa fa-users" aria-hidden="true"></i>
          <br>Lista de Votantes</a>

          <a  id="SistemaBtn2" class="btn btn-info  btn-lg text-white" style="visibility:hidden;background-color:#EB8A87; border-color:#EB8A87; box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;" >
          <i class="fa fa-cog" aria-hidden="true" ></i>
          <br>Sistema</a> 
                           
          </ul>
      </div>
      <div class="ms-auto p-2 bd-highlight" >
            Usuario
      </div>
    </nav>
  </div>  
    `
    return dirigenteRender;
  }

}

export function headerForm() {
  return /* html */ `
    <nav aria-label="breadcrumb ">
    <ol class="breadcrumb navegacionColor rounded mt-2">
        <li class="breadcrumb-item active text-light m-auto" aria-current="page">
            <h4 class="text-center m-2"><i class="fas fa-plus"></i> Nuevo Envío</h4>
        </li>
    </ol>    
</nav>
    `;
}
