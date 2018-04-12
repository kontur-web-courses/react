import React from "react";
import ReactDom from "react-dom";
import "./toggle.css";


export default class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    };
    this.ref = React.createRef();
  }

  render() {
    const { checked } = this.state;
    return (
      <span
        ref={this.ref}
        tabIndex="0"
        className={'container' + (checked ? ' isChecked' : '')}
        onKeyPress={this.handleChange}
        onClick={this.handleClick}
      >
        <span className="handle">
          <div className="bg" />
          <span className="hinge" />
        </span>
      </span>
    );
  }

  handleClick = () => {
    this.setState({
      checked: !this.state.checked
    });
  };

  focus = () => {
    this.ref.current.focus();
  }
}
