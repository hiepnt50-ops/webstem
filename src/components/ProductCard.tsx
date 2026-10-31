/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { StemProduct } from '../data';
import { getDriveImageUrl, getDriveBackupUrl } from '../utils/drive';
import { 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  Globe, 
  FlaskConical, 
  Cpu, 
  Compass, 
  Users,
  Camera
} from 'lucide-react';

interface ProductCardProps {
  product: StemProduct;
  onClick: (product: StemProduct) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const [imageError, setImageError] = useState(false);
  const [useBackup, setUseBackup] = useState(false);

  // Link ảnh bìa (ưu tiên sz=w800 cho thẻ sản phẩm, dự phòng lh3)
  let currentImageUrl = '';
  if (product.anh && product.anh.trim()) {
    if (useBackup) {
      currentImageUrl = getDriveBackupUrl(product.anh);
    } else {
      currentImageUrl = getDriveImageUrl(product.anh, 800);
    }
  }

  const hasImage = Boolean(currentImageUrl && currentImageUrl.trim()) && !imageError;

  const handleImageError = () => {
    if (!useBackup && product.anh && !product.anh.startsWith('/')) {
      setUseBackup(true);
    } else {
      setImageError(true);
    }
  };

  // Tổng số ảnh trong thư viện
  const totalImages = product.thuvien && product.thuvien.length > 0
    ? product.thuvien.length
    : (product.anh ? 1 : 0);

  // Kiểm tra xem đã có mô tả hay chưa (từ các mục bài viết hoặc trường cũ)
  const hasDescription = Boolean(
    (product.mucs && product.mucs.length > 0) ||
    product.mota?.trim() ||
    product.ytuong?.trim() ||
    product.cautao?.trim()
  );

  // Icon theo tổ chuyên môn
  const getDeptIcon = () => {
    switch (product.to) {
      case 'Xã hội':
        return <BookOpen className="w-5 h-5" />;
      case 'Tiếng Anh':
        return <Globe className="w-5 h-5" />;
      case 'Tự nhiên':
        return <FlaskConical className="w-5 h-5" />;
      case 'STEM - Công nghệ':
        return <Cpu className="w-5 h-5" />;
      case 'PDP':
        return <Compass className="w-5 h-5" />;
      case 'Tiểu học':
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

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

  return (
    <div
      onClick={() => onClick(product)}
      className="group flex flex-col bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer focus-within:ring-2 focus-within:ring-[#F37021]"
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(product);
        }
      }}
      aria-label={`Chi tiết sản phẩm: ${product.ten}`}
    >
      {/* Khung ảnh 4:3 (object-fit: cover) */}
      <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden">
        {hasImage && Boolean(currentImageUrl) ? (
          <img
            src={currentImageUrl}
            alt={product.ten}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={handleImageError}
            className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-300 ease-out"
          />
        ) : (
          /* Placeholder khi chưa có ảnh hoặc ảnh lỗi: gradient theo màu tổ + "Sắp ra mắt" */
          <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-slate-100 via-sky-50 to-orange-50 text-slate-500">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2 shadow-xs ${getDeptColorClass()}`}>
              {getDeptIcon()}
            </div>
            <span className="text-xs font-bold text-slate-700">
              Sắp ra mắt
            </span>
            <span className="text-[11px] text-slate-400 mt-0.5">
              Tổ {product.to}
            </span>
          </div>
        )}

        {/* Nhãn tổ ở góc trên trái ảnh */}
        <div className="absolute top-2.5 left-2.5 z-10">
          <span className={`inline-block px-2.5 py-1 rounded-lg text-[11px] font-bold shadow-xs tracking-wide ${getDeptColorClass()}`}>
            {product.to}
          </span>
        </div>

        {/* Chip nhiều ảnh góc dưới phải: "📷 N ảnh" */}
        {totalImages > 1 && (
          <div className="absolute bottom-2.5 right-2.5 z-10">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/65 backdrop-blur-xs text-white text-[11px] font-semibold shadow-xs">
              <Camera className="w-3 h-3" />
              {totalImages} ảnh
            </span>
          </div>
        )}
      </div>

      {/* Thông tin sản phẩm */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between gap-3">
        <div className="space-y-1.5">
          {/* Tên sản phẩm tối đa 2 dòng */}
          <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#F37021] transition-colors line-clamp-2 leading-snug">
            {product.ten}
          </h3>

          {/* Nhóm tác giả / thực hiện */}
          {product.nhom && (
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{product.nhom}</span>
            </div>
          )}

          {/* Nhãn "Đang cập nhật" nếu chưa có mô tả */}
          {!hasDescription && (
            <div className="pt-0.5">
              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-amber-50 text-amber-700 border border-amber-200">
                Đang cập nhật
              </span>
            </div>
          )}
        </div>

        {/* Nút "Xem chi tiết" cam full chiều rộng thẻ */}
        <div className="pt-2">
          <div className="w-full py-2.5 px-3 bg-[#F37021] group-hover:bg-[#d85e13] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors min-h-[40px]">
            <span>Xem chi tiết</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};
