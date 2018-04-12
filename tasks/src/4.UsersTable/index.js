import React from "react";
import ReactDom from "react-dom";
import PropTypes from "prop-types";
import EditUserForm from "./EditUserForm";
import "./styles.css";
import * as helpers from "./helpers";
import defaultUsers from "./defaultUsers";


/**
    Есть таблица гостей и форма для добавления гостя. В таблице отображена только основная информация.
    Сделай так чтобы перерисовка строк таблицы происходила только при изменении видимых данных.

    //users: [...this.state.users, { id: newId }]
    //const { users, editingUser } = this.state;
    //user: { ...user, surname: e.target.value }
*/

// Добиться, чтобы:
// 1. В начале допустимы все 6 событий: UT render, UTR render (2), UTR mount (2), UT mount
// 2. При добавлении новой строки 3 соытия: UT render, UTR render и UTR mount для новой строки
// 3. Изменить: ничего
// 4. Сохранить другое поле: UT render
// 5. Сохранить видимое поле: UT render, UTR render этого ряда

//1. проблема editingUser && - лишние маунты при попытке редактирования
//2. проблема Pure UserTable - при попытке редактирования таблица перерисовывается нет смысла
//3. проблема index вместо user.id - сначала сделать Pure у Row и убедиться, что не помогает. Убедиться, что стал лучше работать добавление! Потом сделать id в качестве key.
//4. проблема SCU UserTableRow - невидимое редактирование не должно влиять на рендеринг!
//shouldComponentUpdate(nextProps, nextState)

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

ReactDom.render(<Users />, document.getElementById("app"));
