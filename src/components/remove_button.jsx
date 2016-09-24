import React from 'react';

const propTypes = {
  remove: React.PropTypes.func.isRequired,
};

const RemoveButton = () => {
  return (
    <button addClass='remove-button' onClick={this.props.remove}>Delete</button>
  );
};

RemoveButton.propTypes = propTypes;

export default RemoveButton;
