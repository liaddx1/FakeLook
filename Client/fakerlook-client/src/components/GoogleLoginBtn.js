import { useNavigate } from "react-router-dom";
import { GoogleLoginButton } from 'react-social-login-buttons';
import GoogleLogin from "react-google-login";

const GoogleLoginBtn = props => {
    const navigate = useNavigate();

    const responseGoogle = (response) => {
        if (response.tokenObj.id_token) {
            // const pic = response.profileObj.imageUrl;
            // const email = response.profileObj.email;
            const firstName = response.profileObj.givenName;
            const lastName = response.profileObj.familyName;
            const name = [firstName, lastName].join(' ');
            localStorage.clear();
            localStorage.setItem("name", name);
            localStorage.setItem("authToken", response.tokenId);
            navigate('/map');
        }
    }
    return (
        <GoogleLogin
            className='mt-3 mb-3'
            clientId={process.env.REACT_APP_LOGIN_GOOGLE_CLIENT_ID}
            render={renderProps => (<GoogleLoginButton onClick={renderProps.onClick} disabled={renderProps.disabled} >Log In with Google</GoogleLoginButton>)}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
        />
    );
}

export default GoogleLoginBtn;