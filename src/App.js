import React from 'react';
import { Provider } from 'react-redux';
import store from '../src/store/store.js';
import CreateBlogPost from './main.jsx';
import './i18next.jsx';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <CreateBlogPost />
      </div>
    </Provider>
  );
}

export default App;