//Globale variabelen voor later gebruik
let email = {}, 
    password = {}, 
    signInButton;

//Helper functions
const isValidEmailAddress = function(emailAddress) {
    // Basis manier om e-mailadres te checken.
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress);
};
const isEmpty = function(fieldValue) {
    return !fieldValue || !fieldValue.length;
};
const isValidPassword = function(password) {
    if (password.length >= 1) {
        return true
    } else {
        return false
    }
};

const getDOMElements = function(){
    email.field = document.querySelector('.js-email-field');
    email.errorMessage = document.querySelector('.js-email-error-message');
    email.input = document.querySelector('.js-email-input');

    //console.log(email);

    password.field = document.querySelector('.js-password-field');
    password.errorMessage = document.querySelector('.js-password-error-message');
    password.input = document.querySelector('.js-password-input');

    //console.log(email);

    signInButton = document.querySelector('.js-sign-in-button');

    enableListereners();
};

const addErrors = function(formField, errorField, errorMessage){
    formField.classList.add('has-error');
    errorField.style.display = 'block';
    errorField.innerHTML = errorMessage;
};

const removeErrors = function(formField, errorField){
    formField.classList.remove('has-error');
    errorField.style.display = 'none';
};

const doubleCheckEmailAddress = function(){
    if(!isEmpty(email.input.value) && isValidEmailAddress(email.input.value)){
        removeErrors(email.field, email.errorMessage);
        email.input.removeEventListener('input', doubleCheckEmailAddress);
    }else{
        addErrors(email.field, email.errorMessage, 'The email is incorrect');
    }
};
 

const enableListereners = function(){
    email.input.addEventListener('blur', function(){
        if (isEmpty(email.input.value) && !isValidEmailAddress(email.input.value)) {
            addErrors(email.field, email.errorMessage, "This field is required");

            //Zet geen ronde haakjes rond een named (event) function
            email.input.addEventListener('input', doubleCheckEmailAddress)
        } else {
            if (isEmpty(email.input.value)) {
                //Als het veld leeg is dan doen we de checks weg
                removeErrors(email.field, email.errorMessage);
                email.input.removeEventListeners('input', doubleCheckEmailAddress);
            }
        }
    });


    password.input.addEventListener('blur', function(){
        if (isEmpty(password.input.value)) {
            addErrors(password.field, password.errorMessage, "This field is required");
        } else{
            removeErrors(password.field, password.errorMessage);
        }
    });

    signInButton.addEventListener('click', function(event){
        event.preventDefault();
        if (!isEmpty(email.input.value) && isValidEmailAddress(email.input.value) && !isEmpty(password.input.value)) {
            console.log(email.input.value);
            console.log(password.input.value);
        }
    });
};

document.addEventListener('DOMContentLoaded', function () {
    console.log('Script loaded!');
    getDOMElements();
    enableListereners();
});