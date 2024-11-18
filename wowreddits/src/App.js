import Header from './components/header/Header';
import styles from './App.module.css';
import MainPage from './pages/mainPage/MainPage';

function App() {
  return (
    <div className={styles.App}>
      <Header />
      <MainPage />
    </div>
  );
}

export default App;