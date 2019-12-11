import React from "react";
import ReactDom from "react-dom";
import "./styles.css";

/* Сделай так, чтобы в приложении все классы заменились на функциональные компоненты, для этого используй Hooks */

class App extends React.Component {
  constructor(props) {
    super(props);
    this.lastBlockId = 0;
    this.state = {
      blockIds: []
    };
  }

  addNewElement = () => {
    this.lastBlockId++;
    this.setState({
      blockIds: [...this.state.blockIds, this.lastBlockId]
    });
  };

  removeLastElement = () => {
    this.setState({
      blockIds: this.state.blockIds.slice(0, this.state.blockIds.length - 1)
    });
  };

  render() {
    return (
      <div className="page">
        <div className="controlPanel">
          <button
            type="button"
            onClick={this.removeLastElement}
            className="actionButton"
          >
            -
          </button>
          <button
            type="button"
            onClick={this.addNewElement}
            className="actionButton"
          >
            +
          </button>
        </div>
        <div className="container">
          {this.state.blockIds.map(blockId => (
            <CounterBlock key={blockId} />
          ))}
        </div>
      </div>
    );
  }
}

class CounterBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({ value: this.state.value + 1 });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return <div className="block">{this.state.value}</div>;
  }
}

ReactDom.render(<App />, document.getElementById("app"));
