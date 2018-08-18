import React from 'react';
import Button from '@skbkontur/react-ui/Button';
import Input from '@skbkontur/react-ui/Input';
import Select from '@skbkontur/react-ui/Select';
import Gapped from '@skbkontur/react-ui/Gapped';
import Modal from '@skbkontur/react-ui/Modal';

const cities = ['Москва', 'Урюпинск', 'Новосибирск', 'Екатеринбург', 'Тагиииил'];

const defaultData = {
    name: '',
    surname: '',
    city: 'Екатеринбург',
};

export default class Form extends React.Component {
    state = {
        modalOpened: false,
        saved: { ...defaultData },
        current: { ...defaultData },
    };

    render () {
        const { modalOpened } = this.state;
        return (
            <div>
                <h2>Информация о пользователе</h2>
                { this.renderForm() }
                {modalOpened && this.renderModal()}
            </div>
        );
    }

    renderForm() {
        const { name, surname, city  } = this.state.current;
        return (
            <form>
                <Gapped gap={15} vertical>
                    <label>
                        <div className='label'>Имя</div>
                        <Input
                            placeholder='Введите имя пользователя'
                            value={ name }
                            onChange={this.onChangeName}
                        />
                    </label>
                    <label>
                        <div className='label'>Фамилия</div>
                        <Input
                            placeholder='Введите фамилию пользователя'
                            value={ surname }
                            onChange={this.onChangeSurname}
                        />
                    </label>
                    <label>
                        <div className='label'>Город</div>
                        <Select
                            placeholder='Выберите город'
                            items={cities}
                            value={ city }
                            onChange={this.onChangeCity}
                        />
                    </label>
                    <Button use='primary' size='large' onClick={this.openModal}>Сохранить</Button>
                </Gapped>
            </form>
        );
    }

    renderModal() {
        const { name, surname, city  } = this.state.current;
        const { saved } = this.state;
        const isNothingChanged = saved.name === name && saved.surname === surname && saved.city === city;
        return (
            <Modal onClose={this.closeModal}>
                <Modal.Header>Пользователь сохранен</Modal.Header>
                <Modal.Body>
                    <p>Измененные данные:</p>
                    { isNothingChanged && 'ничего' }
                    { !isNothingChanged && this.renderChanges() }
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.closeModal}>Закрыть</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    renderChanges() {
        const { name, surname, city  } = this.state.current;
        const { saved } = this.state;

        return (
            <p>
                {saved.name !== name && this.renderDiff('Имя', saved.name, name)}
                {saved.surname !== surname && this.renderDiff('Фамилия', saved.surname, surname)}
                {saved.city !== city && this.renderDiff('Город', saved.city, city)}
            </p>
        );
    }

    renderDiff(field, prevValue, currentValue) {
        return (
            <React.Fragment>
                {field}: было {prevValue || '*ничего*'}, стало {currentValue || '*ничего*'} <br/>
            </React.Fragment>
        );
    }

    openModal = () => {
        this.setState({
            modalOpened: true,
        });
    };

    closeModal = () => {
        this.setState({
            modalOpened: false,
            saved: {...this.state.current},
        });
    };

    onChangeName = (_, val) => {
        this.onChange('name', val);
    };

    onChangeSurname = (_, val) => {
        this.onChange('surname', val);
    };

    onChangeCity = (_, val) => {
        this.onChange('city', val);
    };

    onChange = (field, val) => {
        this.setState({
            current: {
                ...this.state.current,
                [field]: val,
            }
        });
    };

}

