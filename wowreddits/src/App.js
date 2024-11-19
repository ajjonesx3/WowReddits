import Header from './components/header/Header';
import styles from './App.module.css';
import MainPage from './pages/mainPage/MainPage';
import {useSearchParams, useNavigate} from 'react-router-dom';
import store, {fetchToken} from './store';
import {useDispatch} from 'react-redux';

import {useState,useEffect} from 'react';

function App() {

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(()=>{
      if(searchParams.get('code')){
        const code = searchParams.get('code');
        store.dispatch(fetchToken(code));
        navigate('/WowReddits');
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