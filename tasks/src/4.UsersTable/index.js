import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import EditUserForm from './EditUserForm';
import './styles.css';
import * as helpers from './helpers';
import defaultUsers from './defaultUsers';


/**
    Есть таблица гостей и форма для добавления гостя. В таблице отображена только основная информация.
    Всё работает, но неэффективно — при любом действии пользователя происходит множество лишних операций внутри React.

    В этом задании при вызове важных событий жизненного цикла выводятся сообщения в консоль.
    Эти сообщения можно увидеть в Developer Tools.

    Добейся того, чтобы лишние события не происходили.

    Допустимые события React:
    1. В начале происходит 6 событий и это нормально:
       UserTable render, UserTableRow render (2), UserTableRow mount (2), UserTable mount
    2. При добавлении новой строки должно быть 3 события:
       UserTable render, UserTableRow render и UserTableRow mount для новой строки
    3. При нажатии на кнопку изменить: никаких событий
    4. При сохранении после изменения видимого поля: UserTable render, UserTableRow render этого ряда
    5. При сохранении после изменения невидимого поля : UserTable render

    FYI, в коде использованы такие фишки JS:
    - «Spread-оператор для массива»
      Создает новый массив, причем сначала в него добаляются все элементы objs, а затем еще один элемент.
        [...objs, { id: 1 }]
    - «Spread-оператор для объекта»
      Создает новый объект, причем сначала заполняет его свойствами из obj, а затем добавляет новое свойство.
        { ...obj, key: value }
    - «Деконструкция»
      Создает локальные переменные const a = this.state.a и const b = this.state.b.
        const { a, b } = this.state;

    Подсказки:

    - Установи расширение React Developer Tools для Chrome и в Developer Tools появится вкладка React.
      Установи флажок Highlight Updates, чтобы видеть что React обновляет.

    - React перерисовывает узлы по порядку.
      Если он увидит, что на месте div стоит span, то div будет полностью удален (unmount),
      даже если нужный div идет следом за этим span.
      Чтобы сохранить порядок узлов, оставляй «дырки» из null-узлов, undefined-узлов, false-узлов вот так:
        {showSpan && <span>A little hint</span>}
        <div>Main text</div>
      Если span не нужен, то вместо него встанет невидимый false-узел, а div останется на своем месте.

    - Изменение setState в компоненте приводит к его перерисовке. Часто вместе с детьми.
      Но если дочерний компонент наследует PureComponent, то он не будет перерисован 
      если его props не поменялись. Это можно использовать для оптимизации рендеринга

    - Ключ к производительности — в правильном задании key.

    - В конце тебе пригодится shouldComponentUpdate(nextProps, nextState).
 */


let generation = 1;
let generationEvents = 1;

function updateGeneration() {
  generation++;
  generationEvents = 1;
}

function logEvent(msg) {
  console.log(` ${generation}.${generationEvents++}\t${msg}`);
}


class Users extends React.Component {
  constructor() {
    super();
    this.state = {
      users: defaultUsers,
      editingUser: null,
    };
  }

  render() {
    const { users, editingUser } = this.state;
    if (editingUser) {
      return (
        <div className="root">
          <EditUserForm user={editingUser} onSave={this.handleSaveUser} />
          <UserTable users={users} onEditUser={this.handleEditUser} onAddUser={this.handleAddUser} />
        </div>
      )
    }
    return (
      <div className="root">
        <UserTable users={users} onEditUser={this.handleEditUser} onAddUser={this.handleAddUser} />
      </div>
    );
  }

  handleAddUser = () => {
    const newId = helpers.getNewId(this.state.users);
    updateGeneration();
    this.setState({
      users: [{ id: newId }, ...this.state.users]
    });
  };

  handleEditUser = (user) => {
    updateGeneration();
    this.setState({
      editingUser: user
    });
  }

  handleSaveUser = (user) => {
    updateGeneration();
    this.setState({
      editingUser: null,
      users: this.state.users.map(u => u.id == user.id ? user : u)
    });
  };
}

class UserTable extends React.Component {
  componentDidMount() {
    logEvent('UserTable\t\t did mount');
  }

  componentWillUnmount() {
    logEvent('UserTable\t\t will unmount')
  }

  render() {
    logEvent('UserTable\t\t render')
    const { users, onEditUser, onAddUser } = this.props;
    return (
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Фамилия</th>
              <th>Имя</th>
              <th>Возраст</th>
              <th>
                <input
                  type="submit"
                  className="editButton"
                  value="Добавить"
                  onClick={onAddUser}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <UserTableRow user={user} key={index} onEditUser={onEditUser} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

UserTable.propTypes = {
  users: PropTypes.array,
  onEditUser: PropTypes.func,
  onAddUser: PropTypes.func,
};


class UserTableRow extends React.Component {
  componentDidMount() {
    logEvent('UserTableRow\t did mount with id=' + this.props.user.id)
  }

  componentWillUnmount() {
    logEvent('UserTableRow\t will unmount with id=' + this.props.user.id);
  }

  render() {
    const { user } = this.props;
    logEvent('UserTableRow\t render with id=' + user.id)
    return (
      <tr>
        <td>{user.surname}</td>
        <td>{user.firstName}</td>
        <td>{helpers.calculateAge(user.dateOfBirth)}</td>
        <td>
          <input
            className="editButton"
            type="button"
            onClick={this.handleEditUser}
            value="Изменить"
          />
        </td>
      </tr>
    );
  }

  handleEditUser = () => {
    this.props.onEditUser(this.props.user);
  }
}

UserTableRow.propTypes = {
  user: PropTypes.object,
  onEditUser: PropTypes.func,
};


ReactDom.render(<Users />, document.getElementById('app'));
