/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ============================================================================
// ===== HƯỚNG DẪN THÊM SẢN PHẨM MỚI DÀNH CHO GIÁO VIÊN VÀ QUẢN TRỊ VIÊN =====
// ============================================================================
// 1. Copy object MẪU ở cuối file, dán vào mảng `products` bên dưới.
// 2. Đổi `id` (không trùng với các sản phẩm khác), `to` (chọn đúng: 'Xã hội', 
//    'Tiếng Anh', 'Tự nhiên', 'STEM - Công nghệ', 'PDP', hoặc 'Tiểu học'), 
//    `ten` (tên sản phẩm), `nhom` (tác giả / nhóm thực hiện).
// 3. `anh`: link Google Drive ảnh bìa. 
//    `thuvien`: mảng các ảnh còn lại [{ anh: "link_drive", caption: "chú thích" }].
// 4. `mota`: dán NGUYÊN VĂN nội dung mô tả (dùng cặp dấu ` ` để giữ nguyên xuống dòng).
// 5. `tailieu`: dán link Google Drive file PDF/Word tài liệu đầy đủ (nếu có).
// 6. LƯU Ý QUAN TRỌNG: Mọi link ảnh và tài liệu trên Google Drive PHẢI ĐƯỢC BẬT 
//    quyền chia sẻ: "Bất kỳ ai có đường liên kết đều xem được" (Anyone with the link can view).
// ============================================================================

import { 
  sanPhamBoSung, 
  MucItem, 
  KhoiNoiDung, 
  KhoiDoan, 
  KhoiDs, 
  KhoiDsItem, 
  KhoiBang, 
  KhoiSongNgu, 
  KhoiQA, 
  BoSungProduct 
} from './data-bo-sung';

export type { 
  MucItem, 
  KhoiNoiDung, 
  KhoiDoan, 
  KhoiDs, 
  KhoiDsItem, 
  KhoiBang, 
  KhoiSongNgu, 
  KhoiQA, 
  BoSungProduct 
};

export interface ImageItem {
  anh: string;
  caption?: string;
}

export interface StemKnowledge {
  mon: 'Khoa học' | 'Công nghệ' | 'Kỹ thuật' | 'Toán học' | 'Mĩ thuật' | string;
  noidung: string;
}

export interface StemProduct {
  id: string;                    // Mã định danh sản phẩm (duy nhất)
  to: 'Xã hội' | 'Tiếng Anh' | 'Tự nhiên' | 'STEM - Công nghệ' | 'PDP' | 'Tiểu học'; // Tổ chuyên môn
  ten: string;                   // Tên sản phẩm
  nhom: string;                  // Tác giả / Nhóm thực hiện / Khối lớp
  anh: string;                   // Link Google Drive hoặc đường dẫn ảnh bìa
  thuvien?: ImageItem[];         // Mảng thư viện ảnh kèm chú thích
  slogan?: string;               // Khẩu hiệu / Slogan nổi bật
  mota?: string;                 // Mô tả chi tiết nguyên văn
  tailieu?: string;              // Link file tài liệu PDF/Docx
  mucs?: MucItem[];              // Danh sách các mục bài viết chi tiết từ data-bo-sung
  ytuong?: string;               // 1. Ý tưởng – thông điệp (bổ trợ)
  cautao?: string;               // 2. Cấu tạo nổi bật (bổ trợ)
  vatlieu?: string;              // 3. Vật liệu – cách thực hiện (bổ trợ)
  kienthuc?: StemKnowledge[];    // 4. Kiến thức STEM ứng dụng (bổ trợ)
  sangtao?: string;              // 5. Điểm sáng tạo – giá trị thực tiễn (bổ trợ)
  phattrien?: string;            // 6. Khả năng phát triển (bổ trợ)
  ynghia?: string;               // 7. Ý nghĩa giáo dục (bổ trợ)
  congdung?: string;             // 8. Công dụng trong các tiết học (bổ trợ)
  thongdiep?: string;            // Thông điệp / Slogan cuối cùng (bổ trợ)
}

export interface SiteConfig {
  logo: string;
  heroImage: string;
  tieude: string;
  phude: string;
  slogan: string;
  donvi: string;
  namhoc: string;
  tentruong: string;
}

// Cấu hình thông tin chung trang web
export const site: SiteConfig = {
  logo: "/logo.png",
  heroImage: "/assets/aistudio/H_c_t_p_th_ng_minh_c_ng_c_ng_ngh__FPT_655b3ec3.png",
  tieude: "NGÀY HỘI CHUYỂN ĐỔI SỐ",
  phude: "Triển lãm sản phẩm STEM – Trường Tiểu học Giáp Hải",
  slogan: "Khám phá – Sáng tạo – Chuyển đổi số",
  donvi: "Tiểu học Giáp Hải",
  namhoc: "2026 - 2027",
  tentruong: "Trường Tiểu học Giáp Hải"
};

