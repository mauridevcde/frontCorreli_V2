
export function api_get_MovimientosAll() {
  let result = new Promise((resolve, reject) => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("https://colorados-mds.herokuapp.com/new/get_all_movimiento/", requestOptions)
      .then(response => response.text())
      .then(result => {
        //let data = JSON.parse(result)
        resolve(JSON.parse(result));
      })
      .catch(error => console.log('error', error));
  });
  return result;
}

export function api_get_Movimientos_by_id(id) {
  let result = new Promise((resolve, reject) => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(`https://colorados-mds.herokuapp.com/new/get_id_movimiento/?id_movimiento=${id}`, requestOptions)
      .then(response => response.text())
      .then(result => {
        //let data = JSON.parse(result)
        resolve(JSON.parse(result));
      })
      .catch(error => console.log('error', error));
  });
  return result;
}

export async function api_post_movimientos(data) {
  console.log('api nuevo puntero VER:', data);

  let result = new Promise((resolve, reject) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({

      "nombre": data.nombre,
      "descripcion": data.descripcion,
      "localidad_id": data.localidad_id,
      "localidad_descripcion": data.localidad_descripcion,
      "fecha_creado": data.fecha_creado,
      "creada_por_user": data.creada_por_user, 
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://colorados-mds.herokuapp.com/new/insert_movimiento/", requestOptions)
      .then(response => response.text())
      .then(result => { resolve(JSON.parse(result)); })
      .catch(error => console.log('error', error));
  })
  return result;
}