
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