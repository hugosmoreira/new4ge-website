import React, { useState, useEffect } from 'react';
import { collection, doc, setDoc, updateDoc, getDocs, query, where, deleteDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, deleteUser, getAuth } from 'firebase/auth';
import { db } from '../../lib/firebase';
import { PlusCircle, Edit2, Trash2, UserPlus, Key } from 'lucide-react';
import toast from 'react-hot-toast';
import { MASTER_ADMIN } from '../../lib/firestore';

interface User {
  uid: string;
  email: string;
  displayName: string;
  role: 'user' | 'admin';
  lastLogin?: Date;
}

interface FormData {
  email: string;
  password: string;
  displayName: string;
  role: 'user' | 'admin';
}

export default function AdminUsers() {
  const auth = getAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    displayName: '',
    role: 'user'
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const usersData = querySnapshot.docs.map(doc => ({
        uid: doc.id,
        ...doc.data()
      })) as User[];
      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Check if trying to create/update an admin
      if (formData.role === 'admin' && auth.currentUser?.email !== MASTER_ADMIN) {
        toast.error('Only the master admin can create or modify admin users');
        return;
      }

      if (currentUser) {
        // Update existing user
        await updateDoc(doc(db, 'users', currentUser.uid), {
          displayName: formData.displayName,
          role: formData.role,
        });
        toast.success('User updated successfully');
      } else {
        // Create new user
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

        await setDoc(doc(db, 'users', userCredential.user.uid), {
          email: formData.email,
          displayName: formData.displayName,
          role: formData.role,
          createdAt: new Date(),
          lastLogin: new Date(),
        });

        toast.success('User created successfully');
      }

      setFormData({ email: '', password: '', displayName: '', role: 'user' });
      setCurrentUser(null);
      setIsEditing(false);
      fetchUsers();
    } catch (error: any) {
      console.error('Error saving user:', error);
      toast.error(error.message || 'Failed to save user');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user: User) => {
    setCurrentUser(user);
    setFormData({
      email: user.email,
      password: '',
      displayName: user.displayName,
      role: user.role
    });
    setIsEditing(true);
  };

  const handleDelete = async (user: User) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    setLoading(true);
    try {
      await deleteDoc(doc(db, 'users', user.uid));
      toast.success('User deleted successfully');
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Manage Users</h2>
        <button
          onClick={() => setIsEditing(true)}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          <UserPlus className="h-5 w-5" />
          Add User
        </button>
      </div>

      {/* Form */}
      {isEditing && (
        <div className="mb-8 bg-gray-800 p-6 rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            {!currentUser && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                    minLength={6}
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Display Name
              </label>
              <input
                type="text"
                value={formData.displayName}
                onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Role
              </label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value as 'user' | 'admin' })}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                disabled={auth.currentUser?.email !== MASTER_ADMIN}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              {auth.currentUser?.email !== MASTER_ADMIN && (
                <p className="mt-1 text-sm text-red-400">Only the master admin can change user roles</p>
              )}
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setCurrentUser(null);
                  setFormData({ email: '', password: '', displayName: '', role: 'user' });
                }}
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                {loading ? 'Saving...' : (currentUser ? 'Update User' : 'Create User')}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Users List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500 mx-auto"></div>
          </div>
        ) : users.length === 0 ? (
          <p className="text-center text-gray-400 py-8">No users found</p>
        ) : (
          users.map((user) => (
            <div
              key={user.uid}
              className="bg-gray-800 p-6 rounded-lg flex items-center justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-white">{user.displayName || user.email}</h3>
                <p className="text-sm text-gray-400">{user.email}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                    user.role === 'admin' 
                      ? user.email === MASTER_ADMIN 
                        ? 'bg-purple-500/20 text-purple-500' 
                        : 'bg-red-500/20 text-red-500'
                      : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {user.role === 'admin' && user.email === MASTER_ADMIN ? 'Master' : user.role}
                  </span>
                  {user.lastLogin && (
                    <span className="text-gray-400 text-xs">
                      Last login: {new Date(user.lastLogin).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(user)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Edit2 className="h-5 w-5" />
                </button>
                {user.email !== MASTER_ADMIN && (
                  <button
                    onClick={() => handleDelete(user)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}