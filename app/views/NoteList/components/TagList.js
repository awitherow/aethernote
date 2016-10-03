import React, { PropTypes } from 'react';
import TextInput from '../../../elements/TextInput';

const TagList = ({
  handleChange,
  tags,
}) => {
  return (
    <ul>
      {tags.map(tag => {
        return <li>{tag}</li>;
      })}
      <TextInput
        id="tag"
        label="tag"
        defaultValue="Add new tag"
        onChange={(e) => this.handleChange('tag', e.target.value)}
        />
    </ul>
  );
};

TagList.propTypes = {
  handleChange: PropTypes.func.isRequired,
  tags: PropTypes.array.isRequired,
};

export default TagList;
