/*

    L'utente clicca su un bottone che genera una griglia di gioco quadrato:

    -- 1) Ogni cella ha un numero progressivo da 1 a 100;
    -- 2) Saranno 10 righe da 10 caselle;
    -- 3) Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emette un messaggio in console con il numero della cella cliccata.

    BONUS
    Il giocatore deve avere la possibilità di controllare il numero di celle che vengono generate
    Tramite una select l'utente seleziona il livello di difficoltà e in base a quello vengono generate le celle:

        - Difficoltà 1 ==> 100 Celle;
        - Difficoltà 2 ==> 81 Celle;
        - Difficoltà 3 ==> 49 Celle. 

    4) Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe. 
        -- Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell'array delle bombe non potranno esserci due numeri uguali.

    5) In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina.
        -- Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.

    6) La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti 
        -- ovvero quando ha rivelato tutte le celle che non sono bombe.
*/

// Definisco in una Variabile il bottone per giocare
const myButton = document.querySelector('button');
console.log('myButton', myButton, typeof myButton);

// Definisco una Variabile con la quale prendo il Container dall'HTML
const containerGrid = document.querySelector('.container-grid');
console.log('containerGrid', containerGrid, typeof containerGrid);

// Creo una Flag per l'interruttore
let play = true;

// Creo un contatore per il punteggio
let counter = 0;

// Creo l'evento per cui le celle si generano al click del Bottone
myButton.addEventListener('click', function(){

    // Creo la condizione che mi controlli lo stato dell'interruttore
    containerGrid.innerHTML = '';

    // Definisco una Variabile con la quale prendo il Valore delle Option della Select
    let difficultLevel = parseInt(document.getElementById('difficult-level').value);
    console.log('difficultLevel', difficultLevel, typeof difficultLevel);

    // Creo un Array che dovrà contenere i numeri casuali delle 16 bombe
    let bombArray = [];
    
    // Utilizzo la funzione per generare le Bombe usando come argomenti le mie Variabili
    mineGenerator(bombArray, difficultLevel);
    console.log(bombArray);

    // Utilizzo la funzione per generare le cell usando come argomenti le mie Variabili
    cellGenerator (containerGrid, difficultLevel, bombArray); 

})


// Creo la funzione che generi il contenitore
function cellGenerator (div, level, array) {
    // Creo un Ciclo per cui vengono generate 100 celle
    for(let i = 1; i <= level; i++){
        // Definisco una Variabile con la quale creo la Cella da inserire nel Container
        const cell = document.createElement('div');
        console.log('cell', cell, typeof cell);

        // Assegno alle celle la classe che gli da lo stile
        cell.classList.add('cell');

        // Stampo all'interno delle celle il numero progressivo corrispondente
        cell.innerHTML = i;

        // "Appendo" la Cella al Contenitore 
        div.append(cell);

        if (level == 100) {

            cell.classList.add('easy');
    
        } else if (level == 81) {
    
            cell.classList.add('medium');
    
        } else {
    
            cell.classList.add('hard');
    
        } 

        // Aggiungo alle mine una classe identificativa
        if (array.includes(i)) {
            cell.classList.add('mine');
            console.log(i);
        } 


        // Creo un evento click che gestisce la Flag dell'interruttore
        cell.addEventListener('click', function(){
            if (play === false) {

                alert('gioco stoppato');

                return;
            }
            // Creo delle condizioni per cui in base al valore della Flag le celle cambiano colore
            if (this.classList.contains('mine')) {

                play = false;
                this.classList.add('mine-active');
                alert ('hai perso');

            } else if (!(cell.classList.contains('active'))){
                this.classList.add('active');
                counter++;
                console.log(i);
                console.log('punteggio', counter);
            }

            // Stabilisco la condizione per cui il gioco si interrompe
            if ((counter == (level - array.length)) ) {
                alert('Hai vinto');
            } 

        })
    } 
}

// Creo una funzione che mi generi casualmente i 16 numeri delle bombe
function generateRandomNumber(min, max) {
    const randNum = Math.floor(Math.random() * (max - min + 1)) + min;
    
    return randNum;
}

// Creo la funzione che crea le Bombe
function mineGenerator (array, level){
    // Creo un ciclo che generi 16 numeri casuali per le bombe
    for (let j=0; j < 16; j++){

        let minesNumber = generateRandomNumber(1, level);
        console.log('minesNumber', minesNumber, typeof minesNumber);
    
        // Controllo che i numeri generati non siano presenti più volte nell'array
        let mineFoundInArray = array.includes(minesNumber);
        console.log(mineFoundInArray);
    
            // Creo un ciclo che controlli 
            while (mineFoundInArray == true) {
                minesNumber = generateRandomNumber(1, level);
    
                mineFoundInArray = array.includes(minesNumber);
    
            }

        // Pusho le Bombe dentro l'Array
        array.push(minesNumber);
    }

}

