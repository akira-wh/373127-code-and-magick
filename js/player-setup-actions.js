'use strict';

/*
***********************************************************************************
***********************************************************************************
***
***             УПРАВЛЕНИЕ ОКНОМ НАСТРОЕК ИГРОКА (ОТКРЫТИЕ, ЗАКРЫТИЕ).
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
