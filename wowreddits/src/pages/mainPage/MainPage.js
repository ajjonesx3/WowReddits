import style from './mainPage.module.css';
import Feed from '../../components/feed/Feed';


const MainPage = () => {
    return (
        <div className={style.mainPage}>
            <Feed />
        </div>
    )
}

export default MainPage;