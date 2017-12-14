'use strict';

/*
***********************************************************************************
***********************************************************************************
***
***                       ОТРИСОВКА СТАТИСТИКИ ЛУЧШИХ ИГРОКОВ.
***
***********************************************************************************
***********************************************************************************
*/

/**
* Отрисовка модального окна со списком игроков и их наглядной статистикой
* @function
* @param {method} ctx — канвас
* @param {array} names — массив с именами игроков
* @param {array} times — массив с временем прохождения игры участниками
*/
window.renderStatistics = function (ctx, names, times) {
  // Модальное окно — тень на фоне
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(110, 20, 420, 270);

  // Модальное окно — передний план
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(100, 10, 420, 270);

  // Модальное окно — заголовок, оцентрован
  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';
  ctx.textAlign = 'center';
  ctx.fillText('Ура, вы победили!', 310, 35);
  ctx.fillText('Список результатов:', 310, 55);
  ctx.textAlign = 'start';

  /**
  * Блок переменных + крупный цикл, отрисовывающий непосредственно статистику
  */
  var columnInitialX = 155;
  var columnInitialY = 90;
  var columnMarginX = 0; // значение меняется в каждой итерации цикла на 72 строке
  var columnWidth = 40;
  var columnMaxHeight = 150;

  for (var i = 0; i < names.length; i++) {
    var name = names[i];
    var time = Math.round(times[i]);

    // Установка цвета для колонок гистограммы:
    // для игрока с именем 'Вы' — красный цвет колонки,
    // для остальных — синий цвет с рандомной полупрозрачностью от 0.2 до 1 с одним знаком после точки
    if (name === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      var transparencyValue = window.utils.getRandomNumber(0.2, 1, 1);
      ctx.fillStyle = 'rgba(66, 88, 254, ' + transparencyValue + ')';
    }

    // Расчет высоты колонок:
    // максимальное время игры === максимально допустимая высота колонки в px
    // остальные колонки расчитываются пропорционально
    var columnHeight = (columnMaxHeight / window.utils.getMaxElement(times)) * time;

    // Расчет сдвига разновысотных колонок относительно единой точки инициализации columnInitialY
    var columnMarginY = columnMaxHeight - columnHeight;

    // Финальная отрисовка колонок
    ctx.fillRect((columnInitialX + columnMarginX), (columnInitialY + columnMarginY), columnWidth, columnHeight);

    // Проверка ширины (px) имен игроков, центровка и финальная отрисовка
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 16px PT Mono';
    var nameWidth = getTextWidth(name);
    var nameShift = 0;

    if (nameWidth > columnWidth) {
      nameShift = (nameWidth - columnWidth) / 2;
      ctx.fillText(name, (columnInitialX + columnMarginX - nameShift), 260);
    } else if (nameWidth < columnWidth) {
      nameShift = (columnWidth - nameWidth) / 2;
      ctx.fillText(name, (columnInitialX + columnMarginX + nameShift), 260);
    } else {
      ctx.fillText(name, (columnInitialX + columnMarginX), 260);
    }

    // Проверка ширины (px) времени игроков, центровка и финальная отрисовка
    ctx.fillStyle = '#000000';
    ctx.font = '16px PT Mono';
    var timeWidth = getTextWidth(time);
    var timeShift = 0;

    if (timeWidth > columnWidth) {
      timeShift = (timeWidth - columnWidth) / 2;
      ctx.fillText(time, (columnInitialX + columnMarginX - timeShift), (85 + columnMarginY));
    } else if (timeWidth < columnWidth) {
      timeShift = (columnWidth - timeWidth) / 2;
      ctx.fillText(time, (columnInitialX + columnMarginX + timeShift), (85 + columnMarginY));
    } else {
      ctx.fillText(time, (columnInitialX + columnMarginX), (85 + columnMarginY));
    }

    // Наращивание дистанции между именами, временем и колонками гистограммы в каждой итерации
    columnMarginX += 90;
  }
};

/**
* Функция получения ширины текста (px) перед выводом его на канвас
* @function getTextWidth
* @param {string} text — текст для расчета ширины
* @return {number} — искомая ширина
*/
function getTextWidth(text) {
  var canvas = document.querySelector('canvas');
  var ctx = canvas.getContext('2d');
  return ctx.measureText(text).width;
}
