import React from "react";
import ReactDom from "react-dom";
import "regenerator-runtime/runtime";
import PropTypes from "prop-types";
import "./styles.css";
import Api from "./Api";
import CreditCardNumber from "./CreditCardNumber";


/**
    CreditCardInput не просто показывает переданное value,
    а использует внутреннее состояние для форматирования ввода пользователя.
    CreditCardInputWithRestore должен обеспечить восстановление номера кредитной карты с сервера,
    но не работает из-за ошибки в CreditCardInput.

    Исправь ошибку в CreditCardInput.
    Значение, которое пользователь успел ввести,
    должно быть перетерто полученным значением 1234 5678 9012 3456.

    Подсказка:
    - static getDerivedStateFromProps(nextProps, prevState) вызывается сразу после вызова конструктора
      и при получении компонентом измененных props. Он тебе поможет.
    - componentWillReceiveProps(nextProps) вызывается при получении компонентом измененных props,
      но React 16 — последняя версия, где он будет доступен — останется только UNSAFE_componentWillReceiveProps.
    - Даже при задании getDerivedStateFromProps состояние должно инициализироваться в конструкторе.
*/

class CreditCardInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: props.value };
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
            value={this.state.value || ""}
            width={120}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
          />
        </div>
      </div>
    );
  }

  handleChange = event => {
    const formattedValue = CreditCardNumber.format(event.target.value);
    this.setState({ value: formattedValue });
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
      value: null
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


ReactDom.render(<CreditCardInputWithRestore />, document.getElementById("app"));
