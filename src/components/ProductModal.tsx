/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ============================================================================
// HƯỚNG DẪN CẤU HÌNH TRANG BÀI BÁO (DÀNH CHO QUẢN TRỊ VIÊN)
// ============================================================================
// 1. TỈ LỆ ẢNH ĐẦU BÀI: 16:9 trên máy tính, 4:3 trên điện thoại.
//    (Thay đổi tại hằng số HERO_IMAGE_ASPECT bên dưới).
// 2. TỐC ĐỘ TỰ CHẠY SLIDE: Mặc định 5000ms (5 giây).
//    (Thay đổi tại hằng số SLIDE_AUTOPLAY_INTERVAL bên dưới).
// 3. ĐỘ RỘNG CỘT ĐỌC: Mặc định max-w-[760px] căn giữa để đọc chuẩn bài báo.
//    (Thay đổi tại hằng số ARTICLE_MAX_WIDTH bên dưới).
// ============================================================================

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { 
  StemProduct, 
  products, 
  MucItem, 
  KhoiNoiDung, 
  KhoiDsItem, 
  KhoiBang, 
  KhoiSongNgu, 
  KhoiQA 
} from '../data';
import { getDriveImageUrl, getDriveBackupUrl } from '../utils/drive';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  Users,
  Lightbulb,
  Layers,
  Wrench,
  GraduationCap,
  Sparkles,
  Rocket,
  HeartHandshake,
  BookOpen,
  FileText,
  ExternalLink,
  ArrowUp,
  LayoutGrid,
  Info
} from 'lucide-react';

// ============================================================================
// CẤU HÌNH DỄ DÀNG
// ============================================================================
const SLIDE_AUTOPLAY_INTERVAL = 5000; // Tốc độ tự chuyển ảnh: 5 giây (5000ms)
const ARTICLE_MAX_WIDTH = 'max-w-[760px]'; // Độ rộng cột bài đọc căn giữa

interface ProductModalProps {
  product: StemProduct | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

// ============================================================================
// COMPONENT 1: HIỆU ỨNG HIỆN DẦN KHI CUỘN TỚI (INTERSECTION OBSERVER)
// ============================================================================
interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
}

