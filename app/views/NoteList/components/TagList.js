import '../styles/tag-list.scss'
import React, { Component, PropTypes } from 'react'
import FlexibleInput from '../../../elements/FlexibleInput'

export class TagList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tagInput: '...',
      tags: this.props.tags.slice(),
    }

    this.addTag = this.addTag.bind(this)
  }

  captureTag(tagInput, change) {
    this.setState({ tagInput: change })
  }

  addTag(e) {
    e.preventDefault()
    const { tags, tagInput } = this.state
    let tagList = tags
    tagList.push(tagInput)
    this.props.handleChange('addTag', tagInput)
    this.setState({
      tagInput: '...',
      tags: tagList,
    })
  }

  removeTag(e, tag) {
    e.preventDefault()
    let tagList = this.state.tags
    tagList.splice(tagList.indexOf(tag), 1)
    this.props.handleChange('removeTag', tag)
    this.setState({ tags: tagList })
  }

  render() {
    const { tags } = this.state
    const { tagInput } = this.state
    return (
      <ul className="tag-list">

        {tags.map(tag => {
          return (
            <li key={tags.indexOf(tag)}>
              <button onClick={e => this.removeTag(e, tag)}>
                X
              </button>
              <span>
                {tag}
              </span>
            </li>
          )
        })}

        <li className="tag-list--input">
          <FlexibleInput
            id="tag"
            label="New tag"
            type="text"
            defaultValue={tagInput}
            onChange={(e) => this.captureTag('tagInput', e.target.value)}
            />
          <button onClick={this.addTag}>Add Tag</button>
        </li>

      </ul>
    )
  }
}

TagList.propTypes = {
  handleChange: PropTypes.func.isRequired,
  tags: PropTypes.array.isRequired,
}

export default TagList
