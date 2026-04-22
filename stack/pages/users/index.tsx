import React, { useState, useEffect } from 'react';
import Mainlayout from '@/Layout/Mainlayout';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from "@/components/ui/card";
import Link from 'next/link';
import { fetchAllUsers } from '@/lib/api';
import moment from 'moment';

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await fetchAllUsers();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <Mainlayout>
      <div className="py-8 w-full">
        <h1 className="text-2xl font-bold mb-6">Users</h1>
        <div className="mb-8 max-w-sm">
          <Input placeholder="Filter by user" className="w-full bg-white" />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {users.map((user: any) => (
            <Link href={`/users/${user._id}`} key={user._id}>
              <Card className="hover:shadow-sm transition-shadow cursor-pointer h-full bg-white">
                <CardContent className="p-4 flex items-start space-x-3">
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
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Mainlayout>
  );
}
