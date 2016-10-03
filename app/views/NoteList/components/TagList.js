import React, { Component, PropTypes } from 'react';
import TextInput from '../../../elements/TextInput';

export class TagList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tagInput: '',
      tags: [],
    };

    this.addTag = this.addTag.bind(this);
  }

  captureTag(tagInput, change) {
    this.setState({ tagInput: change });
  }

  addTag(e) {
    e.preventDefault();
    const { tags, tagInput } = this.state;
    let tagList = tags;
    tagList.push(tagInput);
    this.props.handleChange('tag', tagInput);
    this.setState({
      tagInput: '',
      tags: tagList,
    });
  }

  render() {
    const tagList = this.props.tags.concat(this.state.tags);
    return (
      <ul>
        {tagList.map(tag => {
          return <li key={tagList.indexOf(tag)}>{tag}</li>;
        })}
        <li>
          <TextInput
            id="tag"
            label="tag"
            defaultValue="New tag..."
            onChange={(e) => this.captureTag('tagInput', e.target.value)}
            />
          <button onClick={this.addTag}>Add Tag</button>
        </li>
      </ul>
    );
  }
}

TagList.propTypes = {
  handleChange: PropTypes.func.isRequired,
  tags: PropTypes.array.isRequired,
};

export default TagList;
