import React from 'react';
import ReactDom from 'react-dom';
import './styles.css';


/*Сделай так, чтобы в приложении все классы заменились на функциональные компоненты, для этого используй Hooks*/

class App extends React.Component {
  constructor(props) {
    super(props);
    this.sequence = 0;
    this.state = {
      array: []
    }
  }

  addNewElement = () => {
    this.sequence++;
    this.setState({
      array: [...this.state.array, this.sequence]
    });
  };

  removeOneElement = () => {
    this.setState({
      array: this.state.array.slice(0, this.state.array.length - 1)
    });
  };

  render() {
    return (
      <div>
        <div>
          <button type="button" onClick={this.removeOneElement} className="actionButton">-</button>
          <button type="button" onClick={this.addNewElement} className="actionButton">+</button>
        </div>
        <div className="container">
          {
            this.state.array.map(value => <CounterBlock key={value}/>)
          }
        </div>
      </div>
    )
  }
}

class CounterBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    }
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({value: this.state.value + 1});
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <div className="block">{this.state.value}</div>
    );
  }
}

ReactDom.render(
  <App />,
  document.getElementById('app')
);
