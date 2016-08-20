import React from 'react';

const { string } = React.PropTypes;

export default function Overlay({ type }) {
  let content = 'Spin';
  if (type === 'error') content = 'error!';
  return (
     <p>{content}</p>
  );
}

Overlay.propTypes = {
  type: string.isRequired,
};
