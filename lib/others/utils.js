
export function random_rgba() {
	let o = Math.round, r = Math.random, s = 255;
	return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + 0.5 + ')';
}

export function copyToClipboard(text, obj = null) {
	var dummy = document.createElement("textarea");
	// to avoid breaking orgain page when copying more words
	// cant copy when adding below this code
	// dummy.style.display = 'none'
	if (obj !== null) {
		document.getElementById(obj).appendChild(dummy);
	} else {
		document.body.appendChild(dummy);
	}

	//Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
	dummy.value = text;
	dummy.select();
	document.execCommand("copy");
	if (obj !== null) {
		document.getElementById(obj).removeChild(dummy);
	} else {
		document.body.removeChild(dummy);
	}
}

export function numberWithPoints(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function removePoints(n) {
	let string = n.split('.').join("");
	return Number(string);
}

export function isOdd(n) {
	return Math.abs(n % 2) == 1;
}

// dispatch events to main.js
function addNavbarFunc() {

	document.querySelector('#unconfiguredBtn').onclick = event => {
		let customEvent = new CustomEvent('ready', { detail: 'unconfigured' });
		document.dispatchEvent(customEvent);
	}
	document.querySelector('#configuredBtn').onclick = event => {
		let customEvent = new CustomEvent('ready', { detail: 'configured' });
		document.dispatchEvent(customEvent);
	}
	document.querySelector('#exitBtn').onclick = event => {
		let customEvent = new CustomEvent('ready', { detail: 'exit' });
		document.dispatchEvent(customEvent);
	}
	document.querySelector('#logoutBtn').onclick = event => {
		let customEvent = new CustomEvent('ready', { detail: 'logout' });
		document.dispatchEvent(customEvent);
	}
	// logoHomeBtn function
	document.getElementById('logoHomeBtn').onclick = event => {
		let customEvent = new CustomEvent('ready', { detail: 'exit' });
		document.dispatchEvent(customEvent);
	}
}

// ('0' + 4).slice(-2)
export function timestampToTime(timestamp) {
	// set dates
	let day = new Date(timestamp).getDate();
	let month = new Date(timestamp).getMonth() + 1;
	let year = new Date(timestamp).getFullYear();
	let seconds = new Date(timestamp).getSeconds();
	let minutes = new Date(timestamp).getMinutes();
	let hour = new Date(timestamp).getHours();
	// reconvert numbers
	seconds = ('0' + seconds).slice(-2);
	minutes = ('0' + minutes).slice(-2);
	// return
	return `${day}/${month}/${year} - ${hour}:${minutes}:${seconds}`;
}

export function dateToTimestamp(date, add1Day = false) {
	// BUG: la fecha del html day viene con un dia menos
	let fecha = new Date(date);
	// sumarle un dia
	if (add1Day) {
		fecha.setDate(fecha.getDate() + 1);
	}
	let endDate = new Date(fecha).getTime();

	return endDate;
}

export function timeStampToDateForm(timestamp) {
	// convert date from timestamp to DD/MM/YY
	let time = timestampToTime(timestamp).split(' - ')[0];
	// separate dates on the array ["DD", "MM", "YY"]
	let arrayTime = time.split('/');
	// add ceros to day and mont if there is only 1 number per date (1/1/2000)
	if (arrayTime[0].length == 1) arrayTime[0] = "0" + arrayTime[0];
	if (arrayTime[1].length == 1) arrayTime[1] = "0" + arrayTime[1];
	// reverse date DD/MM/YY to YY/MM/DD
	return arrayTime.reverse().join('-');
}

export function addDays(date, days) {
	//	console.log("el days :", days);
	let result = new Date(date);
	result.setDate(result.getDate() + days);
	return result;
}

//Add Months + Agregar meses a la date

export function addMonths(date, months) {
	var d = date.getDate();
	date.setMonth(date.getMonth() + +months);
	if (date.getDate() != d) {
		date.setDate(0);
	}
	return date;
}

export function timestampFecha(timestamp) {
	let meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
	let diasSemana = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
	let f = new Date(timestamp);

	let date = diasSemana[f.getDay()] + ", " + f.getDate() + " de " + meses[f.getMonth()] + " " + f.getFullYear();

	return date;
}

// export function pickerToTimestamp() {
// 	var dateFromPicker = "2012-10-12";
// 	var timeFromPicker = "12:30";

// 	var dateParts = dateFromPicker.split("-");
// 	var timeParts = timeFromPicker.split(":");
// 	var localDate = new Date(dateParts[0], dateParts[1]-1, dateParts[2], timeParts[0], timeParts[1]);
// }

export function propName(prop, value) {
	let res = ``;
	for (var i in prop) {
		if (typeof prop[i] == 'object') {
			if (propName(prop[i], value)) {
				return res;
			}
		}
		else {
			if (prop[i] == value) {
				res = i;
				return res;
			}
		}
	}
	return undefined;
}


export function addNavBarFunctions() { //navBar secundario 
	//console.log("Funciones NavBar")
	// add functions to preVenta button and exit button
	document.getElementById('punteroBtn2').onclick = event => {
		let customEvent = new CustomEvent('ready', { detail: 'listaPuntero' });
		document.dispatchEvent(customEvent);
	};
	document.getElementById('personasBtn2').onclick = event => {
		let customEvent = new CustomEvent('ready', { detail: 'listaPersonas' });
		document.dispatchEvent(customEvent);
	};
	document.getElementById('listaMovimientosBtn2').onclick = event => {
		let customEvent = new CustomEvent('ready', { detail: 'listaMovimientos' });
		document.dispatchEvent(customEvent);
	};
	document.getElementById('listaBtn2').onclick = event => {
		let customEvent = new CustomEvent('ready', { detail: 'listaListaCorreli' });
		document.dispatchEvent(customEvent);
	};
	document.getElementById('SistemaBtn2').onclick = event => {
		let customEvent = new CustomEvent('ready', { detail: 'listaSistema' });
		document.dispatchEvent(customEvent);
	};
	document.getElementById('ComandoBtn2').onclick = event => {
		let customEvent = new CustomEvent('ready', { detail: 'listaComando' });
		document.dispatchEvent(customEvent);
	};

	document.getElementById('dirigenteBtn2').onclick = event => {
		let customEvent = new CustomEvent('ready', { detail: 'listaDirigente' });
		document.dispatchEvent(customEvent);
	};
	document.getElementById('ListaVotantesBtn2').onclick = event => {
		let customEvent = new CustomEvent('ready', { detail: 'listaListaVotantes' });
		document.dispatchEvent(customEvent);
	};

}


export async function validaObject(datos) {

	let conta = 0;
	for (const property in datos) {
		if (datos[property] == '' || datos[property] == null || datos[property] == undefined) {
			conta++;
		}
	}

	if (conta > 0) { return false; } else { return true; }

}

//* funcion para el render de sweet alert
export function spinnerRender() {
	let timerInterval

	Swal.fire({
		title: 'Cargando...!',
		html:
			'<button id="increase" class="btn " style="background-color: #FFEDB8">' +
			'Esta ventana se cerrara automaticamente!',
		timer: 180000,
		allowOutsideClick: false,

		didOpen: () => {
			const content = Swal.getHtmlContainer()
			const $ = content.querySelector.bind(content)

			const increase = $('#increase')

			Swal.showLoading()

			increase.addEventListener('click', () => {
				Swal.increaseTimer(5000)
			})
		},
		willClose: () => {
			clearInterval(timerInterval)
		}

	})
}

