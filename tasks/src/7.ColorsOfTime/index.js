import React from "react";
import ReactDom from "react-dom";
import PropTypes from "prop-types";
import "./styles.css";
import * as helpers from "./helpers";
import TimeDisplay from "./TimeDisplay";
import Timer from "./Timer";


/**
    Автор кода явно сделал много лишней работы,
    прокидывая информацию о времени и настройках цвета через все компоненты.
    А все потому, что не знал про context!
    
    Отрефактори код по следующим шагам:
    1. Создай TimeContext и ColorContext.
    2. Оберни содержимое ColorsOfTime в TimeContext.Provider и ColorContext.Provider.
    3. Используй TimeContext.Consumer и ColorContext.Consumer, чтобы не прокидывать time и color через свойства.
       Не забудь убрать весь ненужный теперь код.
    4. Поставь Лондон сразу после Пекина, а локальное время поставь на место Лондона. Так логичнее!
       Обрати внимание сколько props тебе пришлось прокинуть для этого действия!
    5. Посмотри, что перерисовывается каждую секунду. Оптимизируй. Можно ли было сделать без использования context?

    Подсказки:
    - Создание контекста:
      const CakeContext = React.createContext();
    - Поставка значения:
      <CakeContext.Provider value={cheeseCake}>
        ...
      </CakeContext.Provider>
    - Потребление значения:
      <CakeContext.Consumer>
        {cake => <Hungry food={cake} />}
      </CakeContext.Consumer>
 */

class ColorsOfTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date(),
      color: 'red'
    };
  }

  componentDidMount() {
    this.props.timer.addUpdated(this.handleTimerUpdated);
  }

  componentWillUnmount() {
    this.props.timer.removeUpdated(this.handleTimerUpdated);
  }

  render() {
    const { time, color } = this.state;
    return (
      <div className="page">
        <h1>Цвета времени</h1>
        <BeforeChangeColor time={time} color={color} />
        {this.renderChangeColor()}
        <AfterChangeColor time={time} />
      </div>
    );
  }

  renderChangeColor() {
    return (
      <div className="buttonContainer">
        <input
          className="actionButton"
          type="button"
          value="Сменить цвет"
          onClick={this.handleNextColor}
        />
      </div>
    );
  }

  handleTimerUpdated = time => {
    this.setState({ time: time });
  }

  handleNextColor = () => {
    const colors = ['red', 'green', 'blue'];
    const nextColor = colors[(colors.indexOf(this.state.color) + 1) % colors.length];
    this.setState({ color: nextColor });
  }
}

ColorsOfTime.propTypes = {
  timer: PropTypes.object
}


class BeforeChangeColor extends React.Component {
  render() {
    const { time, color } = this.props;
    return (
      <div>
        <Card title="Синий Нью Йорк" timezone={-4} time={time} color="blue" />
        <Card title="Зеленый Париж" timezone={+2} time={time} color="green" />
        <Card title="Красный Пекин" timezone={+8} time={time} color="red" />
        <Card title="Цветное локальное" time={time} color={color} />
      </div>
    )
  }
}

BeforeChangeColor.propTypes = {
  color: PropTypes.string.isRequired,
  time: PropTypes.object.isRequired
}


class AfterChangeColor extends React.Component {
  render() {
    const { time } = this.props;
    return (
      <div>
        <Card title="Серый Лондон" timezone={+0} time={time} />
      </div>
    )
  }
}

AfterChangeColor.propTypes = {
  time: PropTypes.object.isRequired
}


class Card extends React.Component {
  render() {
    const { title, timezone, time, color } = this.props;
    return (
      <div className="card">
        <h3>{title}</h3>
        <div>
          <TimeDisplay
            time={timezone ? helpers.toTimezone(time, timezone) : time}
            color={color}
          />
        </div>
      </div>
    )
  }
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
  timezone: PropTypes.number,
  time: PropTypes.object.isRequired
}


const timer = new Timer();
ReactDom.render(<ColorsOfTime timer={timer} />, document.getElementById("app"));
