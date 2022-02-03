let pantalla = document.querySelector('#result');

function getData(ref){
    let value = ref.value;
    pantalla.value += value;
}

function clean(){
    pantalla.value = '';
}

function calculate(){
    try {
        pantalla.value = eval(pantalla.value);
    } catch (error) {
        pantalla.value = 'Error';
        setTimeout(() => {
            clean();
        }, 500);
    }
}

// historial
 document.getElementById('prueba').addEventListener('submit', calculo);

function calculo(e){
    //
    let result = document.getElementById('result').value;
    
    const historial = {
        result
    };


    if(localStorage.getItem('historials') === null){
        let historials = [];
        historials.push(historial);
        localStorage.setItem('historials', JSON.stringify(historials));
    } else {
        let historials = JSON.parse(localStorage.getItem('historials'));
        historials.push(historial);
        localStorage.setItem('historials', JSON.stringify(historials));
    }

   getHistorial();
    e.preventDefault();
} 

function getHistorial(){
    let historials = JSON.parse(localStorage.getItem('historials'));
    let historialVista = document.getElementById('historials');

    historialVista.innerHTML = '';

    for(let i = 0; i < historials.length; i++){
        let result = historials[i].result;

        historialVista.innerHTML += `<div class="hitorial-body" id="demo">
        <div class="contentH">
            <p>${result}</p>
            <button class="btn" onclick="borrarHistorial('${result}')">Borrar</button>
        </div>
        </div>`
    }
}

function borrarHistorial(result){
    let historials = JSON.parse(localStorage.getItem('historials'));

    for(let i = 0; i < historials.length; i++){
        if (historials[i].result == result){
            historials.splice(i, 1);
        }
    }
    localStorage.setItem('historials', JSON.stringify(historials));
    getHistorial();
}

getHistorial();