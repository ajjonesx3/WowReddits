import styles from './header.module.css';
import {createSearchParams} from 'react-router-dom'


const SignIn = () => {

    const baseUrl = "https://www.reddit.com/api/v1/authorize?";
    const searchParams = createSearchParams({
        client_id: "4pbmTOK3SMGrJmKE12E5wA",
        response_type: "code",
        state: "chicken",
        redirect_uri: "http://localhost:3000/WowReddits",
        duration: "permanent",
        scope: "identity read save vote"
    });

    const signInUrl = baseUrl + searchParams;

    return (
        <a href={signInUrl}>
            <div className={styles.signIn}>
                Sign In
            </div>
        </a>
    )
}

export default SignIn;