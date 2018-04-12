import React from "react";
import ReactDom from "react-dom";
import "./styles.css";


/**
 * 1. Напиши таймер, который показывает текущее время пользователя и сам обновляется каждую секунду.
 * 2. Позаботься об освобождении ресурсов в случае удаления элемента.
 * 
 * Подсказки:
 * - Функция setInterval(handler, intervalInMilliseconds), регистрирует обработчик handler,
 *   который будет вызываться не чаще, чем в заданное количество миллисекунд.
 * - this.setState({property: value}) обновляет часть состояния и инициирует перерисовку.
 * - componentDidMount вызывается сразу после того, как компонент размещен на странице.
 *   В нем можно делать запросы на получение данных или подписываться на события.
 * - componentWillUnmount вызывается перед тем как удалить компонент.
 *   Гарантированно вызовется, если элемент «did mount». Отличное место, чтобы освобождать ресурсы.
 */

class Timer extends React.Component {
  constructor() {
    super();
    this.state = {
      localTime: new Date(),
    };
  }

  render() {
    return (
      <div className="time">
        {this.state.localTime.toLocaleTimeString()}
      </div>
    );
  }
}

ReactDom.render(<Timer />, document.getElementById("app"));
