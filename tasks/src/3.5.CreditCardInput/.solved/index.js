import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import '../styles.css';
import Api from '../Api';
import CreditCardNumber from '../CreditCardNumber';


class CreditCardInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.changed || nextProps.value === prevState.value) {
      return null;
    }
    return { value: nextProps.value, changed: false };
  }

  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func
  }

  render() {
    return (
      <div className="root">
        <div className="form">
          <input
            type="text"
            pattern="9999 9999 9999 9999"
            value={this.state.value || ''}
            width={120}
            onFocus={this.handleFocus}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
          />
        </div>
      </div>
    );
  }

  handleFocus = () => {
    this.setState({ value: '' });
  }

  handleChange = event => {
    const formattedValue = CreditCardNumber.format(event.target.value);
    this.setState({ value: formattedValue, changed: true });
  };

  handleBlur = () => {
    if (CreditCardNumber.isValid(this.state.value)) {
      this.props.onChange(this.state.value);
    }
  };
}

class CreditCardInputWithRestore extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '0000 0000 0000 0000'
    };
  }

  componentDidMount() {
    this.restoreFromApi();
  }

  render() {
    return (
      <CreditCardInput
        value={this.state.value}
        onChange={val => console.log(val)}
      />
    );
  }

  async restoreFromApi() {
    const value = await Api.getValue();
    this.setState({ value: value });
  }
}


ReactDom.render(<CreditCardInputWithRestore />, document.getElementById('app'));