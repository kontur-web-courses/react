import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import './styles.css';


/**
    InputFormRow позволяет клепать формы еще быстрее, чем раньше!
    Количество дублирования кода уменьшается, а еще благодаря нему
    можно добавить новые фишки во все поля формы сразу.

    Сделай так, чтобы при клике по любому месту InputFormRow фокус переводился в поле ввода.
    
    Обрати внимание:
    - Как все props, кроме нужных, элегантно пробрасываются в input.
 */


class InputFormRow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { label, ...rest } = this.props;
    return (
      <div className="row" onClick={this.handleClick}>
        <div className="label">{label}</div>
        <input {...rest} />
      </div>
    );
  }

  handleClick = () => {
  }
}

InputFormRow.propTypes = {
  label: PropTypes.string.isRequired
}


ReactDom.render(
  <div className="form">
    <form>
      <InputFormRow label="Фамилия" type="text" value="Иванов" />
      <InputFormRow label="Имя" type="text" value="Иван" />
      <InputFormRow label="Отчество" type="text" value="Иванович" />
      <InputFormRow label="Вегетарианец" type="checkbox" checked />
    </form>
    <div className="saveContainer">
      <input
        type="submit"
        className="actionButton"
        value="Сохранить"
      />
    </div>
  </div>,
  document.getElementById('app'));


/**
    Подсказки:
    - У элемента input есть метод focus(), но нужна ссылка.
    - Есть два актуальных способа получить ссылку:
      - <div ref={this.myRef}/>, но надо заранее создать this.myRef = React.createRef();
      - <div ref={r => this.myRef = r} и тогда при вызове render в свойстве this.myRef окажется ссылка.
      В зависимости от выбранного способа в myRef будут немного разные объекты.
    - Чтобы пользователь догадался, что он может кликнуть по ряду
      и что-то произойдет, добавь в div с css-классом row класс pointer.
 */