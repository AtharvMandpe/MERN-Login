import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import './App.css';
import Home from './Components/Home';
import NotLoggedIn from './Components/NotLoggedIn';
import { useState } from 'react';

function App() {

  const [loggedin, setLoggedin] = useState(false);
  const [username, setusername] = useState('');

  function logoutHandler() {
    googleLogout();
  }

  return (
    <div className="App">
      <h1>Hello World</h1>
      <GoogleOAuthProvider clientId="950691290520-e6jjuqjq7ot45mgth4g4825pmrc9qr81.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={credentialResponse => {
            console.log("done");
            var decoded = jwtDecode(JSON.stringify(credentialResponse));
            console.log(decoded);
            setLoggedin(true);
            setusername(decoded.email);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </GoogleOAuthProvider>

      {loggedin ? (<Home username={username} />) : (<NotLoggedIn />)}

      <button onClick={logoutHandler}>Logout</button>
    </div>
  );
}

export default App;