const RevealOnScroll: React.FC<RevealOnScrollProps> = ({ children, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Tôn trọng thiết lập giảm chuyển động của người dùng
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } ${className}`}
    >
      {children}
    </div>
  );
};

// ============================================================================
// COMPONENT 2: MỤC NỘI DUNG BÀI BÁO (CONTENT SECTION)
// ============================================================================
interface ContentSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const ContentSection: React.FC<ContentSectionProps> = ({ title, icon, children }) => {
  return (
    <RevealOnScroll className="pt-2">
      <section className="space-y-3">
        {/* Tiêu đề H2 kèm icon và đường gạch mảnh phân cách */}
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2.5 pb-2 border-b border-slate-200/90">
          <span className="p-1.5 rounded-lg bg-orange-50 text-[#F37021] shrink-0">
            {icon}
          </span>
          <span>{title}</span>
        </h2>

        {/* Nội dung đoạn văn */}
        <div className="text-slate-700 text-[16px] sm:text-[17px] md:text-[18px] leading-[1.7] whitespace-pre-line font-normal">
          {children}
        </div>
      </section>
    </RevealOnScroll>
  );
};

// ============================================================================
// COMPONENT 2.1: HIỂN THỊ DANH SÁCH (HỖ TRỢ LỒNG CẤP)
// ============================================================================
interface RenderDsProps {
  kieu: 'cham' | 'so' | string;
  items: KhoiDsItem[];
  level?: number;
}

const RenderDs: React.FC<RenderDsProps> = ({ kieu, items, level = 0 }) => {
  const isNumbered = kieu === 'so';
  const ListTag = isNumbered ? 'ol' : 'ul';
  const listClass = isNumbered
    ? 'list-decimal pl-5 space-y-2'
    : 'list-disc pl-5 space-y-2';

  return (
    <ListTag className={`${listClass} text-slate-700 text-[16px] sm:text-[17px] md:text-[18px] leading-[1.7] ${level > 0 ? 'mt-2 pl-6' : ''}`}>
      {items.map((it, idx) => (
        <li key={idx} className="marker:text-[#F37021] pl-1">
          {it.nhan && <strong className="text-slate-900 font-bold">{it.nhan}: </strong>}
          <span className="whitespace-pre-line">{it.noidung}</span>
          {it.con && it.con.length > 0 && (
            <RenderDs kieu={kieu} items={it.con} level={level + 1} />
          )}
        </li>
      ))}
    </ListTag>
  );
};

// ============================================================================
// COMPONENT 2.2: BẢNG DỮ LIỆU VÀ THÔNG SỐ KỸ THUẬT
// ============================================================================
interface RenderBangProps {
  cot: string[];
  hang: string[][];
  isSpecsTable?: boolean;
}

const RenderBang: React.FC<RenderBangProps> = ({ cot, hang, isSpecsTable }) => {
  return (
    <div className={`overflow-x-auto rounded-2xl border ${isSpecsTable ? 'border-orange-200 shadow-xs bg-gradient-to-b from-orange-50/20 to-white' : 'border-slate-200 shadow-2xs bg-white'} my-4`}>
      <table className="w-full text-left border-collapse text-[15px] sm:text-[16px] leading-relaxed">
        {cot && cot.length > 0 && (
          <thead>
            <tr className={isSpecsTable ? 'bg-orange-100/70 border-b border-orange-200 text-slate-900' : 'bg-slate-100 border-b border-slate-200 text-slate-900'}>
              {cot.map((col, idx) => (
                <th
                  key={idx}
                  scope="col"
                  className={`py-3 px-4 font-bold ${idx === 0 ? 'min-w-[140px] sm:min-w-[180px]' : ''}`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {hang.map((row, rIdx) => (
            <tr
              key={rIdx}
              className={`border-b border-slate-100 last:border-b-0 ${rIdx % 2 === 1 ? 'bg-slate-50/70' : 'bg-white'} hover:bg-orange-50/30 transition-colors`}
            >
              {row.map((cell, cIdx) => (
                <td
                  key={cIdx}
                  className={`py-3 px-4 align-top whitespace-pre-line ${cIdx === 0 ? 'font-bold text-slate-900' : 'text-slate-700'}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// ============================================================================
// COMPONENT 2.3: ĐOẠN VĂN SONG NGỮ (VIỆT - ANH)
// ============================================================================
interface RenderSongNguProps {
  nhan?: string;
  vi: string;
  en: string;
}

const RenderSongNgu: React.FC<RenderSongNguProps> = ({ nhan, vi, en }) => {
  const viParas = vi.split('\n').filter((p) => p.trim() !== '');
  const enParas = en.split('\n').filter((p) => p.trim() !== '');

  return (
    <div className="my-5 space-y-3">
      {nhan && (
        <h4 className="text-base sm:text-lg font-bold text-slate-900">
          {nhan}
        </h4>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Cột Tiếng Việt */}
        <div className="p-4 sm:p-5 rounded-2xl bg-sky-50/60 border border-sky-100 flex flex-col space-y-2.5">
          <div className="flex items-center gap-1.5 self-start">
            <span className="px-2.5 py-1 rounded-md bg-[#0066B3] text-white text-xs font-bold tracking-wider uppercase shadow-2xs">
              Tiếng Việt
            </span>
          </div>
          <div className="text-slate-700 text-[15px] sm:text-[16px] md:text-[17px] leading-[1.7] space-y-2">
            {viParas.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
        </div>

        {/* Cột English */}
        <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/60 border border-indigo-100 flex flex-col space-y-2.5">
          <div className="flex items-center gap-1.5 self-start">
            <span className="px-2.5 py-1 rounded-md bg-indigo-600 text-white text-xs font-bold tracking-wider uppercase shadow-2xs">
              English
            </span>
          </div>
          <div className="text-slate-700 text-[15px] sm:text-[16px] md:text-[17px] leading-[1.7] space-y-2">
            {enParas.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// COMPONENT 2.4: THẺ HỎI ĐÁP (Q&A CARD)
// ============================================================================
interface RenderQAProps {
  hoi: string;
  traloi: string;
}

const RenderQA: React.FC<RenderQAProps> = ({ hoi, traloi }) => {
  return (
    <div className="my-4 p-4 sm:p-5 rounded-2xl bg-orange-50/60 border border-orange-200/80 shadow-2xs space-y-2.5">
      <div className="text-slate-900 font-bold text-[16px] sm:text-[17px] leading-snug flex items-start gap-2">
        <span className="inline-block px-2 py-0.5 rounded-md bg-[#F37021] text-white text-xs font-bold uppercase shrink-0 mt-0.5">
          Hỏi
        </span>
        <span>{hoi}</span>
      </div>
      <div className="pl-0 sm:pl-9 text-slate-700 text-[15px] sm:text-[16px] md:text-[17px] leading-[1.7] whitespace-pre-line">
        <strong className="text-[#c2510b] font-bold">Trả lời: </strong>
        <span>{traloi}</span>
      </div>
    </div>
  );
};

// ============================================================================
// COMPONENT 2.5: ĐIỀU PHỐI KHỐI NỘI DUNG (KHOI RENDERER)
// ============================================================================
interface RenderKhoiProps {
  khoi: KhoiNoiDung;
  isSpecsSection?: boolean;
}

const RenderKhoi: React.FC<RenderKhoiProps> = ({ khoi, isSpecsSection }) => {
  switch (khoi.loai) {
    case 'doan':
      return (
        <p className="text-slate-700 text-[16px] sm:text-[17px] md:text-[18px] leading-[1.7] whitespace-pre-line my-3">
          {khoi.nhan && (
            <strong className="text-slate-900 font-bold">{khoi.nhan}: </strong>
          )}
          <span>{khoi.noidung}</span>
        </p>
      );
    case 'ds':
      return (
        <div className="my-3">
          <RenderDs kieu={khoi.kieu} items={khoi.muc} />
        </div>
      );
    case 'bang':
      return <RenderBang cot={khoi.cot} hang={khoi.hang} isSpecsTable={isSpecsSection} />;
    case 'songngu':
      return <RenderSongNgu nhan={khoi.nhan} vi={khoi.vi} en={khoi.en} />;
    case 'qa':
      return <RenderQA hoi={khoi.hoi} traloi={khoi.traloi} />;
    default:
      return null;
  }
};

// ============================================================================
// COMPONENT 2.6: MỤC BÀI VIẾT TỔNG THỂ (MUC RENDERER)
// ============================================================================
interface RenderMucProps {
  muc: MucItem;
  index: number;
}

const RenderMuc: React.FC<RenderMucProps> = ({ muc }) => {
  const lowerTitle = muc.tieude.toLowerCase();
  const isSpecs = lowerTitle.includes('thông số kỹ thuật') || lowerTitle.includes('thông số kĩ thuật');
  
  return (
    <RevealOnScroll className="pt-2">
      <section className="space-y-3">
        {/* Tiêu đề mục: cap === 1 -> H2; cap === 2 -> H3; cap === 0 hoặc rỗng -> không hiện tiêu đề */}
        {muc.cap === 1 && muc.tieude && (
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 pb-2 border-b border-slate-200/90 flex items-center gap-2.5">
            <span className="w-2.5 h-6 rounded-full bg-[#F37021] shrink-0" />
            <span>{muc.tieude}</span>
          </h2>
        )}
        {muc.cap === 2 && muc.tieude && (
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-800 pt-2 pb-1 text-balance">
            {muc.tieude}
          </h3>
        )}

        {/* Khối nội dung trong mục (nếu khoi rỗng, tiêu đề vẫn được hiển thị nguyên vẹn) */}
        {muc.khoi && muc.khoi.length > 0 && (
          <div className="space-y-3">
            {muc.khoi.map((khoi, kIdx) => (
              <RenderKhoi key={kIdx} khoi={khoi} isSpecsSection={isSpecs} />
            ))}
          </div>
        )}
      </section>
    </RevealOnScroll>
  );
};

// ============================================================================
// COMPONENT 3: LIGHTBOX PHÓNG TO TOÀN MÀN HÌNH
// ============================================================================
interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: { anh: string; caption?: string }[];
  currentIndex: number;
  onPrev: () => void;
  onNext: () => void;
  productTitle: string;
}

const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  onPrev,
  onNext,
  productTitle,
}) => {
  const currentItem = images[currentIndex];
  const currentUrl = currentItem?.anh ? getDriveImageUrl(currentItem.anh, 2000) : '';

  if (!isOpen || images.length === 0 || !currentUrl) return null;

  const hasMultiple = images.length > 1;

  return (
    <div
      className="fixed inset-0 z-[70] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-6 select-none animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Nút đóng */}
      <button
        onClick={onClose}
        aria-label="Đóng phóng to"
        className="absolute top-4 right-4 p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors z-20 cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Chỉ số ảnh trong lightbox */}
      {hasMultiple && (
        <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-white/20 text-white text-xs sm:text-sm font-mono font-bold z-20">
          {currentIndex + 1} / {images.length}
        </div>
      )}

      {/* Mũi tên trước / sau trong lightbox */}
      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            aria-label="Ảnh trước"
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-white/20 hover:bg-white/35 text-white transition-all z-20 cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <ChevronLeft className="w-7 h-7 sm:w-8 sm:h-8" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            aria-label="Ảnh sau"
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-white/20 hover:bg-white/35 text-white transition-all z-20 cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <ChevronRight className="w-7 h-7 sm:w-8 sm:h-8" />
          </button>
        </>
      )}

      {/* Ảnh phóng to */}
      <div
        className="relative max-w-full max-h-[85vh] flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {currentUrl ? (
          <img
            src={currentUrl}
            alt={currentItem?.caption || productTitle}
            className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
          />
        ) : null}
        {currentItem?.caption && (
          <p className="mt-3 text-white/90 text-xs sm:text-sm text-center max-w-xl px-4 italic">
            {currentItem.caption}
          </p>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// COMPONENT 4: BANNER SLIDE ẢNH ĐẦU BÀI (IMAGE SLIDER)
// ============================================================================
interface ImageSliderProps {
  images: { anh: string; caption?: string }[];
  productTitle: string;
  deptName: string;
  onOpenLightbox: () => void;
  currentIndex: number;
  onSelectIndex: (idx: number) => void;
  onPrev: () => void;
  onNext: () => void;
}

const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  productTitle,
  deptName,
  onOpenLightbox,
  currentIndex,
  onSelectIndex,
  onPrev,
  onNext,
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [useBackup, setUseBackup] = useState(false);

  const total = images.length;
  const hasMultiple = total > 1;
  const currentItem = images[currentIndex];

  // Tự động chuyển ảnh sau mỗi 5 giây (dừng khi rê chuột hoặc chạm)
  useEffect(() => {
    if (!hasMultiple || isPaused) return;

    const timer = setInterval(() => {
      onNext();
    }, SLIDE_AUTOPLAY_INTERVAL);

    return () => clearInterval(timer);
  }, [hasMultiple, isPaused, onNext]);

  // Tải trước (preload) ảnh kế tiếp
  useEffect(() => {
    if (hasMultiple) {
      const nextIdx = (currentIndex + 1) % total;
      const nextUrl = getDriveImageUrl(images[nextIdx].anh, 1600);
      if (nextUrl && !nextUrl.startsWith('/')) {
        const img = new Image();
        img.src = nextUrl;
      }
    }
  }, [currentIndex, hasMultiple, images, total]);

  // Xử lý vuốt chạm trên điện thoại
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 45 && hasMultiple) {
      onNext();
    } else if (diff < -45 && hasMultiple) {
      onPrev();
    }
    setTouchStartX(null);
    setIsPaused(false);
  };

  // URL ảnh hiện tại (ưu tiên thumbnail sz=w1600, dự phòng lh3)
  const currentUrl = currentItem?.anh && currentItem.anh.trim()
    ? (useBackup
        ? getDriveBackupUrl(currentItem.anh)
        : getDriveImageUrl(currentItem.anh, 1600))
    : '';

  // Nếu không có ảnh nào hoặc URL rỗng: hiển thị banner gradient theo màu tổ
  if (total === 0 || !currentItem?.anh || !currentUrl) {
    return (
      <div className="w-full aspect-[4/3] md:aspect-[16/9] bg-gradient-to-br from-slate-100 via-sky-50 to-orange-50 flex flex-col items-center justify-center p-6 text-center border-b border-slate-200">
        <div className="w-16 h-16 rounded-2xl bg-orange-100 text-[#F37021] flex items-center justify-center mb-3 shadow-xs">
          <Sparkles className="w-8 h-8" />
        </div>
        <h3 className="text-base sm:text-lg font-bold text-slate-700">
          Sản phẩm đang được chuẩn bị hình ảnh
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Tổ {deptName} · {productTitle}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full select-none bg-slate-900">
      {/* Khung ảnh: 16:9 trên Desktop, 4:3 trên Mobile */}
      <div
        className="relative w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden bg-slate-950 flex items-center justify-center group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Nền mờ cùng ảnh phía sau (ambient blur) để không bị viền đen khô cứng */}
        {currentUrl ? (
          <img
            src={currentUrl}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-35 pointer-events-none transition-all duration-700"
          />
        ) : null}

        {/* Ảnh chính: object-contain để giữ nguyên 100% chi tiết không bị cắt xén */}
        {currentUrl ? (
          <img
            src={currentUrl}
            alt={currentItem.caption || productTitle}
            onError={() => {
              if (!useBackup && currentItem.anh && !currentItem.anh.startsWith('/')) {
                setUseBackup(true);
              }
            }}
            className="relative z-10 w-full h-full object-contain cursor-zoom-in transition-opacity duration-300"
            onClick={onOpenLightbox}
            title="Nhấp để phóng to toàn màn hình"
          />
        ) : null}

        {/* Lớp gradient tối nhẹ ở mép dưới để chấm tròn và chỉ số đọc rõ nét */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none z-10" />

        {/* Nút Phóng to ở góc trên hoặc dưới */}
        <button
          type="button"
          onClick={onOpenLightbox}
          aria-label="Phóng to ảnh"
          className="absolute top-3 right-3 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/60 hover:bg-black/80 backdrop-blur-md text-white text-xs font-semibold shadow-md transition-all cursor-pointer min-h-[44px]"
        >
          <Maximize2 className="w-4 h-4" />
          <span className="hidden sm:inline">Phóng to</span>
        </button>

        {/* Chỉ số ảnh "2/3" ở góc trên trái */}
        {hasMultiple && (
          <div className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-xs font-mono font-bold shadow-xs">
            {currentIndex + 1} / {total}
          </div>
        )}

        {/* Nút mũi tên lớn hai bên (tối thiểu 44px vùng chạm) */}
        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              aria-label="Ảnh trước"
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/45 hover:bg-black/75 backdrop-blur-xs text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-lg cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              aria-label="Ảnh sau"
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/45 hover:bg-black/75 backdrop-blur-xs text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-lg cursor-pointer"
            >
              <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>

            {/* Chấm tròn chỉ vị trí slide ở dưới ảnh */}
            <div className="absolute bottom-3 inset-x-0 z-20 flex items-center justify-center gap-1.5">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onSelectIndex(idx)}
                  aria-label={`Chuyển đến ảnh ${idx + 1}`}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    idx === currentIndex
                      ? 'w-6 bg-[#F37021]'
                      : 'w-2 bg-white/60 hover:bg-white'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Dòng chú thích (caption) nhỏ dưới ảnh */}
      {currentItem.caption && (
        <div className="py-2.5 px-4 bg-slate-900 text-slate-300 text-xs sm:text-sm italic text-center border-b border-slate-800">
          {currentItem.caption}
        </div>
      )}
    </div>
  );
};

