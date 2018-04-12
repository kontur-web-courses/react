import React from "react";
import ReactDom from "react-dom";
import "./../styles.css";
import PropTypes from "prop-types";


const RUBLES_IN_ONE_EURO = 70;

function extractNumber(value) {
  return +(value.replace(/^0+/g, '').replace(/[^0-9]/g, ''));
}

function Money({value, onChange}) {
  const handleChange = event => {
    onChange(extractNumber(event.target.value));
  };

  return (
    <input type="text" value={value} onChange={handleChange}/>
  );
}

Money.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func
};

class MoneyConverter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      valueInRubles: 0,
      valueInEuros: 0,
    }
  }

  render() {
    return (
      <div className="root">
        <div className="form">
          <h2>Конвертер валют</h2>
          <div>
            <span>&#8381;</span>
            <Money value={this.state.valueInRubles} onChange={this.handleChangeRubles}/>
            &mdash;
            <Money value={this.state.valueInEuros} onChange={this.handleChangeEuros}/>
            <span>&euro;</span>
          </div>
        </div>
      </div>
    );
  }

  handleChangeRubles = value => {
    this.setState({
      valueInRubles: value,
      valueInEuros: Math.round(100*value/RUBLES_IN_ONE_EURO)/100
    });
  }

  handleChangeEuros = value => {
    this.setState({
      valueInRubles: Math.round(100*value*RUBLES_IN_ONE_EURO)/100,
      valueInEuros: value
    });
  }
}

ReactDom.render(<MoneyConverter />, document.getElementById("app"));
