import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useApp();

  useEffect(() => {
    const token = searchParams.get('token');
    const provider = searchParams.get('provider');
    const error = searchParams.get('error');

    if (error) {
      console.error('OAuth error:', error);
      navigate(`/login?error=${error}`);
      return;
    }

    if (token) {
      // Save token to localStorage
      localStorage.setItem('token', token);
      
      // Fetch user data
      fetch('http://localhost:5000/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          if (data.status === 'success' && data.data) {
            // Use the login function from AppContext
            login(data.data, true); // Skip onboarding for social login users
            console.log(`✅ ${provider} login successful:`, data.data.fullName);
            navigate('/');
          } else {
            throw new Error('Failed to fetch user data');
          }
        })
        .catch(error => {
          console.error('Error fetching user:', error);
          localStorage.removeItem('token');
          navigate('/login?error=fetch_user_failed');
        });
    } else {
      navigate('/login');
    }
  }, [searchParams, navigate, login]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-purple-50 to-blue-50 flex items-center justify-center p-4">
      <div className="text-center">
        {/* Loading Spinner */}
        <div className="relative inline-block mb-6">
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
        </div>
        
        {/* Text */}
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Completing sign-in...
        </h2>
        <p className="text-gray-600">
          Just a moment while we set up your account
        </p>
      </div>
    </div>
  );
}

export default AuthCallback;
