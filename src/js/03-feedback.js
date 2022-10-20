import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));
addEventListener('DOMContentLoaded', fillForm);

const STORAGE_KEY = 'feedback-form-state';

function onFormSubmit(e) {
  e.preventDefault();
  try {
    const formData = JSON.parse(localStorage.getItem(STORAGE_KEY));
    console.log(formData);
  } catch {
    console.log('parsing error!');
  }

  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onFormInput(e) {
  const savedMessage = localStorage.getItem(STORAGE_KEY);

  try {
    const parsedData = savedMessage ? JSON.parse(savedMessage) : {};
    parsedData.email = refs.email.value;
    parsedData.message = refs.textarea.value;
    const updateData = JSON.stringify(parsedData);
    localStorage.setItem(STORAGE_KEY, updateData);
  } catch {
    console.log('parsing error');
  }
}

function fillForm(e) {
  const savedMessageNew = localStorage.getItem(STORAGE_KEY);

  if (savedMessageNew) {
    try {
      const parsedSavedMessage = JSON.parse(savedMessageNew);
      Object.entries(parsedSavedMessage).forEach(([name, value]) => {
        refs.form.elements[name].value = value;
      });
    } catch {
      console.log('parsing error');
    }
  }
}