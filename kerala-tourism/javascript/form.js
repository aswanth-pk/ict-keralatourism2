
const formInputContainer = document.getElementById('signup-form');
const usernameField = document.getElementById('uname');
const phoneField = document.getElementById('phone');
const emailFieldSign = document.getElementById('email');
const passwordFieldSign = document.getElementById('password');
const confirmPasswordField = document.getElementById('confirm-password');

const strengthMeter = document.getElementById('strength-meter');

//sign up and login buttons
const signupSubmitBtn = document.getElementById('signup-submit');
const loginSubmitBtn = document.getElementById('login-submit');

// switch between signup and login buttons
const signupBtn = document.getElementById('signup-btn');
const loginBtn = document.getElementById('login-btn');

// warning list
const warningList = document.getElementsByClassName('warning-list')[0];

const usernameWarning = document.getElementsByClassName('username-warning')[0];
const signupMailWarning = document.getElementsByClassName('signup-mail-warning')[0];
const signupPasswordWarning = document.getElementsByClassName('signup-password-warning')[0];
const phoneWarning = document.getElementsByClassName('phone-warning')[0];
const confirmPasswordWarning = document.getElementsByClassName('confirm-password-warning')[0];

// password warning
const numberWarn = document.getElementById('pass-num');

// 
const signup = document.getElementById('signup-form')
const login = document.getElementById('login-form');

// event listeners
// window resize 
// window.addEventListener("resize", setFormSize);


// passwordFieldSign.addEventListener('click', function(){
//     warningList.classList.remove('hidden');
// })


passwordFieldSign.onfocus = function(){
    warningList.classList.remove('hidden');
    strengthMeter.classList.remove('hidden');
}
passwordFieldSign.onblur = function(){
    warningList.classList.add('hidden');
    strengthMeter.classList.add('hidden');
}
// ************************************* validating password ***************************************/
passwordFieldSign.addEventListener('input',updateStrengthMeter);


// *****************************switch between login and signup pages*******************************/
signupBtn.addEventListener('click', function(e){
    e.preventDefault();
    showSignup();
});

loginBtn.addEventListener('click', function(e){
    e.preventDefault();
    showLogin();
});
// ****************************switch between signup login end*************************************/

// validate input boxes
// username
usernameField.addEventListener('input', function(){
    if(usernameField.value.length>3){
        usernameWarning.innerText = "Valid";
        usernameWarning.style.color = "green";
    }
    else{
        usernameWarning.innerText = "Minimum 4 characters";
        usernameWarning.style.color = "red";
    }
})
phoneField.addEventListener('input', function(){
    if(phoneValidate()){
        phoneWarning.innerText = 'Valid number';
        phoneWarning.style.color = 'green';
    }
    else{
        phoneWarning.innerText = 'Minimum 10 numbers';
        phoneWarning.style.color = 'red';
    }
})

passwordFieldSign.addEventListener('input', function(){
    if(passwordValidate()){
        signupPasswordWarning.style.color = 'green';
        signupPasswordWarning.innerText = 'Valid Password';
        warningList.style.color = 'blue'
    }
    else{
        signupPasswordWarning.style.color = 'red';
        warningList.style.color = 'red';
    }
})
confirmPasswordField.addEventListener('input', function(){
    if(passwordFieldSign.value == confirmPasswordField.value){
        confirmPasswordWarning.innerText = 'Passwords match';
    }
    else{
        confirmPasswordWarning.innerText = 'Passwords are not matching';
    }
})
  

// -------------------------------------------------------------------------------------
function showLogin(){
    login.classList.add('active');
    login.classList.add('pullup');
    signup.classList.remove('active');
}
function showSignup(){
    signup.classList.add('active');
    login.classList.remove('active');
    login.classList.remove('pullup');
}

function emailValidate(){
    let regexEmail = /^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+)\.([a-z]{2,3})(.[a-z]{2,3})?$/;

    if(regexEmail.test(emailFieldSign.value)){
        signupMailWarning.innerText = "valid";
        signupMailWarning.style.color = "green";
        return true;
    }
    else{
        signupMailWarning.innerText = "invalid";
        return false;
    }
}

// validate password

function passwordValidate(){
    const regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if(regexPass.test(passwordFieldSign.value)){
        signupPasswordWarning.innerText = "Valid";
        return true;
    }
    else{
        signupPasswordWarning.innerText = "Invalid Password";
        return false;
    }
}
// 
function phoneValidate(){
    const regexPh = /(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/g;
    if(regexPh.test(phoneField.value)){
        
        return true;
    }
    else{
        phoneWarning.innerText = "Enter 10 digit mobile number"
        return false;
    }
}
// 
function updateStrengthMeter(){
    let strength = 100;
    let weaknesses = calculatePasswordStrength(passwordFieldSign.value);
    
    weaknesses.forEach(weakness => {
        if(weakness == null) return
        strength -= weakness.deduction;
    })
    strengthMeter.style.setProperty('--strength', strength);
}
function calculatePasswordStrength(password){
    const weaknesses = [];
    weaknesses.push(lengthWeakness(password));
    weaknesses.push(lowercaseWeakness(password));
    weaknesses.push(uppercaseWeakness(password));
    weaknesses.push(numberWeakness(password));
    weaknesses.push(specialCharacterWeakness(password));
    return weaknesses;
}

function lengthWeakness(password){
    const length = password.length;
    if(length <= 5){
        return {
            message: "Password is too short",
            deduction: 40
        }
    }
    if(length  >5 && length < 8){
        return {
            message: "Password could be longer",
            deduction: 30
        }
    }
    if(length  >=8 && length <=10 ){
        return {
            message: "Password could be longer",
            deduction: 15
        }
    }
}

function lowercaseWeakness(password){
  return characterTypeWeakness(password, /[a-z]/g, 'lowercase character')
}
function uppercaseWeakness(password){
    return characterTypeWeakness(password, /[A-Z]/g, 'uppercase character')
}
function numberWeakness(password){
    return characterTypeWeakness(password, /[0-9]/g, 'number')
}
function specialCharacterWeakness(password){
    return characterTypeWeakness(password, /[^0-9a-zA-Z\s]/g, 'special character')
}
function characterTypeWeakness(password, regex, type){
    const matches = password.match(regex) || [];
    if (matches.length === 0){
        return {
            deduction: 20,
            message: `password must contain atleast 1 ${type}`
        }
    }
    if (matches.length < 2){
        return {
            deduction: 5,
            message: `password can contain more ${type} for increased security`
        }
    }
}

// function total validate on clicking signup button

function totalValidate(){
    if(usernameField.value.trim().length == 0){
        usernameWarning.innerText = "Username can't be empty";
        usernameField.value="";
        return false;
    }
    if(usernameField.value.trim().length < 4){
        usernameWarning.innerText = "Minimum 4 characters";
        usernameField.value="";
        return false;
    }
    if(phoneField.value.trim().length < 0){
        phoneWarning.innerText = "Phone number should have 10 digits";
        // phoneField.value="";
        return false;
    }
    if(emailFieldSign.value.trim().length == 0){
        signupMailWarning.innerText = "email can't be empty";
        emailFieldSign.value="";
        return false;
    }
    if(confirmPasswordField.value.trim() != passwordFieldSign.value){
        confirmPasswordWarning.innerText = "passwords are not same";
        confirmPasswordField.value="";
        return false;
    }
    if(!emailValidate() || !passwordValidate() || !phoneValidate()){
        return false
    }
}