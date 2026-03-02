import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { useRestaurantData } from '../hooks/useRestaurant';

const Home = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { location } = useAuthStore();
  const search = searchParams.get('search') || '';

  const { restaurants, isLoadingRestaurants } = useRestaurantData({
    location,
    search,
    enabled: true,
  });

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome to Home Page</h1>
      <button
        onClick={handleLogout}
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: 'red',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
