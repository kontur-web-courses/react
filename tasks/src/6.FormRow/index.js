import React from "react";
import ReactDom from "react-dom";
import PropTypes from "prop-types";
import "./styles.css";
import Input from "./Input";
import Toggle from "./Toggle";


/**
    InputFormRow — штука классная, но поддерживает только обычные input.
    В новой форме понадобилось поддержать самописный Toggle — пришлось написать ToggleFormRow.
    Получилось много дублирующегося кода и это грустно :(
    
    На помощь могут прийти Higher Order Components (HOC) — функции вида Component → Component.
    Используя HOC можно создавать новые улучшенные компоненты из обычных:
        const EnhancedComponent = enchance(JustComponent); // enchance — это HOC

    HOC не получится использовать с элементами, например с input,
    поэтому он уже был обернут в компонент Input.

    1. Напиши HOC createFormRow, который можно будет использовать так:
        const InputFormRow = createFormRow(Input);
      - const ToggleFormRow = createFormRow(Toggle);

    Подсказки:
    - Посмотри пример HOC в enchance.js
    
    2. Используй createFormRow, удалив старые реализации InputFormRow, ToggleFormRow.

    3. Открой React в Developer Tools в Chrome и убедись,
       что благодаря заданию displayName получающиеся компоненты называются красиво.

    4. Сделай так, чтобы при открытии формы фокус устанавливался в первом поле формы.
       Весь необходимый код в Form уже написан:
       - firstRowRef установлен на первый ряд формы;
       - при открытии формы вызывается this.firstRowRef.current.focus();
       Но this.firstRowRef.current не указывает на input или Toggle, у которых определен метод focus.
       HOC должен пересылать ref на WrappedComponent.

    Подсказки:
    - Нельзя пробросить переменную для ref из внешнего компонента во внутренний через атрибут ref,
      потому что он зарезервирован — придется использовать другой атрибут. Например, forwardedRef.

    - Чтобы React пробрасывал ref, в конец HOC придется добавить такой код:

        const forward = (props, ref) => <FormRow {...props} forwardedRef={ref}/>;
        forward.displayName = FormRow.displayName;
        return React.forwardRef(forward);

      Предполагается, что компонент-обертка называется FormRow.
      Заметь, что React.forwardRef — это почти HOC, а forward — это почти функция-компонент.

    - forwardedRef — это PropTypes.object

    - Когда ref уже лежит в отдельном атрибуте, его несложно использовать:
        <WrappedComponent ref={forwardedRef} {...rest} />
*/


class InputFormRow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { label, ...rest } = this.props;
    return (
      <div className="row">
        <div className="label">{label}</div>
        <Input {...rest} />
      </div>
    );
  }
}

InputFormRow.propTypes = {
  label: PropTypes.string.isRequired
}

class ToggleFormRow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { label, ...rest } = this.props;
    return (
      <div className="row">
        <div className="label">{label}</div>
        <Toggle {...rest} />
      </div>
    );
  }
}

ToggleFormRow.propTypes = {
  label: PropTypes.string.isRequired
}


class Form extends React.Component {
  constructor() {
    super();

    this.firstRowRef = React.createRef();

    this.state = {
      opened: false,
    };
  }

  render() {
    const { opened } = this.state;
    return (
      <div>
        {!opened && this.renderOpenButton()}
        {opened && this.renderForm()}
      </div>
    );
  }

  renderOpenButton() {
    return (
      <div className="openContainer">
        <input
          type="button"
          className="actionButton"
          value="Открыть"
          onClick={this.handleOpen}
        />
      </div>
    )
  }

  componentDidMount() {
    this.setFocusOnOpen();
  }

  componentDidUpdate() {
    this.setFocusOnOpen();
  }

  renderForm() {
    return (
      <div className="form">
        <form>
          <InputFormRow ref={this.firstRowRef} label="Фамилия" type="text" />
          <InputFormRow label="Имя" type="text" />
          <InputFormRow label="Отчество" type="text" />
          <ToggleFormRow label="Вегетарианец" />
        </form>
        <div className="saveContainer">
          <input
            type="submit"
            className="actionButton"
            value="Сохранить"
            onClick={this.handleSave}
          />
        </div>
      </div>
    );
  }

  handleOpen = () => {
    this.setState({
      opened: true
    });
  }

  handleSave = () => {
    this.setState({
      opened: false
    });
  }

  setFocusOnOpen = () => {
    if (this.state.opened) {
      // Проверка перед вызовом нужна,
      // пока this.firstRowRef не устанавливается корректно.
      this.firstRowRef.current.focus && this.firstRowRef.current.focus();
    }
  }
}

Form.propTypes = {
  user: PropTypes.object,
};

ReactDom.render(<Form />, document.getElementById("app"));
