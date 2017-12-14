'use strict';

/*
***********************************************************************************
***********************************************************************************
***
***                 УПРАВЛЕНИЕ ОКНОМ НАСТРОЕК ИГРОКА (СОБЫТИЯ etc).
***
***********************************************************************************
***********************************************************************************
*/

// Получение непосредственно окна и управляющих кнопок
var playerSetup = document.querySelector('.setup');
var playerSetupOpenButton = document.querySelector('.setup-open');
var playerSetupCloseButton = playerSetup.querySelector('.setup-close');

// Механика открытия окна
playerSetupOpenButton.addEventListener('click', function () {
  openPlayerSetup();
  window.addEventListener('keydown', onPlayerSetupEscPress);
});
playerSetupOpenButton.addEventListener('keydown', function (evt) {
  if (evt.keyCode === window.constants.ENTER_KEYCODE) {
    openPlayerSetup();
    window.addEventListener('keydown', onPlayerSetupEscPress);
  }
});

// Механика закрытия окна
playerSetupCloseButton.addEventListener('click', function () {
  closePlayerSetup();
  window.removeEventListener('keydown', onPlayerSetupEscPress);
});
playerSetupCloseButton.addEventListener('keydown', function (evt) {
  if (evt.keyCode === window.constants.ENTER_KEYCODE) {
    closePlayerSetup();
    window.removeEventListener('keydown', onPlayerSetupEscPress);
  }
});

/**
* Функция, открывающая окно с настройками игрока
* @function openPlayerSetup
*/
function openPlayerSetup() {
  playerSetup.classList.remove('hidden');
}

/**
* Функция, закрывающая окно с настройками игрока
* @function closePlayerSetup
*/
function closePlayerSetup() {
  playerSetup.classList.add('hidden');
}

/**
* Функция, закрывающая окно с настройками игрока по нажатию клавиши ESC
* @function onPlayerSetupEscPress
* @param {object} evt — объект события
*/
function onPlayerSetupEscPress(evt) {
  if (evt.keyCode === window.constants.ESC_KEYCODE) {
    closePlayerSetup();
  }
}
/*
***********************************************************************************
***********************************************************************************
***
***      ОСНОВНЫЕ НАСТРОЙКИ ИГРОКА (ВЫБОР ЦВЕТОВ, ОБНОВЛЕНИЕ ЗНАЧЕНИЙ ФОРМЫ).
***
***********************************************************************************
***********************************************************************************
*/

// Выбор цвета мантии для пользовательского персонажа
// Обновление значения скрытого input в форме
var userCoatCover = document.querySelector('.setup-player .wizard-coat');
var userCoatInput = document.querySelector('.setup-player input[name="coat-color"]');

userCoatCover.addEventListener('click', function () {
  var userCoatCurrentColor = userCoatInput.value;

  userCoatInput.value = changeColor(userCoatCurrentColor, window.libraries.AVAILABLE_COAT_COLORS);
  userCoatCover.style.fill = userCoatInput.value;
});

// Выбор цвета глаз для пользовательского персонажа
// Обновление значения скрытого input в форме
var userEyesCover = document.querySelector('.setup-player .wizard-eyes');
var userEyesInput = document.querySelector('.setup-player input[name="eyes-color"]');

userEyesCover.addEventListener('click', function () {
  var userEyesCurrentColor = userEyesInput.value;

  userEyesInput.value = changeColor(userEyesCurrentColor, window.libraries.AVAILABLE_EYES_COLORS);
  userEyesCover.style.fill = userEyesInput.value;
});

// Выбор цвета файерболов для пользовательского персонажа
// Обновление значения скрытого input в форме
var userFireballCover = document.querySelector('.setup-player .setup-fireball-wrap');
var userFireballInput = userFireballCover.querySelector('input[name="fireball-color"]');

userFireballCover.addEventListener('click', function () {
  var userFireballCurrentColor = userFireballInput.value;

  userFireballInput.value = changeColor(userFireballCurrentColor, window.libraries.AVAILABLE_FIREBALL_COLORS);
  userFireballCover.style.backgroundColor = userFireballInput.value;
});

/**
* Функция, выдающая новые значения цветов из входного массива (работает последовательно и по кругу)
* @param {string} currentColor — текущий цвет, подлежащий изменению
* @param {array} availableColors — входной массив с доступными цветами
* @return {string} availableColors[currentIndex] — следующий цвет
*/
function changeColor(currentColor, availableColors) {
  var arrayLimitValue = availableColors.length - 1;
  var currentIndex = availableColors.indexOf(currentColor);

  if (currentIndex < arrayLimitValue && currentIndex !== -1) {
    currentIndex++;
  } else if (currentIndex === arrayLimitValue) {
    currentIndex = 0;
  } else if (currentIndex === -1) {
    currentIndex = 2;
  }

  return availableColors[currentIndex];
}


/*
***********************************************************************************
***********************************************************************************
***
***               ВАЛИДАЦИЯ ТЕКСТОВЫХ ДАННЫХ ПРИ НАСТРОЙКЕ ИГРОКА.
***
***********************************************************************************
***********************************************************************************
*/

// Проверка валидности пользовательского ввода (имя игрока)
var userNameInput = playerSetup.querySelector('.setup-user-name');

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
