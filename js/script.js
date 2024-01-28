//importat les dos clases Cicle i Modul del arxiu Cicles.js
import { Cicle, Modul } from './Cicles.js';
//Creat array on guardo els cicles
let cicles = [];
//Carrega la informacio, com esta buida unicament carrega la taula
window.onload = carregarInformacio();

//Cada vegada que un element amb aquesta id es clicat, truca a la funcio corresponent
document.getElementById('btnCarregarCicles').addEventListener('click', carregarInformacio);
document.getElementById("btnAfegirCicle").addEventListener("click", afegirCicle);
document.getElementById("btnAfegirModul").addEventListener("click", afegirModul);
document.getElementById('btnEliminarCicle').addEventListener('click', eliminarCicle);
document.getElementById('btnEditarCicle').addEventListener('click', editarCicle);
document.getElementById('btnCalcularHores').addEventListener('click', calcularHores);

//Fimcop que carrega la informacio a un element amb id testDiv (anomenat aixi al principi per testejar la creacio de les clases)
function carregarInformacio() {
    let testDiv = document.getElementById('testDiv');
    //Buida la taula anterior
    testDiv.innerHTML = '';
    
    //Crea la taula amb un thead i un row que fa de header
    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let headerRow = document.createElement('tr');
    ['Id', 'Nom', 'NumEdicions', 'Ultima Modificacio', 'Moduls'].forEach(header => {
        let th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);
    //Crea el cos de la taula on fa un for de cada cicle i el guarda en cadascun de les files de la taula.
    let tbody = document.createElement('tbody');
    for (let cicle of cicles) {
        //Per mostrar que toString funciona
        console.log(cicle.toString());
        let row = document.createElement('tr');
        [cicle.id, cicle.nom, cicle.numEdicions, cicle.ultimaModificacio].forEach(text => {
            let td = document.createElement('td');
            td.textContent = text;
            row.appendChild(td);
        });
        let td = document.createElement('td');
        td.innerHTML = cicle.moduls.map(modul => modul.toString()).join('<br>');
        row.appendChild(td);
        tbody.appendChild(row);
    }
    table.appendChild(tbody);

    testDiv.appendChild(table);

}

//Agafar el nom i crea un nou cicle amb el constructor, li afegeix el num d'edicions i el guarda a cicles. Despres carregar la informacio
function afegirCicle() {
    let nom = document.getElementById('nomCicle').value;
    let cicle = new Cicle(nom);
    cicle.setNumEdicions();
    cicles.push(cicle);
    carregarInformacio();
}
//Afegeix el numero, nom, hores i la ID al cicle que pertany. 
function afegirModul() {
    let num = document.getElementById('numModul').value;
    let nom = document.getElementById('nomModul').value;
    let hores = Number(document.getElementById('horesModul').value);
    let cicleId = Number(document.getElementById('cicleModul').value);
    let modul = new Modul(num, nom, hores);
    let cicle = cicles.find(cicle => cicle.id === cicleId);
    if (cicle) {
        cicle.addModul(modul);
        cicle.setNumEdicions();
        carregarInformacio();
    }
}
//Eliminar el cicle per la seva id amb filter.
function eliminarCicle() {
    let cicleId = Number(document.getElementById('cicleIdEliminar').value);
    cicles = cicles.filter(cicle => cicle.id !== cicleId);
    carregarInformacio();
}
//Agafar el valor del input del cicle per la seva id i cargar nous inputs per poder canviar el seu nom
function editarCicle() {
    let cicleId = Number(document.getElementById('cicleIdEditar').value);
    let cicle = cicles.find(cicle => cicle.id === cicleId);
    if (cicle) {
        let editInputsDiv = document.getElementById('editarInputs');
        editInputsDiv.innerHTML = `
            <input type="text" id="editarNom" placeholder="${cicle.nom}">
            <button id="enviarEditar">Enviar</button>
        `;
        document.getElementById('enviarEditar').addEventListener('click', function() {
            let nouNom = document.getElementById('editarNom').value;
            if (nouNom !== '') cicle.nom = nouNom;
            carregarInformacio();
        });
    }
}
//Suma totes les hores dels moduls de cicles i els mostra
function calcularHores() {
    let missatge = '';
    for (let i = 0; i < cicles.length; i++) {
        let horesTotals = cicles[i].calcularHores();
        missatge += `Cicles ${i+1}: ${horesTotals} hores\n`;
    }
    alert(missatge);
}