import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import * as helpers from './helpers';

export default class EditUserForm extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {}
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.user && prevState.user !== nextProps.user && !prevState.changed) {
      return { user: nextProps.user };
    }
    return null;
  }

  render() {
    const { user } = this.state;
    return (
      <div className="form">
        <form onSubmit={this.handleSave}>
          <div className="row">
            <div className="label">Фамилия</div>
            <input
              type="text"
              value={user.surname || ''}
              onChange={e => this.handleUserChange({ surname: e.target.value })}
            />
          </div>
          <div className="row">
            <div className="label">Имя</div>
            <input
              type="text"
              value={user.firstName || ''}
              onChange={e =>
                this.handleUserChange({ firstName: e.target.value })
              }
            />
          </div>
          <div className="row">
            <div className="label">Отчество</div>
            <input
              type="text"
              value={user.patronymic || ''}
              onChange={e =>
                this.handleUserChange({ patronymic: e.target.value })
              }
            />
          </div>
          <div className="row">
            <div className="label">Дата рождения</div>
            <input
              type="date"
              value={helpers.formatDate(user.dateOfBirth)}
              onChange={e =>
                this.handleUserChange({ dateOfBirth: new Date(e.target.value) })
              }
            />
          </div>
          <div className="row">
            <div className="label">Вегетарианец</div>
            <input
              type="checkbox"
              checked={user.isVegetarian || false}
              onChange={e =>
                this.handleUserChange({ isVegetarian: e.target.checked })
              }
            />
          </div>
          <div className="row">
            <div className="label">Пожелания</div>
            <input
              type="text"
              value={user.wishes || ''}
              onChange={e => this.handleUserChange({ wishes: e.target.value })}
            />
          </div>
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

  handleUserChange = change => {
    this.setState({
      changed: true,
      user: { ...this.state.user, ...change }
    });
  };

  handleSave = () => {
    this.props.onSave(this.state.user);
  };
}

EditUserForm.propTypes = {
  user: PropTypes.object,
  onSave: PropTypes.func
};
