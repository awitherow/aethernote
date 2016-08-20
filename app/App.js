import React, { Component } from 'react';

import Overlay from './components/Overlay';
import Editor from './components/Editor';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      entryInput: "",
      edit: {
        on: false,
        content: {},
        edits: {},
      },
    };
  }

  componentDidMount() {
    this.fetchEntries();
  }

  fetchEntries() {
    fetch('/api/entries')
      .then(r => r.json())
      .then(res => {
        this.setState({
          entries: res.data,
          loading: false,
        });
      })
      .catch(e => console.log(e));
  }

  captureEntry(e) {
    this.setState({ entryInput: e.target.value });
  }

  storeEntry() {
    console.log('entry stored');
  }

  commitEntry() {
    console.log('entry committed')
  }

  addEntry() {
    this.setState({ loading: true });
    const { entryInput } = this.state;

    fetch('/api/entries', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: entryInput,
        prio: 2,
      }),
    }).then(() => this.fetchEntries());

    this.setState({ entryInput: "" });
  }

  deleteEntry(id) {
    this.setState({ loading: true });
    fetch(`/api/entries/${id}`, {
      method: 'DELETE',
    }).then(() => this.fetchEntries());
  }

  render() {
    const { entries, loading, entryInput, edit } = this.state;
    if (loading) return <Overlay type="spinner" />;

    if (edit.on) {
      let view = 'no-view-found';

      if (edit.content.type === 'entry') {
        let entry = entries.filter(entry => entry.id === edit.content.id)[0];
        if (!entry) return;
        view = (
          <Editor
            type='entry'
            {...entry }
            onChange={this.storeEntry.bind(this)}
            onSubmit={this.commitEntry.bind(this)}
            />
        );
      }

      if (view === 'no-view-found') return <Overlay type="error" />;

      return (
        <div className="aether">
          {view}
        </div>
      );
    }

    return (
      <div className="aether">

        <header>
          <h1>Aether</h1>
        </header>

        <div className="main">
          <h2>Entries <span>({entries.length})</span></h2>
          <ul className="entries-list">
            {entries.map(entry => {
              let { id, content } = entry;
              return (
                <li key={id}>
                  <button onClick={this.deleteEntry.bind(this, id)}>x</button>
                  <span
                    className="content"
                    onClick={() => this.setState({ edit: {
                      on: true,
                      content: {
                        type: 'entry',
                        id,
                      },
                    }})}
                    >{content}</span>
                </li>
              );
            })}
          </ul>
          <div className="add-entry">
            <label htmlFor="entry">Awaiting Entry... </label>
            <input
              id="entry"
              type="text"
              value={entryInput}
              onChange={this.captureEntry.bind(this)}
              />
            <button onClick={this.addEntry.bind(this)}>+</button>
          </div>
        </div>

      </div>
    );
  }
}
