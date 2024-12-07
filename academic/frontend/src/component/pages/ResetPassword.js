// Example React component for the reset password page

import React, { useState } from 'react';
import axios from 'axios';

const ResetPasswordPage = ({ match }) => {
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { uidb64, token } = match.params;

    try {
      const response = await axios.post(`http://localhost:8000/api/reset-password/${uidb64}/${token}/`, { password, password2 });
      setMessage(response.data.message);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div>
      <h2>Reset Your Password</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          New Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <label>
          Confirm Password:
          <input type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} required />
        </label>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
