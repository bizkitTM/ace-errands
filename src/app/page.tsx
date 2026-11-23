'use client';

import React, { useState, useEffect } from 'react';
import { INITIAL_STOPS, ErrandStop, ErrandItem } from '@/data/initialStops';
import { 
  CheckCircle2, 
  Circle, 
  MapPin, 
  ExternalLink, 
  Navigation, 
  Plus, 
  RotateCcw, 
  AlertTriangle, 
  Store, 
  Flame, 
  Fuel, 
  ShoppingBag,
  Sparkles,
  ChevronRight
} from 'lucide-react';

const STORAGE_KEY = 'peter_errands_stops_v1';

export default function Home() {
  const [stops, setStops] = useState<ErrandStop[]>(INITIAL_STOPS);
  const [addingToStopId, setAddingToStopId] = useState<string | null>(null);
  const [newItemName, setNewItemName] = useState('');
  const [newItemQty, setNewItemQty] = useState('');
  const [activeStopIndex, setActiveStopIndex] = useState(0);

  // Load from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setStops(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Error reading from localStorage', e);
    }
  }, []);

  // Save to localStorage
  const saveStops = (newStops: ErrandStop[]) => {
    setStops(newStops);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newStops));
    } catch (e) {
      console.warn('Error saving to localStorage', e);
    }
  };

  const toggleItem = (stopId: string, itemId: string) => {
    const updated = stops.map((s) => {
      if (s.id !== stopId) return s;
      return {
        ...s,
        items: s.items.map((i) => (i.id === itemId ? { ...i, completed: !i.completed } : i)),
      };
    });
    saveStops(updated);
  };

  const handleAddItem = (stopId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    const updated = stops.map((s) => {
      if (s.id !== stopId) return s;
      const newItem: ErrandItem = {
        id: `item-${Date.now()}`,
        name: newItemName.trim(),
        qty: newItemQty.trim() || '1',
        completed: false,
      };
      return {
        ...s,
        items: [...s.items, newItem],
      };
    });

    saveStops(updated);
    setNewItemName('');
    setNewItemQty('');
    setAddingToStopId(null);
  };

  const handleResetChecklist = () => {
    if (confirm('Reset all checked items for a fresh run?')) {
      const reset = stops.map((s) => ({
        ...s,
        items: s.items.map((i) => ({ ...i, completed: false })),
      }));
      saveStops(reset);
    }
  };

  // Stats
  const allItems = stops.flatMap((s) => s.items);
  const totalCount = allItems.length;
  const completedCount = allItems.filter((i) => i.completed).length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const getStopIcon = (id: string) => {
    switch (id) {
      case 'autozone':
        return <Store className="w-6 h-6 text-orange-400" />;
      case 'homedepot':
        return <Flame className="w-6 h-6 text-amber-400" />;
      case 'gasstation':
        return <Fuel className="w-6 h-6 text-blue-400" />;
      case 'wholefoods':
        return <ShoppingBag className="w-6 h-6 text-emerald-400" />;
      default:
        return <MapPin className="w-6 h-6 text-slate-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col pb-20">
      {/* Top Fixed Header with Progress */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 py-3 sm:py-4 shadow-xl">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white">
                TODAY&apos;S ERRAND RUN
              </span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
                4 STOPS
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 font-medium">
              AutoZone ➔ Home Depot ➔ Gas Station ➔ Whole Foods
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right">
              <span className="text-lg sm:text-xl font-black text-emerald-400">
                {completedCount} / {totalCount}
              </span>
              <span className="block text-[10px] uppercase font-bold text-slate-400">
                Items Done
              </span>
            </div>

            <button
              onClick={handleResetChecklist}
              title="Reset all checks"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mt-2.5 w-full h-2 rounded-full bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </header>

      {/* Main Checklist Body */}
      <main className="max-w-4xl w-full mx-auto px-4 py-6 space-y-8 flex-1">
        {stops.map((stop, sIdx) => {
          const stopCompletedCount = stop.items.filter((i) => i.completed).length;
          const stopTotalCount = stop.items.length;
          const isStopFinished = stopTotalCount > 0 && stopCompletedCount === stopTotalCount;

          return (
            <section
              key={stop.id}
              className={`rounded-3xl border transition-all duration-200 overflow-hidden shadow-2xl ${
                isStopFinished
                  ? 'bg-slate-900/40 border-slate-800/80 opacity-75'
                  : 'bg-slate-900 border-slate-700/80 ring-1 ring-slate-800'
              }`}
            >
              {/* Large Store Header */}
              <div className="p-5 sm:p-6 bg-slate-800/60 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-slate-950 flex flex-col items-center justify-center font-black shrink-0 border border-slate-700/80 shadow-inner">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      STOP
                    </span>
                    <span className="text-2xl text-white">#{stop.stopNumber}</span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                        {stop.name}
                      </h2>
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-800 text-slate-200 border border-slate-700">
                        {stop.badge}
                      </span>
                    </div>

                    <p className="text-sm text-slate-400 mt-1 flex items-center gap-1.5 font-medium">
                      <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
                      <span>{stop.address}</span>
                    </p>
                  </div>
                </div>

                {/* Quick Map Link */}
                <a
                  href={`https://maps.apple.com/?q=${encodeURIComponent(stop.name + ' ' + stop.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="self-start sm:self-auto px-4 py-2 text-xs sm:text-sm font-bold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-2 transition-colors shrink-0"
                >
                  <Navigation className="w-4 h-4 text-emerald-400" />
                  <span>Directions</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                </a>
              </div>

              {/* Items Checklist — Large Form Factor */}
              <div className="divide-y divide-slate-800/80">
                {stop.items.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleItem(stop.id, item.id)}
                    className={`p-4 sm:p-5 flex items-start gap-4 cursor-pointer transition-all select-none ${
                      item.completed
                        ? 'bg-slate-950/40 opacity-50'
                        : 'hover:bg-slate-800/40 active:bg-slate-800/60'
                    }`}
                  >
                    {/* Big Checkbox Target */}
                    <div className="pt-0.5 shrink-0">
                      {item.completed ? (
                        <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-950 shadow-lg shadow-emerald-500/20">
                          <CheckCircle2 className="w-6 h-6 stroke-[3]" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-xl border-2 border-slate-600 flex items-center justify-center hover:border-slate-400 transition-colors">
                          <Circle className="w-5 h-5 text-transparent" />
                        </div>
                      )}
                    </div>

                    {/* Text Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-baseline gap-2">
                        <span
                          className={`text-lg sm:text-xl font-bold tracking-tight ${
                            item.completed
                              ? 'line-through text-slate-500'
                              : 'text-white'
                          }`}
                        >
                          {item.name}
                        </span>

                        <span
                          className={`text-sm sm:text-base font-black px-2.5 py-0.5 rounded-lg border ${
                            item.completed
                              ? 'bg-slate-900 text-slate-500 border-slate-800'
                              : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                          }`}
                        >
                          Qty: {item.qty}
                        </span>
                      </div>

                      {item.partOrModel && (
                        <div className="mt-1 font-mono text-xs sm:text-sm text-cyan-400 font-bold">
                          {item.partOrModel}
                        </div>
                      )}

                      {item.details && (
                        <p className="text-xs sm:text-sm text-slate-300 mt-1 font-medium leading-relaxed">
                          {item.details}
                        </p>
                      )}

                      {item.warningOrTip && (
                        <div className="mt-2 text-xs sm:text-sm font-semibold p-2.5 rounded-xl bg-amber-500/10 text-amber-200 border border-amber-500/20 flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <span>{item.warningOrTip}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Custom Item Section */}
              <div className="p-4 bg-slate-950/40 border-t border-slate-800">
                {addingToStopId === stop.id ? (
                  <form
                    onSubmit={(e) => handleAddItem(stop.id, e)}
                    className="flex flex-col sm:flex-row gap-2.5"
                  >
                    <input
                      type="text"
                      autoFocus
                      required
                      value={newItemName}
                      onChange={(e) => setNewItemName(e.target.value)}
                      placeholder="Item name (e.g., Bananas, S-hook, Towels)"
                      className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-base focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <input
                      type="text"
                      value={newItemQty}
                      onChange={(e) => setNewItemQty(e.target.value)}
                      placeholder="Qty (e.g. 2 bags)"
                      className="w-full sm:w-32 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-base focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-md"
                      >
                        Add
                      </button>
                      <button
                        type="button"
                        onClick={() => setAddingToStopId(null)}
                        className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <button
                    onClick={() => setAddingToStopId(stop.id)}
                    className="text-xs sm:text-sm font-bold text-slate-400 hover:text-emerald-400 flex items-center gap-2 transition-colors py-1"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ Add item to {stop.name}</span>
                  </button>
                )}
              </div>
            </section>
          );
        })}
      </main>

      <footer className="text-center py-6 text-xs text-slate-500">
        <p>Peter Scully&apos;s Run Checklist · Built with Ace · AutoZone ➔ Home Depot ➔ Gas ➔ Whole Foods</p>
      </footer>
    </div>
  );
}
