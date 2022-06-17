
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

