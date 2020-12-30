const usernameEl = document.querySelector('#username');
const emailEl = document.querySelector('#email');
const passwordEl = document.querySelector('#password');
const confirmPasswordEl = document.querySelector('#confirm-password');

const form = document.querySelector('#signup');

const required = value => value === '' ? false : true;
const between = (length, min, max) => length < min || length > max ? false : true;
const EmailValid = (email) => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
};
const passValid = (password) => {
    const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return regex.test(password);
};

const showError = (input, message) => {
    const formField = input.parentElement;

    /***
     * classList là đối tượng đặc biệt
     * phương thức sử dụng add/toggle/remove
     * hoạt động cả trên chuỗi lớp đầy đủ bằng cách sử dụng className
     * hoặc trên các lớp riêng lẻ bằng cách sử dụng classList
     */

    formField.classList.remove('success');
    formField.classList.add('error');

    // show message error with wrong input
    const error = formField.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {

    const formField = input.parentElement;

    formField.classList.remove('error');
    formField.classList.add('success');

    // hide message error
    const error = formField.querySelector('small');
    error.textContent = ''; // gán rỗng để ẩn message lỗi
};

// Validate Username
const checkUsername = () => {
  let valid = false;
  const min = 3, max = 30;
  const username = usernameEl.value.trim();

  if (!required(username)) {
      showError(usernameEl, 'Username cannot be blank !');
  } else if(!between(username.length, min, max)){
      showError(usernameEl, 'Username must be between ${min} and ${max} characters');
  } else {
      showSuccess(usernameEl);
      valid = true;
  }
  return valid;
}

// Validate Email
const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();

    if (!required(email)){
        showError(emailEl, 'Email cannot be blank !');
    } else if(!EmailValid(email)){
        showError(emailEl, 'Email is invalid !');
    } else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
};

// Validate Password
const checkPassword = () => {
    let valid = false;
    const pass = passwordEl.value.trim();

    if (!required(pass)){
        showError(passwordEl, 'Password cannot be blank !');
    } else if (!passValid(pass)){
        showError(passwordEl, 'Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character !');
    } else {
        showSuccess(passwordEl);
        valid = true;
    }
    return valid;
};

// Validate Confirm Password
const checkConfirmPassword = () => {

    let valid = false;
    const confirmPass = confirmPasswordEl.value.trim();
    const pass = passwordEl.value.trim();

    if (!required(confirmPass)){
        showError(confirmPasswordEl, 'Please enter your password again !');
    } else if (pass != confirmPass){
        showError(confirmPasswordEl, 'Confirm password does not match !');
    } else {
        showSuccess(confirmPasswordEl);
        valid = true;
    }
    return valid;
};


// Prevent the form submit
form.addEventListener('submit', function (e) {
    e.preventDefault();

    // validate form
    let isUsernameValid = checkUsername(),
        isEmailValid    = checkEmail(),
        isPasswordValid = checkPassword(),
        isConfirmPasswordValid = checkConfirmPassword();

    let isFormValid = isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid;

    // submit to the server if the form is valid
    if (isFormValid) {

    }
});

form.addEventListener('input', function(e){
    switch (e.target.id) {
        case 'username': checkUsername();
            break;
        case 'email': checkEmail();
            break;
        case 'password': checkPassword();
            break;
        case 'confirm-password': checkConfirmPassword();
            break;
    }
});

