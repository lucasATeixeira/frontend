import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Pages from './pages';
import GlobalStyle from './styles/global';

function App() {
  return (
    <>
      <Provider store={store}>
        <GlobalStyle />
        <Pages />
      </Provider>
    </>
  );
}

export default App;
