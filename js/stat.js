'use strict';

window.renderStatistics = function (ctx, names, times) {

  // Облако — тень на заднем плане
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(110, 20, 420, 270);

  // Облако — передний план
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(100, 10, 420, 270);

  // Текст — заголовок модального окна
  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура, вы победили!', 230, 30);
  ctx.fillText('Список результатов:', 221, 50);

  // Отрисовка статистики каждого игрока (имя игрока, время прохождения и колонка гистограммы)
  var columnInitialX = 155;
  var columnInitialY = 90;
  var columnMarginX = 0;
  var columnWidth = 40;
  var columnMaxHeight = 150;

  for (var i = 0; i < names.length; i++) {
    // Установка цвета для колонок гистограммы
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      var transparencyValue = Math.random().toFixed(1);
      if (transparencyValue === '0.0') {
        transparencyValue = '0.2';
      } else {
        ctx.fillStyle = 'rgba(66, 88, 254, ' + transparencyValue + ')';
      }
    }

    // Расчет высоты колонок
    // Начальная договоренность: максимальное время игры === максимальная высота в px === 100%
    // Вычисляем:
    //          (время текущей игры / 1% от макс.времени) === время текущей игры в %;
    //          (время текущей игры в %  *  1% от максимальной высоты) === высота колонки в px
    var columnMaxHeightPercent = columnMaxHeight / 100;
    var columnMaxTimePercent = getMaxElement(times) / 100;
    var columnHeight = (times[i] / columnMaxTimePercent) * columnMaxHeightPercent;

    // Расчет сдвига разновысотных колонок относительно единой точки инициализации Y
    var columnMarginY = columnMaxHeight - columnHeight;

    // Финальная отрисовка колонок
    ctx.fillRect((columnInitialX + columnMarginX), (columnInitialY + columnMarginY), columnWidth, columnHeight);

    // Вывод имен игроков
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 16px PT Mono';

    if (names[i] === 'Вы') {
      var textShift = 10;
      ctx.fillText(names[i], (columnInitialX + columnMarginX + textShift), 260);
    } else {
      ctx.fillText(names[i], (columnInitialX + columnMarginX), 260);
    }

    // Вывод времени игроков
    ctx.fillStyle = '#000000';
    ctx.font = '16px PT Mono';
    ctx.fillText(Math.round(times[i]), (columnInitialX + columnMarginX), (85 + columnMarginY));

    // Наращивание дистанции между именами, временем и колонками гистограммы
    columnMarginX += 90;
  }
};

// Вспомогательная библиотека функций
//
// Поиск наибольшего значения
var getMaxElement = function (someArray) {
  var maxValue = 0;
  for (var i = 0; i < someArray.length; i++) {
    if (someArray[i] > maxValue) {
      maxValue = someArray[i];
    }
  }
  return maxValue;
};
