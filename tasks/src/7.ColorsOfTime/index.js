import React from "react";
import ReactDom from "react-dom";
import PropTypes from "prop-types";
import "./styles.css";
import * as helpers from "./helpers";
import TimeDisplay from "./TimeDisplay";
import Timer from "./Timer";


/**
- создать контексты
const TimeContext = React.createContext();
- добавить контексты в render ColoursOfTime
- впилить время и цвет
- поменять местами цветное локальное и серый лондон
 */

class ColoursOfTime extends React.Component {
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

ColoursOfTime.propTypes = {
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
  color: PropTypes.string.isRequired,
  timezone: PropTypes.number,
  time: PropTypes.object.isRequired
}


const timer = new Timer();
ReactDom.render(<ColoursOfTime timer={timer} />, document.getElementById("app"));
