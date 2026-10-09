import {
  Code2,
  
  Menu,
  Smartphone,
  Sparkles,
  X,
} from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.07]  backdrop-blur-2xl">
      <div className="mx-auto flex h-17 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 rounded-xl bg-indigo-500/30 blur-lg" />

            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-linear-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-950/40">
              <Smartphone size={20} />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 text-base font-black tracking-tight">
              WebToApp

              <span className="rounded-full border border-indigo-400/20 bg-indigo-400/10 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-indigo-300">
                Beta
              </span>
            </div>

            <div className="hidden text-[9px] uppercase tracking-[0.2em] text-slate-600 sm:block">
              Website → Android
            </div>
          </div>
        </div>

        <nav className="hidden items-center gap-7 md:flex">
          <a
            href="#features"
            className="text-xs font-medium text-slate-500 transition hover:text-slate-200"
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className="text-xs font-medium text-slate-500 transition hover:text-slate-200"
          >
            How it works
          </a>

          <div className="h-4 w-px bg-white/10" />

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Code2 size={14} />
            Build Engine
          </div>
        </nav>

        <button
          onClick={() => setMenuOpen((value) => !value)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/3 text-slate-400 md:hidden"
        >
          {menuOpen ? (
            <X size={18} />
          ) : (
            <Menu size={18} />
          )}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-white/[0.07]  px-4 py-4 md:hidden">
          <div className="space-y-1">
            <a
              href="#features"
              onClick={() => setMenuOpen(false)}
              className="block rounded-xl px-3 py-3 text-sm text-slate-800 hover:bg-white/4 hover:text-white"
            >
              Features
            </a>

            <a
              href="#how-it-works"
              onClick={() => setMenuOpen(false)}
              className="block rounded-xl px-3 py-3 text-sm text-slate-800 hover:bg-white/4 hover:text-white"
            >
              How it works
            </a>
          </div>
        </div>
      )}
    </header>
  );
}