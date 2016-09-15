import React, { PropTypes } from 'react';
import TextInput from '../../../elements/TextInput';

const EntryForm = ({
  entry,
  onSave,
  onChange,
  loading,
  errors
}) => {
  return (
    <form>
      <TextInput
        id="content"
        label="content"
        defaultValue={entry.content}
        onChange={onChange}
        />
      <input
        type="submit"
        disabled={loading}
        value={loading ? 'Saving...' : 'Save'}
        className="btn"
        onClick={onSave}
        />
    </form>
  );
};

EntryForm.propTypes = {
  entry: PropTypes.string.isRequired,
  onSave: PropTypes.string.isRequired,
  onChange: PropTypes.string.isRequired,
  loading: PropTypes.string.isRequired,
  errors: PropTypes.string.isRequired
};

export default EntryForm;
