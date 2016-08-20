import React, { Component } from 'React';

import { FormattedTime } from 'react-intl';

export default function Editor({
  type, id, prio, archived, created, content
}) {
  return (
    <form onSubmit={onSubmit}>

      <header>
        <h1>Edit {type} #{id}</h1>
        <FormattedTime value={created} />
      </header>

      <fieldset>
        <label htmlFor="prio">Prio:</label>
        <select id="prio" value={prio}>
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
