import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import './styles.css';

export default function Button({ value, theme, onClick }) {
  return (
    <input
      className={`button ${theme.backgroundColor ||
        ''} ${theme.foregroundColor || ''}`}
      type="button"
      value={value}
      onClick={onClick}
    />
  );
}

Button.propTypes = {
  value: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
  onClick: PropTypes.func
};
