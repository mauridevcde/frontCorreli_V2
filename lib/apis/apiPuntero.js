
export function api_get_PunteroAll() {
    let result = new Promise((resolve, reject) => {
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
  
      fetch("https://colorados-mds.herokuapp.com/new/get_all_puntero/", requestOptions)
        .then(response => response.text())
        .then(result => {
          //let data = JSON.parse(result)
          resolve(JSON.parse(result));
        })
        .catch(error => console.log('error', error));
    });
    return result;
  }

  export function api_get_Puntero_by_id(id) {
    let result = new Promise((resolve, reject) => {
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
  
      fetch(`https://colorados-mds.herokuapp.com/new/get_id_puntero/?id_puntero=${id}`, requestOptions)
        .then(response => response.text())
        .then(result => {
          //let data = JSON.parse(result)
          resolve(JSON.parse(result));
        })
        .catch(error => console.log('error', error));
    });
    return result;
  }

  export async function api_post_puntero(data) {
    console.log('api nuevo puntero VER:', data);
  
    let result = new Promise((resolve, reject) => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
  
      var raw = JSON.stringify({
        "nombre": data.nombre,
        "telefono": data.telefono,
        "email": data.email,
        "password": data.password,
        "ci": data.ci,
        "fecha_creado": data.fecha_creado
        });
  
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
  
      fetch("https://colorados-mds.herokuapp.com/new/insert_puntero/", requestOptions)
        .then(response => response.text())
        .then(result => { resolve(JSON.parse(result)); })
        .catch(error => console.log('error', error));
    })
    return result;
  }