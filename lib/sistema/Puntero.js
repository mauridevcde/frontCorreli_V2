import { render } from '../others/renderizado.js';
import { addNavBarFunctions, spinnerRender } from '../others/utils.js';
import { headerPuntero } from '../views/TemplatePuntero.js'
import { navbar } from '../views/templatesHome.js'

export function puntero() {
    inicioPuntero() 
}

async function inicioPuntero() {

    let view = {};
    view.navbar = navbar();
    view.header =  await headerPuntero(); //header con icono

    render(view, true);
    addNavBarFunctions();
}