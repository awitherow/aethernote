import React, { Component } from 'React';

import { FormattedTime } from 'react-intl';

export default function Editor({
  type, id, prio, archived, created, content
}) {
  return (
    <form>
      <h1>Edit {type} (#{id})</h1>
      <p>
      Prio:
      <select value={prio}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
      </p>
      <fieldset>
        <input
          id="archived"
          name="archived"
          type="checkbox"
          checked={archived ? "checked" : null}
          />
        <label htmlFor="archived">Archived</label>
      </fieldset>
      <FormattedTime value={created} />
      <textarea value={content}></textarea>
      <button>Submit</button>
    </form>
  );
}