// ============================================================================
// DANH SÁCH CÁC SẢN PHẨM STEM THAM GIA TRƯNG BÀY
// ============================================================================
const baseProducts: StemProduct[] = [
  // ==========================================================================
  // TỔ TIỂU HỌC
  // ==========================================================================
  {
    id: "tieu-hoc-ecosmart-city",
    to: "Tiểu học",
    ten: "ECOSMART CITY - Thành phố thông minh",
    nhom: "",
    anh: "https://drive.google.com/file/d/1ODK_psoVqbmioT92IQeN-KFBN6t9Jd_8/view?usp=sharing",
    thuvien: [
      { anh: "https://drive.google.com/file/d/1ODK_psoVqbmioT92IQeN-KFBN6t9Jd_8/view?usp=sharing", caption: "Ảnh bìa" },
      { anh: "https://drive.google.com/file/d/1W54d-wGNEmKJGx2FRVPKcGZm-5nxtZHr/view?usp=sharing", caption: "Ảnh vệ tinh" },
      { anh: "https://drive.google.com/file/d/1F6CsfkDqcCC35LiVoXZ8wCzLkAz7EoZP/view?usp=sharing", caption: "Ảnh vệ tinh" }
    ],
    slogan: "“THÔNG MINH TRONG THIẾT KẾ – XANH TRONG CÁCH SỐNG”",
    mota: "",
    ytuong: `EcoSmart City – Thành phố xanh thông minh được xây dựng từ các vật liệu tái chế mong muốn tạo nên một đô thị hiện đại nhưng vẫn gần gũi với thiên nhiên. Mô hình kết hợp hệ thống giao thông, bãi đỗ xe nhiều tầng, khu sạc xe điện, tua-bin gió, mái có biểu tượng pin năng lượng mặt trời, cây xanh và hồ nước để minh họa một hướng phát triển đô thị tiết kiệm tài nguyên, thân thiện với môi trường.

Thông điệp: “Thành phố thông minh không chỉ có công nghệ hiện đại, mà còn phải xanh, sạch, an toàn và đáng sống.”`,
    cautao: `Nhà có mái mô phỏng pin mặt trời; tua-bin gió; bãi đỗ xe nhiều tầng; khu sạc xe điện; đường giao thông, đèn tín hiệu; cây xanh, vườn hoa và hồ nước.`,
    vatlieu: `Tận dụng bìa carton, hộp giấy, xốp, que gỗ, giấy màu, vật liệu trang trí và xe đồ chơi. Nhóm phác thảo, đo đạc, chia khu chức năng, lắp ghép công trình, tạo cảnh quan và hoàn thiện mô hình.`,
    kienthuc: [
      { mon: "Khoa học", noidung: "năng lượng gió, mặt trời và sinh thái đô thị" },
      { mon: "Công nghệ – Kĩ thuật", noidung: "thiết kế, lắp ráp, bố trí giao thông" },
      { mon: "Toán học", noidung: "đo kích thước, tỉ lệ, phân chia không gian" },
      { mon: "Mĩ thuật", noidung: "phối màu và tạo cảnh quan" }
    ],
    sangtao: `Tích hợp bãi đỗ xe tiết kiệm diện tích, hạ tầng cho xe điện và không gian xanh trên cùng một mô hình; lan tỏa thông điệp tái chế, tiết kiệm tài nguyên và bảo vệ môi trường.`,
    phattrien: `Có thể nâng cấp bằng đèn LED, tua-bin quay và đèn giao thông điều khiển tự động. Các hệ thống năng lượng và sạc hiện tại chủ yếu là mô hình minh họa.`,
    ynghia: `Sản phẩm giúp học sinh hiểu giá trị của việc tái sử dụng vật liệu, tăng mảng xanh, tiết kiệm năng lượng và lựa chọn phương tiện ít gây ô nhiễm. Qua quá trình thiết kế, các em hình thành tinh thần trách nhiệm với môi trường, ý thức hợp tác và tư duy tìm giải pháp cho đô thị bền vững.`,
    congdung: `Giáo viên sử dụng mô hình làm học liệu trực quan trong môn Khoa học, Công nghệ, Hoạt động trải nghiệm và giáo dục STEM. Học sinh quan sát, thảo luận về phân loại rác – tái chế, năng lượng tái tạo, giao thông xanh và vai trò của cây xanh; nhận diện vấn đề ô nhiễm, cải tiến mô hình và cam kết hành động cụ thể như tiết kiệm điện, nước, hạn chế nhựa dùng một lần, giữ gìn vệ sinh trường lớp.`,
    tailieu: "https://drive.google.com/file/d/1vc6WNOxaSHKxU5yJ1Psefy-UmfKMV7c6/view?usp=sharing"
  },
  {
    id: "tieu-hoc-02",
    to: "Tiểu học",
    ten: "Mô hình Trái đất ngày và đêm",
    nhom: "Nhóm học sinh khối 1, 2 – Trường Tiểu học, THCS và THPT FPT Bắc Giang",
    anh: "/assets/aistudio/ng_y_v____m_69ea9f58.png",
    thuvien: [
      { anh: "/assets/aistudio/ng_y_v____m_69ea9f58.png", caption: "Mô hình Trái đất ngày và đêm hoàn thiện" }
    ],
    mota: `Mô hình giúp học sinh trực quan hóa hiện tượng luân phiên ngày và đêm trên Trái Đất. Mô hình tái hiện Trái Đất, Mặt Trời, bầu trời ban ngày và bầu trời ban đêm với các ngôi sao, đồng thời minh họa sự khác biệt giữa hai khoảng thời gian trên cùng một hành tinh.

Trái Đất hình cầu đặt ở trung tâm, Mặt Trời phát sáng ở phía bên phải, không gian ban đêm với nền đen và các ngôi sao ở phía bên trái. Phần ban ngày có bầu trời xanh, mây, cây xanh, nhà cửa. Hai ngôi nhà cùng quốc kỳ Mỹ và Việt Nam minh họa sự hiện diện của con người trên Trái Đất.

Vật liệu – cách thực hiện:
Bìa carton làm khung; quả cầu bằng bóng tạo hình Trái Đất; vật liệu xốp làm Mặt Trời; vật liệu trang trí làm ngôi sao, cây xanh, nhà cửa; giấy màu tạo nền trời ngày và đêm. Hệ thống đèn tạo hiệu ứng ánh sáng cho Mặt Trời.

Điểm sáng tạo – giá trị thực tiễn:
Kết hợp hiệu ứng ánh sáng, hình cầu Trái Đất và không gian ngày – đêm trong cùng một sản phẩm. Phối màu tương phản giúp học sinh dễ nhận biết sự khác nhau giữa hai khoảng thời gian, biến kiến thức trừu tượng thành hình ảnh trực quan.

Khả năng phát triển:
Mô hình đã tích hợp động cơ mini và trục quay giúp Trái Đất tự quay. Tương lai có thể điều chỉnh tốc độ quay, thêm công tắc điều khiển đèn và các chi tiết minh họa khoa học để thành học cụ STEM tương tác.`,
    ytuong: "Mô hình giúp học sinh trực quan hóa hiện tượng luân phiên ngày và đêm trên Trái Đất. Mô hình tái hiện Trái Đất, Mặt Trời, bầu trời ban ngày và bầu trời ban đêm với các ngôi sao, đồng thời minh họa sự khác biệt giữa hai khoảng thời gian trên cùng một hành tinh.",
    cautao: "Trái Đất hình cầu đặt ở trung tâm, Mặt Trời phát sáng ở phía bên phải, không gian ban đêm với nền đen và các ngôi sao ở phía bên trái. Phần ban ngày có bầu trời xanh, mây, cây xanh, nhà cửa. Hai ngôi nhà cùng quốc kỳ Mỹ và Việt Nam minh họa sự hiện diện của con người trên Trái Đất.",
    vatlieu: "Bìa carton làm khung; quả cầu bằng bóng tạo hình Trái Đất; vật liệu xốp làm Mặt Trời; vật liệu trang trí làm ngôi sao, cây xanh, nhà cửa; giấy màu tạo nền trời ngày và đêm. Hệ thống đèn tạo hiệu ứng ánh sáng cho Mặt Trời.",
    kienthuc: [
      { mon: "Khoa học", noidung: "Trái Đất gần hình cầu, tự quay quanh trục, ngày đêm luân phiên" },
      { mon: "Công nghệ", noidung: "Dùng đèn chiếu sáng mô phỏng Mặt Trời" },
      { mon: "Kỹ thuật", noidung: "Thiết kế khung, lắp ghép, bố trí chi tiết" },
      { mon: "Toán học", noidung: "Ước lượng kích thước, xác định vị trí, phân chia không gian" },
      { mon: "Mĩ thuật", noidung: "Phối màu, tạo hình cảnh quan, tương phản ngày và đêm" }
    ],
    sangtao: "Kết hợp hiệu ứng ánh sáng, hình cầu Trái Đất và không gian ngày – đêm trong cùng một sản phẩm. Phối màu tương phản giúp học sinh dễ nhận biết sự khác nhau giữa hai khoảng thời gian, biến kiến thức trừu tượng thành hình ảnh trực quan.",
    phattrien: "Mô hình đã tích hợp động cơ mini và trục quay giúp Trái Đất tự quay. Tương lai có thể điều chỉnh tốc độ quay, thêm công tắc điều khiển đèn và các chi tiết minh họa khoa học để thành học cụ STEM tương tác.",
    thongdiep: "Trái Đất luôn chuyển động, mang đến ngày và đêm luân phiên, tạo nên nhịp điệu kỳ diệu của cuộc sống."
  },

  // ==========================================================================
  // TỔ TIẾNG ANH
  // ==========================================================================
  {
    id: "tieng-anh-01",
    to: "Tiếng Anh",
    ten: "SMART CITY",
    nhom: "English Club & Học sinh THCS FPT",
    anh: "/assets/aistudio/ngoi_tr__ng_606fb656.png",
    thuvien: [
      { anh: "/assets/aistudio/ngoi_tr__ng_606fb656.png", caption: "Mô hình tổng thể Smart City tích hợp mã QR" }
    ],
    mota: `Mô hình thành phố thông minh quốc tế nơi các công trình, trạm điều hành và thông tin chỉ dẫn được tích hợp mã QR tương tác song ngữ Anh - Việt.

Tổ hợp các tòa nhà thông minh có mái pin mặt trời, trạm phân loại rác 4 ngăn màu chuẩn quốc tế, trạm tra cứu thông tin tích hợp mã QR và hệ thống cây xanh điều hòa không khí.`,
    ytuong: "Mô hình thành phố thông minh quốc tế nơi các công trình, trạm điều hành và thông tin chỉ dẫn được tích hợp mã QR tương tác song ngữ Anh - Việt.",
    cautao: "Tổ hợp các tòa nhà thông minh có mái pin mặt trời, trạm phân loại rác 4 ngăn màu chuẩn quốc tế, trạm tra cứu thông tin tích hợp mã QR và hệ thống cây xanh điều hòa không khí.",
    vatlieu: "Formex trắng, bìa duplex, pin mặt trời mini, các biển chỉ dẫn mã QR số hóa và tiểu cảnh cây xanh nhân tạo.",
    kienthuc: [
      { mon: "Khoa học", noidung: "Quy hoạch vi khí hậu và năng lượng sạch bền vững." },
      { mon: "Công nghệ", noidung: "Số hóa thông tin qua hệ thống mã phản hồi nhanh QR Code." },
      { mon: "Kỹ thuật", noidung: "Lắp ráp mô hình kiến trúc đô thị đa tầng chuẩn tỉ lệ." },
      { mon: "Toán học", noidung: "Tính toán góc nghiêng tối ưu của tấm pin thu năng lượng mặt trời." },
      { mon: "Mĩ thuật", noidung: "Thiết kế không gian kiến trúc hiện đại tối giản phong cách tương lai." }
    ],
    sangtao: "Kết hợp tra cứu thông tin kiến trúc bằng tiếng Anh qua điện thoại thông minh, rèn luyện kỹ năng thuyết trình công nghệ cho học sinh.",
    phattrien: "Mở rộng bản đồ số tương tác 3D và kết nối dữ liệu cảm biến IoT thời gian thực.",
    thongdiep: "Connecting global citizens through smart technology and English fluency."
  },
  {
    id: "tieng-anh-02",
    to: "Tiếng Anh",
    ten: "TRÁI ĐẤT SỐ & PHÁT TRIỂN BỀN VỮNG",
    nhom: "Nhóm học sinh THPT FPT",
    anh: "/assets/aistudio/trai-__t_553034fc.png",
    thuvien: [
      { anh: "/assets/aistudio/trai-__t_553034fc.png", caption: "Quả địa cầu sinh thái với 17 mục tiêu phát triển bền vững" }
    ],
    mota: `Mô hình quả địa cầu sinh thái số hóa truyền tải thông điệp về 17 mục tiêu phát triển bền vững của Liên Hợp Quốc (UN SDGs), bảo vệ đa dạng sinh học và chuyển dịch năng lượng xanh.

Quả địa cầu trung tâm với đại dương và các mảng lục địa, kết hợp hệ thống biểu tượng năng lượng gió, pin mặt trời, mạng lưới kết nối không dây vệ tinh, cùng các sinh vật đại diện cho hệ sinh thái toàn cầu (cá voi, chim cánh cụt, gấu bắc cực, kangaroo, gấu trúc).`,
    ytuong: "Mô hình quả địa cầu sinh thái số hóa truyền tải thông điệp về 17 mục tiêu phát triển bền vững của Liên Hợp Quốc (UN SDGs), bảo vệ đa dạng sinh học và chuyển dịch năng lượng xanh.",
    cautao: "Quả địa cầu trung tâm với đại dương và các mảng lục địa, kết hợp hệ thống biểu tượng năng lượng gió, pin mặt trời, mạng lưới kết nối không dây vệ tinh, cùng các sinh vật đại diện cho hệ sinh thái toàn cầu (cá voi, chim cánh cụt, gấu bắc cực, kangaroo, gấu trúc).",
    vatlieu: "Đất nặn tạo hình Polymer Clay chất lượng cao, khung chân đỡ cân bằng, thanh tre mô hình và các huy hiệu biểu tượng năng lượng sạch.",
    kienthuc: [
      { mon: "Khoa học", noidung: "Mối liên hệ giữa biến đổi khí hậu, sinh cảnh tự nhiên và đa dạng sinh học các châu lục." },
      { mon: "Công nghệ", noidung: "Số hóa dữ liệu sinh thái toàn cầu và mạng lưới truyền thông xanh." },
      { mon: "Kỹ thuật", noidung: "Cân bằng trọng tâm khối cầu trên trục đỡ thẳng đứng." },
      { mon: "Toán học", noidung: "Tính toán tỉ lệ phân bố diện tích đại dương và các châu lục." },
      { mon: "Mĩ thuật", noidung: "Nghệ thuật tạo hình đất nặn 3D sống động với sắc xanh thiên nhiên." }
    ],
    sangtao: "Chuyển tải các khái niệm trừu tượng về SDGs thành tác phẩm nghệ thuật tạo hình trực quan, kết hợp thuyết trình song ngữ Anh - Việt.",
    phattrien: "Tích hợp thẻ NFC dưới chân mô hình để quét điện thoại mở ngay website dữ liệu phát thải khí nhà kính theo thời gian thực.",
    thongdiep: "One World, One Mission – Digital Transformation for a Sustainable Tomorrow."
  },

  // ==========================================================================
  // TỔ TỰ NHIÊN
  // ==========================================================================
  {
    id: "tu-nhien-01",
    to: "Tự nhiên",
    ten: "Hệ thống cảnh báo và giảm thiểu CO2 trong lớp học bằng vi tảo",
    nhom: "Nhóm nghiên cứu Khoa học Tự nhiên",
    anh: "",
    thuvien: [],
    mota: `Giải pháp sinh học kết hợp công nghệ IoT: sử dụng photobioreactor vi tảo Chlorella để hấp thụ khí CO2 do học sinh thải ra trong lớp học và tạo khí Oxy tươi, kèm cảm biến cảnh báo chất lượng không khí.

Cột quang sinh học nuôi vi tảo tuần hoàn, cảm biến nồng độ khí CO2 NDIR, vi điều khiển cảnh báo còi đèn và màn hình hiển thị chỉ số ppm.`,
    ytuong: "Giải pháp sinh học kết hợp công nghệ IoT: sử dụng photobioreactor vi tảo Chlorella để hấp thụ khí CO2 do học sinh thải ra trong lớp học và tạo khí Oxy tươi, kèm cảm biến cảnh báo chất lượng không khí.",
    cautao: "Cột quang sinh học nuôi vi tảo tuần hoàn, cảm biến nồng độ khí CO2 NDIR, vi điều khiển cảnh báo còi đèn và màn hình hiển thị chỉ số ppm.",
    vatlieu: "Ống acrylic trong suốt, giống vi tảo Chlorella vulgaris, dung dịch dinh dưỡng BG-11, cảm biến CO2 MH-Z19B, máy bơm sục khí 12V.",
    kienthuc: [
      { mon: "Khoa học", noidung: "Cơ chế quang hợp của vi tảo (hấp thụ CO2 gấp nhiều lần thực vật trên cùng sinh khối) và chu trình trao đổi khí." },
      { mon: "Công nghệ", noidung: "Lập trình đọc tín hiệu cảm biến NDIR và điều khiển tự động chu kỳ sục khí." },
      { mon: "Kỹ thuật", noidung: "Thiết kế buồng phản ứng kín, phân phối ánh sáng LED tối ưu cho tảo sinh trưởng." },
      { mon: "Toán học", noidung: "Tính toán tốc độ hấp thụ khí CO2 theo thể tích phòng học tiêu chuẩn." },
      { mon: "Mĩ thuật", noidung: "Kiểu dáng tháp sinh học hiện đại, ánh sáng xanh dịu mắt trang trí lớp học." }
    ],
    sangtao: "Giải pháp sinh học 100% tự nhiên nâng cao chất lượng không khí lớp học, giúp học sinh giảm mệt mỏi và tăng cường sự tập trung.",
    phattrien: "Thu hoạch sinh khối vi tảo làm phân bón hữu cơ cho vườn trường và gửi thông báo chất lượng không khí qua ứng dụng di động.",
    thongdiep: "Thở trong lành, học hăng say – Vi tảo xanh vì sức khỏe học đường tương lai."
  },
  {
    id: "tu-nhien-02",
    to: "Tự nhiên",
    ten: "Ứng dụng AI chế tạo hệ thống quản lí và phân loại rác tại nơi công cộng, nơi vứt rác trực tiếp",
    nhom: "Nhóm nghiên cứu Khoa học & AI THPT",
    anh: "/assets/aistudio/thung_rac_bdacca76.png",
    thuvien: [
      { anh: "/assets/aistudio/thung_rac_bdacca76.png", caption: "Thùng rác thông minh tích hợp AI và pin mặt trời" }
    ],
    mota: `Thùng rác thông minh tự vận hành ứng dụng trí tuệ nhân tạo (AI Computer Vision): tự động nhận diện loại rác khi người dùng đặt vào khay nạp và điều khiển cơ cấu trượt dẫn rác vào đúng thùng phân loại tương ứng.

Tấm pin năng lượng mặt trời gắn trên đỉnh cấp nguồn độc lập, buồng nhận diện rác có camera cảm biến, máng trượt dốc điều hướng xoay linh hoạt và cụm 4 ngăn chứa rác trong suốt riêng biệt (nhựa, kim loại, giấy, rác khác).`,
    ytuong: "Thùng rác thông minh tự vận hành ứng dụng trí tuệ nhân tạo (AI Computer Vision): tự động nhận diện loại rác khi người dùng đặt vào khay nạp và điều khiển cơ cấu trượt dẫn rác vào đúng thùng phân loại tương ứng.",
    cautao: "Tấm pin năng lượng mặt trời gắn trên đỉnh cấp nguồn độc lập, buồng nhận diện rác có camera cảm biến, máng trượt dốc điều hướng xoay linh hoạt và cụm 4 ngăn chứa rác trong suốt riêng biệt (nhựa, kim loại, giấy, rác khác).",
    vatlieu: "Khung hợp kim nhôm và tấm formex chịu lực, pin quang điện mặt trời, bo mạch điều khiển trung tâm, camera HD góc rộng, động cơ servo điều hướng máng trượt và các hộp chứa chuyên dụng.",
    kienthuc: [
      { mon: "Khoa học", noidung: "Đặc tính phân hủy của từng nhóm rác thải và nguyên lý năng lượng mặt trời." },
      { mon: "Công nghệ", noidung: "Mô hình thị giác máy tính AI nhận diện và phân loại vật thể tự động." },
      { mon: "Kỹ thuật", noidung: "Cơ cấu máng trượt phân phối trọng lực trơn tru, không gây kẹt rác." },
      { mon: "Toán học", noidung: "Tính toán độ dốc trượt tự nhiên và góc quay servo chính xác đến từng độ." },
      { mon: "Mĩ thuật", noidung: "Bố cục đối xứng, màu sắc thanh thoát, nhãn nhận diện phân loại rõ ràng." }
    ],
    sangtao: "Tự động hóa hoàn toàn quy trình phân loại rác ngay tại nguồn vứt trực tiếp, hoạt động bền bỉ ngoài trời nhờ nguồn điện mặt trời tự cấp.",
    phattrien: "Kết nối dữ liệu mức rác đầy trong các thùng về trung tâm điều hành qua mạng không dây và tích hợp tính năng quét mã học sinh để cộng điểm rèn luyện.",
    thongdiep: "Chuyển đổi số từ hành động nhỏ nhất – Phân loại rác thông minh vì một Việt Nam xanh."
  },

  // ==========================================================================
  // TỔ STEM - CÔNG NGHỆ
  // ==========================================================================
  {
    id: "stem-cn-01",
    to: "STEM - Công nghệ",
    ten: "Hệ mặt trời bằng động cơ có thể chuyển động được",
    nhom: "CLB Sáng tạo Kỹ thuật STEM",
    anh: "",
    thuvien: [],
    mota: `Mô hình cơ điện tử mô phỏng chuyển động tự quay và quỹ đạo quay quanh Mặt Trời của các hành tinh trong Hệ Mặt Trời theo đúng tỉ lệ chu kỳ vật lý.

Trục đồng trục đa tầng, bộ truyền động bánh răng vi sai in 3D, các cánh tay đòn gắn mô hình hành tinh và quả cầu Mặt Trời phát sáng ở tâm.`,
    ytuong: "Mô hình cơ điện tử mô phỏng chuyển động tự quay và quỹ đạo quay quanh Mặt Trời của các hành tinh trong Hệ Mặt Trời theo đúng tỉ lệ chu kỳ vật lý.",
    cautao: "Trục đồng trục đa tầng, bộ truyền động bánh răng vi sai in 3D, các cánh tay đòn gắn mô hình hành tinh và quả cầu Mặt Trời phát sáng ở tâm.",
    vatlieu: "Bánh răng in 3D PLA, động cơ bước giảm tốc, mạch điều tốc PWM, khung đế nhôm và đèn LED lõi phát sáng.",
    kienthuc: [
      { mon: "Khoa học", noidung: "Quy luật chuyển động của các thiên thể và định luật Kepler." },
      { mon: "Công nghệ", noidung: "Thiết kế in 3D tham số và điều khiển động cơ bước chính xác." },
      { mon: "Kỹ thuật", noidung: "Lắp ráp hệ bánh răng đồng tâm giảm tải ma sát cơ học." },
      { mon: "Toán học", noidung: "Tính toán tỉ số truyền bánh răng tương ứng chu kỳ quỹ đạo." },
      { mon: "Mĩ thuật", noidung: "Vẽ tạo hình chi tiết bề mặt khí quyển các hành tinh." }
    ],
    sangtao: "Chế tạo thành công bộ bánh răng đồng trục thu nhỏ, giúp học sinh quan sát trực quan hiện tượng chuyển động vũ trụ ngay trong lớp học.",
    phattrien: "Kết nối phần mềm điều khiển qua điện thoại để mô phỏng chính xác vị trí thực tế của các hành tinh ngày hôm nay.",
    thongdiep: "Chạm vào những vì sao – Chắp cánh ước mơ chinh phục không gian vũ trụ."
  },
  {
    id: "stem-cn-02",
    to: "STEM - Công nghệ",
    ten: "Sản phẩm phòng cháy chữa cháy",
    nhom: "Đội tuyển Nghiên cứu Kỹ thuật THPT",
    anh: "",
    thuvien: [],
    mota: `Hệ thống phát hiện sớm nguồn lửa và khói thông minh, tự động xoay vòi phun dập lửa tức thì và phát còi báo động khẩn cấp.

Cảm biến ngọn lửa hồng ngoại đa hướng, cảm biến khói, vòi phun áp lực cao định hướng bằng 2 trục động cơ servo và module kích hoạt van điện từ.`,
    ytuong: "Hệ thống phát hiện sớm nguồn lửa và khói thông minh, tự động xoay vòi phun dập lửa tức thì và phát còi báo động khẩn cấp.",
    cautao: "Cảm biến ngọn lửa hồng ngoại đa hướng, cảm biến khói, vòi phun áp lực cao định hướng bằng 2 trục động cơ servo và module kích hoạt van điện từ.",
    vatlieu: "Van điện từ 12V, máy bơm cao áp mini, cảm biến lửa Flame Sensor, động cơ servo chịu lực và còi báo động 110dB.",
    kienthuc: [
      { mon: "Khoa học", noidung: "Bản chất phản ứng cháy và cơ chế làm nguội, cô lập oxy dập lửa." },
      { mon: "Công nghệ", noidung: "Thuật toán quét góc tọa độ 2D định vị tâm ngọn lửa." },
      { mon: "Kỹ thuật", noidung: "Thiết kế khớp xoay cơ khí kim loại chịu nhiệt và chịu áp lực nước." },
      { mon: "Toán học", noidung: "Hình học tọa độ và hàm lượng giác tính góc bắn vòi phun." },
      { mon: "Mĩ thuật", noidung: "Bố cục thiết bị cảnh báo màu đỏ công nghiệp tiêu chuẩn." }
    ],
    sangtao: "Khả năng chủ động xoay vòi dập lửa tự động ngay từ giai đoạn khởi phát đám cháy, hạn chế tối đa nguy cơ cháy lan.",
    phattrien: "Tích hợp camera AI nhận diện khói lửa từ xa và gửi tin nhắn cảnh báo đến lực lượng chức năng.",
    thongdiep: "Công nghệ số bảo vệ tính mạng – An toàn phòng cháy là trách nhiệm của mọi người."
  },
  {
    id: "stem-cn-03",
    to: "STEM - Công nghệ",
    ten: "Cân AI - Khám sức khoẻ cơ bản",
    nhom: "Nhóm Công nghệ Y tế số FPT",
    anh: "",
    thuvien: [],
    mota: `Trạm đo khám sức khỏe học đường tự động: tích hợp đo chiều cao laser, cân nặng, tính chỉ số BMI và ứng dụng AI phân tích thể trạng, đưa ra lời khuyên dinh dưỡng.

Bàn cân cảm biến Loadcell độ chính xác cao, thước đo khoảng cách laser TOF, màn hình cảm ứng tương tác và loa AI giọng nói tiếng Việt.`,
    ytuong: "Trạm đo khám sức khỏe học đường tự động: tích hợp đo chiều cao laser, cân nặng, tính chỉ số BMI và ứng dụng AI phân tích thể trạng, đưa ra lời khuyên dinh dưỡng.",
    cautao: "Bàn cân cảm biến Loadcell độ chính xác cao, thước đo khoảng cách laser TOF, màn hình cảm ứng tương tác và loa AI giọng nói tiếng Việt.",
    vatlieu: "Khung hợp kim chịu lực, cảm biến lực HX711, cảm biến laser khoảng cách, màn hình IPS và bo mạch vi xử lý.",
    kienthuc: [
      { mon: "Khoa học", noidung: "Chỉ số khối cơ thể BMI và dinh dưỡng học thể chất lứa tuổi học sinh." },
      { mon: "Công nghệ", noidung: "Thuật toán xử lý tín hiệu cảm biến và mô hình gợi ý AI." },
      { mon: "Kỹ thuật", noidung: "Kết cấu cơ khí chống rung lắc sai số khi bước lên bàn cân." },
      { mon: "Toán học", noidung: "Công thức toán học BMI = Cân nặng (kg) / [Chiều cao (m)]^2." },
      { mon: "Mĩ thuật", noidung: "Giao diện đồ họa y tế trực quan, thân thiện với học sinh." }
    ],
    sangtao: "Biến quy trình kiểm tra thể trạng định kỳ thành trải nghiệm số hóa sinh động, học sinh nhận ngay đánh giá thể trạng tức thì.",
    phattrien: "Đồng bộ kết quả vào hồ sơ sức khỏe điện tử gửi thông báo cho phụ huynh qua ứng dụng nhà trường.",
    thongdiep: "Thân thể khỏe mạnh – Trí tuệ sáng ngời – Sẵn sàng bước vào kỷ nguyên số."
  },
  {
    id: "stem-cn-04",
    to: "STEM - Công nghệ",
    ten: "Robot bắn bóng",
    nhom: "Đội tuyển Robotics FPT Bắc Giang",
    anh: "",
    thuvien: [],
    mota: `Robot thể thao cơ khí tự hành: tự động thu gom bóng trên sân, nạp đạn liên hoàn và bắn tầm xa vào rổ mục tiêu với độ chính xác cao.

Cơ cấu gắp bóng con lăn cao su, buồng nạp bóng ống xoắn, hai bánh đà tốc độ cao không chổi than và khung gầm 4 bánh Mecanum đa hướng.`,
    ytuong: "Robot thể thao cơ khí tự hành: tự động thu gom bóng trên sân, nạp đạn liên hoàn và bắn tầm xa vào rổ mục tiêu với độ chính xác cao.",
    cautao: "Cơ cấu gắp bóng con lăn cao su, buồng nạp bóng ống xoắn, hai bánh đà tốc độ cao không chổi than và khung gầm 4 bánh Mecanum đa hướng.",
    vatlieu: "Khung nhôm định hình Anode, 4 bánh xe Mecanum, động cơ Brushless, mạch ESC điều tốc và vi điều khiển hiệu năng cao.",
    kienthuc: [
      { mon: "Khoa học", noidung: "Quỹ đạo ném xiên trong trọng trường và hiệu ứng khí động học xoáy bóng Magnus." },
      { mon: "Công nghệ", noidung: "Lập trình điều khiển phối hợp động học 4 bánh xe Mecanum." },
      { mon: "Kỹ thuật", noidung: "Cân bằng động bánh đà bắn bóng tốc độ cao không rung giật." },
      { mon: "Toán học", noidung: "Phương trình parabol tính toán góc bắn và vận tốc nòng bắn." },
      { mon: "Mĩ thuật", noidung: "Kiểu dáng robot chiến binh mạnh mẽ với dải đèn LED cam nhận diện FPT." }
    ],
    sangtao: "Cơ chế nạp bóng liên tục không bị kẹt với tốc độ bắn 3 quả/giây, khả năng lướt ngang linh hoạt trên sân thi đấu.",
    phattrien: "Gắn camera thị giác máy tính nhận diện mục tiêu rổ và tự động căn chỉnh góc ngắm.",
    thongdiep: "Đam mê cơ khí – Khát khao chiến thắng trên đấu trường Robotics đỉnh cao."
  },

  // ==========================================================================
  // TỔ PDP (PHÁT TRIỂN CÁ NHÂN)
  // ==========================================================================
  {
    id: "pdp-01",
    to: "PDP",
    ten: "Jobi là trợ lý hướng nghiệp",
    nhom: "Học sinh THPT & CLB Hướng nghiệp PDP",
    anh: "",
    thuvien: [],
    mota: `Trợ lý số cá nhân hóa giúp học sinh khám phá sở thích, năng lực bản thân qua bài trắc nghiệm tính cách RIASEC và gợi ý các ngành nghề tương lai phù hợp thời đại số.

Ứng dụng web tương tác thân thiện, bộ câu hỏi định hướng tâm lý trắc nghiệm chuẩn quốc tế, bảng radar hiển thị 6 nhóm tính cách và lộ trình chọn trường.`,
    ytuong: "Trợ lý số cá nhân hóa giúp học sinh khám phá sở thích, năng lực bản thân qua bài trắc nghiệm tính cách RIASEC và gợi ý các ngành nghề tương lai phù hợp thời đại số.",
    cautao: "Ứng dụng web tương tác thân thiện, bộ câu hỏi định hướng tâm lý trắc nghiệm chuẩn quốc tế, bảng radar hiển thị 6 nhóm tính cách và lộ trình chọn trường.",
    vatlieu: "Nền tảng mã nguồn mở, cơ sở dữ liệu nghề nghiệp tương lai tại Việt Nam và thuật toán tính điểm phân tích xu hướng.",
    kienthuc: [
      { mon: "Khoa học", noidung: "Tâm lý học hành vi và lý thuyết định hướng nghề nghiệp John Holland." },
      { mon: "Công nghệ", noidung: "Xây dựng ứng dụng web tương tác và xử lý dữ liệu khảo sát." },
      { mon: "Kỹ thuật", noidung: "Thiết kế kiến trúc hệ thống lưu trữ dữ liệu an toàn, bảo mật." },
      { mon: "Toán học", noidung: "Thuật toán tính độ tương đồng bằng ma trận điểm số nghề nghiệp." },
      { mon: "Mĩ thuật", noidung: "Thiết kế giao diện đồ họa thân thiện, biểu tượng nghề nghiệp trực quan." }
    ],
    sangtao: "Số hóa quy trình tư vấn hướng nghiệp học đường, giúp học sinh tự tin tìm ra thế mạnh cá nhân bất cứ lúc nào.",
    phattrien: "Tích hợp trợ lý đối thoại hỗ trợ giải đáp thông tin tuyển sinh các trường đại học hàng đầu và xu hướng nghề nghiệp kỷ nguyên AI.",
    thongdiep: "Thấu hiểu bản thân – Vững bước tương lai – Tự tin chọn đúng ngành nghề mơ ước."
  },

  // ==========================================================================
  // TỔ XÃ HỘI
  // ==========================================================================
  {
    id: "xa-hoi-01",
    to: "Xã hội",
    ten: "Căn cứ 'Tổ trình sát mặt đường' - SP môn Ngữ văn",
    nhom: "Nhóm học sinh khối 9 FPT",
    anh: "",
    thuvien: [],
    mota: `Tái hiện không gian sống và chiến đấu quả cảm của ba nữ thanh niên xung phong tại cao điểm đường Trường Sơn trong tác phẩm văn học 'Những ngôi sao xa xôi'.

Sa bàn cao điểm đồi trọc bị bom cày xới, hang đá nơi trú ẩn của tổ trinh sát, hòm thuốc, radio, đèn dầu và quả bom nổ chậm.`,
    ytuong: "Tái hiện không gian sống và chiến đấu quả cảm của ba nữ thanh niên xung phong tại cao điểm đường Trường Sơn trong tác phẩm văn học 'Những ngôi sao xa xôi'.",
    cautao: "Sa bàn cao điểm đồi trọc bị bom cày xới, hang đá nơi trú ẩn của tổ trinh sát, hòm thuốc, radio, đèn dầu và quả bom nổ chậm.",
    vatlieu: "Thạch cao, xốp định hình, đất sét màu, bìa carton và hệ thống âm thanh mô phỏng tiếng bom nổ, tiếng máy bay.",
    kienthuc: [
      { mon: "Khoa học", noidung: "Địa hình địa mạo tuyến đường Trường Sơn và tác động môi trường của chiến tranh." },
      { mon: "Công nghệ", noidung: "Mạch phát âm thanh MP3 tự động kích hoạt khi có người đến xem." },
      { mon: "Kỹ thuật", noidung: "Đắp nổi sa bàn địa hình 3D tỉ lệ thu nhỏ." },
      { mon: "Toán học", noidung: "Tính toán tỉ lệ bản đồ sa bàn quân sự 1:50." },
      { mon: "Mĩ thuật", noidung: "Kỹ thuật tạo màu giả đá, rêu phong và hiệu ứng khói lửa chiến trường." }
    ],
    sangtao: "Chuyển hóa văn học chữ viết thành không gian trải nghiệm đa giác quan, giúp người xem cảm nhận sâu sắc tinh thần bất khuất của tuổi trẻ Việt Nam.",
    phattrien: "Gắn mã QR thuyết minh Audio Guide song ngữ và ứng dụng thực tế ảo AR chiếu hình ảnh các nữ anh hùng.",
    thongdiep: "Khúc tráng ca Trường Sơn mãi vang vọng trong hành trình chuyển đổi số của thế hệ học sinh FPT."
  },
  {
    id: "xa-hoi-02",
    to: "Xã hội",
    ten: "Xe tăng",
    nhom: "Nhóm học sinh THCS & THPT",
    anh: "",
    thuvien: [],
    mota: `Mô hình xe tăng chiến đấu lịch sử gắn liền với những mốc son chói lọi của Quân đội nhân dân Việt Nam, tích hợp cơ cấu truyền động xích điều khiển từ xa.

Khung gầm bọc thép mô phỏng, hệ thống bánh xích truyền động đôi, tháp pháo quay 360 độ và nòng pháo có đèn LED chớp nháy tạo hiệu ứng tác chiến.`,
    ytuong: "Mô hình xe tăng chiến đấu lịch sử gắn liền với những mốc son chói lọi của Quân đội nhân dân Việt Nam, tích hợp cơ cấu truyền động xích điều khiển từ xa.",
    cautao: "Khung gầm bọc thép mô phỏng, hệ thống bánh xích truyền động đôi, tháp pháo quay 360 độ và nòng pháo có đèn LED chớp nháy tạo hiệu ứng tác chiến.",
    vatlieu: "Nhựa mica, bìa duplex, động cơ giảm tốc DC, bo mạch điều khiển sóng 2.4GHz và pin sạc Lithium.",
    kienthuc: [
      { mon: "Khoa học", noidung: "Lực ma sát bánh xích trên địa hình gồ ghề, dốc đứng." },
      { mon: "Công nghệ", noidung: "Truyền nhận tín hiệu vô tuyến điều khiển từ xa." },
      { mon: "Kỹ thuật", noidung: "Thiết kế hệ truyền động cơ khí bánh răng và khớp xích liên hoàn." },
      { mon: "Toán học", noidung: "Tính toán vận tốc và tỉ số truyền lực giữa các cụm bánh răng." },
      { mon: "Mĩ thuật", noidung: "Phối màu ngụy trang dã chiến quân sự chuẩn xác." }
    ],
    sangtao: "Kết hợp giữa giáo dục lịch sử quân sự dân tộc và kỹ thuật cơ điện tử hiện đại do chính học sinh tự tay lắp ráp.",
    phattrien: "Nâng cấp cảm biến siêu âm tự hành tránh vật cản trong quá trình di chuyển.",
    thongdiep: "Khơi dậy niềm tự hào lịch sử dân tộc bằng đam mê nghiên cứu khoa học kỹ thuật."
  },
  {
    id: "xa-hoi-03",
    to: "Xã hội",
    ten: "Bảo tàng số: Artstep",
    nhom: "Nhóm học sinh khối 10, 11",
    anh: "",
    thuvien: [],
    mota: `Số hóa không gian di sản văn hóa và các tác phẩm lịch sử, mỹ thuật thành không gian bảo tàng 3D thực tế ảo tương tác trực tuyến.

Bảo tàng ảo đa phòng trưng bày, tích hợp góc nhìn 360 độ, bảng thông tin số, âm thanh thuyết minh tương tác và hướng dẫn viên ảo.`,
    ytuong: "Số hóa không gian di sản văn hóa và các tác phẩm lịch sử, mỹ thuật thành không gian bảo tàng 3D thực tế ảo tương tác trực tuyến.",
    cautao: "Bảo tàng ảo đa phòng trưng bày, tích hợp góc nhìn 360 độ, bảng thông tin số, âm thanh thuyết minh tương tác và hướng dẫn viên ảo.",
    vatlieu: "Phần mềm mô hình hóa Artsteps, công cụ dựng hình 3D Blender và tư liệu lịch sử được chuẩn hóa.",
    kienthuc: [
      { mon: "Khoa học", noidung: "Quang học số, góc nhìn thị giác và phối cảnh ba chiều." },
      { mon: "Công nghệ", noidung: "Công nghệ thực tế ảo Virtual Reality (VR) trên nền web." },
      { mon: "Kỹ thuật", noidung: "Tối ưu hóa đa giác 3D và dựng bản đồ ánh sáng cho trình duyệt." },
      { mon: "Toán học", noidung: "Hệ tọa độ không gian 3 chiều (X, Y, Z) và ma trận camera." },
      { mon: "Mĩ thuật", noidung: "Bố cục trưng bày nghệ thuật đương đại và chiếu sáng điểm nhấn." }
    ],
    sangtao: "Đem bảo tàng đến mọi lớp học, cho phép bất kỳ ai cũng có thể chiêm ngưỡng di sản văn hóa chỉ với một cú chạm.",
    phattrien: "Tương thích kính VR di động và nhúng trợ lý ảo giọng nói AI tiếng Việt hướng dẫn du khách tham quan.",
    thongdiep: "Gìn giữ hồn di sản ngàn năm trên đôi cánh công nghệ số hiện đại."
  }

  // ----- MẪU (copy dòng này để thêm sản phẩm mới) -----
  // {
  //   id: "ten-to-so-thu-tu", 
  //   to: "Tiểu học", // 'Xã hội' | 'Tiếng Anh' | 'Tự nhiên' | 'STEM - Công nghệ' | 'PDP' | 'Tiểu học'
  //   ten: "Tên sản phẩm STEM", 
  //   nhom: "Nhóm tác giả / Khối lớp",
  //   anh: "https://drive.google.com/file/d/FILE_ID/view?usp=sharing", 
  //   thuvien: [
  //     { anh: "https://drive.google.com/file/d/FILE_ID_1/view?usp=sharing", caption: "Ảnh bìa" },
  //     { anh: "https://drive.google.com/file/d/FILE_ID_2/view?usp=sharing", caption: "Chi tiết mô hình" }
  //   ],
  //   mota: `Dán nguyên văn nội dung mô tả sản phẩm vào đây (dùng dấu \` \` để xuống dòng tự nhiên).`, 
  //   tailieu: "https://drive.google.com/file/d/FILE_ID_DOC/view?usp=sharing"
  // }
];