// ============================================================================
// COMPONENT CHÍNH: ARTICLE MODAL (PRODUCT MODAL)
// ============================================================================
export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}) => {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const articleScrollRef = useRef<HTMLDivElement>(null);

  // Tạo danh sách ảnh chuẩn hóa từ thuvien hoặc anh bìa
  const gallery = React.useMemo(() => {
    if (!product) return [];
    if (product.thuvien && product.thuvien.length > 0) {
      const valid = product.thuvien.filter((item) => Boolean(item.anh && item.anh.trim()));
      if (valid.length > 0) return valid;
    }
    if (product.anh && product.anh.trim()) {
      return [{ anh: product.anh.trim(), caption: product.ten }];
    }
    return [];
  }, [product]);

  // Luôn bắt đầu từ đầu bài khi mở hoặc đổi sản phẩm
  useEffect(() => {
    setActiveImageIdx(0);
    setLightboxOpen(false);
    setReadingProgress(0);
    setShowBackToTop(false);

    if (articleScrollRef.current) {
      articleScrollRef.current.scrollTop = 0;
    }
  }, [product?.id]);

  // Khóa cuộn trang nền và lắng nghe phím ESC / phím mũi tên
  useEffect(() => {
    if (!product) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxOpen) {
          setLightboxOpen(false);
        } else {
          onClose();
        }
      } else if (e.key === 'ArrowLeft') {
        if (gallery.length > 1) {
          setActiveImageIdx((prev) => (prev > 0 ? prev - 1 : gallery.length - 1));
        } else if (hasPrev && !lightboxOpen) {
          onPrev();
        }
      } else if (e.key === 'ArrowRight') {
        if (gallery.length > 1) {
          setActiveImageIdx((prev) => (prev < gallery.length - 1 ? prev + 1 : 0));
        } else if (hasNext && !lightboxOpen) {
          onNext();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [product, lightboxOpen, gallery.length, hasPrev, hasNext, onClose, onPrev, onNext]);

  // Theo dõi tiến trình cuộn bài báo (reading progress bar)
  const handleScroll = () => {
    const el = articleScrollRef.current;
    if (!el) return;
    const total = el.scrollHeight - el.clientHeight;
    if (total > 0) {
      const progress = Math.min(100, Math.max(0, (el.scrollTop / total) * 100));
      setReadingProgress(progress);
    }
    setShowBackToTop(el.scrollTop > 350);
  };

  const handleScrollToTop = () => {
    articleScrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!product) return null;

  const currentProductIndex = products.findIndex((p) => p.id === product.id);
  const prevProduct = hasPrev && currentProductIndex > 0 ? products[currentProductIndex - 1] : null;
  const nextProduct = hasNext && currentProductIndex >= 0 && currentProductIndex < products.length - 1 ? products[currentProductIndex + 1] : null;

  const prevImgUrl = prevProduct?.anh && prevProduct.anh.trim() ? getDriveImageUrl(prevProduct.anh, 300) : '';
  const nextImgUrl = nextProduct?.anh && nextProduct.anh.trim() ? getDriveImageUrl(nextProduct.anh, 300) : '';

  // Xử lý khẩu hiệu (Slogan): ưu tiên trường slogan, nếu không có thì dùng thongdiep
  const displaySlogan = product.slogan?.trim() || product.thongdiep?.trim();

  // Kiểm tra xem sản phẩm có cấu trúc mục bài viết chi tiết từ data-bo-sung không
  const hasMucs = Boolean(product.mucs && product.mucs.length > 0);

  // Kiểm tra xem sản phẩm có nội dung thuyết minh nào không
  const hasMota = Boolean(product.mota && product.mota.trim());
  const hasYtuong = Boolean(product.ytuong && product.ytuong.trim());
  const hasCautao = Boolean(product.cautao && product.cautao.trim());
  const hasVatlieu = Boolean(product.vatlieu && product.vatlieu.trim());
  const hasKienthuc = Boolean(product.kienthuc && product.kienthuc.length > 0);
  const hasSangtao = Boolean(product.sangtao && product.sangtao.trim());
  const hasPhattrien = Boolean(product.phattrien && product.phattrien.trim());
  const hasYnghia = Boolean(product.ynghia && product.ynghia.trim());
  const hasCongdung = Boolean(product.congdung && product.congdung.trim());

  const hasLegacyDetails =
    hasMota ||
    hasYtuong ||
    hasCautao ||
    hasVatlieu ||
    hasKienthuc ||
    hasSangtao ||
    hasPhattrien ||
    hasYnghia ||
    hasCongdung;

  const hasAnyDetails =
    hasMucs ||
    hasLegacyDetails ||
    Boolean(displaySlogan) ||
    Boolean(product.tailieu?.trim());

  // Màu sắc nhãn tổ
  const getDeptColorClass = () => {
    switch (product.to) {
      case 'STEM - Công nghệ':
        return 'bg-[#F37021] text-white';
      case 'Tiếng Anh':
        return 'bg-[#0066B3] text-white';
      case 'Tự nhiên':
        return 'bg-[#00A651] text-white';
      case 'Xã hội':
        return 'bg-rose-600 text-white';
      case 'PDP':
        return 'bg-purple-600 text-white';
      case 'Tiểu học':
        return 'bg-amber-600 text-white';
      default:
        return 'bg-slate-800 text-white';
    }
  };

  // Phối màu thẻ môn học STEM
  const getSubjectBadge = (mon: string) => {
    const lower = mon.toLowerCase();
    if (lower.includes('khoa học')) {
      return { badge: 'bg-blue-600 text-white', card: 'bg-blue-50/70 border-blue-200' };
    }
    if (lower.includes('công nghệ') || lower.includes('kĩ thuật') || lower.includes('kỹ thuật')) {
      return { badge: 'bg-cyan-600 text-white', card: 'bg-cyan-50/70 border-cyan-200' };
    }
    if (lower.includes('toán')) {
      return { badge: 'bg-purple-600 text-white', card: 'bg-purple-50/70 border-purple-200' };
    }
    if (lower.includes('mĩ thuật') || lower.includes('mỹ thuật')) {
      return { badge: 'bg-rose-600 text-white', card: 'bg-rose-50/70 border-rose-200' };
    }
    return { badge: 'bg-slate-700 text-white', card: 'bg-slate-50 border-slate-200' };
  };

  // Xử lý hiển thị mục 1: Tách dòng "Thông điệp: “...”" thành trích dẫn riêng đẹp mắt
  const renderYtuongContent = (text: string) => {
    const parts = text.split(/(?=Thông điệp:)/i);
    if (parts.length > 1) {
      const mainText = parts[0].trim();
      const messageText = parts.slice(1).join('').trim();
      return (
        <div className="space-y-4">
          {mainText && <div>{mainText}</div>}
          {messageText && (
            <blockquote className="my-4 pl-4 py-2.5 border-l-4 border-[#F37021] bg-orange-50/70 rounded-r-xl italic text-slate-800 text-[16px] sm:text-[17px] leading-[1.7] shadow-2xs">
              {messageText}
            </blockquote>
          )}
        </div>
      );
    }
    return <div>{text}</div>;
  };

  return (
    <>
      {/* Nền mờ phía sau */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 bg-black/65 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-modal="true"
        role="dialog"
      >
        {/* TRANG BÀI BÁO: Rộng max-w-[960px] trên máy tính, toàn màn hình trên điện thoại */}
        <div
          className="relative w-full h-full md:max-w-[960px] md:h-[94vh] bg-white md:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* ============================================================ */}
          {/* THANH TRÊN CÙNG GỌN (STICKY TOP BAR)                          */}
          {/* ============================================================ */}
          <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs">
            {/* Thanh tiến trình đọc mỏng màu cam ở mép trên cùng */}
            <div
              className="h-1 bg-[#F37021] transition-all duration-150 ease-out"
              style={{ width: `${readingProgress}%` }}
            />

            <div className="flex items-center justify-between px-3 sm:px-6 py-2.5 sm:py-3">
              {/* Nút "← Quay lại" bên trái (vùng chạm ≥ 44px) */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Quay lại danh sách sản phẩm"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer min-h-[44px]"
              >
                <ArrowLeft className="w-4 h-4 text-[#F37021]" />
                <span>Quay lại</span>
              </button>

              {/* Điều hướng Trước / Sau & Nút Đóng X bên phải */}
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  type="button"
                  onClick={onPrev}
                  disabled={!hasPrev}
                  aria-label="Sản phẩm trước"
                  className="inline-flex items-center gap-1 px-2.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer min-h-[44px]"
                  title="Sản phẩm trước"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Trước</span>
                </button>

                <button
                  type="button"
                  onClick={onNext}
                  disabled={!hasNext}
                  aria-label="Sản phẩm sau"
                  className="inline-flex items-center gap-1 px-2.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer min-h-[44px]"
                  title="Sản phẩm sau"
                >
                  <span className="hidden sm:inline">Sau</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <div className="w-px h-5 bg-slate-200 mx-1" />

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Đóng bài viết (Phím Esc)"
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
                  title="Đóng (Phím Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* TOÀN BỘ TRANG CUỘN DỌC MỘT THANH CUỘN DUY NHẤT               */}
          {/* ============================================================ */}
          <div
            ref={articleScrollRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto scroll-smooth overscroll-contain"
          >
            {/* 1. ẢNH ĐẦU BÀI: Full chiều rộng, kiểu hero, slide tương tác */}
            <ImageSlider
              images={gallery}
              productTitle={product.ten}
              deptName={product.to}
              onOpenLightbox={() => setLightboxOpen(true)}
              currentIndex={activeImageIdx}
              onSelectIndex={setActiveImageIdx}
              onPrev={() =>
                setActiveImageIdx((prev) =>
                  prev > 0 ? prev - 1 : gallery.length - 1
                )
              }
              onNext={() =>
                setActiveImageIdx((prev) =>
                  prev < gallery.length - 1 ? prev + 1 : 0
                )
              }
            />

            {/* 2. CỘT ĐỌC BÀI BÁO: Rộng max-w-[760px] căn giữa */}
            <article className={`w-full ${ARTICLE_MAX_WIDTH} mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 space-y-8`}>
              
              {/* PHẦN ĐẦU BÀI BÁO: Nhãn tổ, Tiêu đề H1, Nhóm tác giả */}
              <div className="space-y-3 pb-6 border-b border-slate-200/90">
                <div className="flex items-center gap-2">
                  <span className={`inline-block px-3 py-1 rounded-lg text-xs font-bold tracking-wide shadow-2xs ${getDeptColorClass()}`}>
                    Tổ {product.to}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-tight tracking-tight">
                  {product.ten}
                </h1>

                {product.nhom && (
                  <div className="flex items-center gap-2 text-sm sm:text-base text-slate-600 font-medium pt-1">
                    <Users className="w-4 h-4 text-[#F37021] shrink-0" />
                    <span>{product.nhom}</span>
                  </div>
                )}

                {/* BĂNG KHẨU HIỆU (SLOGAN) NỔI BẬT NGAY DƯỚI TÊN */}
                {displaySlogan && (
                  <div className="mt-4 p-4 sm:p-5 rounded-r-2xl border-l-[6px] border-[#F37021] bg-gradient-to-r from-orange-100/90 via-orange-50/70 to-amber-50/40 text-[#c2510b] font-black text-base sm:text-lg md:text-xl tracking-wide uppercase leading-snug shadow-2xs">
                    {displaySlogan}
                  </div>
                )}
              </div>

              {/* Nút Xem tài liệu đầy đủ (nếu có trường tailieu) */}
              {product.tailieu && (
                <div className="p-4 rounded-2xl bg-orange-50/90 border border-orange-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                    <FileText className="w-5 h-5 text-[#F37021] shrink-0" />
                    <span>Tài liệu thuyết minh chi tiết của sản phẩm</span>
                  </div>
                  <a
                    href={product.tailieu}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#F37021] hover:bg-[#d85e13] text-white text-sm font-bold transition-colors shadow-2xs shrink-0 cursor-pointer min-h-[44px]"
                  >
                    <span>Xem tài liệu đầy đủ</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}

              {/* NẾU SẢN PHẨM CHƯA CÓ NỘI DUNG THUYẾT MINH */}
              {!hasAnyDetails ? (
                <div className="py-12 px-6 rounded-2xl bg-slate-50 border border-slate-200 text-center my-6">
                  <Info className="w-8 h-8 text-[#0066B3] mx-auto mb-2" />
                  <p className="text-base font-bold text-slate-800">
                    Sản phẩm đang được cập nhật, hãy quay lại sau nhé!
                  </p>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Thông tin thuyết minh chi tiết sẽ được ban tổ chức bổ sung sớm nhất.
                  </p>
                </div>
              ) : hasMucs ? (
                /* ======================================================== */
                /* CÁC MỤC BÀI VIẾT NGUYÊN VĂN TỪ DATA BỔ SUNG              */
                /* ======================================================== */
                <div className="space-y-8">
                  {product.mucs!.map((muc, mIdx) => (
                    <RenderMuc key={mIdx} muc={muc} index={mIdx} />
                  ))}
                </div>
              ) : (
                /* ======================================================== */
                /* CÁC MỤC THUYẾT MINH NGUYÊN VĂN (MỤC RỖNG TỰ ẨN)          */
                /* ======================================================== */
                <div className="space-y-8">
                  
                  {/* Mục 1: Ý tưởng – thông điệp */}
                  {hasYtuong && (
                    <ContentSection
                      title="1. Ý tưởng – thông điệp"
                      icon={<Lightbulb className="w-4 h-4" />}
                    >
                      {renderYtuongContent(product.ytuong!)}
                    </ContentSection>
                  )}

                  {/* Mục 2: Cấu tạo nổi bật */}
                  {hasCautao && (
                    <ContentSection
                      title="2. Cấu tạo nổi bật"
                      icon={<Layers className="w-4 h-4" />}
                    >
                      {product.cautao}
                    </ContentSection>
                  )}

                  {/* Mục 3: Vật liệu – cách thực hiện */}
                  {hasVatlieu && (
                    <ContentSection
                      title="3. Vật liệu – cách thực hiện"
                      icon={<Wrench className="w-4 h-4" />}
                    >
                      {product.vatlieu}
                    </ContentSection>
                  )}

                  {/* Mục 4: Kiến thức STEM ứng dụng (các thẻ nhỏ: tên môn in đậm + nội dung) */}
                  {hasKienthuc && (
                    <ContentSection
                      title="4. Kiến thức STEM ứng dụng"
                      icon={<GraduationCap className="w-4 h-4" />}
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        {product.kienthuc!.map((item, idx) => {
                          const style = getSubjectBadge(item.mon);
                          return (
                            <div
                              key={idx}
                              className={`p-3.5 rounded-xl border ${style.card} text-sm sm:text-base leading-relaxed`}
                            >
                              <span className="font-bold text-slate-900 mr-1.5">
                                {item.mon}:
                              </span>
                              <span className="text-slate-700">
                                {item.noidung}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </ContentSection>
                  )}

                  {/* Mục 5: Điểm sáng tạo – giá trị thực tiễn */}
                  {hasSangtao && (
                    <ContentSection
                      title="5. Điểm sáng tạo – giá trị thực tiễn"
                      icon={<Sparkles className="w-4 h-4" />}
                    >
                      {product.sangtao}
                    </ContentSection>
                  )}

                  {/* Mục 6: Khả năng phát triển */}
                  {hasPhattrien && (
                    <ContentSection
                      title="6. Khả năng phát triển"
                      icon={<Rocket className="w-4 h-4" />}
                    >
                      {product.phattrien}
                    </ContentSection>
                  )}

                  {/* Mục 7: Ý nghĩa giáo dục */}
                  {hasYnghia && (
                    <ContentSection
                      title="7. Ý nghĩa giáo dục"
                      icon={<HeartHandshake className="w-4 h-4" />}
                    >
                      {product.ynghia}
                    </ContentSection>
                  )}

                  {/* Mục 8: Công dụng trong các tiết học */}
                  {hasCongdung && (
                    <ContentSection
                      title="8. Công dụng trong các tiết học"
                      icon={<BookOpen className="w-4 h-4" />}
                    >
                      {product.congdung}
                    </ContentSection>
                  )}

                  {/* Khối "Mô tả chi tiết" (chỉ hiện khi mota có nội dung, ẩn hoàn toàn khi rỗng) */}
                  {hasMota && (
                    <ContentSection
                      title="Mô tả chi tiết"
                      icon={<FileText className="w-4 h-4" />}
                    >
                      {product.mota}
                    </ContentSection>
                  )}

                </div>
              )}

              {/* ============================================================ */}
              {/* CUỐI BÀI: 2 THẺ ĐỌC TIẾP + NÚT VỀ DANH SÁCH + VỀ ĐẦU TRANG   */}
              {/* ============================================================ */}
              <div className="pt-10 border-t border-slate-200/90 space-y-6">
                
                {/* Hai thẻ Sản phẩm trước / sau để người đọc lướt tiếp */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Thẻ sản phẩm trước */}
                  {prevProduct ? (
                    <button
                      type="button"
                      onClick={onPrev}
                      className="group flex items-center gap-3.5 p-3.5 rounded-2xl border border-slate-200 hover:border-[#F37021] bg-white hover:bg-orange-50/40 text-left transition-all shadow-2xs hover:shadow-xs cursor-pointer"
                    >
                      <div className="w-16 h-16 rounded-xl bg-slate-100 overflow-hidden shrink-0 flex items-center justify-center">
                        {prevImgUrl ? (
                          <img
                            src={prevImgUrl}
                            alt={prevProduct.ten}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-orange-100/70 text-[#F37021]">
                            <Sparkles className="w-6 h-6" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-[11px] font-bold text-[#F37021] uppercase tracking-wide flex items-center gap-1">
                          <ChevronLeft className="w-3.5 h-3.5" />
                          Sản phẩm trước
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#F37021] line-clamp-1 transition-colors mt-0.5">
                          {prevProduct.ten}
                        </h4>
                        <span className="text-xs text-slate-400">
                          Tổ {prevProduct.to}
                        </span>
                      </div>
                    </button>
                  ) : (
                    <div />
                  )}

                  {/* Thẻ sản phẩm sau */}
                  {nextProduct && (
                    <button
                      type="button"
                      onClick={onNext}
                      className="group flex items-center justify-between gap-3.5 p-3.5 rounded-2xl border border-slate-200 hover:border-[#F37021] bg-white hover:bg-orange-50/40 text-right transition-all shadow-2xs hover:shadow-xs cursor-pointer"
                    >
                      <div className="min-w-0 flex-1">
                        <span className="text-[11px] font-bold text-[#F37021] uppercase tracking-wide inline-flex items-center gap-1">
                          Sản phẩm sau
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#F37021] line-clamp-1 transition-colors mt-0.5">
                          {nextProduct.ten}
                        </h4>
                        <span className="text-xs text-slate-400">
                          Tổ {nextProduct.to}
                        </span>
                      </div>
                      <div className="w-16 h-16 rounded-xl bg-slate-100 overflow-hidden shrink-0 flex items-center justify-center">
                        {nextImgUrl ? (
                          <img
                            src={nextImgUrl}
                            alt={nextProduct.ten}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-orange-100/70 text-[#F37021]">
                            <Sparkles className="w-6 h-6" />
                          </div>
                        )}
                      </div>
                    </button>
                  )}
                </div>

                {/* Các nút điều hướng cuối bài */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-xs transition-colors cursor-pointer min-h-[44px]"
                  >
                    <LayoutGrid className="w-4 h-4 text-[#F37021]" />
                    <span>Về danh sách sản phẩm</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleScrollToTop}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors cursor-pointer min-h-[44px]"
                  >
                    <ArrowUp className="w-4 h-4" />
                    <span>Về đầu trang</span>
                  </button>
                </div>

              </div>

            </article>
          </div>

          {/* Nút nổi "Về đầu trang" khi cuộn xuống sâu */}
          {showBackToTop && (
            <button
              type="button"
              onClick={handleScrollToTop}
              aria-label="Cuộn về đầu trang"
              className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-[#F37021] hover:bg-[#d85e13] text-white shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center animate-in fade-in zoom-in-75 duration-150"
              title="Về đầu trang"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          )}

        </div>
      </div>

      {/* LIGHTBOX PHÓNG TO TOÀN MÀN HÌNH */}
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={gallery}
        currentIndex={activeImageIdx}
        onPrev={() =>
          setActiveImageIdx((prev) =>
            prev > 0 ? prev - 1 : gallery.length - 1
          )
        }
        onNext={() =>
          setActiveImageIdx((prev) =>
            prev < gallery.length - 1 ? prev + 1 : 0
          )
        }
        productTitle={product.ten}
      />
    </>
  );
};
