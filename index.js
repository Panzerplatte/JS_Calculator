const display = document.getElementById("display") // Hier weißen wir das Display dem script hinzu um die Zahlen aus diesem entnehmen zu können.

var lastDisplay = [] // Array um alle aktuellen Zahlen und Operator zu speichern.
var lastCharacter = "0" // Dies ist immer der Aktuelle letzte Char den wir eingegeben haben.


// ----- Essentials ----- \\

// Hier schauen wir nach ob der letzte Character eine Zahl oder ein Operator ist.
function checkLastCharacter(str) {

    if (/\d$/.test(str)) {
        return str
    } else if (/[+\-*/]$/.test(str)) {
        return false
    } else {
        return null
    }

}

// Hier ersetzten wir die Letzte Position mit einem anderen Char. \\ Wir erhalten einen String zurück
function replaceLastCharacter(str, newNumber) {

    var isNumber = checkLastCharacter(lastCharacter)

    if (isNumber == false) {
        return str.replace(/[+\-*/]$/, newNumber)
    }
    else {
        return str.replace(/\d$/, newNumber)
    }
}

// Hier schauen wir nach ob es eine einzelne nummer ist oder ob es eine Calculation ist.
function isNumberOrCalculation(str) {
    return /^\d+(\.\d+)?$/.test(str);
}

// Hier ändern wir die Zahl zu einer Positiven oder Negativen.
function PositivOrNegativ(num) {
    
    if (num > 0) {
        return -num
    }
    else if (num < 0) {
        return Math.abs(num)
    }

}

// ----- Calculator Functions ----- \\

// Hier fügen wir den Input zu dem Display String und der Tabelle hinzu.
function ShowToDisplay(input){
    
    var IsNumber = checkLastCharacter(input) // Hier schauen wir ob der Input eine nummer oder ein Operator ist.

    if (display.value == 0 && input == 0) { // Wenn der Angezeigte wert 0 ist möchten wir keinen weiteren hinzufügen
        
        return

    }

    if (display.value == 0) { // Wenn wir auf dem Display eine 0 Stehen haben wissen wir das wir am anfang einer Calculation sind.
        
        if (IsNumber == false) { // Wir wollen überprüfen ob wir es hier um einen Operator zutun haben, wenn ja dann soll dieser zu der 0 hinzugefügt werden

            display.value += input

        }

        else { // Ansonsten ändern wir die 0 zu dem Input da es eine neue Zahl ist.
            
            display.value = input

        }

        lastCharacter = input // Wir geben an das der Neue Letzte Character dieser ist den wir gerade angegeben haben.

    }

    else { // Wenn wir auf dem Display keine null zustehen haben müssen wir schauen was genau dort steht bevor wir etwas hinzufügen können.
        
        var lastNumber = checkLastCharacter(lastCharacter) // Wir schauen hier nach dem letzten Char der hinzugefügt wurde ob dieser eine Nummer/Char ist oder ein Operator.
        
        if (lastNumber == false && IsNumber == false) { // Wenn die Letzte Zahl die wir hinzugefügt haben ein Operator ist und die neue Zahl auch ein Operator ist dann möchten wir diese ersetzten
            
            lastCharacter = input

            display.value = replaceLastCharacter(display.value, input)

            return

        }
        
        lastCharacter = input

        display.value += input

    }

    lastDisplay.push(input) // wir setzen den Input an die letzte stelle des Arrays
}

// Hier Setzten wir das Display und alle relevanten sachen zurück.
function clearDisplay(){
    display.value = 0
    lastDisplay = []
}

// wenn wir nur einen Zurück gehen kümmert sich diese function darum.
function backOne(){
    if (lastDisplay.length <= 1) {
        display.value = 0
    }
    else {
        lastDisplay.pop()
        display.value = lastDisplay.join("")
    }
}

// Diese function überprüft ob wir die letzte zahl verändern können und ob diese zahl eineln oder in einer Berechnung ist.
function changeNumberValue(){
    
    // Wenn wir wissen das die Value Größer als null ist

    if (display.value > 0) {
   
        display.value = PositivOrNegativ(display.value)

    }

    else {
        
        var IsAnumber = checkLastCharacter(lastDisplay[lastDisplay.length - 1]) // hier schauen wir nach ob die letzte zahl eine Zahl ist.
        
        if (IsAnumber) {
           
            // wenn wir wissen das es eine Nummer ist möchten wir noch schauen ob es eine Calculation ist oder nur eine Single nummer

            var IsNumber = isNumberOrCalculation(display.value)

            // Wenn wir sicher sind das es eine nummer ist dann möchten wir diese direkt ändern.

            if (IsNumber == true) {

                display.value = PositivOrNegativ(display.value)

            }

            else {
                
                var NumberToChange = PositivOrNegativ(IsAnumber)
                console.log(NumberToChange)

                //display.value = replaceLastCharacter(display.value, NumberToChange)

                lastDisplay.pop()
                lastDisplay.push(NumberToChange)

                display.value = lastDisplay.join("")

            }

        }

        else if (IsAnumber == false) {

        }

        else {
            clearDisplay()
        }
        
    }
}

// Hier Calculieren wir das gesammt Ergebniss.
function calculate(){
    try{
        display.value = eval(display.value)
        lastDisplay = []
    }
    catch(error) {

    }
}

display.value = 0 // Hier setzten wir die Start Zahl die am Anfang angezeigt werden soll.