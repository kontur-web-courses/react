import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import '../styles.css';

class InputFormRow extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  render() {
    const { label, ...rest } = this.props;
    return (
      <div className="row pointer" onClick={this.handleClick}>
        <div className="label">{label}</div>
        <input ref={this.inputRef} {...rest} />
      </div>
    );
  }

  handleClick = () => {
    this.inputRef.current.focus();
  };
}

InputFormRow.propTypes = {
  label: PropTypes.string.isRequired
};

ReactDom.render(
  <div className="form">
    <form>
      <InputFormRow label="Фамилия" type="text" defaultValue="Иванов" />
      <InputFormRow label="Имя" type="text" defaultValue="Иван" />
      <InputFormRow label="Отчество" type="text" defaultValue="Иванович" />
      <InputFormRow label="Вегетарианец" type="checkbox" defaultChecked />
    </form>
    <div className="saveContainer">
      <input type="submit" className="actionButton" value="Сохранить" />
    </div>
  </div>,
  document.getElementById('app')
);
