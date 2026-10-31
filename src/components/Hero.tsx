/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { site } from '../data';
import { getDriveImageUrl, getDriveBackupUrl } from '../utils/drive';
import { Sparkles, ArrowDown } from 'lucide-react';

/**
 * ============================================================================
 * COMPONENT HERO BANNER (GỘP CHỮ VÀ ẢNH TRONG CÙNG MỘT KHUNG)
 * ============================================================================
 * 
 * HƯỚNG DẪN TÙY CHỈNH THÔNG SỐ VỊ TRÍ & BỐ CỤC:
 * 
 * 1. TỈ LỆ CHIỀU RỘNG ẢNH TRÊN MÁY TÍNH (Desktop):
 *    - Ảnh mở rộng sang trái chiếm 65% chiều rộng khung hero (class `md:w-[65%] lg:w-[65%]`)
 *      để vùng chuyển màu sang nền cam đào rộng và mượt mà hơn.
 *    - Khối chữ chiếm ~45% khung bên trái (class `md:w-[50%] lg:w-[45%]`).
 * 
 * 2. ĐỊNH VỊ GÓC NHÌN ẢNH (OBJECT-POSITION):
 *    - Desktop: `[object-position:left_center]` giữ trọn 4 bạn học sinh và biểu tượng nổi.
 *    - Mobile: `[object-position:15%_center]` lấy cận cảnh các bạn học sinh.
 *    - TUYỆT ĐỐI KHÔNG dùng `scaleX(-1)` (lật ảnh) để tránh chữ trên áo và sách bị ngược.
 * 
 * 3. ĐỘ MỜ MÉP TRÁI ẢNH (MASK):
 *    - CSS Mask mượt mà: `linear-gradient(to right, transparent 0%, rgba(0,0,0,0.35) 14%, rgba(0,0,0,0.75) 28%, black 42%)`
 *    - Mép trái hòa mờ tự nhiên vào nền cam đào nhạt (#FFE6CC → #FFC98F → #FFA84D) mà không để lại bất kỳ vệt trắng nào.
 * 
 * 4. NỀN & CHIỀU SÂU:
 *    - Gradient nền ngang: #FFE6CC (trái) → #FFC98F (giữa) → #FFA84D (phải).
 *    - 2 đốm sáng mờ (radial blur) màu vàng nhạt (#FFF0D4) và cam đào (#FFD1A4) ở góc trên và dưới trái.
 */

interface HeroProps {
  totalCount?: number;
  deptCount?: number;
  onExploreClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  totalCount = 14,
  deptCount = 6,
  onExploreClick,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [useBackup, setUseBackup] = useState(false);

  // Link ảnh xử lý qua thumbnail sz=w2000 hoặc đường dẫn cục bộ
  let currentImageUrl = '';
  if (site.heroImage && site.heroImage.trim()) {
    if (useBackup) {
      currentImageUrl = getDriveBackupUrl(site.heroImage) || site.heroImage;
    } else {
      currentImageUrl = getDriveImageUrl(site.heroImage, 2000);
    }
  }

  const handleImageError = () => {
    if (!useBackup && site.heroImage && !site.heroImage.startsWith('/')) {
      setUseBackup(true);
    } else {
      setImageError(true);
    }
  };

