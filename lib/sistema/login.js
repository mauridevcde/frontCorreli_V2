import { render } from "../others/renderizado.js";
/* import { login } from "../others/model.js"; */
import { loginForm, toast } from "../views/TemplateLogin.js";


export function logIn(view, model) {
    // clear view
    view = {};
    model = {}
    // crate form
    view.form = loginForm();
    // call render graphics
    render(view, true);
}

