import React from 'react';
import Container from './components/Container'
import NavBar from './components/NavBar'
import GameField from './components/GameField'
import store from './services/redux/store'
import {Provider} from 'react-redux'


function App() {


  return (
    <div style={{display:"flex", justifyContent:"center"}}>
      <Provider store={store}>
        <Container>
          <NavBar />
          <GameField />
        </Container>
      </Provider>
    </div>
  );
}

export default App;
