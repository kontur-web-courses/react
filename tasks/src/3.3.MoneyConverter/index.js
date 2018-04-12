import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import './styles.css';


/**
    Допиши конвертер валют.
    - Если пользователь ввел значение в рублях, то количество евро обновляется согласно курсу
    - Если пользователь ввел значение в евро, то количество рублей обновляется согласно курсу
    
    Подсказки:
    - Сейчас каждый компонент Money хранит свое значение в собственном состоянии,
      чтобы конвертер работал, нужно уметь обновлять значение извне, поэтому нужно получать его из props.
    - В MoneyConverter наоборот надо создать состояние, которое будет хранить значения в обеих валютах.
      Таким образом ты сделаешь Lift State Up.
    - Заметь, что компонент Money теперь не содержит состояние и его можно переделать в функциональный компонент.
 */


const RUBLES_IN_ONE_EURO = 70;


class MoneyConverter extends React.Component {
  render() {
    return (
      <div className="root">
        <div className="form">
          <h2>Конвертер валют</h2>
          <div>
            <span>&#8381;</span>
            <Money />
            &mdash;
            <Money />
            <span>&euro;</span>
          </div>
        </div>
      </div>
    );
  }
}


class Money extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
  }

  render() {
    return (
      <input type="text" value={this.state.value} onChange={this.handleChangeValue} />
    );
  }

  handleChangeValue = event => {
    const value = extractNumber(event.target.value);
    this.setState({ value });
    this.props.onChange(value);
  }
}

Money.propTypes = {
  onChange: PropTypes.func
}


function extractNumber(value) {
  return +(value.replace(/^0+/g, '').replace(/[^0-9]/g, ''));
}


ReactDom.render(<MoneyConverter />, document.getElementById('app'));
