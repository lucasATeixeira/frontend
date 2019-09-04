import React from 'react';
import { Provider } from 'react-redux';
import moment from 'moment';
import store from './store';
import Pages from './pages';
import GlobalStyle from './styles/global';
import 'moment/locale/pt-br';

moment.locale('pt-br');

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
