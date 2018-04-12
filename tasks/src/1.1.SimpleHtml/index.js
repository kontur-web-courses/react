import React from "react";
import ReactDom from "react-dom";
import "./styles.css";


/**
    1. Отрендери эту форму из from.html с использованием React.

    Помни про:
    - Обязательное закрытие одиночных тэгов:
        - <br> → <br/>
        - <input> → <input/>
    - Переименование некоторых атрибутов:
        - class → className
        - for → htmlFor
        - checked → defaultChecked
        - value → defaultValue
    - {} и "" для передачи значений
    - Оформление style в виде объекта: <div style={{paddingTop: 10, paddingBottom: "20px"}}>
    - Общее правило именование атрибутов и свойств — camelCase

    2. Убедись, что новая форма выглядит также как старая, поля редактируются,
       флажок переключается при нажатии на слово «Согласие»
    3. Попробуй перенести <input id="name"> в следующую строчку в *.html и *.jsx
       и убедитесь, что jsx и html начали рендерится по-разному!
 */

ReactDom.render(
    <form>
    </form>,
    document.getElementById("app")
);
