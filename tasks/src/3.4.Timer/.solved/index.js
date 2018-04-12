import React from "react";
import ReactDom from "react-dom";
import "./../styles.css";


class Timer extends React.Component {
  constructor() {
    super();
    this.state = {
      localTime: new Date(),
    };
    this.localTickInterval = null;
  }

  componentDidMount() {
    this.clearLocalTick();
    this.setLocalTick();
  }

  componentWillUnmount() {
    this.clearLocalTick();
  }

  render() {
    return (
      <div className="time">
        {this.state.localTime.toLocaleTimeString()}
      </div>
    );
  }

  setLocalTick = () => {
    this.localTickInterval = setInterval(() => {
      this.setState({
        localTime: new Date()
      });
    }, 1000);
  }

  clearLocalTick = () => {
    if (this.localTickInterval) {
      clearInterval(this.localTickInterval);
      this.localTickInterval = null;
    }
  }
}

ReactDom.render(<Timer />, document.getElementById("app"));
