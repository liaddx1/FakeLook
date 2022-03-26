import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { useNavigate } from 'react-router-dom';
import { FacebookLoginButton } from 'react-social-login-buttons';

const FacebookLoginBtn = props => {
    const navigate = useNavigate();

    const responseFacebook = (response) => {
        if (response.accessToken) {
            // const pic = response.picture;
            // const email = response.email;
            const name = response.name;
            localStorage.clear();
            localStorage.setItem("name", name);
            localStorage.setItem('facebookExp', response.data_access_expiration_time);
            navigate('/map');
        }
    }

    return (
        <FacebookLogin
            className='mt-3 mb-3'
            appId={process.env.REACT_APP_LOGIN_FACEBOOK_APP_ID}
            fields="name,email,picture"
            render={renderProps => (<FacebookLoginButton onClick={renderProps.onClick} disabled={renderProps.disabled}>Log In With Facebook</FacebookLoginButton>)}
            onClick={responseFacebook}
            callback={responseFacebook}
        />
    );
}

export default FacebookLoginBtn;