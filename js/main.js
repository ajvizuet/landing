const databaseURL = 'https://landing-d0e76-default-rtdb.firebaseio.com/collection.json'; 

let sendData = () => {
    let form = document.getElementById('form');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    data['saved'] = new Date().toLocaleString('es-CO', { timeZone: 'America/Guayaquil' });

    fetch(databaseURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if(!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }
        return response.json();
    })
    .then(result => {
        alert('Agradeciendo tu preferencia, nos mantenemos actualizados y enfocados en atenderte como mereces'); // Maneja la respuesta con un mensaje
        form.reset()

        getData();
    })
    .catch(error => {
        alert('Hemos experimentado un error. ¡Vuelve pronto!'); // Maneja el error con un mensaje
    });
}

let getData = async () => {
    try {
        const response = await fetch(databaseURL);

        if(!response.ok) {
            alert('Hemos experimentado un error. ¡Vuelve pronto!');
        }

        const data = await response.json();

        if(data != null) {
            let countSuscribers = new Map();

            if(Object.keys(data).length > 0) {
                for(let key in data) {
                    let {email, saved} = data[key];

                    let date = saved.split(",")[0];

                    let count = countSuscribers.get(date) || 0;
                    countSuscribers.set(date, count + 1);
                }
            }
            if (countSuscribers.size > 0) {

                subscribers.innerHTML = ''

                for (let [date, count] of countSuscribers) {
                    let rowTemplate = `
                        <tr>
                            <th scope="row">1</th>
                            <td>${date}</td>
                            <td>${count}</td>
                        </tr>`
                    subscribers.innerHTML += rowTemplate
                }
            }
        }
    }catch(error) {
        alert('Hemos experimentado un error. ¡Vuelve pronto!'); 
    }
}

let ready = () => {
    console.log('DOM está listo');
    debugger
    getData();
}

let loaded = ( eventLoaded ) => {

    let myform = document.getElementById('form');
       
    myform.addEventListener('submit', (eventSubmit) => {
        eventSubmit.preventDefault(); 
           
        const emailElement = document.querySelector('.form-control-lg');
        const emailText = emailElement.value;

        if (emailText.length === 0) {
            emailElement.focus();
            emailElement.animate(
                [
                    { transform: "translateX(0)" },
                    { transform: "translateX(50px)" },
                    { transform: "translateX(-50px)" },
                    { transform: "translateX(0)" }
                ],
                {
                    duration: 400,
                    easing: "linear",
                }
            );
            return;
        }
        
        sendData();
    });

  }

window.addEventListener('DOMContentLoaded', ready);
window.addEventListener('load', loaded);