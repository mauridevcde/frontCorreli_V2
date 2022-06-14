import { render } from '../others/renderizado.js';
import { addNavBarFunctions, spinnerRender } from '../others/utils.js';
import { headerPersona } from '../views/TemplatePersona.js'
import { navbar } from '../views/templatesHome.js'

export function persona() {
    inicioPersona()
}

async function inicioPersona() {

    let view = {};
    view.navbar = navbar();
    view.header =  await headerPersona(); //header con icono

    render(view, true);
    addNavBarFunctions();
}