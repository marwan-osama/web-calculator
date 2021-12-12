const mthSymbols = ["/", "-", "*", "+"];
const nums = [...Array(10).keys()];
const buttonsContainer = document.querySelector("#buttons-container");
const mthExpArea = document.querySelector("#math-expression-area");
const currentNumArea = document.querySelector("#typing-area");
let mthExp = "";
let currentNum = "";
let finished = false;

const shortFloat = function(answer) {
    if (answer.indexOf(".") != -1) {
        return (parseFloat(answer).toFixed(2)).toString();
    }
    return answer
}
const checkReset = function(val) {
    if (finished) {
        mthExp = "";
        if (!(/^\d+$/.test(currentNum))) {
            if (nums.includes(val) || val == "." || val == "del") {
                currentNum = "";
            }
        }
        finished = false;
    }
}

const fitTextLength = function(textElem, length) {
    if (textElem.textContent.length > length) {
        textElem.textContent = "..." + textElem.textContent.slice((textElem.textContent.length - length), textElem.textContent.length);
    }
}

const handleButtons = function(event) {
    let value = event.target.getAttribute("value");
    if (/^\d+$/.test(value)) {
        value = parseInt(value);
    }
    checkReset(value);

    if (value == "ac") {
        mthExp = "";
        currentNum = "";
    } else if (value == "del") {
        if (currentNum.length) {
            currentNum = currentNum.slice(0, currentNum.length - 1);
        }   
    } else if (mthSymbols.includes(value)) {
        if (currentNum) {
            mthExp += currentNum;
            currentNum = "";
            mthExp += value;
        }
    } else if (nums.includes(value)) {
        if (currentNum.length < 10) {
            currentNum += value.toString();
        }
    } else if (value == "=") {
        if (currentNum && /\d/.test(currentNum)) {
            mthExp += currentNum;
            currentNum = math.format(math.evaluate(mthExp),{lowerExp: -8, upperExp: 8, precision: 8}).toString();
            mthExp += value;
            finished = true;
        }
    } else if (value == ".") {
        if (!currentNum.includes(".")) {
            currentNum += value;
        }
    }
    
    mthExpArea.textContent = mthExp;
    currentNumArea.textContent = currentNum;
    fitTextLength(mthExpArea, 26);
}

buttonsContainer.addEventListener("click", handleButtons);

