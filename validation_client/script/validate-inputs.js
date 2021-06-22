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

/*
// Check phone is valid
function checkPhone(input) {
    const re = /^(?:(?:|0{1,2}|\+{0,2})41(?:|\(0\))|0)([1-9]\d)(\d{3})(\d{2})(\d{2})$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Mobilenummer ist nicht richtig');
    }
}
*/

//Checkbox Validation
(function() {
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
        const errorMessage = !isChecked() ? 'Mindestend ein Kästchen muss ausgewählt sein' : '';
        firstCheckbox.setCustomValidity(errorMessage);
    }

    init();
})();



// Check required fields
function checkRequired(inputArr) {
  let isRequired = false;
  inputArr.forEach(function(input) {
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

// Get fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function validateForm(){
  if(!checkRequired([name, lastname, username, email, phone, birthdate, password])) {
      //Aufgabe: Validierung der Länge für Vorname (2 bis 20) und Nachname (2 bis 50)
      checkLength(name, 2, 15);
      checkLength(lastname, 2, 15);
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
      check(passwordcontrol);
  }}
    /* Aufgabe:
      Validierung Sie die beiden Passwörter, damit password
      mit password2 übereinstimmt.
    * */
/*
function checkPasswordcontrol(){
    if(password.value != passwordcontrol.value) {
        passwordcontrol.setCustomValidity("Passwords Don't Match");
    } else {
        passwordcontrol.setCustomValidity('');
    }
}
*/

/*function checkPasswordcontrol(input) {
    const re = password === passwordcontrol
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Mobilenummer ist nicht richtig');
    }
}*/
/*
var check = function() {
    if (document.getElementById('password').value ==
        document.getElementById('passwordcontrol').value) {
        showSuccess(input);

    } else {
        showError(input, 'Mobilenummer ist nicht richtig');
    }
} }

function validate()
{ if(password = passwordcontrol)
{
    showSuccess(input);}
    else {
    showError(input, 'Mobilenummer ist nicht richtig');
}*/

// Event listeners
form.addEventListener('submit', function(e) {
  //https://www.w3schools.com/jsref/event_preventdefault.asp
  e.preventDefault();
  //First validate form
  validateForm();
});
