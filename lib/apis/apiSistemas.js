export async function api_get_SistemaAll() {
    let result = new Promise((resolve, reject) => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("https://colorados-mds.herokuapp.com/usuario/get_all", requestOptions)
            .then(response => response.text())
            .then(result => {
                //let data = JSON.parse(result)
                resolve(JSON.parse(result));
            })
            .catch(error => console.log('error', error));
    });
    return result;
}

export async function api_post_Sistema(data) {
    console.log('api nuevo puntero VER:', data);

    let result = new Promise((resolve, reject) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            nombre: data.nombre,
            ci: data.ci,
            correo: data.correo,
            pass: data.pass,
            nivel: data.nivel
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://colorados-mds.herokuapp.com/usuario/insert", requestOptions)
            .then(response => response.text())
            .then(result => { resolve(JSON.parse(result)); })
            .catch(error => console.log('error', error));
    })
    return result;
}

export function api_update_sistema(data) {

    let result = new Promise((resolve, reject) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            id_usuario: data.id_usuario,
            nombre: data.nombre,
            ci: data.ci,
            correo: data.correo,
            pass: data.pass,
            estado: data.estado,
            nivel: data.nivel
            
        });


        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://colorados-mds.herokuapp.com/usuario/update", requestOptions)
            .then(response => response.text())
            .then(result => { resolve(JSON.parse(result)); })
            .catch(error => console.log('error', error));

    });
    return result;
}