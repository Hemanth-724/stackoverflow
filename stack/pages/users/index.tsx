import React, { useState, useEffect } from 'react';
import Mainlayout from '@/Layout/Mainlayout';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from "@/components/ui/card";
import Link from 'next/link';
import { fetchAllUsers, deleteUser } from '@/lib/api';
import { useAuth } from '@/context/authcontext';
import { toast } from 'react-toastify';
import moment from 'moment';

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [filterText, setFilterText] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { user: loggedInUser, logout } = useAuth();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const { data } = await fetchAllUsers();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const handleDeleteUser = async (userId: string, userName: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete user "${userName}"? This will also delete all their questions. This action cannot be undone.`
    );
    if (!confirmed) return;

    setDeletingId(userId);
    try {
      await deleteUser(userId);
      toast.success(`User "${userName}" deleted successfully`);
      
      // If the user deleted themselves, log them out
      if (loggedInUser && loggedInUser._id === userId) {
        logout();
        window.location.href = '/';
        return;
      }
      
      // Refresh user list
      setUsers(users.filter(u => u._id !== userId));
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete user");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredUsers = users.filter(u =>
    u.name?.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <Mainlayout>
      <div className="py-8 w-full">
        <h1 className="text-2xl font-bold mb-6">Users</h1>
        <div className="mb-8 max-w-sm">
          <Input
            placeholder="Filter by user"
            className="w-full bg-white"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredUsers.map((user: any) => (
            <Card key={user._id} className="hover:shadow-sm transition-shadow h-full bg-white relative group">
              <CardContent className="p-4 flex items-start space-x-3">
                <Link href={`/users/${user._id}`} className="flex items-start space-x-3 flex-1 min-w-0">
                  <div className="h-10 w-10 flex-shrink-0 bg-[#e1ecf4] text-[#39739d] rounded flex items-center justify-center font-bold text-lg uppercase">
                    {user.name ? user.name.charAt(0) : 'U'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-[15px] font-medium text-blue-600 truncate mb-0.5">{user.name}</h2>
                    {user.tags && user.tags.length > 0 && (
                      <p className="text-xs text-gray-500 mb-2 truncate">{user.tags.join(', ')}</p>
                    )}
                    <div className="text-[11px] text-gray-500 flex items-center">
                      <svg className="w-3.5 h-3.5 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Joined {moment(user.joinDate).fromNow()}
                    </div>
                  </div>
                </Link>
                
                {/* Delete button - visible on hover if user is logged in */}
                {loggedInUser && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleDeleteUser(user._id, user.name);
                    }}
                    disabled={deletingId === user._id}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded hover:bg-red-50 text-gray-400 hover:text-red-500"
                    title={`Delete ${user.name}`}
                  >
                    {deletingId === user._id ? (
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    )}
                  </button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Mainlayout>
  );
}
