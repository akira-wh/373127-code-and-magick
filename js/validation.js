'use strict';

/*
***********************************************************************************
***********************************************************************************
***
***               ВАЛИДАЦИЯ ТЕКСТОВЫХ ДАННЫХ ПРИ НАСТРОЙКЕ ИГРОКА.
***
***********************************************************************************
***********************************************************************************
*/

(function () {

  // Проверка валидности пользовательского ввода (имя игрока)
  var userNameInput = document.querySelector('.setup-user-name');

  userNameInput.addEventListener('input', function () {
    if (userNameInput.validity.tooShort) {
      userNameInput.setCustomValidity('Введенное имя слишком короткое (менее 2-х символов).');
    } else if (userNameInput.validity.tooLong) {
      userNameInput.setCustomValidity('Введенное имя слишком длинное (ограничение — 25 символов).');
    } else if (userNameInput.validity.valueMissing) {
      userNameInput.setCustomValidity('Это поле обязательно к заполнению.');
    } else {
      userNameInput.setCustomValidity('');
    }
  });
})();
