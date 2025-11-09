'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, Zap } from 'lucide-react';
import Link from 'next/link';

interface Position {
  id: string;
  asset: string;
  direction: 'long' | 'short';
  entryPrice: number;
  currentPrice: number;
  size: number;
  leverage: number;
  pnl: number;
  pnlPercent: number;
}

export default function TradingPage() {
  const [selectedAsset, setSelectedAsset] = useState('ETH/USD');
  const [direction, setDirection] = useState<'long' | 'short'>('long');
  const [size, setSize] = useState('100');
  const [leverage, setLeverage] = useState(5);
  const [currentPrice, setCurrentPrice] = useState(3245.67);
  const [positions, setPositions] = useState<Position[]>([
    {
      id: '1',
      asset: 'ETH/USD',
      direction: 'long',
      entryPrice: 3200.00,
      currentPrice: 3245.67,
      size: 500,
      leverage: 10,
      pnl: 142.72,
      pnlPercent: 28.54,
    },
    {
      id: '2',
      asset: 'BTC/USD',
      direction: 'short',
      entryPrice: 68000.00,
      currentPrice: 67890.12,
      size: 300,
      leverage: 5,
      pnl: 48.45,
      pnlPercent: 16.15,
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPrice(prev => prev * (1 + (Math.random() - 0.5) * 0.002));
      setPositions(prev => prev.map(pos => {
        const newPrice = pos.currentPrice * (1 + (Math.random() - 0.5) * 0.002);
        const priceDiff = pos.direction === 'long' 
          ? newPrice - pos.entryPrice 
          : pos.entryPrice - newPrice;
        const pnl = (priceDiff / pos.entryPrice) * pos.size * pos.leverage;
        const pnlPercent = (pnl / pos.size) * 100;
        return {
          ...pos,
          currentPrice: newPrice,
          pnl,
          pnlPercent,
        };
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleTrade = () => {
    const newPosition: Position = {
      id: Date.now().toString(),
      asset: selectedAsset,
      direction,
      entryPrice: currentPrice,
      currentPrice,
      size: parseFloat(size),
      leverage,
      pnl: 0,
      pnlPercent: 0,
    };
    setPositions([...positions, newPosition]);
    setSize('100');
  };

  const closePosition = (id: string) => {
    setPositions(positions.filter(p => p.id !== id));
  };

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
              <h1 className="text-xl font-bold text-fg">Trading Terminal</h1>
              <p className="text-xs text-fg/60">Virtual Leveraged Trading</p>
            </div>
          </div>
        </div>
      </header>

      {/* Price Chart */}
      <section className="max-w-7xl mx-auto px-6 py-6">
        <div className="bg-surface rounded-lg p-6 border border-fg/10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-fg">{selectedAsset}</h2>
              <p className="text-3xl font-bold text-success mt-1">
                ${currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
            <div className="flex items-center gap-2 text-success">
              <TrendingUp className="w-5 h-5" />
              <span className="text-lg font-semibold">+2.34%</span>
            </div>
          </div>
          
          {/* Simplified Chart Visualization */}
          <div className="h-48 bg-bg/50 rounded-lg flex items-end justify-around p-4 gap-1">
            {Array.from({ length: 50 }).map((_, i) => {
              const height = 30 + Math.random() * 70;
              const isGreen = Math.random() > 0.5;
              return (
                <div
                  key={i}
                  className={`w-full rounded-t ${isGreen ? 'bg-success/60' : 'bg-danger/60'}`}
                  style={{ height: `${height}%` }}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Order Entry */}
      <section className="max-w-7xl mx-auto px-6 py-4">
        <div className="bg-surface rounded-lg p-6 border border-fg/10">
          <h3 className="text-lg font-bold text-fg mb-4">Place Order</h3>
          
          {/* Direction Toggle */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setDirection('long')}
              className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                direction === 'long'
                  ? 'bg-success text-white'
                  : 'bg-bg text-fg/60 hover:text-fg'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <TrendingUp className="w-5 h-5" />
                <span>Long</span>
              </div>
            </button>
            <button
              onClick={() => setDirection('short')}
              className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                direction === 'short'
                  ? 'bg-danger text-white'
                  : 'bg-bg text-fg/60 hover:text-fg'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <TrendingDown className="w-5 h-5" />
                <span>Short</span>
              </div>
            </button>
          </div>

          {/* Size Input */}
          <div className="mb-4">
            <label className="block text-sm text-fg/60 mb-2">Size (USD)</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-fg/40" />
              <input
                type="number"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full bg-bg border border-fg/10 rounded-lg pl-10 pr-4 py-3 text-fg focus:outline-none focus:border-accent"
                placeholder="100"
              />
            </div>
          </div>

          {/* Leverage Selector */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-fg/60">Leverage</label>
              <span className="text-lg font-bold text-accent">{leverage}x</span>
            </div>
            <div className="flex gap-2">
              {[2, 5, 10, 20, 50].map((lev) => (
                <button
                  key={lev}
                  onClick={() => setLeverage(lev)}
                  className={`flex-1 py-2 rounded-lg font-semibold transition-colors ${
                    leverage === lev
                      ? 'bg-accent text-white'
                      : 'bg-bg text-fg/60 hover:text-fg'
                  }`}
                >
                  {lev}x
                </button>
              ))}
            </div>
          </div>

          {/* Trade Button */}
          <button
            onClick={handleTrade}
            className="w-full py-4 bg-accent text-white rounded-lg font-bold hover:bg-accent/90 transition-colors flex items-center justify-center gap-2"
          >
            <Zap className="w-5 h-5" />
            <span>Open {direction === 'long' ? 'Long' : 'Short'} Position</span>
          </button>
        </div>
      </section>

      {/* Open Positions */}
      <section className="max-w-7xl mx-auto px-6 py-4">
        <h3 className="text-lg font-bold text-fg mb-4">Open Positions</h3>
        <div className="space-y-3">
          {positions.map((position) => (
            <div
              key={position.id}
              className="bg-surface rounded-lg p-4 border border-fg/10"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`px-3 py-1 rounded-md text-xs font-bold ${
                    position.direction === 'long' 
                      ? 'bg-success/20 text-success' 
                      : 'bg-danger/20 text-danger'
                  }`}>
                    {position.direction.toUpperCase()} {position.leverage}x
                  </div>
                  <span className="font-semibold text-fg">{position.asset}</span>
                </div>
                <button
                  onClick={() => closePosition(position.id)}
                  className="px-4 py-1 bg-danger/20 text-danger rounded-md text-sm font-semibold hover:bg-danger/30 transition-colors"
                >
                  Close
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-fg/60 mb-1">Entry Price</p>
                  <p className="font-semibold text-fg">${position.entryPrice.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-fg/60 mb-1">Current Price</p>
                  <p className="font-semibold text-fg">${position.currentPrice.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-fg/60 mb-1">Size</p>
                  <p className="font-semibold text-fg">${position.size}</p>
                </div>
                <div>
                  <p className="text-fg/60 mb-1">P&L</p>
                  <p className={`font-bold ${position.pnl >= 0 ? 'text-success' : 'text-danger'}`}>
                    ${position.pnl.toFixed(2)} ({position.pnlPercent.toFixed(2)}%)
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {positions.length === 0 && (
            <div className="text-center py-12 text-fg/40">
              <p>No open positions</p>
              <p className="text-sm mt-2">Place your first trade above</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
