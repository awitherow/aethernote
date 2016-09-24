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
        value={entry.content}
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
  entry: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired
};

export default EntryForm;
