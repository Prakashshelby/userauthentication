import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials, please try again.');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="card p-4" style={{ width: '400px' }}>
        <h2 className="text-center">Login</h2>
        {error && <p className="text-danger">{error}</p>}
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input type="email" name="email" className="form-control" placeholder="Email" value={formData.email} onChange={onChange} required />
          </div>
          <div className="form-group">
            <input type="password" name="password" className="form-control" placeholder="Password" value={formData.password} onChange={onChange} required />
          </div>
          <button type="submit" className="btn btn-primary btn-block">Login</button>
          <button type="button" className="btn btn-link" onClick={() => navigate('/register')}>Register</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
