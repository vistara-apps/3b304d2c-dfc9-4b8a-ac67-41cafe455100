'use client';

import { useEffect, useState } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';
import { TrendingUp, Users, Trophy, BarChart3, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import Link from 'next/link';

interface MarketData {
  asset: string;
  price: number;
  change: number;
  volume: string;
}

export default function Home() {
  const [isReady, setIsReady] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [marketData, setMarketData] = useState<MarketData[]>([
    { asset: 'ETH/USD', price: 3245.67, change: 2.34, volume: '$1.2B' },
    { asset: 'BTC/USD', price: 67890.12, change: -1.23, volume: '$2.8B' },
    { asset: 'SOL/USD', price: 145.89, change: 5.67, volume: '$890M' },
    { asset: 'MATIC/USD', price: 0.89, change: 3.21, volume: '$340M' },
  ]);

  useEffect(() => {
    const initApp = async () => {
      try {
        const context = await sdk.context;
        setUser(context.user);
        sdk.actions.ready();
        setIsReady(true);
      } catch (error) {
        console.error('Failed to initialize app:', error);
        sdk.actions.ready();
        setIsReady(true);
      }
    };

    initApp();

    // Simulate real-time price updates
    const interval = setInterval(() => {
      setMarketData(prev => prev.map(item => ({
        ...item,
        price: item.price * (1 + (Math.random() - 0.5) * 0.002),
        change: item.change + (Math.random() - 0.5) * 0.5,
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-fg/70">Loading SimuTrade...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur-sm border-b border-fg/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-fg">SimuTrade Base</h1>
                <p className="text-xs text-fg/60">Virtual Trading</p>
              </div>
            </div>
            {user && (
              <div className="flex items-center gap-2">
                {user.pfpUrl && (
                  <img 
                    src={user.pfpUrl} 
                    alt={user.displayName || user.username}
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <span className="text-sm text-fg/80">{user.displayName || user.username}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-gradient-to-br from-accent/20 to-primary/10 rounded-lg p-6 border border-accent/20">
          <h2 className="text-2xl font-bold text-fg mb-2">Welcome to SimuTrade</h2>
          <p className="text-fg/70 mb-4">Practice leveraged trading with zero risk. Compete with friends and master your skills.</p>
          <div className="flex gap-3">
            <Link 
              href="/trading"
              className="px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition-colors"
            >
              Start Trading
            </Link>
            <Link 
              href="/leaderboard"
              className="px-6 py-3 bg-surface text-fg rounded-lg font-semibold hover:bg-surface/80 transition-colors border border-fg/10"
            >
              View Leaderboard
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="max-w-7xl mx-auto px-6 py-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-surface rounded-lg p-4 border border-fg/10">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-md bg-success/20 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-success" />
              </div>
              <span className="text-xs text-fg/60">Virtual Balance</span>
            </div>
            <p className="text-2xl font-bold text-fg">$10,000</p>
            <p className="text-xs text-success">+$234.56 today</p>
          </div>

          <div className="bg-surface rounded-lg p-4 border border-fg/10">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-md bg-accent/20 flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-accent" />
              </div>
              <span className="text-xs text-fg/60">Open Positions</span>
            </div>
            <p className="text-2xl font-bold text-fg">3</p>
            <p className="text-xs text-fg/60">2 long, 1 short</p>
          </div>

          <div className="bg-surface rounded-lg p-4 border border-fg/10">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-md bg-warning/20 flex items-center justify-center">
                <Trophy className="w-4 h-4 text-warning" />
              </div>
              <span className="text-xs text-fg/60">Rank</span>
            </div>
            <p className="text-2xl font-bold text-fg">#42</p>
            <p className="text-xs text-success">↑ 5 positions</p>
          </div>

          <div className="bg-surface rounded-lg p-4 border border-fg/10">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-md bg-primary/20 flex items-center justify-center">
                <Users className="w-4 h-4 text-primary" />
              </div>
              <span className="text-xs text-fg/60">Win Rate</span>
            </div>
            <p className="text-2xl font-bold text-fg">68%</p>
            <p className="text-xs text-fg/60">34/50 trades</p>
          </div>
        </div>
      </section>

      {/* Market Overview */}
      <section className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-fg">Market Overview</h3>
          <Link href="/trading" className="text-sm text-accent hover:underline">
            View All →
          </Link>
        </div>
        <div className="space-y-3">
          {marketData.map((item) => (
            <div 
              key={item.asset}
              className="bg-surface rounded-lg p-4 border border-fg/10 hover:border-accent/30 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="text-sm font-bold text-accent">
                      {item.asset.split('/')[0].slice(0, 2)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-fg">{item.asset}</p>
                    <p className="text-xs text-fg/60">{item.volume} volume</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-fg">${item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                  <div className={`flex items-center gap-1 text-sm ${item.change >= 0 ? 'text-success' : 'text-danger'}`}>
                    {item.change >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                    <span>{Math.abs(item.change).toFixed(2)}%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-fg/10 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-around">
            <Link href="/" className="flex flex-col items-center gap-1 text-accent">
              <TrendingUp className="w-6 h-6" />
              <span className="text-xs font-medium">Home</span>
            </Link>
            <Link href="/trading" className="flex flex-col items-center gap-1 text-fg/60 hover:text-fg">
              <BarChart3 className="w-6 h-6" />
              <span className="text-xs font-medium">Trade</span>
            </Link>
            <Link href="/leaderboard" className="flex flex-col items-center gap-1 text-fg/60 hover:text-fg">
              <Trophy className="w-6 h-6" />
              <span className="text-xs font-medium">Leaderboard</span>
            </Link>
            <Link href="/rooms" className="flex flex-col items-center gap-1 text-fg/60 hover:text-fg">
              <Users className="w-6 h-6" />
              <span className="text-xs font-medium">Rooms</span>
            </Link>
          </div>
        </div>
      </nav>
    </main>
  );
}
