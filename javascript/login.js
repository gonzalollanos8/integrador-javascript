const loginForm = document.getElementById('log-in');

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const formError = document.getElementById('formError');

const users = JSON.parse(localStorage.getItem("users")) || [];  

const isEmpty = (input) =>{
    return !input.value.trim().length;
};
//exite el mail
const isExistEmail = (input) =>{
    return users.some((user) => user.email === input.value.trim());
};
//coincide la contrena
const isMatchingPass = (input) => {
    const user = users.find((user) => user.email === emailInput.value.trim());

    return user.password === input.value.trim();
};

const showError = (msg) =>{
    formError.textContent = msg;
}


const isValidAccount = () =>{
    let valid = false;

    if(isEmpty(emailInput)){
        showError('complete all input');
        return;
    }

    if(!isExistEmail(emailInput)){
        showError('Invalid email');
        console.log(isExistEmail(emailInput))
        return;
    }

    if(isEmpty(passwordInput)){
        showError('complete Password');
        return;
    }

    if(!isMatchingPass(passwordInput)){
        showError("Password doesn't match");
        loginForm.reset();
        return;
    }





    alert('Log in!');
    valid = true;
    formError.textContent = '';
    loginForm.reset();
    return valid;
};



const login = (e) =>{
    e.preventDefault();

    if(isValidAccount()){
        
        window.location.href = '../index.html';
        alert('Welcome');

    }

}



const init = () =>{
    loginForm.addEventListener('submit', login);
}

init();