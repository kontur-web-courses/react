import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import '../styles.css';

const RUBLES_IN_ONE_EURO = 70;

class MoneyConverter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueInRubles: 0,
      valueInEuros: 0
    };
  }

  render() {
    return (
      <div className="root">
        <div className="form">
          <h2>Конвертер валют</h2>
          <div>
            <span>&#8381;</span>
            <Money
              value={this.state.valueInRubles}
              onChange={this.handleChangeRubles}
            />
            &mdash;
            <Money
              value={this.state.valueInEuros}
              onChange={this.handleChangeEuros}
            />
            <span>&euro;</span>
          </div>
        </div>
      </div>
    );
  }

  handleChangeRubles = value => {
    this.setState({
      valueInRubles: value,
      valueInEuros: Math.round(100 * value / RUBLES_IN_ONE_EURO) / 100
    });
  };

  handleChangeEuros = value => {
    this.setState({
      valueInRubles: Math.round(100 * value * RUBLES_IN_ONE_EURO) / 100,
      valueInEuros: value
    });
  };
}

function Money({ value, onChange }) {
  const handleChange = event => {
    onChange(extractNumberString(event.target.value));
  };

  return <input type="text" value={value} onChange={handleChange} />;
}

Money.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func
};

function extractNumberString(value) {
  const str = value.replace(/^0+/g, '').replace(/[^\.0-9]/g, '');
  const parts = str.split('.');
  return parts.length > 2 ? parts[0] + '.' + parts.slice(1).join('') : str;
}

ReactDom.render(<MoneyConverter />, document.getElementById('app'));
