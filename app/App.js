import React, { Component } from 'react';

//import { getAllEntries } from './servants/entries';

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
