export async function api_get_usuario_forCi(ci , pass) {
    let result = new Promise((resolve, reject) => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`https://colorados-mds.herokuapp.com/verifica/login?ci=${ci}&pass=${pass}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                //let data = JSON.parse(result)
                resolve(JSON.parse(result));
            })
            .catch(error => console.log('error', error));
    });
    return result;
}