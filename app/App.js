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
    return <p>Hello!</p>;
    const { entries, entriesLoading } = this.state;
  }
}

export default App;
