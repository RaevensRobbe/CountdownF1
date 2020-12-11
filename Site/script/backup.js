//Globale variabelen voor later gebruik
let email = {},
    password = {},
    signInButton;
 
const isValidEmailAddress = function(emailAddress) {
        // Basis manier om e-mailadres te checken.
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress);
};
 
const isEmpty = function(fieldValue) {
    return !fieldValue || !fieldValue.length;
};
 
const getDOMElements = function(){
    email.field = document.querySelector(".js-email-field");
    email.errorMessage= document.querySelector('.js-email-error-message');
    email.input= document.querySelector('.js-email-input');
    console.log(email);
 
    password.field = document.querySelector(".js-password-field");
    password.errorMessage= document.querySelector('.js-password-error-message');
    password.input= document.querySelector('.js-password-input');
    console.log(password);
 
    signInButton = document.querySelector('.js-sign-in-button');
    enableListeners();
}
 
const addErrors = function(formField, errorField, errorMessage){
    formField.classList.add('has-error');
    errorField.innerHTML = errorMessage;
}
 
const removeErrors = function(formField){
    formField.classList.remove('has-error');
    errorField.style.display = 'none';
}
 
const doubleCheckEmailAddress = function(){
    if(isEmpty(email.input.value) && isValidEmailAddress(email.input.value)){
        removeErrors(email.field, email.errorMessage);
        email.input.removeEventListener('input', doubleCheckEmailAddress);
    }else{
        addErrors(email.field, email.errorMessage, 'The email is incorrect');
    }
}
 
// Todo: Maak een functie enableListeners.
const enableListeners = function(){
    // Hierin komen er drie listeners: blur listeners voor de e-mail- en wachtwoordvelden en een click-event van de knop.
    email.input.addEventListener('blur', function(){
        if(isEmpty(email.input.value && !isValidEmailAddress(email.input.value))){
            addErrors(email.field, email.errorMessage, 'This field is required');
            email.input.addEventListener('input', doubleCheckEmailAddress);
        } else{
            removeErrors(email.field, email.errorMessage);
            email.input.removeEventListener('input', doubleCheckEmailAddress);
        }
    });
 
    password.input.addEventListener('blur',function(){});
 
    signInButton.input.addEventListener('click',function(){});
}
document.addEventListener('DOMContentLoaded',function(){
    // Werkt deze file wel? Wordt deze ingeladen?
    console.info('DOM is ready');
    getDOMElements();
    enableListeners();
});