// ============================================================================
// HÀM GỘP DỮ LIỆU SẢN PHẨM BỔ SUNG NGUYÊN VĂN VÀ SẢN PHẨM HIỆN CÓ
// ============================================================================
function normalizeVietnamese(str: string): string {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '');
}

function mergeProducts(base: StemProduct[], boSung: BoSungProduct[]): StemProduct[] {
  // Loại bỏ các sản phẩm mẫu / placeholder nếu có
  const result: StemProduct[] = base
    .filter((p) => !p.ten.toLowerCase().includes('đang cập nhật') && p.id !== 'ten-to-so-thu-tu')
    .map((p) => ({ ...p }));

  boSung.forEach((item) => {
    const itemNorms = item.tenCu && item.tenCu.length > 0 
      ? item.tenCu.map(normalizeVietnamese) 
      : [normalizeVietnamese(item.ten)];

    // Khớp theo tổ và tên cũ (không phân biệt hoa thường/dấu)
    const matched = result.find((p) => {
      if (p.to !== item.to) return false;
      const pNorm = normalizeVietnamese(p.ten);
      return itemNorms.some(
        (n) => pNorm === n || (n.length > 5 && pNorm.includes(n)) || (pNorm.length > 5 && n.includes(pNorm))
      );
    });

    if (matched) {
      // Cập nhật tên thành tên mới, thêm nhóm, slogan, mucs
      matched.ten = item.ten;
      if (item.nhom) matched.nhom = item.nhom;
      if (item.slogan) matched.slogan = item.slogan;
      matched.mucs = item.mucs;
      // GIỮ NGUYÊN ảnh và thư viện ảnh đã có (không ghi đè bằng "" hoặc [])
      if (!matched.anh && item.anh) matched.anh = item.anh;
      if ((!matched.thuvien || matched.thuvien.length === 0) && item.thuvien && item.thuvien.length > 0) {
        matched.thuvien = item.thuvien;
      }
    } else {
      // Nếu chưa có trong danh sách thì thêm mới
      result.push({
        id: item.id,
        to: item.to as StemProduct['to'],
        ten: item.ten,
        nhom: item.nhom || '',
        anh: item.anh || '',
        thuvien: item.thuvien || [],
        slogan: item.slogan || '',
        mucs: item.mucs || []
      });
    }
  });

  return result;
}

