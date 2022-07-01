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
