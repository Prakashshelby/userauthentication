import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');

    // const { name, email, password } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', formData);
            localStorage.setItem('token', res.data.token);
            alert('Registration successful!');
            navigate('/login');  
        } catch (err) {
            setError('Error registering, please try again.');
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="card p-4" style={{ width: '400px' }}>
        <h2 className="text-center">Register</h2>
        {error && <p className="text-danger">{error}</p>}
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input type="text" name="name" className="form-control" placeholder="Name" value={formData.name} onChange={onChange} required />
          </div>
          <div className="form-group">
            <input type="email" name="email" className="form-control" placeholder="Email" value={formData.email} onChange={onChange} required />
          </div>
          <div className="form-group">
            <input type="password" name="password" className="form-control" placeholder="Password" value={formData.password} onChange={onChange} required />
          </div>
          <button type="submit" className="btn btn-primary btn-block">Register</button>
        </form>
      </div>
    </div>
    );
}

export default Register;
