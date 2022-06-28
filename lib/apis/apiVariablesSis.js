
export async  function api_get_LocalidadAll() {
    let result = new Promise((resolve, reject) => {
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
  
      fetch("https://colorados-mds.herokuapp.com/localidad/", requestOptions)
        .then(response => response.text())
        .then(result => {
          //let data = JSON.parse(result)
          resolve(JSON.parse(result));
        })
        .catch(error => console.log('error', error));
    });
    return result;
  }


export async  function api_get_DistritoAll() {
    let result = new Promise((resolve, reject) => {
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
  
      fetch("https://colorados-mds.herokuapp.com/distrito/", requestOptions)
        .then(response => response.text())
        .then(result => {
          //let data = JSON.parse(result)
          resolve(JSON.parse(result));
        })
        .catch(error => console.log('error', error));
    });
    return result;
  }
  
export async  function api_get_ZonaAll() {
    let result = new Promise((resolve, reject) => {
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
  
      fetch("https://colorados-mds.herokuapp.com/zona/", requestOptions)
        .then(response => response.text())
        .then(result => {
          //let data = JSON.parse(result)
          resolve(JSON.parse(result));
        })
        .catch(error => console.log('error', error));
    });
    return result;
  }

  export async  function api_get_checkCedula(ci) {
    let result = new Promise((resolve, reject) => {
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
  
      fetch(`https://colorados-mds.herokuapp.com/check_cedula/?n_cedula=${ci}`, requestOptions)
        .then(response => response.text())
        .then(result => {
          //let data = JSON.parse(result)
          resolve(JSON.parse(result));
        })
        .catch(error => console.log('error', error));
    });
    return result;
  }
