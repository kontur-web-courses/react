import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import '../styles.css';
import * as helpers from '../helpers';
import * as themes from '../themes';
import TimeDisplay from '../TimeDisplay';
import Timer from '../Timer';

const CurrentTimeContext = React.createContext();
const ThemeContext = themes.Context;
const ChangeThemeContext = React.createContext();

const ThemedButton = themes.withTheme(Button);

class ColorsOfTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: null,
      theme: themes.red
    };
  }

  componentDidMount() {
    this.props.timer.addUpdated(this.handleTimerUpdated);
  }

  componentWillUnmount() {
    this.props.timer.removeUpdated(this.handleTimerUpdated);
  }

  render() {
    const { currentTime, theme } = this.state;
    return (
      <ChangeThemeContext.Provider value={this.dispatchChangeTheme}>
        <ThemeContext.Provider value={theme}>
          <CurrentTimeContext.Provider value={currentTime}>
            <div className="page">
              <h1>Цвета времени</h1>
              <Top />
              <Middle />
              <Bottom />
            </div>
          </CurrentTimeContext.Provider>
        </ThemeContext.Provider>
      </ChangeThemeContext.Provider>
    );
  }

  handleTimerUpdated = currentTime => {
    this.setState({ currentTime: currentTime });
  };

  dispatchChangeTheme = type => {
    let newTheme = null;
    switch (type) {
      case 'prev':
        newTheme = themes.getPrevTheme(this.state.theme);
        break;
      case 'next':
        newTheme = themes.getNextTheme(this.state.theme);
        break;
    }
    this.setState({ theme: newTheme });
  };
}

ColorsOfTime.propTypes = {
  timer: PropTypes.object
};

class Top extends React.PureComponent {
  render() {
    registerRenderForDebug('Top');
    return (
      <div className="block">
        <Card title="Серый Лондон" timezone={+0} />
        <Card title="Синий Нью-Йорк" timezone={-4} color="blue" />
        <Card title="Зеленый Париж" timezone={+2} color="green" />
        <Card title="Красный Пекин" timezone={+8} color="red" />
      </div>
    );
  }
}

Top.propTypes = {};

class Middle extends React.PureComponent {
  render() {
    return (
      <div className="block">
        <ThemeContext.Consumer>
          {theme => (
            <Card title="Цветное локальное" color={theme.foregroundColor} />
          )}
        </ThemeContext.Consumer>
      </div>
    );
  }
}

Middle.propTypes = {};

class Bottom extends React.PureComponent {
  render() {
    return (
      <div className="block">
        <ChangeThemeContext.Consumer>
          {dispatchChangeTheme => (
            <ThemedButton
              value="← цвет"
              onClick={() => dispatchChangeTheme('prev')}
            />
          )}
        </ChangeThemeContext.Consumer>
        <ChangeThemeContext.Consumer>
          {dispatchChangeTheme => (
            <ThemedButton
              value="цвет →"
              onClick={() => dispatchChangeTheme('next')}
            />
          )}
        </ChangeThemeContext.Consumer>
      </div>
    );
  }
}

Bottom.propTypes = {};

class Card extends React.Component {
  render() {
    registerRenderForDebug('Card');
    const { title, timezone, color } = this.props;
    return (
      <div className="card">
        <h3>{title}</h3>
        <div>
          <CurrentTimeContext.Consumer>
            {currentTime => (
              <TimeDisplay
                time={
                  timezone
                    ? helpers.toTimezone(currentTime, timezone)
                    : currentTime
                }
                color={color}
              />
            )}
          </CurrentTimeContext.Consumer>
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
  timezone: PropTypes.number
};

function registerRenderForDebug(name) {
  console.log(`render ${name} at ${new Date().toLocaleTimeString()}`);
}

const timer = new Timer();
ReactDom.render(<ColorsOfTime timer={timer} />, document.getElementById('app'));

/**
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
