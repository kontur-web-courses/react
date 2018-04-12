import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import '../styles.css';
import * as helpers from '../helpers';
import TimeDisplay from '../TimeDisplay';
import Timer from '../Timer';


const TimeContext = React.createContext();
const ColorContext = React.createContext();


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
    return (
      <div className="page">
        <TimeContext.Provider value={this.state.time}>
          <ColorContext.Provider value={this.state.color}>
            <h1>Цвета времени</h1>
            <BeforeChangeColor />
            {this.renderChangeColor()}
            <AfterChangeColor />
          </ColorContext.Provider>
        </TimeContext.Provider>
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


class BeforeChangeColor extends React.PureComponent {
  render() {
    return (
      <div>
        <Card title="Синий Нью Йорк" timezone={-4} color="blue" />
        <Card title="Зеленый Париж" timezone={+2} color="green" />
        <Card title="Красный Пекин" timezone={+8} color="red" />
        <Card title="Серый Лондон" timezone={+0} />
      </div>
    )
  }
}


class AfterChangeColor extends React.PureComponent {
  render() {
    return (
      <div>
        <ColorContext.Consumer>
          {color => <Card title="Цветное локальное" color={color} />}
        </ColorContext.Consumer>
      </div>
    )
  }
}


class Card extends React.Component {
  render() {
    const { title, timezone, color } = this.props;
    return (
      <div className="card">
        <h3>{title}</h3>
        <div>
          <TimeContext.Consumer>
            {time =>
              <TimeDisplay
                time={timezone ? helpers.toTimezone(time, timezone) : time}
                color={color}
              />}
          </TimeContext.Consumer>
        </div>
      </div>
    )
  }
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  timezone: PropTypes.number,
}


const timer = new Timer();
ReactDom.render(<ColorsOfTime timer={timer} />, document.getElementById('app'));
