import styles from './header.module.css';
import redditLogo from '../../assets/reddit.svg';
import wowLogo from '../../assets/wow.svg';
import {createSearchParams} from 'react-router-dom'

const Header = () => {

    const logoSize = {
        width: "13em",
        height: "auto"
    }
    const logoSize2 = {
        width:"5.85em",
        height:"auto"
    }

    const baseUrl = "https://www.reddit.com/api/v1/authorize?";
    const searchParams = createSearchParams({
        client_id: "4pbmTOK3SMGrJmKE12E5wA",
        response_type: "code",
        state: "chicken",
        redirect_uri: "https://ajjonesx3.github.io/WowReddits",
        duration: "permanent",
        scope: "identity read save vote"
    });

    const signInUrl = baseUrl + searchParams;

    return (
        <div className={styles.header}>
            <div className={styles.logos}>
                <img src={redditLogo} alt="reddit logo" style={logoSize}/>
                <img src={wowLogo} alt="wow logo" style={logoSize2}/>
            </div>
            <h1>Wow Reddits</h1>
            <a href={signInUrl}>
                <div className={styles.signIn}>
                    Sign In
                </div>
            </a>


        </div>
    )
}

export default Header;