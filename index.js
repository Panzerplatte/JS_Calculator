const display = document.getElementById("display")

var gotCalculatet = false 
var lastDisplay = []

function ShowToDisplay(input){
    if (display.value == 0) {
        display.value = input
    }
    else {
        display.value += input
    }

    lastDisplay.push(display.value)
}

function clearDisplay(){
    display.value = ""
    lastDisplay = []
}

function backOne(){
    if (lastDisplay.length <= 1) {
        display.value = 0
    }
    else {
        lastDisplay.pop()
        display.value = lastDisplay[lastDisplay.length - 1]
    }
}

function calculate(){
    try{
        display.value = eval(display.value)
    }
    catch(error){
        display.value = "Error"
    }
}