import Header from './components/header/Header';
import styles from './App.module.css';
import MainPage from './pages/mainPage/MainPage';
import {useSearchParams} from 'react-router-dom';
import store from './store';
import {fetchToken} from './store'

import {useState,useEffect} from 'react';

function App() {

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(()=>{
    if(searchParams.get('code')){
      const code = searchParams.get('code');
      console.log(code);
      store.dispatch(fetchToken(code));
    }
  },[]);

  return (
    <div className={styles.App}>
      <Header />
      <MainPage />
    </div>
  );
}

export default App;