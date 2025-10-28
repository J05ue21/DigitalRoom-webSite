const loginForm = document.getElementById('loginForm');
const loginUsername = document.getElementById('loginUsername');
const loginPassword = document.getElementById('loginPassword');

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

const validateLogin = () => {
  let isValid = true;

  if (loginUsername.value.trim() === '') {
    setError(loginUsername, 'Ingresa tu usuario');
    isValid = false;
  } else {
    clearError(loginUsername);
  }

  if (loginPassword.value === '') {
    setError(loginPassword, 'Ingresa tu contraseña');
    isValid = false;
  } else {
    clearError(loginPassword);
  }

  return isValid;
};

loginForm.addEventListener('submit', e => {
  e.preventDefault();

  if (!validateLogin()) return;

  const storedUser = JSON.parse(localStorage.getItem('user'));

  if (!storedUser || storedUser.username !== loginUsername.value.trim()) {
    setError(loginUsername, 'Usuario no existe');
    return;
  } else {
    clearError(loginUsername);
  }

  if (storedUser.password !== loginPassword.value) {
    setError(loginPassword, 'Contraseña incorrecta');
    return;
  } else {
    clearError(loginPassword);
  }
  
  //alert('Inicio de sesión exitoso');

  Swal.fire("Inicio de sesion exitoso"); //En lugar de alert()

  //{Guardamos inicio de sesion -currentUser- en localStorage **************************}
  const userToStore = {
  username: storedUser.username,
  email: storedUser.email,
  loggedAt: new Date().toISOString()
  };
  localStorage.setItem('currentUser', JSON.stringify(userToStore));
  
  window.dispatchEvent(new Event('authChanged'));
  //*******************************************

  window.location.href = '../index.html'; //regresamos al inicio
});
