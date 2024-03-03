const form = document.querySelector('.feedback-form');

const KEY = 'feedback-form-state';

form.addEventListener('input', onFormInput);
form.addEventListener('submit', e => {
  e.preventDefault();
  const { email, message } = e.currentTarget.elements;
  if (!email.value.trim() || !message.value.trim())
    return alert('You need to enter email and message!');
  const userData = {
    email: email.value,
    message: message.value,
  };
  console.log(userData);

  e.currentTarget.reset();
  removeDataFromLocalStorage(KEY);
});

document.addEventListener('DOMContentLoaded', () => {
  render();
});

function onFormInput(e) {
  const { email, message } = e.currentTarget.elements;

  const user = {
    email: email.value.trim(),
    message: message.value.trim(),
  };

  email.value.trim() || message.value.trim()
    ? addDataToLocalStorage(KEY, user)
    : removeDataFromLocalStorage(KEY);
}

function addDataToLocalStorage(key, value) {
  try {
    const normalizeState = JSON.stringify(value);
    localStorage.setItem(key, normalizeState);
  } catch (error) {
    console.log('set state ERROR', error.message);
  }
}

function removeDataFromLocalStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.log('set state ERROR', error.message);
  }
}

function getDataFromLocalStorage(key) {
  try {
    const normalizeState = localStorage.getItem(key);
    return normalizeState === null ? undefined : JSON.parse(normalizeState);
  } catch (error) {
    console.log('set state ERROR', error.message);
    return undefined;
  }
}

function render() {
  const data = getDataFromLocalStorage(KEY);
  form.elements.email.value = data?.email || '';
  form.elements.message.value = data?.message || '';
}

