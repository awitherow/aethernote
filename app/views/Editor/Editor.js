import React, { PropTypes } from 'react';

import { FormattedTime } from 'react-intl';

export default function Editor({
  type, note, hidden,
  onSubmit, onChange, onClose,
}) {
  let classNames = hidden ? `editor ${hidden}` : `editor`;
  const { id, content, created, prio, archived } = note;
  return (
    <form className={classNames} onSubmit={onSubmit}>

      <header>
        <h1>Edit {type} #{id}</h1>
        <FormattedTime value={created} />
        <button onClick={onClose}>X</button>
      </header>

      <fieldset>
        <label htmlFor="prio">Prio:</label>
        <select onChange={onChange} id="prio" value={prio}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </fieldset>

      <fieldset>
        <input
          id="archived"
          name="archived"
          type="checkbox"
          checked={archived ? "checked" : null}
          />
        <label htmlFor="archived">Archived</label>
      </fieldset>

      <fieldset>
        <label htmlFor="content">Contents</label>
        <textarea id="content" value={content}></textarea>
      </fieldset>

      <button>Submit</button>

    </form>
  );
}

Editor.propTypes = {
  type: PropTypes.string.isRequired,
  note: PropTypes.object.isRequired,
  hidden: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
