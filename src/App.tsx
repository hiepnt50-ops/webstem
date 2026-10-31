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
        {/* Tiêu đề danh mục và thông tin lọc */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 flex items-center gap-2">
              <span>{selectedDept === 'Tất cả' ? 'Tất cả sản phẩm STEM' : `Tổ ${selectedDept}`}</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-orange-100 text-[#C2410C]">
                {filteredProducts.length}
              </span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {searchQuery ? (
                <span>Đang lọc theo từ khóa: <strong className="text-slate-800 font-semibold">"{searchQuery}"</strong></span>
              ) : (
                <span>Khám phá các đề tài và mô hình sáng tạo STEM của thầy và trò FPT</span>
              )}
            </p>
          </div>

          {(selectedDept !== 'Tất cả' || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                setSelectedDept('Tất cả');
                setSearchQuery('');
              }}
              className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50 hover:bg-orange-100/80 text-xs font-bold text-[#E8590C] border border-orange-200 transition-colors cursor-pointer min-h-[36px]"
            >
              <span>Xóa bộ lọc</span>
            </button>
          )}
        </div>

        {/* Thanh lọc tổ chuyên môn: Cuộn ngang trên di động/tablet, trải rộng trên desktop */}
        <div className="relative mb-6 sm:mb-8">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
            {DEPARTMENTS.map((dept) => {
              const isSelected = selectedDept === dept;
              const count = deptCounts[dept] || 0;
              return (
                <button
                  key={dept}
                  type="button"
                  onClick={() => setSelectedDept(dept)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer min-h-[40px] shrink-0 ${
                    isSelected
                      ? 'bg-[#E8590C] text-white shadow-xs scale-102'
                      : 'bg-white hover:bg-slate-100/80 text-slate-700 hover:text-slate-900 border border-slate-200/90 shadow-2xs'
                  }`}
                  aria-pressed={isSelected}
                >
                  <span>{dept}</span>
                  <span
                    className={`inline-flex items-center justify-center px-1.5 py-0.5 rounded-md text-[11px] font-mono font-bold ${
                      isSelected
                        ? 'bg-white/25 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
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
