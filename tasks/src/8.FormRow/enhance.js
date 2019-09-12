import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';

// Часто «улучшаемый» компонент называют WrappedComponent.
// Первая прописная буква подчеркивает, что это компонент.
function enhance(WrappedComponent) {
  // Внутри HOC определяет компонент-обертку с помощью класса или функции.
  class Enhanced extends React.Component {
    render() {
      //Свойства разделяются на две части вот так:
      const { value1, value2, ...rest } = this.props;

      //value1 и value2 может использоваться в Enhanced.
      return (
        //А все остальное надо передать в оборачиваемый компонент.
        //В результате HOC можно будет для улучшения компонентов
        //с самыми разнообразными наборами свойств.
        <WrappedComponent {...rest} />
      );
    }
  }

  Enhanced.propTypes = {
    value1: PropTypes.any,
    value2: PropTypes.any
  };

  // Заданное displayName делает отладку удобнее.
  // В частности, это имя будет отображаться в Chrome Developer Tools на вкладке React.
  const wrappedName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';
  Enhanced.displayName = `Enhanced(${wrappedName})`;

  //Этот компонент-обертка возвращается в качестве результата работы HOC.
  return Enhanced;
}
