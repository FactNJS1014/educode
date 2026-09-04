'use client';

import React, { useState } from 'react';
import { User, Shield, CheckCircle, Ban, ArrowUpDown } from 'lucide-react';
import { toggleUserStatusAction, updateUserRoleAction } from '@/app/actions/auth.actions';
import type { User as UserType } from '@/lib/types';

interface AdminUserTableProps {
  initialUsers: UserType[];
  currentAdminId: string;
}

export function AdminUserTable({ initialUsers, currentAdminId }: AdminUserTableProps) {
  const [users, setUsers] = useState<UserType[]>(initialUsers);
  const [loadingUserId, setLoadingUserId] = useState<string | null>(null);

  const handleToggleStatus = async (userId: string, currentIsActive: boolean) => {
    if (userId === currentAdminId) {
      alert('Cannot suspend the active administrator account.');
      return;
    }

    setLoadingUserId(userId);
    const newStatus = !currentIsActive ? 'ACTIVE' : 'SUSPENDED';
    const res = await toggleUserStatusAction(userId, newStatus);

    if (res.success) {
      setUsers(prev =>
        prev.map(u => (u.id === userId ? { ...u, isActive: !currentIsActive } : u))
      );
    }
    setLoadingUserId(null);
  };

  const handleToggleRole = async (userId: string, currentRole: string) => {
    if (userId === currentAdminId) {
      alert('Cannot modify your own administrator role.');
      return;
    }

    setLoadingUserId(userId);
    const newRole = currentRole === 'ADMIN' ? 'USER' : 'ADMIN';
    const res = await updateUserRoleAction(userId, newRole);

    if (res.success) {
      setUsers(prev =>
        prev.map(u => (u.id === userId ? { ...u, role: newRole } : u))
      );
    }
    setLoadingUserId(null);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 overflow-hidden shadow-xl">
      <div className="p-5 border-b border-slate-800 flex justify-between items-center">
        <div>
          <h3 className="font-bold text-slate-100 text-base">User Management Directory</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage student roles, accounts, and system access status.
          </p>
        </div>
        <span className="font-mono text-xs text-slate-400">{users.length} Registered Accounts</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300 divide-y divide-slate-800">
          <thead className="bg-slate-950/80 text-[11px] uppercase font-mono text-slate-400">
            <tr>
              <th className="p-4">User</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status</th>
              <th className="p-4">Streak</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {users.map(u => (
              <tr key={u.id} className="hover:bg-slate-800/40 transition-colors">
                <td className="p-4">
                  <div className="font-bold text-slate-100">{u.name}</div>
                  <div className="font-mono text-slate-500 text-[10px]">@{u.username}</div>
                </td>
                <td className="p-4 font-mono text-slate-300">{u.email}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                      u.role === 'ADMIN'
                        ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {u.role}
                  </span>
                </td>
                <td className="p-4">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                      u.isActive
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                    }`}
                  >
                    {u.isActive ? 'ACTIVE' : 'SUSPENDED'}
                  </span>
                </td>
                <td className="p-4 font-mono text-slate-300">🔥 {u.streakCount}d</td>
                <td className="p-4 text-right space-x-2">
                  <button
                    onClick={() => handleToggleRole(u.id, u.role)}
                    disabled={loadingUserId === u.id || u.id === currentAdminId}
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium transition-colors cursor-pointer disabled:opacity-40"
                    title="Switch between USER and ADMIN"
                  >
                    Switch Role
                  </button>
                  <button
                    onClick={() => handleToggleStatus(u.id, u.isActive)}
                    disabled={loadingUserId === u.id || u.id === currentAdminId}
                    className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer disabled:opacity-40 ${
                      u.isActive
                        ? 'bg-rose-950/40 text-rose-400 hover:bg-rose-950/60 border border-rose-500/30'
                        : 'bg-emerald-950/40 text-emerald-400 hover:bg-emerald-950/60 border border-emerald-500/30'
                    }`}
                  >
                    {u.isActive ? 'Suspend' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
