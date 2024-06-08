import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';


 function LoginForm(props){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const handleLogin = (event) => {
        event.preventDefault();
        const usernamePattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!usernamePattern.test(username)) {
            setErrorMessage('Username must be in the format something@something.something');
            return;
        }
        try{
            props.onLogin(username, password);
            //navigate('/');
        }catch(error){
            setErrorMessage(error.message);
        }
    }
    return (
        <div className='col-8' id='login'>
            <h2>Login: </h2>
            <form onSubmit={handleLogin}>
                <div className="form-group row">
                    <label htmlFor='title' className="col-sm-2 col-form-label">Username: </label>
                    <input type="text" className='form-control' value={username} required={true} minLength={5}
                    onChange={(event) => setUsername(event.target.value)} />
                </div>
                <div className="form-group row">
                    <label htmlFor='title' className="col-sm-2 col-form-label">Password: </label>
                    <input type="password" value={password} required={true}
                    onChange={(event) => setPassword(event.target.value)} />
                </div>
                <div className="form-group row">
                <div className="offset-2">
                    <button type="submit" className="btn btn-primary">Login</button>
                    <button type="button" className="btn btn-primary offset-md-1" id='cancel-button' onClick={() => {
                        navigate(-1);
                    }}>Cancel</button>
                </div>
            </div>
            <div className='form-group row'>
                {errorMessage && <div className='alert alert-danger'>{errorMessage}</div>}
            </div>
            </form>
        </div>
    );
 }
LoginForm.propTypes = {
    onLogin: PropTypes.func.isRequired
}

export default LoginForm;