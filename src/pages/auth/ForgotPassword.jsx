import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { verifyEmail, verifyOTP, resetPassword } = useAuth();
  const [step, setStep] = useState(1); // 1: email, 2: otp, 3: new password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [generatedOTP, setGeneratedOTP] = useState(''); // For demo purposes

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    if (!email.trim()) {
      setErrors({ email: 'Email is required' });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrors({ email: 'Email is invalid' });
      return;
    }

    const result = verifyEmail(email);
    if (result.success) {
      setGeneratedOTP(result.otp); // For demo, show the OTP
      setStep(2);
    } else {
      setErrors({ email: result.message });
    }
  };

  const handleOTPSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    if (!otp.trim()) {
      setErrors({ otp: 'OTP is required' });
      return;
    }

    const result = verifyOTP(otp);
    if (result.success) {
      setStep(3);
    } else {
      setErrors({ otp: result.message });
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    if (!newPassword) {
      setErrors({ password: 'Password is required' });
      return;
    }

    if (newPassword.length < 6) {
      setErrors({ password: 'Password must be at least 6 characters' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match' });
      return;
    }

    const result = resetPassword(email, newPassword);
    if (result.success) {
      alert('Password reset successful! Please login with your new password.');
      navigate('/login');
    } else {
      setErrors({ general: result.message });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-4xl font-bold text-gray-900">
            Quran App
          </h2>
          <p className="mt-2 text-center text-xl text-primary font-semibold">
            Reset your password
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          {/* Step indicator */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 1 ? 'bg-primary text-white' : 'bg-gray-300 text-gray-600'
              }`}>
                1
              </div>
              <div className={`w-16 h-1 ${step >= 2 ? 'bg-primary' : 'bg-gray-300'}`}></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 2 ? 'bg-primary text-white' : 'bg-gray-300 text-gray-600'
              }`}>
                2
              </div>
              <div className={`w-16 h-1 ${step >= 3 ? 'bg-primary' : 'bg-gray-300'}`}></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 3 ? 'bg-primary text-white' : 'bg-gray-300 text-gray-600'
              }`}>
                3
              </div>
            </div>
          </div>

          {/* Step 1: Email */}
          {step === 1 && (
            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div>
                <p className="text-center text-gray-600 mb-6">
                  Enter your email address and we'll send you an OTP to reset your password.
                </p>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`appearance-none relative block w-full px-3 py-3 border ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                  placeholder="Enter your email"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all"
              >
                Send OTP
              </button>

              <div className="text-center">
                <Link to="/login" className="text-sm font-medium text-primary hover:underline">
                  Back to Login
                </Link>
              </div>
            </form>
          )}

          {/* Step 2: OTP */}
          {step === 2 && (
            <form onSubmit={handleOTPSubmit} className="space-y-6">
              <div>
                <p className="text-center text-gray-600 mb-4">
                  We've sent an OTP to <strong>{email}</strong>
                </p>
                {/* Demo message - remove in production */}
                <div className="bg-blue-50 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4">
                  <p className="text-sm">
                    <strong>Demo Mode:</strong> Your OTP is <strong>{generatedOTP}</strong>
                  </p>
                </div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                  Enter OTP
                </label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength="6"
                  className={`appearance-none relative block w-full px-3 py-3 border ${
                    errors.otp ? 'border-red-500' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                  placeholder="Enter 6-digit OTP"
                />
                {errors.otp && <p className="mt-1 text-sm text-red-600">{errors.otp}</p>}
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all"
              >
                Verify OTP
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Back
                </button>
              </div>
            </form>
          )}

          {/* Step 3: New Password */}
          {step === 3 && (
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              {errors.general && (
                <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {errors.general}
                </div>
              )}

              <div>
                <p className="text-center text-gray-600 mb-6">
                  Create a new password for your account.
                </p>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={`appearance-none relative block w-full px-3 py-3 border ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                  placeholder="Enter new password"
                />
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`appearance-none relative block w-full px-3 py-3 border ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                  placeholder="Confirm new password"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all"
              >
                Reset Password
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
