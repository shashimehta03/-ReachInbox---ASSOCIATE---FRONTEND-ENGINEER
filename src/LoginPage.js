import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import './App.css';

const clientId = 'YOUR_GOOGLE_CLIENT_ID';

function LoginPage() {
  const navigate = useNavigate();

  const onSuccess = (response) => {
    console.log('Login Success:', response);
    navigate('/onebox');
  };

  const onFailure = (response) => {
    console.log('Login Failed:', response);
  };

  // Mock Data
  const mockSuccessResponse = {
    profileObj: {
      googleId: "1234567890",
      imageUrl: "https://example.com/profile.jpg",
      email: "user@example.com",
      name: "John Doe",
    },
    tokenId: "mock-token-id",
  };

  const mockFailureResponse = {
    error: "popup_closed_by_user",
  };

  return (
    <div className="container">
      <div className="header">
        <span className="logo">REACHINBOX</span>
      </div>
      <div className="account-box">
        <h2>Create a new account</h2>
        <GoogleLogin
          clientId={clientId}
          buttonText="Sign Up with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          className="google-signup"
        />
        <button className="create-account">Create an Account</button>
        <p>Already have an account? <a href="#">Sign In</a></p>
        
        {/* Buttons to trigger mock login */}
        <button onClick={() => onSuccess(mockSuccessResponse)}>Mock Successful Login</button>
        <button onClick={() => onFailure(mockFailureResponse)}>Mock Failed Login</button>
      </div>
    </div>
  );
}

export default LoginPage;
