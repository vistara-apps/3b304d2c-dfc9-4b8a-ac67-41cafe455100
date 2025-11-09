'use client';

import { ArrowLeft, Users, Lock, Globe, Plus, MessageCircle } from 'lucide-react';
import Link from 'next/link';

interface StrategyRoom {
  id: string;
  name: string;
  description: string;
  isPublic: boolean;
  memberCount: number;
  lastActivity: string;
  owner: {
    username: string;
    pfpUrl: string;
  };
}

export default function RoomsPage() {
  const rooms: StrategyRoom[] = [
    {
      id: '1',
      name: 'ETH Bulls',
      description: 'Long-term ETH strategies and market analysis',
      isPublic: true,
      memberCount: 234,
      lastActivity: '2m ago',
      owner: {
        username: 'cryptoking',
        pfpUrl: 'https://i.pravatar.cc/150?img=1',
      },
    },
    {
      id: '2',
      name: 'Day Trading Masters',
      description: 'High-frequency trading strategies and tips',
      isPublic: true,
      memberCount: 156,
      lastActivity: '15m ago',
      owner: {
        username: 'traderpro',
        pfpUrl: 'https://i.pravatar.cc/150?img=2',
      },
    },
    {
      id: '3',
      name: 'DeFi Alpha',
      description: 'Private group for advanced DeFi strategies',
      isPublic: false,
      memberCount: 45,
      lastActivity: '1h ago',
      owner: {
        username: 'defimaster',
        pfpUrl: 'https://i.pravatar.cc/150?img=4',
      },
    },
    {
      id: '4',
      name: 'Leverage Legends',
      description: 'High leverage trading discussion and analysis',
      isPublic: true,
      memberCount: 89,
      lastActivity: '3h ago',
      owner: {
        username: 'moonshot',
        pfpUrl: 'https://i.pravatar.cc/150?img=3',
      },
    },
  ];

  return (
    <main className="min-h-screen pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur-sm border-b border-fg/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-fg/60 hover:text-fg">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div>
                <h1 className="text-xl font-bold text-fg">Strategy Rooms</h1>
                <p className="text-xs text-fg/60">Collaborate & Learn</p>
              </div>
            </div>
            <button className="p-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors">
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Create Room CTA */}
      <section className="max-w-7xl mx-auto px-6 py-6">
        <div className="bg-gradient-to-br from-accent/20 to-primary/10 rounded-lg p-6 border border-accent/20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-fg mb-1">Create Your Room</h2>
              <p className="text-sm text-fg/70">Start a strategy room and invite friends to collaborate</p>
            </div>
            <button className="px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition-colors whitespace-nowrap">
              Create Room
            </button>
          </div>
        </div>
      </section>

      {/* Rooms List */}
      <section className="max-w-7xl mx-auto px-6 py-4">
        <h3 className="text-lg font-bold text-fg mb-4">Active Rooms</h3>
        <div className="space-y-3">
          {rooms.map((room) => (
            <Link
              key={room.id}
              href={`/rooms/${room.id}`}
              className="block bg-surface rounded-lg p-4 border border-fg/10 hover:border-accent/30 transition-colors"
            >
              <div className="flex items-start gap-4">
                {/* Owner Avatar */}
                <img
                  src={room.owner.pfpUrl}
                  alt={room.owner.username}
                  className="w-12 h-12 rounded-full"
                />

                {/* Room Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-fg">{room.name}</h4>
                    {room.isPublic ? (
                      <Globe className="w-4 h-4 text-success" />
                    ) : (
                      <Lock className="w-4 h-4 text-warning" />
                    )}
                  </div>
                  <p className="text-sm text-fg/70 mb-2 line-clamp-1">{room.description}</p>
                  <div className="flex items-center gap-4 text-xs text-fg/60">
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{room.memberCount} members</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" />
                      <span>{room.lastActivity}</span>
                    </div>
                  </div>
                </div>

                {/* Join Button */}
                <button className="px-4 py-2 bg-accent/20 text-accent rounded-lg text-sm font-semibold hover:bg-accent/30 transition-colors whitespace-nowrap">
                  Join
                </button>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Your Rooms */}
      <section className="max-w-7xl mx-auto px-6 py-4">
        <h3 className="text-lg font-bold text-fg mb-4">Your Rooms</h3>
        <div className="bg-surface rounded-lg p-6 border border-fg/10 text-center">
          <Users className="w-12 h-12 text-fg/40 mx-auto mb-3" />
          <p className="text-fg/60 mb-4">You haven't joined any rooms yet</p>
          <button className="px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition-colors">
            Browse Rooms
          </button>
        </div>
      </section>
    </main>
  );
}