  const handleScrollClick = () => {
    if (onExploreClick) {
      onExploreClick();
    } else {
      const el = document.getElementById('danh-sach-san-pham');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section 
      aria-label="Hero Banner - Ngày hội Chuyển đổi số"
      className="relative w-full overflow-hidden bg-gradient-to-r from-[#FFE6CC] via-[#FFC98F] to-[#FFA84D] border-b border-slate-200/60"
    >
      {/* 2 đốm sáng mờ (radial blur) ở góc trên trái và dưới trái tạo chiều sâu cho nền cam đào */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -top-16 -left-16 w-80 h-80 rounded-full bg-[#FFF0D4]/70 blur-3xl" 
      />
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -bottom-16 left-8 w-80 h-80 rounded-full bg-[#FFD1A4]/60 blur-3xl" 
      />

      {/* ====================================================================
          KHUNG HERO CHÍNH
          ==================================================================== */}
      <div className="relative w-full min-h-[460px] md:h-[480px] lg:h-[520px] flex flex-col md:flex-row items-stretch">
        
        {/* ==================================================================
            1. ẢNH ĐẶT SÁT PHẢI (Desktop: mở rộng 65% | Mobile: phần trên 38vh)
            ================================================================== */}
        <div 
          className="relative w-full h-[36vh] sm:h-[40vh] md:h-full md:absolute md:top-0 md:right-0 md:w-[65%] overflow-hidden select-none shrink-0"
        >
          {/* Skeleton nền cam nhạt khi đang tải ảnh */}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-gradient-to-l from-[#FFA84D] via-[#FFC98F] to-[#FFE6CC] animate-pulse flex items-center justify-center">
              <span className="text-white/90 text-xs font-semibold flex items-center gap-2 drop-shadow-xs">
                <Sparkles className="w-4 h-4 animate-spin" />
                Đang tải hình ảnh...
              </span>
            </div>
          )}

          {/* Ảnh banner chính */}
          {!imageError && Boolean(currentImageUrl) ? (
            <div className="relative w-full h-full hero-image-wrap">
              <img
                src={currentImageUrl}
                alt="Học sinh học tập và sáng tạo cùng công nghệ"
                loading="eager"
                fetchPriority="high"
                referrerPolicy="no-referrer"
                onLoad={() => setImageLoaded(true)}
                onError={handleImageError}
                className={`w-full h-full object-cover [object-position:15%_center] md:[object-position:left_center] hero-ken-burns transition-opacity duration-700 ease-out ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  // Hòa mờ mép trái ảnh vào nền cam đào
                  WebkitMaskImage: 'var(--hero-mask)',
                  maskImage: 'var(--hero-mask)',
                }}
              />

              {/* Lớp phủ gradient mép dưới ảnh trên mobile hòa vào nền cam đào */}
              <div 
                aria-hidden="true" 
                className="md:hidden absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#FFE6CC] via-[#FFE6CC]/80 to-transparent pointer-events-none z-10" 
              />
            </div>
          ) : (
            /* Khi ảnh lỗi: giữ nguyên gradient cam đào hài hòa */
            <div className="w-full h-full bg-gradient-to-l from-[#FFA84D] to-[#FFE6CC]" />
          )}

          {/* Vài đốm sáng/hạt lấp lánh rất nhẹ phía trên ảnh */}
          <div 
            aria-hidden="true" 
            className="pointer-events-none absolute inset-0 bg-radial-[circle_at_top_right] from-white/20 via-transparent to-transparent z-10" 
          />
        </div>

        {/* ==================================================================
            2. KHỐI CHỮ BÊN TRÁI (Desktop: ~45% | Mobile: kéo chồng lên ảnh 40px)
            ================================================================== */}
        <div className="relative z-20 w-full md:w-auto flex-1 flex items-center -mt-10 sm:-mt-12 md:mt-0">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="w-full md:w-[50%] lg:w-[45%] max-w-xl text-left space-y-3.5 sm:space-y-4 md:space-y-4.5 py-4 md:py-0">
              
              {/* Nhãn sự kiện: nền trắng trong suốt nổi bật trên nền cam */}
              <div className="hero-stagger-1 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/75 border border-orange-200/90 text-[#C2410C] text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-xs backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#E8590C]" />
                <span>TRIỂN LÃM SẢN PHẨM STEM · {site.donvi}</span>
              </div>

              {/* Tiêu đề chính 2 dòng: "NGÀY HỘI" và "CHUYỂN ĐỔI SỐ" sắc cam đậm có bóng sáng */}
              <h1 className="hero-stagger-2 text-[1.75rem] sm:text-4xl md:text-[2.5rem] lg:text-[2.9rem] xl:text-[3.1rem] font-black tracking-tight leading-[1.12] text-slate-900">
                <span className="block text-slate-900">NGÀY HỘI</span>
                <span 
                  className="block text-[#E8590C]" 
                  style={{ textShadow: '0 2px 14px rgba(255, 255, 255, 0.65)' }}
                >
                  CHUYỂN ĐỔI SỐ
                </span>
              </h1>

              {/* Phụ đề xanh dương tương phản rõ trên nền cam đào */}
              <p className="hero-stagger-3 text-sm sm:text-base md:text-lg font-bold text-[#0066B3] leading-snug">
                {site.phude}
              </p>

              {/* Slogan màu cam đậm (#C2410C) sắc nét, không bị chìm */}
              <p className="hero-stagger-4 text-xs sm:text-sm md:text-base font-extrabold text-[#C2410C] tracking-wide">
                “{site.slogan}”
              </p>

              {/* Nút "Xem sản phẩm" & Dòng thông tin nhỏ */}
              <div className="hero-stagger-5 pt-1.5 flex flex-wrap items-center gap-2.5 sm:gap-4">
                <button
                  type="button"
                  onClick={handleScrollClick}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#E8590C] hover:bg-[#c2410c] text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer min-h-[44px]"
                >
                  <span>Xem sản phẩm</span>
                  <ArrowDown className="w-4 h-4" />
                </button>

                {/* Ô thông tin nền trắng trong suốt nổi bật trên nền cam đào */}
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white/70 backdrop-blur-xs px-3.5 py-2.5 rounded-xl border border-white/60 shadow-2xs min-h-[44px]">
                  <span className="font-mono text-slate-900 font-bold">{totalCount}</span>
                  <span>sản phẩm</span>
                  <span className="text-slate-400">·</span>
                  <span className="font-mono text-slate-900 font-bold">{deptCount}</span>
                  <span>tổ</span>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* ====================================================================
          3. ĐƯỜNG CONG SÓNG DƯỚI CHÂN HERO
          ==================================================================== */}
      <div className="relative w-full overflow-hidden leading-none z-25 -mb-px pointer-events-none">
        <svg 
          className="relative block w-full h-6 sm:h-8 md:h-10 text-slate-50 fill-current" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path d="M0,0 C150,60 350,80 600,40 C850,0 1050,50 1200,25 L1200,120 L0,120 Z" />
        </svg>
      </div>

      {/* ====================================================================
          CSS CHO HIỆU ỨNG KEN BURNS, MASK & PREFERS-REDUCED-MOTION
          ==================================================================== */}
      <style>{`
        /* Mặt nạ làm mờ mép trái ảnh trên desktop: tan vào nền cam không để lại vệt trắng */
        :root {
          --hero-mask: linear-gradient(to right, transparent 0%, rgba(0,0,0,0.35) 14%, rgba(0,0,0,0.75) 28%, black 42%);
        }
        @media (max-width: 767px) {
          :root {
            --hero-mask: linear-gradient(to bottom, black 55%, rgba(0,0,0,0.75) 72%, rgba(0,0,0,0.35) 86%, transparent 100%);
          }
        }

        /* Hiệu ứng Ken Burns phóng to cực chậm (1 -> 1.04 trong 20s) */
        @keyframes kenBurnsSlow {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.04);
          }
        }
        .hero-ken-burns {
          animation: kenBurnsSlow 20s ease-in-out infinite alternate;
          will-change: transform;
        }

        /* Hiệu ứng trượt nhẹ từ trái vào cho chữ (stagger) */
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-16px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .hero-stagger-1 { animation: slideInLeft 0.5s ease-out 0.05s both; }
        .hero-stagger-2 { animation: slideInLeft 0.5s ease-out 0.15s both; }
        .hero-stagger-3 { animation: slideInLeft 0.5s ease-out 0.25s both; }
        .hero-stagger-4 { animation: slideInLeft 0.5s ease-out 0.35s both; }
        .hero-stagger-5 { animation: slideInLeft 0.5s ease-out 0.45s both; }

        /* Vô hiệu hóa hiệu ứng khi người dùng bật giảm chuyển động */
        @media (prefers-reduced-motion: reduce) {
          .hero-ken-burns,
          .hero-stagger-1,
          .hero-stagger-2,
          .hero-stagger-3,
          .hero-stagger-4,
          .hero-stagger-5 {
            animation: none !important;
            transform: none !important;
            opacity: 1 !important;
          }
        }
      `}</style>
    </section>
  );
};

// Export thêm alias HeroBanner để thuận tiện sử dụng
export const HeroBanner = Hero;
