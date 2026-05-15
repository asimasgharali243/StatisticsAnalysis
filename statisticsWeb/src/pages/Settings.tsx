// import React from 'react';
// import { useTheme } from '../context/ThemeContext';
// import { User, Bell, Shield, Moon, Sun, Monitor } from 'lucide-react';
// export function Settings() {
//   const { isDark, toggleTheme } = useTheme();
//   return (
//     <div className="space-y-6 animate-in fade-in duration-500 max-w-4xl mx-auto">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
//           Settings
//         </h1>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         <div className="md:col-span-1 space-y-1">
//           <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg bg-brand-50 text-brand-700 dark:bg-brand-900/20 dark:text-brand-400">
//             <User size={18} /> Profile
//           </button>
//           <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800">
//             <Monitor size={18} /> Preferences
//           </button>
//           <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800">
//             <Bell size={18} /> Notifications
//           </button>
//           <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800">
//             <Shield size={18} /> Security
//           </button>
//         </div>

//         <div className="md:col-span-3 space-y-6">
//           <div className="card p-6">
//             <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
//               Profile Information
//             </h3>
//             <div className="space-y-4">
//               <div className="flex items-center gap-4 mb-6">
//                 <div className="h-16 w-16 rounded-full bg-brand-100 dark:bg-brand-900/50 border border-brand-200 dark:border-brand-800 flex items-center justify-center text-brand-700 dark:text-brand-300 font-bold text-xl">
//                   JD
//                 </div>
//                 <div>
//                   <button className="btn-secondary text-xs py-1.5">
//                     Change Avatar
//                   </button>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
//                     First Name
//                   </label>
//                   <input
//                     type="text"
//                     className="input-field"
//                     defaultValue="John" />
                  
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
//                     Last Name
//                   </label>
//                   <input
//                     type="text"
//                     className="input-field"
//                     defaultValue="Doe" />
                  
//                 </div>
//                 <div className="sm:col-span-2">
//                   <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
//                     Email Address
//                   </label>
//                   <input
//                     type="email"
//                     className="input-field"
//                     defaultValue="admin@findash.com" />
                  
//                 </div>
//               </div>

//               <div className="pt-4 flex justify-end">
//                 <button className="btn-primary">Save Changes</button>
//               </div>
//             </div>
//           </div>

//           <div className="card p-6">
//             <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
//               Appearance
//             </h3>
//             <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-700/50">
//               <div>
//                 <p className="text-sm font-medium text-slate-900 dark:text-white">
//                   Theme
//                 </p>
//                 <p className="text-xs text-slate-500 dark:text-slate-400">
//                   Toggle between light and dark mode
//                 </p>
//               </div>
//               <button
//                 onClick={toggleTheme}
//                 className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-medium">
                
//                 {isDark ?
//                 <>
//                     <Sun size={16} /> Light
//                   </> :

//                 <>
//                     <Moon size={16} /> Dark
//                   </>
//                 }
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>);

// }
// src/pages/Settings.tsx
import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { User, Bell, Shield, Moon, Sun, Monitor, Save, Lock, Mail, User as UserIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {baseUrl} from '../store/api/dashboardApi';
interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export function Settings() {
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile');
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  // Profile form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  
  // Security form state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    // Load user from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setFirstName(userData.firstName || '');
      setLastName(userData.lastName || '');
      setEmail(userData.email || '');
    } else {
      // Redirect to login if not logged in
      navigate('/login');
    }
  }, [navigate]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);
    
    try {
      const response = await fetch(`${baseUrl}/Auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          currentPassword: '',
          newPassword: ''
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        const updatedUser = { ...user, firstName, lastName, email };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to update profile' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      return;
    }
    
    if (newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters' });
      return;
    }
    
    setIsLoading(true);
    setMessage(null);
    
    try {
      const response = await fetch(`${baseUrl}/Auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          currentPassword,
          newPassword
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setMessage({ type: 'success', text: 'Password changed successfully!' });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to change password' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Settings
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage your account settings and preferences
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors text-sm font-medium"
        >
          Sign Out
        </button>
      </div>

      {message && (
        <div className={`p-4 rounded-lg ${
          message.type === 'success' 
            ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
            : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800'
        }`}>
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="md:col-span-1 space-y-1">
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeTab === 'profile'
                ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/20 dark:text-brand-400'
                : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800'
            }`}
          >
            <User size={18} /> Profile
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeTab === 'security'
                ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/20 dark:text-brand-400'
                : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800'
            }`}
          >
            <Lock size={18} /> Security
          </button>
          <button
            className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            <Bell size={18} /> Notifications
          </button>
          <button
            className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            <Shield size={18} /> Privacy
          </button>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3 space-y-6">
          {/* Profile Settings */}
          {activeTab === 'profile' && (
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Profile Information
              </h3>
              
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-20 w-20 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                    {firstName.charAt(0)}{lastName.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Profile Picture</p>
                    <p className="text-xs text-slate-400 mt-1">Click to change (coming soon)</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="input-field"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input-field"
                      required
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-primary flex items-center gap-2"
                  >
                    <Save size={16} />
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Change Password
              </h3>
              
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="input-field"
                    required
                    placeholder="Enter your current password"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="input-field"
                    required
                    placeholder="Enter new password (min 6 characters)"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="input-field"
                    required
                    placeholder="Confirm your new password"
                  />
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-primary flex items-center gap-2"
                  >
                    <Lock size={16} />
                    {isLoading ? 'Changing...' : 'Change Password'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Appearance Settings */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Appearance
            </h3>
            <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-700/50">
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  Theme
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Toggle between light and dark mode
                </p>
              </div>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-medium"
              >
                {isDark ? (
                  <>
                    <Sun size={16} /> Light
                  </>
                ) : (
                  <>
                    <Moon size={16} /> Dark
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}