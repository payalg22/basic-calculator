var isResult = false; //True when last present value on display is a result
var isOperator = true; //True when last entered value is an operator

function getResult() {
    let displayBox = document.getElementById("input-display");
    var expression = displayBox.value;
    //Check if eval string is empty or the last char is an operator
    if (expression !== "" && !isOperator){
        var result = eval(expression);
        isResult = true;
        displayBox.value = result.toFixed(2).replace(".00", "");
        document.querySelector("div.display").style = "background:#0e111c";
    }
}

function setValue(val) {
    let displayBox = document.getElementById("input-display");
    var prevExp = ""; 
    if(isResult) {
        prevExp = "";
        isResult = false;
        document.querySelector("div.display").style = "background:#181F32"
    } else {
        prevExp = displayBox.value;
    }
    let len = prevExp.length;
    
    //Font size of display will reduce when it'll accomodate more items
    if(len >= 16) {
        document.querySelector(".display input").style = "font-size:2.5em";
    }

    if(len >= 19) {
        document.querySelector(".display input").style = "font-size:2em";
    }


    var exp;
    if(val === "del") {
        let toDelete =  prevExp.charAt(len - 2) === " " ? 2 : 1; 
        //Checks if there is white space before last character
        exp = prevExp.slice(0, len - toDelete);
        if(toDelete === 2) {
            isOperator = isOperator ? false : true; 
        }
        
    } else if (isOperator){
        //handle divided by zero
        exp = prevExp + " " + val;
        isOperator = false;
    } else {
        exp = prevExp + val;
    }

    displayBox.value = exp;

}

function setOperator(opr) {
    //when operator is added after result, isResult toggle should be set to false again
    if(!isOperator){
        let dBox = document.getElementById("input-display");
        dBox.value = dBox.value + " " + opr;
        isOperator = true;
        if(isResult) {
            isResult = false;
            document.querySelector("div.display").style = "background:#181F32";
        } 
    }
}

function reset() {
    document.getElementById("input-display").value = "";
}
