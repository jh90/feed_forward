import React from 'react';

const propTypes = {
  remove: React.PropTypes.func.isRequired,
};

const RemoveButton = ({remove}) => {
  return (
    <button className='remove-button' onClick={remove}>Delete</button>
  );
};

RemoveButton.propTypes = propTypes;

export default RemoveButton;
