import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import './styles.css';


export default function TimeDisplay({ time, color }) {
  return (
    <div className={`time ${color || ''}`}>
      {time ? time.toLocaleTimeString() : '--:--:--'}
    </div>
  );
}

TimeDisplay.propTypes = {
  time: PropTypes.object,
  color: PropTypes.string
}
