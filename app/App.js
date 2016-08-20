import React, { Component } from 'react';

import Overlay from './components/Overlay';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      entryInput: "",
    };
  }

  componentDidMount() {
    this.fetchEntries();
  }

  fetchEntries() {
    this.setState({ loading: true });
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

  addEntry() {
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
    fetch(`/api/entries/${id}`, {
      method: 'DELETE',
    }).then(() => this.fetchEntries());
  }

  render() {
    const { entries, loading, entryInput } = this.state;
    if (loading) return <Overlay />;

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
                  {content}
                </li>
              );
            })}
          </ul>
          <div className="add-entry">
            <label htmlFor="entry">How can I help you? </label>
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
