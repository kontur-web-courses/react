import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import './styles.css';
import * as helpers from './helpers';
import * as themes from './themes';
import Button from './Button';
import TimeDisplay from './TimeDisplay';
import Timer from './Timer';

/**
    Автор кода явно сделал много лишней работы,
    прокидывая информацию о времени и настройках цвета через все компоненты.
    А все потому, что не знал про context!

    Для начала разведка ситуации:
    1. Открой Developer Tools и убедись, что render в Card вызывается по 5 раз каждую секунду.
    2. Почему render в Top вызывается каждую секунду, если Top — это PureComponent у которого в props нет currentTime?
    3. Подумай, что нужно сделать, чтобы перенести карточку Нью-Йорка в блок Top, а кнопки смены цвета в блок Bottom.
    
    Отрефактори код по шагам:
    1. Создай CurrentTimeContext.
    2. В компоненте ColorsOfTime оберни содержимое метода render в CurrentTimeContext.Provider,
       чтобы предоставить максимально большой доступ к currentTime.
    3. Используй CurrentTimeContext.Consumer, чтобы не прокидывать currentTime через свойства.
       Тут другая стратегия: надо оборачивать в Consumer те компоненты, которым ресурс требуется.
       Потому что при обновлении значения контекста будет перерисовываться все, что внутри Consumer'ов.
    4. Не забудь убрать ненужное теперь простаскивание currentTime через параметры!
    5. Проделай то же самое для ThemeContext:
       - Создай ThemeContext
       - Оберни CurrentTimeContext.Provider в ThemeContext.Provider
       - Используй ThemeContext.Consumer для передачи темы в кнопку и в Card с цветным локальным временем
       - Снова приберись в коде!
    6. Добавь ChangeThemeContext. Пусть он хранит ссылку на функцию dispatchChangeTheme.
       Пусть кнопки смены цвета теперь создают обработчики на основе ChangeThemeContext.
       Приберись в коде.
    7. Открой Developer Tools и посмотри, как часто вызывается render в Card с течением времени. Понажимай на кнопки смены цвета.
       Попробуй объяснить, почему использование context привело к таким эффектам.
    8. Перенеси Лондон в блок Top, за ним в блок Top перенеси Нью-Йорк, Париж и Пекин.
       А кнопки смены цвета перенеси в блок Bottom.
       Удобно ли было переносить эти компоненты сейчас?
 */

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
      <div className="page">
        <h1>Цвета времени</h1>
        <Top
          theme={theme}
          onPrevTheme={() => this.dispatchChangeTheme('prev')}
          onNextTheme={() => this.dispatchChangeTheme('next')}
        />
        <Middle currentTime={currentTime} theme={theme} />
        <Bottom currentTime={currentTime} />
      </div>
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
    const { theme, onPrevTheme, onNextTheme } = this.props;
    return (
      <div className="block">
        <Button value="← цвет" theme={theme} onClick={onPrevTheme} />
        <Button value="цвет →" theme={theme} onClick={onNextTheme} />
      </div>
    );
  }
}

Top.propTypes = {
  theme: PropTypes.object.isRequired,
  onPrevTheme: PropTypes.func,
  onNextTheme: PropTypes.func
};

class Middle extends React.PureComponent {
  render() {
    const { currentTime, theme } = this.props;
    return (
      <div className="block">
        <Card
          title="Цветное локальное"
          time={currentTime}
          color={theme.foregroundColor}
        />
        <Card title="Серый Лондон" timezone={+0} time={currentTime} />
      </div>
    );
  }
}

Middle.propTypes = {
  theme: PropTypes.object.isRequired,
  currentTime: PropTypes.object
};

class Bottom extends React.PureComponent {
  render() {
    const { currentTime } = this.props;
    return (
      <div className="block">
        <Card
          title="Синий Нью-Йорк"
          timezone={-4}
          time={currentTime}
          color="blue"
        />
        <Card
          title="Зеленый Париж"
          timezone={+2}
          time={currentTime}
          color="green"
        />
        <Card
          title="Красный Пекин"
          timezone={+8}
          time={currentTime}
          color="red"
        />
      </div>
    );
  }
}

Bottom.propTypes = {
  currentTime: PropTypes.object
};

class Card extends React.Component {
  render() {
    registerRenderForDebug('Card');
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
    );
  }
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
  timezone: PropTypes.number,
  time: PropTypes.object
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
