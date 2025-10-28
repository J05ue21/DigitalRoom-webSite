const registerForm = document.getElementById('registerForm');
const registerUsername = document.getElementById('registerUsername');
const registerEmail = document.getElementById('registerEmail');
const registerPassword = document.getElementById('registerPassword');
const registerConfirmPassword = document.getElementById('registerConfirmPassword');

const setError = (element, message) => {
  const errorElement = element.nextElementSibling;
  errorElement.innerText = message;
  errorElement.style.display = 'block';
  element.style.borderColor = '#f87171';
};

const clearError = (element) => {
  const errorElement = element.nextElementSibling;
  errorElement.innerText = '';
  errorElement.style.display = 'none';
  element.style.borderColor = 'transparent';
};

const validateRegister = () => {
  let isValid = true; // segun el resultado de la condicion evaluada, si es falsa, regresa al inicio
                      //  para validar nuevamente

  if (registerUsername.value.trim().length < 3) {
    setError(registerUsername, 'El usuario debe tener al menos 3 caracteres');
    isValid = false;
  } else {
    clearError(registerUsername);
  }

  //  RegEx para controlar ingreso correcto de direcciones email
  const emailVal = registerEmail.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  
  if (!emailRegex.test(emailVal)){
    setError(registerEmail, 'Correo electrónico no válido');
    isValid = false;
  } else {
    clearError(registerEmail);
  }

  //  Contraseña mayor a 5 caracteres
  if (registerPassword.value.length < 6) {
    setError(registerPassword, 'La contraseña debe tener al menos 6 caracteres');
    isValid = false;
  } else {
    clearError(registerPassword);
  }
  // Verificando que la confirmacion de contraseña coincidan
  if (registerConfirmPassword.value !== registerPassword.value || registerConfirmPassword.value === '') {
    setError(registerConfirmPassword, 'Las contraseñas no coinciden');
    isValid = false;
  } else {
    clearError(registerConfirmPassword);
  }

  return isValid;
};

registerForm.addEventListener('submit', e => {
  e.preventDefault();

  if (!validateRegister()) return;

  const userData = {
    username: registerUsername.value.trim(),
    email: registerEmail.value.trim(),
    password: registerPassword.value,
  };

  localStorage.setItem('user', JSON.stringify(userData));

  registerForm.reset();
 

  Swal.fire("Registro exitoso");

  window.location.href = '../pages/login.html';
});
