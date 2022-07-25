export async function api_get_ListaAll() {
    let result = new Promise((resolve, reject) => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("https://colorados-mds.herokuapp.com/new/get_all_grupo/", requestOptions)
            .then(response => response.text())
            .then(result => {
                //let data = JSON.parse(result)
                resolve(JSON.parse(result));
            })
            .catch(error => console.log('error', error));
    });
    return result;
}

export async function api_post_Lista(data) {
    console.log('api nuevo puntero VER:', data);

    let result = new Promise((resolve, reject) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            nombre: data.nombre,
            punteros_id_puntero: data.punteros_id_puntero,
            dirigentes_id_dirigente: data.dirigentes_id_dirigente,
            fecha_creado: data.fecha_creado,
            creada_por_user: data.creada_por_user,
            id_comando: data.id_movimiento
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://colorados-mds.herokuapp.com/new/insert_grupo/", requestOptions)
            .then(response => response.text())
            .then(result => { resolve(JSON.parse(result)); })
            .catch(error => console.log('error', error));
    })
    return result;
}

export async function api_update_Lista(data) {

    let result = new Promise((resolve, reject) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            id_grupo: data.id_grupo,
            nombre: data.nombre,
            punteros_id_puntero: data.punteros_id_puntero,
            dirigentes_id_dirigente: data.dirigentes_id_dirigente,
            fecha_creado: data.fecha_creado,
            creada_por_user: data.creada_por_user,
            id_comando: data.id_movimiento
        });

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://colorados-mds.herokuapp.com/new/update_grupo/", requestOptions)
            .then(response => response.text())
            .then(result => { resolve(JSON.parse(result)); })
            .catch(error => console.log('error', error));
    });

    return result;
}

export async function api_delete_Lista(data) {

    let result = new Promise((resolve, reject) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            id_grupo: data.id_grupo,
        });

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://colorados-mds.herokuapp.com/new/delete_grupo/", requestOptions)
            .then(response => response.text())
            .then(result => { resolve(JSON.parse(result)); })
            .catch(error => console.log('error', error));

    });
    return result;
}

//api grupoX by id dirigente
export async function api_get_grupoByX_idDirigente(id) {
    let result = new Promise((resolve, reject) => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`https://colorados-mds.herokuapp.com/get/select_datos_grupo_id_dirigente/?id_dirigente=${id}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                //let data = JSON.parse(result)
                resolve(JSON.parse(result));
            })
            .catch(error => console.log('error', error));
    });
    return result;
}



//api grupoX by id dirigente
export async function api_get_PunteroXBy_idDirigente(id) {
    let result = new Promise((resolve, reject) => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`https://colorados-mds.herokuapp.com/get/select_id_punteros/?id_dirigente=${id}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                //let data = JSON.parse(result)
                resolve(JSON.parse(result));
            })
            .catch(error => console.log('error', error));
    });
    return result;
}

//grupoByPuntero https://colorados-mds.herokuapp.com/get/get_id_grupo/?id_puntero=1

export async function api_get_grupoByPuntero(id) {
    let result = new Promise((resolve, reject) => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`https://colorados-mds.herokuapp.com/get/get_id_grupo/?id_puntero=${id}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                //let data = JSON.parse(result)
                resolve(JSON.parse(result));
            })
            .catch(error => console.log('error', error));
    });
    return result;
}

export async function api_get_grupoByDirigentes(id) {
    let result = new Promise((resolve, reject) => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`https://colorados-mds.herokuapp.com/get/select_id_grupo_id_dirigente/?id_dirigente=${id}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                //let data = JSON.parse(result)
                resolve(JSON.parse(result));
            })
            .catch(error => console.log('error', error));
    });
    return result;
}


export async function api_post_ListaForPuntero(data) {
    console.log('api nuevo puntero VER:', data);

    let result = new Promise((resolve, reject) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            grupos_id_grupo: data.grupos_id_grupo,
            n_cedula: data.n_cedula,
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://colorados-mds.herokuapp.com/listas/insert/", requestOptions)
            .then(response => response.text())
            .then(result => { resolve(JSON.parse(result)); })
            .catch(error => console.log('error', error));
    })
    return result;
}



export async function api_get_ListaVotantesAll(id, cedulas) {
    let result = new Promise((resolve, reject) => {
        
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`https://colorados-mds.herokuapp.com/listas/get_all_personas/?id_grupo=${id}&cedulas=${cedulas}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                //let data = JSON.parse(result)
                resolve(JSON.parse(result));
            })
            .catch(error => console.log('error', error));
    });
    return result;
}

export async function api_getAll_Ci_grupoId(id) {
    let result = new Promise((resolve, reject) => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`https://colorados-mds.herokuapp.com/listas/get_listas_id_grupo/?id_grupo=${id}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                //let data = JSON.parse(result)
                resolve(JSON.parse(result));
            })
            .catch(error => console.log('error', error));
    });
    return result;
}

export async function api_get_all_id_grupo() {
    let result = new Promise((resolve, reject) => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("https://colorados-mds.herokuapp.com/listas/get_all_id_grupo/", requestOptions)
            .then(response => response.text())
            .then(result => {
                //let data = JSON.parse(result)
                resolve(JSON.parse(result));
            })
            .catch(error => console.log('error', error));
    });
    return result;
}



export async function api_get_check_n_cedula_listas(id) {
    let result = new Promise((resolve, reject) => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`https://colorados-mds.herokuapp.com/listas/check_n_cedula_listas/?n_cedula=${id}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                //let data = JSON.parse(result)
                resolve(JSON.parse(result));
            })
            .catch(error => console.log('error', error));
    });
    return result;
}



export function api_delete_Listas(id) {

    let result = new Promise((resolve, reject) => {

        var requestOptions = {
            method: 'PUT',
            redirect: 'follow'
        };

        fetch(`https://colorados-mds.herokuapp.com/listas/delete/?id_lista=${id}`, requestOptions)
            .then(response => response.text())
            .then(result => { resolve(JSON.parse(result)); })
            .catch(error => console.log('error', error));

    });
    return result;
}


