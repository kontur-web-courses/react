import React from "react";
import ReactDom from "react-dom";
import PropTypes from "prop-types";
import "./../styles.css";
import Toggle from "./../Toggle";


function createFormRow(WrappedComponent) {
  class FormRow extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      const { label, forwardedRef, ...rest } = this.props;
      return (
        <div className="row">
          <div className="label">{label}</div>
          <WrappedComponent ref={forwardedRef} {...rest} />
        </div>
      );
    }
  }

  FormRow.propTypes = {
    label: PropTypes.string.isRequired,
    forwardedRef: PropTypes.object
  }

  const wrappedName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  FormRow.displayName = `FormRow(${wrappedName})`;

  const forward = (props, ref) => <FormRow {...props} forwardedRef={ref} />;
  forward.displayName = FormRow.displayName;
  return React.forwardRef(forward);
}

const InputFormRow = createFormRow(Input);
const ToggleFormRow = createFormRow(Toggle);


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
