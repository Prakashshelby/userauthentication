import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Style.css'; 

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      try {
        const res = await axios.get('http://localhost:5000/api/auth/me', config);
        setUser(res.data);
      } catch (err) {
        alert('Session expired. Please log in again.');
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token from local storage
    navigate('/login'); // Redirect to login page
  };

  return (
    <div>
      {/* Header */}
      <header className="bg-primary text-white text-center py-3">
        <h1>Dashboard</h1>
      </header>

      {/* Main content */}
      <div className="container mt-4">
        {user ? (
          <>
            <h2>Welcome, {user.name}!</h2>
            <p>Your email: {user.email}</p>
            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3 mt-5">
        <p>&copy; {new Date().getFullYear()} Thanks for viewing our website. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Dashboard;
