export function loginForm() {
	return /*html*/`
    <section class="vh-80 gradient-custom">
  <div class="container py-5 h-80">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        <div class="text-white" style="border-radius: 1rem; background-color: #FF6961 ; box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;" >
          <div class="card-body p-5 text-center">

            <div class="mb-md-5 mt-md-4 pb-5">
            <img src="./lib/img/partidoColorado.png" style="width: 250px; height: 200px;border-style: hidden; box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;margin-bottom: inherit;">
           
              <h2 class="fw-bold mb-2 text-uppercase">Inicio de Sesión</h2>
              <p class="text-white-50 mb-5">Favor ingresa tu usuario y contraseña!</p>

              <div class="form-outline form-white mb-4">
                <input type="text" id="inpUsuario" class="form-control form-control-lg" />
                <label class="form-label" for="inpUsuario">USUARIO</label>
              </div>

              <div class="form-outline form-white mb-4">
                <input type="password" id="inpPassword" class="form-control form-control-lg" />
                <label class="form-label" for="inpPassword">CONTRASEÑA</label>
              </div>

              <button class="btn btn-outline-light btn-lg px-5" id="enterBtn"  type="submit">INGRESAR</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
   `;
}

export function toast(props) {
  return /* html */`
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
