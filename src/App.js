import React, { Component } from 'react';
import ExchangeWidget from './components/ExchangeWidget';

// App.js component is only needed as an entry point for potential scalability in future
class App extends Component {
  render() {
    return (
      <div className="app">
        <ExchangeWidget />
      </div>
    );
  }
}

export default App;
