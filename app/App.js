import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entriesLoading: true,
    };
  }

  componentDidMount() {
    fetch('/api/entries')
      .then(r => r.json())
      .then(res => {
        this.setState({
          entries: res.data,
          entriesLoading: false,
        });
      })
      .catch(e => console.log(e));
  }

  render() {
    const { entries, entriesLoading } = this.state;
    if (entriesLoading) return null;

    return (
      <ul>
        {entries.map(entry => {
          let { id, content } = entry;
          return <li key={id}>{content}</li>;
        })}
      </ul>
    );
  }
}

export default App;
