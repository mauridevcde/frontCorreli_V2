
export async  function api_get_DirigenteAll() {
  let result = new Promise((resolve, reject) => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("https://colorados-mds.herokuapp.com/new/get_all_dirigente/", requestOptions)
      .then(response => response.text())
      .then(result => {
        //let data = JSON.parse(result)
        resolve(JSON.parse(result));
      })
      .catch(error => console.log('error', error));
  });
  return result;
}

export function api_get_Dirigente_by_id(id) {
  let result = new Promise((resolve, reject) => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(`https://colorados-mds.herokuapp.com/new/get_id_dirigente/?id_dirigente=${id}`, requestOptions)
      .then(response => response.text())
      .then(result => {
        //let data = JSON.parse(result)
        resolve(JSON.parse(result));
      })
      .catch(error => console.log('error', error));
  });
  return result;
}

export async function api_post_dirigente(data) {
  //console.log('api nuevo dirigente VER:', data);

  let result = new Promise((resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "nombre": data.nombre,
      "telefono": data.telefono,
      "pass": data.pass,
      "ci": data.ci,
      "fecha_creado": data.fecha_creado
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://colorados-mds.herokuapp.com/new/insert_dirigente/", requestOptions)
      .then(response => response.text())
      .then(result => { resolve(JSON.parse(result)); })
      .catch(error => console.log('error', error));
  })
  return result;
}

export async function api_update_dirigente(data) {

  let result = new Promise((resolve, reject) => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        id_dirigente: data.id_dirigente,
        nombre: data.nombre,
        ci: data.ci,
        telefono: data.telefono,
        password: data.password
          
      });


      var requestOptions = {
          method: 'PUT',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
      };

      fetch("https://colorados-mds.herokuapp.com/new/update_dirigente/", requestOptions)
          .then(response => response.text())
          .then(result => { resolve(JSON.parse(result)); })
          .catch(error => console.log('error', error));

  });
  return result;
}

export async function api_delete_dirigente(data) {

  let result = new Promise((resolve, reject) => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        id_dirigente: data.id_dirigente,        
      });


      var requestOptions = {
          method: 'PUT',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
      };

      fetch("https://colorados-mds.herokuapp.com/new/delete_dirigente/", requestOptions)
          .then(response => response.text())
          .then(result => { resolve(JSON.parse(result)); })
          .catch(error => console.log('error', error));

  });
  return result;
}