import React from 'react';

import Dashboard from './Dashboard';
import Store from './Store';


function App() {
  return (
    <div className="App">
      <Store>
        <Dashboard />
      </Store>
    </div>
  );
}

export default App;
