import React, { Component } from 'react';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
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

  render() {
    const { entries, loading } = this.state;
    if (loading) return null;

    return (
      <div className="aether">
        <header>
          <h1>Aether</h1>
        </header>

        <div className="main">
          <ul className="entries-list">
            {entries.map(entry => {
              let { id, content } = entry;
              return <li key={id}>{content}</li>;
            })}
          </ul>
        </div>

      </div>
    );
  }
}
