import { render } from '../others/renderizado.js';
import { addNavBarFunctions, spinnerRender } from '../others/utils.js';
import { headerLista } from '../views/TemplateLista.js'
import { navbar } from '../views/templatesHome.js'

export function lista() {
    inicioLista()
}

async function inicioLista() {

    let view = {};
    view.navbar = navbar();
    view.header =  await headerLista(); //header con icono

    render(view, true);
    addNavBarFunctions();
}