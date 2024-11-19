import styles from './header.module.css';
import redditLogo from '../../assets/reddit.svg';
import wowLogo from '../../assets/wow.svg';
import SignIn from './SignIn';
import store, {fetchToken} from '../../store';

const Header = () => {

    const logoSize = {
        width: "13em",
        height: "auto"
    }
    const logoSize2 = {
        width:"5.85em",
        height:"auto"
    }

    console.log(store.getState().store.userLoggedIn);

    return (
        <div className={styles.header}>
            <div className={styles.logos}>
                <img src={redditLogo} alt="reddit logo" style={logoSize}/>
                <img src={wowLogo} alt="wow logo" style={logoSize2}/>
            </div>
            <h1>Wow Reddits</h1>
            {store.getState().store.userLoggedIn ? undefined : <SignIn/>}
        </div>
    )
}

export default Header;