// Mảng sản phẩm hoàn chỉnh phục vụ toàn bộ ứng dụng
export const products: StemProduct[] = mergeProducts(baseProducts, sanPhamBoSung);

// Danh sách các tổ chuyên môn
export const DEPARTMENTS = [
  'Tất cả',
  'Xã hội',
  'Tiếng Anh',
  'Tự nhiên',
  'STEM - Công nghệ',
  'PDP',
  'Tiểu học'
] as const;

export type DepartmentType = (typeof DEPARTMENTS)[number];

// Màu sắc và cấu hình cho từng tổ
export interface DepartmentConfig {
  name: DepartmentType;
  color: string;
  badgeBg: string;
  badgeText: string;
  activeBg: string;
  borderHover: string;
}

export const DEPARTMENT_CONFIGS: Record<DepartmentType, DepartmentConfig> = {
  'Tất cả': {
    name: 'Tất cả',
    color: 'text-slate-800',
    badgeBg: 'bg-slate-100',
    badgeText: 'text-slate-700',
    activeBg: 'bg-slate-900 text-white',
    borderHover: 'hover:border-slate-400'
  },
  'Xã hội': {
    name: 'Xã hội',
    color: 'text-rose-600',
    badgeBg: 'bg-rose-50',
    badgeText: 'text-rose-700',
    activeBg: 'bg-rose-600 text-white',
    borderHover: 'hover:border-rose-400'
  },
  'Tiếng Anh': {
    name: 'Tiếng Anh',
    color: 'text-[#0066B3]',
    badgeBg: 'bg-sky-50',
    badgeText: 'text-[#0066B3]',
    activeBg: 'bg-[#0066B3] text-white',
    borderHover: 'hover:border-sky-400'
  },
  'Tự nhiên': {
    name: 'Tự nhiên',
    color: 'text-[#00A651]',
    badgeBg: 'bg-emerald-50',
    badgeText: 'text-[#00A651]',
    activeBg: 'bg-[#00A651] text-white',
    borderHover: 'hover:border-emerald-400'
  },
  'STEM - Công nghệ': {
    name: 'STEM - Công nghệ',
    color: 'text-[#F37021]',
    badgeBg: 'bg-orange-50',
    badgeText: 'text-[#F37021]',
    activeBg: 'bg-[#F37021] text-white',
    borderHover: 'hover:border-orange-400'
  },
  'PDP': {
    name: 'PDP',
    color: 'text-purple-600',
    badgeBg: 'bg-purple-50',
    badgeText: 'text-purple-700',
    activeBg: 'bg-purple-600 text-white',
    borderHover: 'hover:border-purple-400'
  },
  'Tiểu học': {
    name: 'Tiểu học',
    color: 'text-amber-600',
    badgeBg: 'bg-amber-50',
    badgeText: 'text-amber-700',
    activeBg: 'bg-amber-600 text-white',
    borderHover: 'hover:border-amber-400'
  }
};
