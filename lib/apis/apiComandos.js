export function api_get_ComandoAll() {
    let result = new Promise((resolve, reject) => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("https://colorados-mds.herokuapp.com/new/get_all_comando/", requestOptions)
            .then(response => response.text())
            .then(result => {
                //let data = JSON.parse(result)
                resolve(JSON.parse(result));
            })
            .catch(error => console.log('error', error));
    });
    return result;
}


export function api_post_Comando(data) {
    //console.log('api nuevo cliente VER:', data);

    let result = new Promise((resolve, reject) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "id_movimiento": data.id_movimiento,
            "nombre": data.nombre,
            "fecha_creado": data.fecha_creado
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://colorados-mds.herokuapp.com/new/insert_comando/", requestOptions)
            .then(response => response.text())
            .then(result => { resolve(JSON.parse(result)); })
            .catch(error => console.log('error', error));
    })
    return result;
}