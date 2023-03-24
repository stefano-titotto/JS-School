let s0 = [
'984501072',
'057009030',
'600007000',
'000002010',
'000000700',
'561000028',
'000400000',
'000200006',
'190003200'];

function stampa_input(s){
/* Scrivi nella tabella del file HTML 
	s: vettore di stringhe di numeri dove 0 significa cella vuota
*/

let tabella = document.getElementById('tabella');
let TableBody = document.getElementById("tableBody");

// crea le righe della tabella
for (let r = 0; r< s.length ; r++) {
	let el = s[r];
	var row = TableBody.insertRow();

	// crea le celle della riga	
	for (let c=0; c<el.length; c++){
		ch = el[c];
    	var cell = row.insertCell();   

		// scrivi il valore nella cella se diverso da 0
		if (ch!='0'){
			cell.innerHTML = ch;
			}

   	cell.width = '25px';
      cell.height = '25px';
		cell.align = 'center'
		cell.borderSpacing = '0px';
		
		// disegna i bordi dei quadranti
		if (!(r%3)){
			cell.style.borderTop = "thin solid black" ;
  			}
		if (!(c%3)) {
			cell.style.borderLeft = "thin solid black";
			}
		if (r==8){
			cell.style.borderBottom ="thin solid black"
			}
		if (c==8){
			cell.style.borderRight = "thin solid black"}
	}
}
}

function cancella_tabella(){
	var TableBody = document.getElementById("tableBody");
  	const rows = TableBody.rows;
  	if (rows) {
    	while (rows.length>0) {
      	TableBody.deleteRow(0)
    	}
	}
}


function stampa_tabella(s){
// Scrivi nella tabella del file HTML 
//	s: array bidimensionale di caratteri da '1' a '9'

let tabella = document.getElementById('tabella');
let TableBody = document.getElementById("tableBody");

// crea le righe della tabella utilizzando i contatori per riconoscere i multipli di 3
for (let r = 0; r< s.length ; r++) {
	let el = s[r];
	var row = TableBody.insertRow();

	// crea le celle della riga	
	for (let c=0; c<el.length; c++){
		ch = el[c];
    	var cell = row.insertCell();   

		// scrivi il valore nella cella se diverso da 0
		if (ch){
			cell.innerHTML = ch;
			}

   	cell.width = '25px';
      cell.height = '25px';
		cell.align = 'center'
		cell.borderSpacing = '0px';
		
		// disegna i bordi dei quadranti
		if (!(r%3)){
			cell.style.borderTop = "thin solid black" ;
  			}
		if (!(c%3)) {
			cell.style.borderLeft = "thin solid black";
			}
		if (r==8){
			cell.style.borderBottom ="thin solid black"
			}
		if (c==8){
			cell.style.borderRight = "thin solid black"
			}
	}
}
}

function importa_matrice(doku_text){
	let sudoku = [];
	for (stringa of doku_text){
		//console(stringa)
		let riga = [];
		for (ch of stringa){
			if (ch=="0"){
				riga.push("")}
			else{
				riga.push(ch)}
		}
		sudoku.push(riga)
	}
	return sudoku
}

function console(stringa){
	cons = document.getElementById("console")
	cons.innerHTML += stringa + "<br>"
	}

/*
def analizza_matrice(m_input):
    '''
    Per ogni casella vuota:
        calcola i numeri rimanenti fra colonna, riga e quadrante
    '''
    matrice = deepcopy(m_input)
    def numeri_colonna(c):
        return (matrice[r][c][0] for r in range(9) if len(matrice[r][c]) == 1)
    def numeri_riga(r):
        return (el[0] for el in matrice[r] if len(el) == 1)
    def numeri_quadrante(r,c):
        R = (r//3) *3
        C = (c//3) *3
        return (el[0] for riga in matrice[R:R+3] for el in riga[C:C+3] if len(el)==1 )
    for r,riga in enumerate(matrice):
        for c, elemento in enumerate (riga):
            if len(elemento) == 1:
                continue
            # crea una lista di numeri da 1 a 9 ed elimina quelli che trovi in colonne, righe, quadranti
            numeri = list(range(1,10))
            
            # rimuovi numeri colonna
            for n in numeri_colonna(c):
                if (n in numeri):
                    numeri.remove(n)
            
            # rimuovi i numeri della riga
            for n in numeri_riga(r):
                if (n in numeri):
                    numeri.remove(n)
            
            # rimuovi i numeri del quadrante
            for n in numeri_quadrante(r,c):
                if (n in numeri):
                    numeri.remove(n)
            
            # verifica che non ci siano errori
            if len(numeri) == 0:
                return None
            matrice[r][c] = numeri

*/

const clone = (items) => items.map(item => Array.isArray(item) ? clone(item) : item);

function analizza_matrice(m_input){
	matrice = clone(m_input);
	
	function numeri_colonna(c){
		// ritorna tutti i numeri presenti nella colonna c 
		let numeri =[];
		for (r=0; r<9; r++){
			if (matrice[r][c]){
				numeri.push(matrice[r][c][0]);
			}
		}
		return numeri;
	}	
}

doku =importa_matrice(s0);
stampa_tabella(doku);
console("Tabella creata da array");

a = [1,2,3];
/*var b = [for (c in a) c*2];
console(b.next());
console(b.next());
console(b.next());
*/