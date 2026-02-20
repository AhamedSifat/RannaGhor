import { useNavigate } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import { loginWithGoogle } from '../services/authApi';
import toast from 'react-hot-toast';
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc';
import { useAuthStore } from '../stores/authStore';

const Login = () => {
  const navigate = useNavigate();

  const { mutate: loginMutation, isPending } = useMutation({
    mutationFn: (code: string) => loginWithGoogle(code),

    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      useAuthStore.setState({
        user: data.user,
        isAuth: true,
        isLoading: false,
      });
      navigate('/');
      toast.success(data.message);
    },

    onError: () => {
      toast.error('Problem logging in. Please try again.');
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const responseGoogle = async (authResult: any) => {
    loginMutation(authResult.code);
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: 'auth-code',
  });

  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-rose-50 via-white to-pink-50 px-6'>
      <div className='w-full max-w-md'>
        {/* Card Container */}
        <div className='bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-rose-100/50 p-8 space-y-8 border border-white/50'>
          {/* Logo/Brand Section */}
          <div className='space-y-3'>
            <div className='flex justify-center'>
              <div className='w-16 h-16 bg-gradient-to-tr from-[#E23774] to-rose-400 rounded-2xl flex items-center justify-center shadow-lg shadow-rose-200 transform hover:scale-105 transition-transform duration-300'>
                <span className='text-white text-2xl font-bold'>R</span>
              </div>
            </div>
            <h1 className='text-center text-3xl font-bold bg-gradient-to-r from-[#E23774] to-rose-500 bg-clip-text text-transparent'>
              RannaKhor
            </h1>
            <p className='text-center text-sm text-gray-500 font-medium'>
              Welcome back! Please sign in to continue
            </p>
          </div>

          {/* Divider */}
          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-gray-200'></div>
            </div>
            <div className='relative flex justify-center text-xs uppercase'>
              <span className='bg-white px-2 text-gray-400 font-medium tracking-wider'>
                Continue with
              </span>
            </div>
          </div>

          {/* Google Button */}
          <button
            onClick={googleLogin}
            disabled={isPending}
            className='group w-full flex items-center justify-center gap-3 rounded-xl bg-white border-2 border-gray-100 px-6 py-3.5 text-sm font-semibold text-gray-700 shadow-sm hover:border-[#E23774]/30 hover:shadow-md hover:shadow-rose-100/50 focus:outline-none focus:ring-2 focus:ring-[#E23774]/20 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:border-gray-100 disabled:hover:shadow-none transition-all duration-200'
          >
            <FcGoogle size={22} className='flex-shrink-0' />
            <span className='group-hover:text-[#E23774] transition-colors duration-200'>
              {isPending ? 'Connecting...' : 'Sign in with Google'}
            </span>
            {isPending && (
              <svg
                className='animate-spin h-4 w-4 text-[#E23774]'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
              >
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'
                ></circle>
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                ></path>
              </svg>
            )}
          </button>

          {/* Footer Text */}
          <div className='space-y-4 pt-2'>
            <p className='text-center text-xs text-gray-400 leading-relaxed'>
              By signing in, you agree to our{' '}
              <a
                href='#'
                className='text-[#E23774] hover:text-rose-600 font-medium underline-offset-2 hover:underline transition-all'
              >
                Terms of Service
              </a>{' '}
              and{' '}
              <a
                href='#'
                className='text-[#E23774] hover:text-rose-600 font-medium underline-offset-2 hover:underline transition-all'
              >
                Privacy Policy
              </a>
            </p>
          </div>
        </div>

        {/* Bottom decorative element */}
        <div className='mt-8 text-center'>
          <p className='text-xs text-gray-400 font-medium'>
            Secure login powered by Google
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
