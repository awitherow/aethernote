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
      <ul>
        {entries.map(entry => {
          let { id, content } = entry;
          return <li key={id}>{content}</li>;
        })}
      </ul>
    );
  }
}
