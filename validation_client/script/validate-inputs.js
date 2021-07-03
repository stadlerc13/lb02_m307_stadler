/* Aufgabe:
  Fügen Sie die notwendigen Selektoren für
  firstname, lastname, mobile, password2
*/

const form = document.getElementById('form');
const name = document.getElementById('name');
const lastname = document.getElementById('lastname');
const username = document.getElementById('username');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const password = document.getElementById('password');
const passwordcontrol = document.getElementById('passwordcontrol');
const birthdate = document.getElementById('birthdate');
const c1 = document.getElementById('c1');
const c2 = document.getElementById('c2');
const c3 = document.getElementById('c3');
const c4 = document.getElementById('c4');

// Show input error message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// Show success outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// Check email is valid
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Email ist nicht richtig');
    }
}

/* Aufgabe:
    Validieren Sie die Mobile-Nummer ähnlich wie bei der Email mit einer
    Regular expression (regex). Für eine geeignete regex suchen Sie
    im Internet nach "javascript regular expression for mobile number".*/


// Check phone is valid
function checkPhone(input) {
    const re = /^([0][1-9][0-9](\s|)[0-9][0-9][0-9](\s|)[0-9][0-9](\s|)[0-9][0-9])$|^(([0][0]|\+)[1-9][0-9](\s|)[0-9][0-9](\s|)[0-9][0-9][0-9](\s|)[0-9][0-9](\s|)[0-9][0-9])$/gm;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Mobilenummer ist nicht richtig');
    }
}


//Checkbox Validation
(function () {
    const form = document.querySelector('#date');
    const checkboxes = form.querySelectorAll('input[type=checkbox]');
    const checkboxLength = checkboxes.length;
    const firstCheckbox = checkboxLength > 0 ? checkboxes[0] : null;

    function init() {
        if (firstCheckbox) {
            for (let i = 0; i < checkboxLength; i++) {
                checkboxes[i].addEventListener('change', checkValidity);
            }

            checkValidity();
        }
    }

    function isChecked() {
        for (let i = 0; i < checkboxLength; i++) {
            if (checkboxes[i].checked) return true;
        }

        return false;
    }

    function checkValidity() {
        const errorMessage = !isChecked() ? 'Mindestens ein Kästchen muss ausgewählt sein' : '';
        firstCheckbox.setCustomValidity(errorMessage);
    }

    init();
})();


// Check required fields
function checkRequired(inputArr) {
    let isRequired = false;
    inputArr.forEach(function (input) {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} wird benötigt`);
            isRequired = true;
        } else {
            showSuccess(input);
        }
    });

    return isRequired;
}

// Check input length
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(
            input,
            `${getFieldName(input)} muss mindestens ${min} Zeichen lang sein`
        );
    } else if (input.value.length > max) {
        showError(
            input,
            `${getFieldName(input)} darf nicht mehr als ${max} lang sein`
        );
    } else {
        showSuccess(input);
    }
}

/* Aufgabe:
    Validieren Sie, ob die beiden Passwörter übereinstimmen.
    Falls sie nicht übereinstimmen, geben Sie (ähnlich wie in den anderen Beispielen)
    eine Fehlermeldung dem Formular aus.
*/

// Check passwords match
function checkPasswordMatch(input1, input2) {
    let pwd1 = input1.value.trim();
    let pwd2 = input2.value.trim();
    if (pwd1 === pwd2) {
        showSuccess(input2);
    } else {
        showError(input2, 'Zweites Passwort stimmt nicht überein');
    }
}

// Get fieldname
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function validateForm() {
    if (!checkRequired([name, lastname, username, email, phone, birthdate, password, passwordcontrol])) {
        //Aufgabe: Validierung der Länge für Vorname (2 bis 20) und Nachname (2 bis 50)
        checkLength(name, 2, 20);
        checkLength(lastname, 2, 50);
        checkLength(username, 3, 15);
        checkLength(password, 6, 25);
        /* Aufgabe:
          Validierung der Telefonnumer ähnlich wie bei der Email mit einer
          Regular expression (regex). Für eine geeignete regex suchen Sie
          im Internet nach "javascript regular expression for mobile number"
          name, lastname, username, email, phone, birthdate, password
        * */
        checkEmail(email);
        checkPhone(phone);
        checkPasswordMatch(password, passwordcontrol);
    }
}


// Event listeners
form.addEventListener('submit', function (e) {
    //https://www.w3schools.com/jsref/event_preventdefault.asp
    e.preventDefault();
    //First validate form
    validateForm();
});
