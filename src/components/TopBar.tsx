/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { site } from '../data';
import { Search, X } from 'lucide-react';

interface TopBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  searchQuery,
  onSearchChange,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2.5 sm:py-3 gap-2.5 sm:gap-6">
          
          {/* Logo & Tên sự kiện */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
            <a 
              href="/" 
              className="flex items-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-lg"
              title={site.tentruong}
            >
              {site.logo && site.logo.trim() ? (
                <img
                  src={site.logo}
                  alt="FPT Education - FPT Schools"
                  className="h-9 sm:h-10 md:h-12 w-auto object-contain shrink-0 max-w-[130px] sm:max-w-none"
                  onError={(e) => {
                    // Dự phòng nếu /logo.png cần đường dẫn /assets/logo.png
                    const target = e.currentTarget;
                    if (!target.src.endsWith('/assets/logo.png')) {
                      target.src = '/assets/logo.png';
                    }
                  }}
                />
              ) : (
                <span className="font-bold text-xs sm:text-sm text-[#F37021]">{site.tentruong || 'STEM'}</span>
              )}
            </a>

            {/* Dấu phân cách dọc nhỏ */}
            <div className="h-6 w-px bg-slate-200 hidden sm:block shrink-0" />

            {/* Tên ngày hội bên cạnh logo */}
            <div className="min-w-0 flex-1 text-left">
              <span className="block text-[11px] xs:text-xs sm:text-xs md:text-sm font-extrabold text-[#F37021] tracking-tight leading-tight uppercase truncate sm:whitespace-normal">
                {site.tieude}
              </span>
              <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium hidden sm:block truncate">
                {site.donvi} · {site.namhoc}
              </span>
            </div>
          </div>

          {/* Ô tìm kiếm sản phẩm theo tên */}
          <div className="relative w-full sm:w-72 md:w-80 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Tìm kiếm tên sản phẩm STEM..."
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-100/90 border border-transparent focus:border-orange-500 focus:bg-white text-xs md:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-700 active:text-slate-900 rounded-lg cursor-pointer transition-colors"
                aria-label="Xóa từ khóa tìm kiếm"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};
