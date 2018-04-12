import React from 'react';
import ReactDom from 'react-dom';
import './styles.css';


/**
    Сделай так, чтобы в переменной userName сохранялось введенное пользователем значение.
   
    Подсказки:
    - Chrome DevTools содержит прекрасный отладчик. Открывается через Ctrl+Shift+I.
    - Инструкция debugger останавливает отладчик, если открыты DevTools.
    - Посмотри, что приходит первым аргументом в обработчик onChange.
 */


let userName = 'По умолчанию';

let mydom =
  <div className="root">
    <div className="form">
      <div style={{ paddingRight: "10px", display: "inline-block" }}>
        <label htmlFor="name">Имя</label>
      </div>
      <input
        id="name"
        type="text"
        size="39"
        onChange={event => {
          const target = event.target;
          debugger;
        }}
        onBlur={() => alert(`userName: ${userName}`)}
      />
    </div>
  </div>;


ReactDom.render(
  mydom,
  document.getElementById('app')
);
