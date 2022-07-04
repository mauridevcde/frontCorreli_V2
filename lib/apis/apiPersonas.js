
export async function api_get_getPersonaForCi(ci) {
  let result = new Promise((resolve, reject) => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(`https://colorados-mds.herokuapp.com/persona/?n_cedula=${ci}`, requestOptions)
      .then(response => response.text())
      .then(result => {
        //let data = JSON.parse(result)
        resolve(JSON.parse(result));
      })
      .catch(error => console.log('error', error));
  });
  return result;
}

export function api_post_new_Correli(data) {
  console.log('api nuevo cliente VER:', data);

  let result = new Promise((resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "latitud": data.latitud,
      "longitud": data.longitud,
      "email": data.email,
      "foto": data.foto,
      "observaciones": data.observaciones,
      "n_cedula": data.n_cedula,
      "telefono": data.telefono,

    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://colorados-mds.herokuapp.com/new/insert_new_correli/", requestOptions)
      .then(response => response.text())
      .then(result => { resolve(JSON.parse(result)); })
      .catch(error => console.log('error', error));
  })
  return result;
}

export function api_post_Persona(data) {
  //console.log('api nuevo cliente VER:', data);

  let result = new Promise((resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      n_cedula: data.n_cedula,
      nombre: data.nombre,
      apellido: data.apellido,
      c_fenaci: data.c_fenaci,
      n_partido: data.n_partido,
      direccion: data.direccion,
      telefono: data.telefono,
      email: data.email,
      latitud: data.latitud,
      longitud: data.longitud,
      foto: data.foto,
      observaciones: data.observaciones,
      depart: data.depart,
      distrito: data.distrito,
      zona: data.zona,
      localidad: data.localidad,
      sexo: data.sexo,
      nacional: data.nacional

    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://colorados-mds.herokuapp.com/persona/insert_persona", requestOptions)
      .then(response => response.text())
      .then(result => { resolve(JSON.parse(result)); })
      .catch(error => console.log('error', error));
  })
  return result;
}

export async function api_put_Persona(data) {
console.log("🚀 ~ file: apiPersonas.js ~ line 101 ~ api_put_Persona ~ data", data)
  
  let result = new Promise((resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      n_cedula: data.n_cedula,
      nombre: data.nombre,
      apellido: data.apellido,
      c_fenaci: data.c_fenaci,
      n_partido: data.n_partido,
      direccion: data.direccion,
      telefono: data.telefono,
      email: data.email,
      latitud: data.latitud,
      longitud: data.longitud,
      foto: data.foto,
      observaciones: data.observaciones,
      depart: data.depart,
      distrito: data.distrito,
      zona: data.zona,
      localidad: data.localidad,
      sexo: data.sexo,
      nacional: data.nacional

    });


    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://colorados-mds.herokuapp.com/persona/update_persona", requestOptions)
      .then(response => response.text())
      .then(result => { resolve(JSON.parse(result)); })
      .catch(error => console.log('error', error));

  });
  return result;
}
