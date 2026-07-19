import React, { useState, useEffect } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const AdminPage: React.FC = () => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('admin_token'));
  
  // Login State
  const [mobilenumber, setMobilenumber] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Dashboard State
  const [users, setUsers] = useState<any[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Onboard State
  const [onboardData, setOnboardData] = useState({
    name: '',
    mobilenumber: '',
    businessname: '',
    email: '',
    address: '',
    password: ''
  });
  const [showOnboardPassword, setShowOnboardPassword] = useState(false);
  const [onboardErrors, setOnboardErrors] = useState({
    mobilenumber: '',
    email: '',
    password: ''
  });
  const [onboardStatus, setOnboardStatus] = useState<{type: 'success' | 'error' | '', message: string}>({type: '', message: ''});
  const [isOnboarding, setIsOnboarding] = useState(false);

  useEffect(() => {
    if (token) {
      fetchUsers();
    }
  }, [token]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/signIn`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobilenumber, password })
      });
      const data = await response.json();
      
      if (response.ok && data.accessToken) {
        localStorage.setItem('admin_token', data.accessToken);
        setToken(data.accessToken);
      } else {
        setLoginError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setLoginError('Server error. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setToken(null);
  };

  const fetchUsers = async () => {
    setIsLoadingUsers(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/getUserList`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status === 401) {
        handleLogout();
        return;
      }
      const data = await response.json();
      if (data && data.users_list) {
        setUsers(data.users_list);
      }
    } catch (err) {
      console.error('Failed to fetch users', err);
    } finally {
      setIsLoadingUsers(false);
    }
  };

  const validateMobile = (value: string) => {
    if (!value) return 'Please enter mobile number';
    if (value.length !== 10) return 'Mobile number must be 10 digits';
    const regex = /^[0-9]{10}$/;
    if (!regex.test(value)) return 'Please enter a valid mobile number';
    return '';
  };

  const validateEmail = (value: string) => {
    if (!value) return 'Please enter email';
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!regex.test(value)) return 'Please enter a valid email';
    return '';
  };

  const validatePassword = (value: string) => {
    if (!value) return 'Please enter a password';
    if (value.length < 8) return 'Password must be at least 8 characters';
    if (!/[A-Z]/.test(value)) return 'Password must contain at least 1 capital letter';
    if (!/[0-9]/.test(value)) return 'Password must contain at least 1 number';
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) return 'Password must contain at least 1 special character';
    return '';
  };

  const handleOnboardChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setOnboardData({ ...onboardData, [name]: value });
    setOnboardErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleOnboard = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const mErr = validateMobile(onboardData.mobilenumber);
    const eErr = validateEmail(onboardData.email);
    const pErr = validatePassword(onboardData.password);
    
    if (mErr || eErr || pErr) {
      setOnboardErrors(prev => ({
        ...prev,
        mobilenumber: mErr,
        email: eErr,
        password: pErr
      }));
      return;
    }

    setIsOnboarding(true);
    setOnboardStatus({ type: '', message: '' });

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/signUp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(onboardData)
      });
      const data = await response.json();
      
      if (response.ok) {
        setOnboardStatus({ type: 'success', message: 'User created successfully!' });
        setOnboardData({ name: '', mobilenumber: '', businessname: '', email: '', address: '', password: '' });
        fetchUsers();
      } else {
        setOnboardStatus({ type: 'error', message: data.message || 'Registration failed' });
      }

      // Hide the status message after 2 seconds
      setTimeout(() => {
        setOnboardStatus(current => {
          // Only clear if it hasn't been overwritten by a new request
          return current.message ? { type: '', message: '' } : current;
        });
      }, 2000);
    } catch (err) {
      setOnboardStatus({ type: 'error', message: 'Network error.' });
      setTimeout(() => setOnboardStatus({ type: '', message: '' }), 2000);
    } finally {
      setIsOnboarding(false);
    }
  };

  const confirmDeleteUser = async () => {
    if (userToDelete === null) return;
    setIsDeleting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/deleteUser/${userToDelete}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        fetchUsers();
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to delete user');
      }
    } catch (err) {
      alert('Network error while deleting user');
    } finally {
      setIsDeleting(false);
      setUserToDelete(null);
    }
  };

  if (!token) {
    return (
      <div className="flex items-center justify-center min-h-[80vh] bg-background p-4 py-16">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-primary mb-2">Admin Login</h2>
            <p className="text-gray-500">Sign in to manage the platform</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Mobile Number</label>
              <input 
                type="text" 
                value={mobilenumber} 
                onChange={(e) => setMobilenumber(e.target.value)} 
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-all bg-white"
                placeholder="Enter mobile number"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input 
                  type={showLoginPassword ? "text" : "password"} 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required
                  className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-all bg-white"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showLoginPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" /></svg>
                  )}
                </button>
              </div>
            </div>
            {loginError && <p className="text-red-600 text-sm text-center font-medium">{loginError}</p>}
            <button 
              type="submit" 
              disabled={isLoggingIn}
              className="w-full bg-primary hover:bg-secondary text-white font-bold py-3 px-4 rounded-lg transition-all shadow hover:shadow-md disabled:opacity-70"
            >
              {isLoggingIn ? 'Authenticating...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] bg-background p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div>
            <h1 className="text-2xl font-bold text-primary">Admin Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">Manage users and platform settings</p>
          </div>
          <button 
            onClick={handleLogout}
            className="mt-4 md:mt-0 px-5 py-2.5 bg-red-50 text-red-700 hover:bg-red-100 font-semibold rounded-lg transition-colors border border-red-200"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Onboarding Form */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-6">
              <h3 className="text-lg font-bold text-primary mb-5 pb-4 border-b border-gray-100">Onboard New User</h3>
              <form onSubmit={handleOnboard} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
                  <input type="text" name="name" value={onboardData.name} onChange={handleOnboardChange} required className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Mobile Number</label>
                  <input type="text" name="mobilenumber" value={onboardData.mobilenumber} onChange={handleOnboardChange} required className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
                  {onboardErrors.mobilenumber && <p className="text-red-500 text-xs mt-1 font-medium">{onboardErrors.mobilenumber}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Business Name</label>
                  <input type="text" name="businessname" value={onboardData.businessname} onChange={handleOnboardChange} required className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Address</label>
                  <textarea name="address" value={onboardData.address} onChange={handleOnboardChange} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none" rows={2} placeholder="Optional" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                  <input type="email" name="email" value={onboardData.email} onChange={handleOnboardChange} required className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
                  {onboardErrors.email && <p className="text-red-500 text-xs mt-1 font-medium">{onboardErrors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                  <div className="relative">
                    <input type={showOnboardPassword ? "text" : "password"} name="password" value={onboardData.password} onChange={handleOnboardChange} required className="w-full px-3 py-2 pr-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
                    <button
                      type="button"
                      onClick={() => setShowOnboardPassword(!showOnboardPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                    >
                      {showOnboardPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" /></svg>
                      )}
                    </button>
                  </div>
                  {onboardErrors.password && <p className="text-red-500 text-xs mt-1 font-medium">{onboardErrors.password}</p>}
                </div>
                
                {onboardStatus.message && (
                  <div className={`p-3 rounded-lg text-sm font-semibold text-center ${onboardStatus.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                    {onboardStatus.message}
                  </div>
                )}
                
                <button type="submit" disabled={isOnboarding} className="w-full bg-primary hover:bg-secondary text-white font-bold py-3 rounded-lg transition-colors mt-2 disabled:opacity-70 shadow-sm">
                  {isOnboarding ? 'Creating...' : 'Create User'}
                </button>
              </form>
            </div>
          </div>

          {/* User List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-gray-200 flex flex-col sm:flex-row sm:justify-between sm:items-center bg-gray-50/50 gap-4">
                <h3 className="text-lg font-bold text-primary">Registered Users</h3>
                <div className="flex space-x-3 items-center">
                  <input 
                    type="text" 
                    placeholder="Search users..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all w-full sm:w-48"
                  />
                  <button onClick={fetchUsers} className="text-sm font-semibold text-primary hover:text-white bg-white hover:bg-primary border border-primary px-4 py-1.5 rounded-lg transition-all shadow-sm whitespace-nowrap">
                    Refresh
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-xs uppercase tracking-wider">
                      <th className="px-6 py-4 font-bold">S.No.</th>
                      <th className="px-6 py-4 font-bold">Name</th>
                      <th className="px-6 py-4 font-bold">Mobile</th>
                      <th className="px-6 py-4 font-bold">Business</th>
                      <th className="px-6 py-4 font-bold text-center">Verified</th>
                      <th className="px-6 py-4 font-bold text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {isLoadingUsers ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-gray-500 font-medium">Loading users...</td>
                      </tr>
                    ) : users.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-gray-500 font-medium">No users found.</td>
                      </tr>
                    ) : (() => {
                      const filteredUsers = users.filter(user => {
                        const q = searchQuery.toLowerCase();
                        return (
                          (user.name && user.name.toLowerCase().includes(q)) ||
                          (user.mobilenumber && user.mobilenumber.includes(q)) ||
                          (user.email && user.email.toLowerCase().includes(q)) ||
                          (user.businessname && user.businessname.toLowerCase().includes(q))
                        );
                      });

                      if (filteredUsers.length === 0) {
                        return (
                          <tr>
                            <td colSpan={6} className="px-6 py-12 text-center text-gray-500 font-medium">No users match your search.</td>
                          </tr>
                        );
                      }

                      return filteredUsers.map((user, index) => (
                        <tr key={user.id} className="hover:bg-gray-50/80 transition-colors">
                          <td className="px-6 py-4 text-sm font-medium text-gray-500">{index + 1}</td>
                          <td className="px-6 py-4">
                            <div className="text-sm font-bold text-gray-800">{user.name}</div>
                            <div className="text-xs font-medium text-gray-500">{user.email}</div>
                          </td>
                          <td className="px-6 py-4 text-sm font-semibold text-gray-700">{user.mobilenumber}</td>
                          <td className="px-6 py-4 text-sm font-semibold text-gray-700">{user.businessname || '-'}</td>
                          <td className="px-6 py-4 text-center">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${user.is_verified ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-800'}`}>
                              {user.is_verified ? 'Yes' : 'No'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <button
                              onClick={() => setUserToDelete(user.id)}
                              className="text-xs font-bold text-red-600 hover:text-white bg-red-50 hover:bg-red-600 border border-red-200 hover:border-red-600 px-3 py-1.5 rounded-lg transition-all"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ));
                    })()}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {userToDelete !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Delete User</h3>
              <p className="text-gray-600 text-sm">Are you sure you want to delete this user? This action cannot be undone.</p>
            </div>
            <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3 border-t border-gray-100">
              <button 
                onClick={() => setUserToDelete(null)}
                disabled={isDeleting}
                className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDeleteUser}
                disabled={isDeleting}
                className="px-4 py-2 text-sm font-semibold text-white bg-red-600 border border-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-70"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
