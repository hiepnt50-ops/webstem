/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * ============================================================================
 * TIỆN ÍCH XỬ LÝ ẢNH GOOGLE DRIVE
 * ============================================================================
 * 
 * LƯU Ý QUAN TRỌNG:
 * Ảnh trên Google Drive PHẢI ĐƯỢC BẬT QUYỀN CHIA SẺ:
 * "Bất kỳ ai có đường liên kết đều xem được" (Anyone with the link can view).
 * 
 * Hàm tự động trích xuất FILE_ID từ các định dạng:
 * - https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 * - https://drive.google.com/open?id=FILE_ID
 * - https://drive.google.com/uc?id=FILE_ID
 * - Hoặc trực tiếp mã FILE_ID
 */

export function extractDriveFileId(link: string): string | null {
  if (!link || typeof link !== 'string') return null;
  const trimmed = link.trim();

  // Nếu người dùng nhập trực tiếp file ID
  if (/^[a-zA-Z0-9_-]{25,50}$/.test(trimmed)) {
    return trimmed;
  }

  // Khớp dạng /file/d/FILE_ID/
  const fileDMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileDMatch && fileDMatch[1]) {
    return fileDMatch[1];
  }

  // Khớp dạng ?id=FILE_ID hoặc &id=FILE_ID
  const idParamMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idParamMatch && idParamMatch[1]) {
    return idParamMatch[1];
  }

  // Khớp dạng googleusercontent /d/FILE_ID
  const lh3Match = trimmed.match(/googleusercontent\.com\/d\/([a-zA-Z0-9_-]+)/);
  if (lh3Match && lh3Match[1]) {
    return lh3Match[1];
  }

  return null;
}

/**
 * Chuyển đổi link Google Drive thành đường dẫn ảnh hiển thị trực tiếp
 * Mặc định sz=w1600 cho modal, sz=w800 cho thẻ sản phẩm
 */
export function getDriveImageUrl(link: string, size: number = 1600): string {
  if (!link || typeof link !== 'string') return '';
  const trimmed = link.trim();

  // Nếu là file local trong app (như /assets/... hoặc /logo.png) hoặc ảnh http thông thường
  if (trimmed.startsWith('/') || (trimmed.startsWith('http') && !trimmed.includes('drive.google.com') && !trimmed.includes('docs.google.com'))) {
    return trimmed;
  }

  const fileId = extractDriveFileId(trimmed);
  if (fileId) {
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w${size}`;
  }

  return trimmed;
}

/**
 * Đường dẫn dự phòng khi thumbnail Google Drive không phản hồi
 */
export function getDriveBackupUrl(link: string): string {
  const fileId = extractDriveFileId(link);
  if (fileId) {
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  }
  return '';
}
