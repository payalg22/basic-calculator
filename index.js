var isResult = false; //True when last present value on display is a result
var isOperator = true; //True when last entered value is an operator

function getResult() {
    let displayBox = document.getElementById("input-display");
    var expression = displayBox.value;
    //Check if eval string is empty or the last char is an operator
    try {
        if (expression !== "" && !isOperator){
            var result = eval(expression);
            isResult = true;
            if(!Number.isInteger(result)){
                result = result.toFixed(2);
            }
            displayBox.value = result;
            document.querySelector("div.display").style = "background:#0e111c";
        }
    } catch (error) {
            displayBox.setAttribute("title", error.message);
            displayBox.style = "border: 2px solid red;";
            setTimeout(() => {
                displayBox.removeAttribute("title");
                displayBox.style = "border: none";
                displayBox.value = "";
            }, 5000);
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
