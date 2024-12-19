import React, { useState, useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { UserPlus, LogOut } from 'lucide-react';
import clsx from 'clsx';

export const PlayerJoin: React.FC = () => {
  const [name, setName] = useState('');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const { addPlayer, removePlayer, players, isGameStarted } = useGameStore();
  const currentPlayer = players.find(p => p.name === localStorage.getItem('currentPlayer'));

  useEffect(() => {
    const savedName = localStorage.getItem('currentPlayer');
    if (savedName && !currentPlayer) {
      addPlayer(savedName);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      localStorage.setItem('currentPlayer', name.trim());
      addPlayer(name.trim());
      setName('');
    }
  };

  const handleLogout = () => {
    if (showLogoutConfirm) {
      if (currentPlayer) {
        localStorage.removeItem('currentPlayer');
        removePlayer(currentPlayer.id);
      }
      setShowLogoutConfirm(false);
    } else {
      setShowLogoutConfirm(true);
      setTimeout(() => {
        setShowLogoutConfirm(false);
      }, 3000);
    }
  };

  if (currentPlayer) {
    return (
      <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow">
        <span className="font-medium">
          Eingeloggt als: <span className="font-bold">{currentPlayer.name}</span>
          {currentPlayer.isAdmin && (
            <span className="ml-2 text-sm bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
              Admin
            </span>
          )}
        </span>
        <button
          onClick={handleLogout}
          className={clsx(
            "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors",
            showLogoutConfirm
              ? "bg-red-600 text-white hover:bg-red-700"
              : "text-red-600 hover:text-red-700"
          )}
        >
          <LogOut size={20} />
          {showLogoutConfirm ? "Wirklich ausloggen?" : "Ausloggen"}
        </button>
      </div>
    );
  }

  if (isGameStarted) return null;

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Dein Name"
        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        <UserPlus size={20} />
        Beitreten
      </button>
    </form>
  );
};