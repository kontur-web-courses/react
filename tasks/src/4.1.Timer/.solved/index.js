import React from 'react';
import ReactDom from 'react-dom';
import '../styles.css';

class Timer extends React.Component {
  constructor() {
    super();
    this.state = { timeVisible: true };
  }

  render() {
    const { timeVisible } = this.state;
    return (
      <div className="page">
        <input
          className="button"
          type="button"
          value={timeVisible ? 'Скрыть' : 'Показать'}
          onClick={() => {
            this.setState({ timeVisible: !timeVisible });
          }}
        />
        {this.state.timeVisible && <TimeDisplay />}
      </div>
    );
  }
}

class TimeDisplay extends React.Component {
  constructor() {
    super();
    this.state = {
      localTime: new Date()
    };
    this.localTickInterval = null;
  }

  componentDidMount() {
    this.localTickInterval = setInterval(() => {
      console.log('tick');
      this.setState({
        localTime: new Date()
      });
    }, 1000);
  }

  componentWillUnmount() {
    if (this.localTickInterval) {
      clearInterval(this.localTickInterval);
      this.localTickInterval = null;
    }
  }

  render() {
    return (
      <div className="time">{this.state.localTime.toLocaleTimeString()}</div>
    );
  }
}

ReactDom.render(<Timer />, document.getElementById('app'));
