import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { supabase } from '../supabaseClient';

export function AuthHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    // Handle auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        // User signed in successfully
        console.log('User signed in:', session.user.email);
        // Navigate to the main app
        navigate('/');
      } else if (event === 'SIGNED_OUT') {
        // User signed out
        console.log('User signed out');
        navigate('/');
      }
    });

    // Handle URL parameters for magic link authentication
    const handleAuthRedirect = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const accessToken = urlParams.get('access_token');
      const refreshToken = urlParams.get('refresh_token');
      const error = urlParams.get('error');
      const errorDescription = urlParams.get('error_description');

      if (error) {
        console.error('Auth error:', error, errorDescription);
        alert(`Authentication error: ${errorDescription || error}`);
        navigate('/');
        return;
      }

      if (accessToken && refreshToken) {
        try {
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (error) {
            console.error('Error setting session:', error);
            alert('Failed to complete authentication');
            navigate('/');
          } else {
            console.log('Session set successfully');
            // The auth state change handler will handle navigation
          }
        } catch (err) {
          console.error('Error during auth redirect:', err);
          navigate('/');
        }
      }
    };

    // Check if we're on an auth redirect page
    if (
      window.location.pathname === '/auth' ||
      window.location.search.includes('access_token')
    ) {
      handleAuthRedirect();
    }

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  return null; // This component doesn't render anything
}
