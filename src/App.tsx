/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  products, 
  StemProduct, 
  DEPARTMENTS, 
  DepartmentType 
} from './data';
import { TopBar } from './components/TopBar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { Footer } from './components/Footer';
import { SearchX } from 'lucide-react';

export default function App() {
  const [selectedDept, setSelectedDept] = useState<DepartmentType>('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<StemProduct | null>(null);

  // Tính số lượng sản phẩm cho mỗi tổ
  const deptCounts = useMemo(() => {
    const counts: Record<DepartmentType, number> = {
      'Tất cả': products.length,
      'Xã hội': 0,
      'Tiếng Anh': 0,
      'Tự nhiên': 0,
      'STEM - Công nghệ': 0,
      'PDP': 0,
      'Tiểu học': 0,
    };

    products.forEach((p) => {
      if (counts[p.to] !== undefined) {
        counts[p.to]++;
      }
    });

    return counts;
  }, []);

  // Lọc tức thì theo tổ và từ khóa tìm kiếm
  const filteredProducts = useMemo(() => {
    let list = products;

    if (selectedDept !== 'Tất cả') {
      list = list.filter((p) => p.to === selectedDept);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((p) => {
        const matchName = p.ten ? p.ten.toLowerCase().includes(q) : false;
        const matchGroup = p.nhom ? p.nhom.toLowerCase().includes(q) : false;
        const matchIdea = p.ytuong ? p.ytuong.toLowerCase().includes(q) : false;
        const matchMota = p.mota ? p.mota.toLowerCase().includes(q) : false;
        const matchSlogan = p.slogan ? p.slogan.toLowerCase().includes(q) : false;
        const matchDept = p.to ? p.to.toLowerCase().includes(q) : false;
        const matchMucs = p.mucs ? p.mucs.some((m) => m.tieude.toLowerCase().includes(q)) : false;
        return matchName || matchGroup || matchIdea || matchMota || matchSlogan || matchDept || matchMucs;
      });
    }

    return list;
  }, [selectedDept, searchQuery]);

  // Điều hướng Trước / Sau trong modal
  const currentIndex = useMemo(() => {
    if (!selectedProduct) return -1;
    return filteredProducts.findIndex((p) => p.id === selectedProduct.id);
  }, [selectedProduct, filteredProducts]);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setSelectedProduct(filteredProducts[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex >= 0 && currentIndex < filteredProducts.length - 1) {
      setSelectedProduct(filteredProducts[currentIndex + 1]);
    }
  };

  const handleExploreClick = () => {
    const el = document.getElementById('danh-sach-san-pham');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800 antialiased selection:bg-orange-500/20 selection:text-orange-900">
      
      {/* 1. Thanh trên cùng (sticky) */}
      <TopBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* 2. Hero */}
      <Hero
        totalCount={products.length}
        deptCount={DEPARTMENTS.length - 1}
        onExploreClick={handleExploreClick}
      />

      {/* 3. Lưới sản phẩm (Catalog) */}
      <main 
        id="danh-sach-san-pham" 
        className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 scroll-mt-28"
      >
        {/* Tiêu đề danh mục và điều khiển lọc */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              {selectedDept === 'Tất cả' ? 'Tất cả sản phẩm STEM' : `Tổ ${selectedDept}`}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Hiển thị <span className="font-bold text-slate-800 font-mono">{filteredProducts.length}</span> sản phẩm
              {searchQuery && ` khớp với "${searchQuery}"`}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <label htmlFor="dept-select" className="text-xs font-semibold text-slate-600 whitespace-nowrap">
                Tổ chuyên môn:
              </label>
              <select
                id="dept-select"
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value as DepartmentType)}
                className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer shadow-2xs"
              >
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept} ({deptCounts[dept] || 0})
                  </option>
                ))}
              </select>
            </div>

            {(selectedDept !== 'Tất cả' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedDept('Tất cả');
                  setSearchQuery('');
                }}
                className="text-xs font-semibold text-[#F37021] hover:underline cursor-pointer whitespace-nowrap"
              >
                Đặt lại
              </button>
            )}
          </div>
        </div>

        {/* Khi không có sản phẩm phù hợp */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 px-4 text-center bg-white rounded-2xl border border-slate-200/80 shadow-2xs max-w-md mx-auto">
            <SearchX className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">
              Chưa có sản phẩm phù hợp
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {searchQuery
                ? `Không tìm thấy sản phẩm nào khớp với "${searchQuery}".`
                : 'Hiện chưa có sản phẩm nào trong danh mục này.'}
            </p>
            <button
              onClick={() => {
                setSelectedDept('Tất cả');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-[#F37021] text-white font-bold text-xs shadow-xs hover:bg-[#d85e13] transition-colors cursor-pointer"
            >
              Xem tất cả sản phẩm
            </button>
          </div>
        ) : (
          /* Lưới sản phẩm: 1 cột (mobile) / 2 cột (tablet) / 3-4 cột (desktop) */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={setSelectedProduct}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer đơn giản */}
      <Footer />

      {/* Popup chi tiết sản phẩm */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onPrev={handlePrev}
        onNext={handleNext}
        hasPrev={currentIndex > 0}
        hasNext={currentIndex >= 0 && currentIndex < filteredProducts.length - 1}
      />

    </div>
  );
}
