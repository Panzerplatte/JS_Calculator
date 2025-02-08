const display = document.getElementById("display") // Hier weißen wir das Display dem script hinzu um die Zahlen aus diesem entnehmen zu können.

var lastDisplay = [] // Array um alle aktuellen Zahlen und Operator zu speichern.

// ----- Essentials ----- \\

// Hier schauen wir nach ob der letzte Character eine Zahl oder ein Operator ist.
function checkLastCharacter() {

    const str = lastDisplay[lastDisplay.length - 1]

    if (/\d$/.test(str)) {
        return str
    } else if (/[+\-*/]$/.test(str)) {
        return false
    } else {
        return null
    }

}

// Hier ersetzten wir die Letzte Position mit einer Zahl.
function replaceLastCharacter(str, newNumber) {
    return str.replace(/\d$/, newNumber)
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
    if (display.value == 0) {
        display.value = input
    }
    else {
        display.value += input
    }

    lastDisplay.push(input)
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
        
        var IsAnumber = checkLastCharacter() // hier schauen wir nach ob die letzte zahl eine Zahl ist.
        
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
    catch(error){
        display.value = "Error"
    }
}

display.value = 0 // Hier setzten wir die Start Zahl die am Anfang angezeigt werden soll.