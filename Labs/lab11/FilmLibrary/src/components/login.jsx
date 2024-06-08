<LoginForm userLogin={userLoginCallback}/>
    function LoginForm(props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    doLogin = (event) => {
        event.preventDefault();
        if (… form valid …) {
            props.userLoginCallback(username, password); // Make POST request to authentication server
        } else {
            // show invalid form fields
        }
 }