/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { site } from '../data';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 py-8 border-t border-slate-200 bg-white text-center text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-1.5">
        <p className="font-bold text-slate-800 text-sm">
          {site.tentruong || site.donvi}
        </p>
        <p className="text-slate-500">
          Ngày hội Chuyển đổi số · {site.donvi} · Năm học {site.namhoc}
        </p>
      </div>
    </footer>
  );
};
