import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = (email, password) => {
    // In a real app, this would call an API
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const user = storedUsers.find(u => u.email === email && u.password === password);

    if (user) {
      const userData = { name: user.name, email: user.email };
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, message: 'Invalid email or password' };
  };

  const signup = (name, email, password) => {
    // In a real app, this would call an API
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');

    // Check if user already exists
    if (storedUsers.find(u => u.email === email)) {
      return { success: false, message: 'User already exists' };
    }

    // Add new user
    storedUsers.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(storedUsers));
    return { success: true };
  };

  const resetPassword = (email, newPassword) => {
    // In a real app, this would call an API
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = storedUsers.findIndex(u => u.email === email);

    if (userIndex !== -1) {
      storedUsers[userIndex].password = newPassword;
      localStorage.setItem('users', JSON.stringify(storedUsers));
      return { success: true };
    }
    return { success: false, message: 'User not found' };
  };

  const verifyEmail = (email) => {
    // In a real app, this would send an OTP to the email
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const user = storedUsers.find(u => u.email === email);

    if (user) {
      // Generate a mock OTP (in real app, this would be sent to email)
      const otp = '123456';
      localStorage.setItem('resetOTP', otp);
      localStorage.setItem('resetEmail', email);
      return { success: true, otp }; // In real app, don't return OTP
    }
    return { success: false, message: 'Email not found' };
  };

  const verifyOTP = (otp) => {
    // In a real app, this would verify with backend
    const storedOTP = localStorage.getItem('resetOTP');
    if (storedOTP === otp) {
      return { success: true };
    }
    return { success: false, message: 'Invalid OTP' };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        signup,
        logout,
        resetPassword,
        verifyEmail,
        verifyOTP
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
