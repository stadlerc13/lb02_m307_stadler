// Show input error message
function showError(id, message) {
    return `${id}: ${message}`;
}

// Show success outline
function showSuccess(id) {
    return `${id} erfolgreich validiert!`;
}

// Check email is valid
function checkEmail(id,input) {
    //Default: is valid
    let result = {
        isNotValid: false,
        msg: showSuccess(id)
    }
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(input.trim())) {
        result = {
            isNotValid: true,
            msg: showError(id, 'Email ist nicht korrekt')
        }
    }
    return result;
}

//TODO: Check article for throwing errors in node js
// https://stackoverflow.com/questions/33086247/throwing-an-error-in-node-js

// Check required fields
function checkRequired(id, input) {
    //Default: is valid
    let result = {
        isNotValid: false,
        msg: showSuccess(id)
    }
    //if input is empty ...
    if (input.trim() === '') {
        //.. then it's not valid
        result = {
            isNotValid: true,
            msg: showError(id, `${input.toString()} wird benötigt`)
        }
    }
    //return validation result
    return result;
}

// Check input length
function checkLength(id, input, min, max) {
    //Default: is valid
    let result = {
        isNotValid: false,
        msg: showSuccess(id)
    }
    if (input.length < min) {
        result = {
            isNotValid: true,
            msg: showError(id,
            `${id} muss mindestens ${min} Zeichen haben`)
        }
    } else if (input.length > max) {
        result = {
            isNotValid: true,
            msg: showError(id,
                `${id} darf maximal ${max} Zeichen haben`)
        }
    }
    return result;
}

/* Aufgabe 2:
    Validieren Sie die Mobile-Nummer ähnlich wie bei der Email mit einer
    Regular expression (regex). Für eine geeignete regex suchen Sie
    im Internet nach "javascript regular expression for mobile number".
*/
// Check phone is valid

function checkPhone(id,input) {
    //Default: is valid
    let result = {
        isNotValid: false,
        msg: showSuccess(id)
    }
    const re = /^([0][1-9][0-9](\s|)[0-9][0-9][0-9](\s|)[0-9][0-9](\s|)[0-9][0-9])$|^(([0][0]|\+)[1-9][0-9](\s|)[0-9][0-9](\s|)[0-9][0-9][0-9](\s|)[0-9][0-9](\s|)[0-9][0-9])$/gm;
    if (!re.test(input.trim())) {
        result = {
            isNotValid: true,
            msg: showError(id, 'Telefonnummer ist nicht richtig')
        }
    }
    return result;
}


/* Aufgabe 3:
    Validieren Sie, ob die beiden Passwörter übereinstimmen.
    Falls sie nicht übereinstimmen, geben Sie (ähnlich wie in den anderen Beispielen)
    eine Fehlermeldung dem Formular aus.
*/

function checkPasswordMatch(input1, input2) {
    let pwd1 = input1.value.trim();
    let pwd2 = input2.value.trim();
    if (pwd1 === pwd2) {
        showSuccess(input2);
    } else {
        showError(input2, 'Zweites Passwort stimmt nicht überein');
    }
}

/**
 *  Export validation functions for further usage.
 *  function to export WITHOUT beackets!
 */
module.exports = {
    checkEmail,
    checkLength,
    checkRequired,
    checkPhone,
    checkPasswordMatch
}
