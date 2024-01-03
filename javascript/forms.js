const registerForm = document.getElementById('singup');

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const rePasswordInput = document.getElementById('re-enter password');


const user = [];
//auxiliar

//regex email

const isEmailValid = (input) =>{
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    return re.test(input.value.trim());
}
//funcion para encontrar el email en ls
const isExistingEmail = (input) =>{
    return user.some((user) => user.email === input.value.trim());
};

//esta vacio?
const isEmpty = (input) =>{
    return !input.value.trim().length;
}
//largo?
const isBetween = (input, min, max) =>{
    return input.value.length >= min && input.value.length < max;
}

//funcion para mostrar errores del input

const showError = (input, msg) =>{
    const formField = input.parentElement;
    formField.classList.remove('success');
    formField.classList.add('error');
    
    const error= formField.querySelector('small')
    error.style.display = 'block';
    error.style.color = 'red'
    error.textContent = msg;
}

const showSuccess = (input) =>{
    const formField = input.parentElement;
    formField.classList.remove('error');
    formField.classList.add('success');
    
    const success= formField.querySelector('small')
    success.style.display = 'block';
    success.style.color = 'green'
    success.textContent = '';
}


//funcion para validar email

const checkEmail = (input)=> {
    let valid = false;

    if(isEmpty(input)){
        showError(input, 'input is empty');
        return;
    }
    if(!isEmailValid(input)){
        showError(input, 'Error in email')
    return;
    }
    if(isExistingEmail(input)){
        showError(input, 'Email is existing');
        return;
    }

    showSuccess(input);
    valid = true;
    return valid;
}

//funcion para validar contrasena

const isPassSecure = (input) =>{
    const re = / ^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$ /;
    return re.test(input.value.trim());
};

const checkPassword = (input) =>{
    let valid = false;
    
    if(isEmpty(input)){
        showError(input,"input is empty");
        return;
    }

    if(!isPassSecure(input)){
        showError(
            input,
            "Pass contain: 8 characters, 1 Uppercase & 1 simbol"
        );
        return;
    }

    showSuccess(input);
    valid = true;
    return valid;
}

const checkRePassword = () =>{
    valid = false
    
    if(passwordInput.value === rePasswordInput.value){
        showSuccess(input)
        valid=true
        return valid;
    }else{
        showError(input, "it doesn't match");
        return;
    }
}


//funcion init
const init = () =>{
    emailInput.addEventListener('input', () => checkEmail(emailInput));
    passwordInput.addEventListener('input',()=>checkPassword(passwordInput));
    rePasswordInput.addEventListener('input', () => checkRePassword(rePasswordInput));
}

init()