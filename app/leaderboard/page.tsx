'use client';

import { ArrowLeft, Trophy, TrendingUp, Medal } from 'lucide-react';
import Link from 'next/link';

interface LeaderboardEntry {
  rank: number;
  fid: number;
  username: string;
  displayName: string;
  pfpUrl: string;
  totalPnL: number;
  winRate: number;
  trades: number;
  badge?: string;
}

export default function LeaderboardPage() {
  const leaderboard: LeaderboardEntry[] = [
    {
      rank: 1,
      fid: 1234,
      username: 'cryptoking',
      displayName: 'Crypto King',
      pfpUrl: 'https://i.pravatar.cc/150?img=1',
      totalPnL: 15678.90,
      winRate: 82.5,
      trades: 145,
      badge: '🏆',
    },
    {
      rank: 2,
      fid: 5678,
      username: 'traderpro',
      displayName: 'Trader Pro',
      pfpUrl: 'https://i.pravatar.cc/150?img=2',
      totalPnL: 12345.67,
      winRate: 78.3,
      trades: 132,
      badge: '🥈',
    },
    {
      rank: 3,
      fid: 9012,
      username: 'moonshot',
      displayName: 'Moon Shot',
      pfpUrl: 'https://i.pravatar.cc/150?img=3',
      totalPnL: 9876.54,
      winRate: 75.8,
      trades: 98,
      badge: '🥉',
    },
    {
      rank: 4,
      fid: 3456,
      username: 'defimaster',
      displayName: 'DeFi Master',
      pfpUrl: 'https://i.pravatar.cc/150?img=4',
      totalPnL: 8765.43,
      winRate: 73.2,
      trades: 156,
    },
    {
      rank: 5,
      fid: 7890,
      username: 'hodlgang',
      displayName: 'HODL Gang',
      pfpUrl: 'https://i.pravatar.cc/150?img=5',
      totalPnL: 7654.32,
      winRate: 71.5,
      trades: 89,
    },
  ];

  return (
    <main className="min-h-screen pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur-sm border-b border-fg/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-fg/60 hover:text-fg">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-fg">Leaderboard</h1>
              <p className="text-xs text-fg/60">Top Traders</p>
            </div>
          </div>
        </div>
      </header>

      {/* Top 3 Podium */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-end justify-center gap-4 mb-8">
          {/* 2nd Place */}
          <div className="flex-1 text-center">
            <div className="relative inline-block mb-3">
              <img
                src={leaderboard[1].pfpUrl}
                alt={leaderboard[1].displayName}
                className="w-20 h-20 rounded-full border-4 border-fg/20"
              />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 bg-surface rounded-full flex items-center justify-center border-2 border-fg/20">
                <span className="text-lg">🥈</span>
              </div>
            </div>
            <p className="font-bold text-fg">{leaderboard[1].displayName}</p>
            <p className="text-sm text-success font-semibold">${leaderboard[1].totalPnL.toLocaleString()}</p>
            <div className="mt-2 h-24 bg-gradient-to-t from-accent/30 to-accent/10 rounded-t-lg border-t-4 border-accent/50"></div>
          </div>

          {/* 1st Place */}
          <div className="flex-1 text-center">
            <div className="relative inline-block mb-3">
              <img
                src={leaderboard[0].pfpUrl}
                alt={leaderboard[0].displayName}
                className="w-24 h-24 rounded-full border-4 border-warning"
              />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-10 h-10 bg-surface rounded-full flex items-center justify-center border-2 border-warning">
                <Trophy className="w-5 h-5 text-warning" />
              </div>
            </div>
            <p className="font-bold text-fg text-lg">{leaderboard[0].displayName}</p>
            <p className="text-success font-bold">${leaderboard[0].totalPnL.toLocaleString()}</p>
            <div className="mt-2 h-32 bg-gradient-to-t from-warning/30 to-warning/10 rounded-t-lg border-t-4 border-warning"></div>
          </div>

          {/* 3rd Place */}
          <div className="flex-1 text-center">
            <div className="relative inline-block mb-3">
              <img
                src={leaderboard[2].pfpUrl}
                alt={leaderboard[2].displayName}
                className="w-20 h-20 rounded-full border-4 border-fg/20"
              />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 bg-surface rounded-full flex items-center justify-center border-2 border-fg/20">
                <span className="text-lg">🥉</span>
              </div>
            </div>
            <p className="font-bold text-fg">{leaderboard[2].displayName}</p>
            <p className="text-sm text-success font-semibold">${leaderboard[2].totalPnL.toLocaleString()}</p>
            <div className="mt-2 h-20 bg-gradient-to-t from-accent/20 to-accent/5 rounded-t-lg border-t-4 border-accent/30"></div>
          </div>
        </div>
      </section>

      {/* Full Leaderboard */}
      <section className="max-w-7xl mx-auto px-6 py-4">
        <div className="space-y-3">
          {leaderboard.map((entry) => (
            <div
              key={entry.fid}
              className="bg-surface rounded-lg p-4 border border-fg/10 hover:border-accent/30 transition-colors"
            >
              <div className="flex items-center gap-4">
                {/* Rank */}
                <div className="w-12 text-center">
                  {entry.rank <= 3 ? (
                    <span className="text-2xl">{entry.badge}</span>
                  ) : (
                    <span className="text-xl font-bold text-fg/40">#{entry.rank}</span>
                  )}
                </div>

                {/* Avatar */}
                <img
                  src={entry.pfpUrl}
                  alt={entry.displayName}
                  className="w-12 h-12 rounded-full"
                />

                {/* Info */}
                <div className="flex-1">
                  <p className="font-bold text-fg">{entry.displayName}</p>
                  <p className="text-sm text-fg/60">@{entry.username}</p>
                </div>

                {/* Stats */}
                <div className="text-right">
                  <p className="font-bold text-success text-lg">
                    ${entry.totalPnL.toLocaleString()}
                  </p>
                  <div className="flex items-center gap-3 text-sm text-fg/60 mt-1">
                    <span>{entry.winRate}% win</span>
                    <span>•</span>
                    <span>{entry.trades} trades</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Your Position */}
        <div className="mt-6 bg-accent/10 rounded-lg p-4 border-2 border-accent/30">
          <div className="flex items-center gap-4">
            <div className="w-12 text-center">
              <span className="text-xl font-bold text-accent">#42</span>
            </div>
            <img
              src="https://i.pravatar.cc/150?img=10"
              alt="You"
              className="w-12 h-12 rounded-full border-2 border-accent"
            />
            <div className="flex-1">
              <p className="font-bold text-fg">You</p>
              <p className="text-sm text-fg/60">Keep trading to climb!</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-success text-lg">$1,234.56</p>
              <div className="flex items-center gap-2 text-sm text-success mt-1">
                <TrendingUp className="w-4 h-4" />
                <span>↑ 5 positions</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
