import Header from './components/header/header';
import styles from './App.module.css';
import MainPage from './pages/mainPage/mainPage';

function App() {
  return (
    <div className={styles.App}>
      <Header />
      <MainPage />
    </div>
  );
}

export default App;