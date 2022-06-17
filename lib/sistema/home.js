import { navBarPrincipal } from "../views/templatesHome.js";
import { render } from "../others/renderizado.js";


export function home(view, model) {
    // clear view
    view = {};

    view.navbarPrinc = navBarPrincipal(model); //almacena en un nuevo objeto el nav principal 
    
    render(view, true);

    addButtonsFunction() 

    //mientras la funcion del navbar queda aca pq o sino hendy
    
    function addButtonsFunction() { //navBar principal
        
        document.querySelector('#punteroBtn').onclick = event => {
            console.log('punterobtn button');
            let customEvent = new CustomEvent('ready', { detail: 'listaPuntero' });
            document.dispatchEvent(customEvent);
        };

        document.querySelector('#personasBtn').onclick = event => {
            console.log('personasBtn button');
            let customEvent = new CustomEvent('ready', { detail: 'listaPersonas' });
            document.dispatchEvent(customEvent);
        };

        document.querySelector('#listaBtn').onclick = event => {
            console.log('ListaBtn button');
            let customEvent = new CustomEvent('ready', { detail: 'listaListaCorreli' });
            document.dispatchEvent(customEvent);
        };

        document.querySelector('#listaMovimientosBtn').onclick = event => {
            console.log('ListaMovimientosBtn button');
            let customEvent = new CustomEvent('ready', { detail: 'listaMovimientos' });
            document.dispatchEvent(customEvent);
        };

        document.querySelector('#SistemaBtn').onclick = event => {
            console.log('SistemaBtn button');
            let customEvent = new CustomEvent('ready', { detail: 'listaSistema' });
            document.dispatchEvent(customEvent);
        };

    }
}


