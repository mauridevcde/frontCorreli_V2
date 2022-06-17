export function api_get_OldCorreli_By_Ci(ci) { //oldCorreli
  let result = new Promise((resolve, reject) => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(`https://colorados-mds.herokuapp.com/cedula/?n_cedula=${ci}`, requestOptions)
      .then(response => response.text())
      .then(result => {
        //let data = JSON.parse(result)
        resolve(JSON.parse(result));
      })
      .catch(error => console.log('error', error));
  });
  return result;
}

export function api_get_NewCorreli_by_Ci(ci) {
  let result = new Promise((resolve, reject) => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(`https://colorados-mds.herokuapp.com/new/get_id_new_correli/?n_cedula=${ci}`, requestOptions)
      .then(response => response.text())
      .then(result => {
        //let data = JSON.parse(result)
        resolve(JSON.parse(result));
      })
      .catch(error => console.log('error', error));
  });
  return result;
}

export function api_get_NewPersona_by_Ci(ci) {
  let result = new Promise((resolve, reject) => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(`https://colorados-mds.herokuapp.com/new/get_id_new_persona/?n_cedula=${ci}`, requestOptions)
      .then(response => response.text())
      .then(result => {
        //let data = JSON.parse(result)
        resolve(JSON.parse(result));
      })
      .catch(error => console.log('error', error));
  });
  return result;
}


export function api_post_nuevaPersona(data) {
  //console.log('api nuevo cliente VER:', data);

  let result = new Promise((resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "n_cedula": data.n_cedula,
      "nombre": data.nombre,
      "apellido": data.apellido,
      "telefono": data.telefono,
      "email": data.email,
      "distrito": data.distrito,
      "partido": data.partido,
      "latitud": data.latitud,
      "longitud": data.longitud,
      "foto": data.foto,
      "observaciones": data.observaciones,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://colorados-mds.herokuapp.com/new/insert_new_persona/", requestOptions)
      .then(response => response.text())
      .then(result => { resolve(JSON.parse(result)); })
      .catch(error => console.log('error', error));
  })
  return result;
}

export function api_update_nuevaPersona(data) {

  let result = new Promise((resolve, reject) => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({

          "id_new_persona": data.id_new_persona,
          "n_cedula": data.n_cedula,
          "nombre": data.nombre,
          "apellido": data.apellido,
          "telefono": data.telefono,
          "email": data.email,
          "distrito": data.distrito,
          "partido": data.partido,
          "latitud": data.latitud,
          "longitud": data.longitud,
          "foto": "",
          "observaciones": data.observaciones

      });

      var requestOptions = {
          method: 'PUT',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
      };

      fetch("https://colorados-mds.herokuapp.com/new/update_new_persona/", requestOptions)
          .then(response => response.text())
          .then(result => { resolve(JSON.parse(result)); })
          .catch(error => console.log('error', error));

  });
  return result;
}