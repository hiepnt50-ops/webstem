/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface KhoiDoan {
  loai: 'doan';
  noidung: string;
  nhan?: string;
}

export interface KhoiDsItem {
  nhan?: string;
  noidung: string;
  con?: KhoiDsItem[];
}

export interface KhoiDs {
  loai: 'ds';
  kieu: 'cham' | 'so' | string;
  muc: KhoiDsItem[];
}

export interface KhoiBang {
  loai: 'bang';
  cot: string[];
  hang: string[][];
}

export interface KhoiSongNgu {
  loai: 'songngu';
  nhan?: string;
  vi: string;
  en: string;
}

export interface KhoiQA {
  loai: 'qa';
  hoi: string;
  traloi: string;
}

export type KhoiNoiDung = KhoiDoan | KhoiDs | KhoiBang | KhoiSongNgu | KhoiQA;

export interface MucItem {
  tieude: string;
  cap: number;
  khoi: KhoiNoiDung[];
}

export interface BoSungProduct {
  id: string;
  to: 'Xã hội' | 'Tiếng Anh' | 'Tự nhiên' | 'STEM - Công nghệ' | 'PDP' | 'Tiểu học' | string;
  ten: string;
  tenCu: string[];
  nhom: string;
  slogan: string;
  anh: string;
  thuvien: { anh: string; caption?: string }[];
  mucs: MucItem[];
}

// =====================================================================
// data-bo-sung.js  —  NỘI DUNG CHI TIẾT CÁC SẢN PHẨM STEM (trích NGUYÊN VĂN từ các file Word)
// Ngày hội Khoa học Công nghệ và Chuyển đổi số 31/10/2026 — FPT Bắc Giang
//
// CẤU TRÚC MỘT SẢN PHẨM
//   id, to, ten      : mã, tên tổ, tên sản phẩm hiển thị (theo bảng danh sách sản phẩm)
//   tenCu            : các tên cũ/gần giống, dùng để KHỚP với sản phẩm đã có trong data.js
//   nhom, slogan     : nhóm/đơn vị thực hiện, câu slogan (để "" nếu không có)
//   anh, thuvien     : ảnh bìa và thư viện ảnh (link Drive). "" / [] = giữ nguyên ảnh đã có
//   mucs             : danh sách MỤC của bài viết, theo đúng thứ tự trong file Word
//     mục = { tieude, cap, khoi }
//       tieude       : tiêu đề mục (giữ nguyên số thứ tự như "3.1. ..."); "" = không có tiêu đề
//       cap          : 0 = không tiêu đề, 1 = mục lớn, 2 = mục con
//       khoi         : danh sách khối nội dung, mỗi khối có "loai":
//         "doan"     : { nhan?, noidung }  đoạn văn; nhan (nếu có) in đậm đứng trước, kèm dấu ":"
//         "ds"       : { kieu: "cham"|"so", muc: [ { nhan?, noidung, con?: [...] } ] }  danh sách (con = danh sách lồng)
//         "bang"     : { cot: [...], hang: [[...], ...] }  bảng, dòng đầu (cot) là tiêu đề cột
//         "songngu"  : { nhan, vi, en }  hai cột Việt – Anh; chuỗi có "\n" = xuống dòng
//         "qa"       : { hoi, traloi }  câu hỏi và câu trả lời (hiện nhãn "Trả lời:" trước traloi)
//
// LƯU Ý: giữ nguyên văn bản gốc, kể cả chính tả/dấu câu trong file Word. Sửa lỗi chính tả ở file Word rồi xuất lại.
// =====================================================================

export const sanPhamBoSung: BoSungProduct[] = [
  {
    "id": "xh-can-cu-to-trinh-sat",
    "to": "Xã hội",
    "ten": "Căn cứ \"Tổ trình sát mặt đường\" - SP môn Ngữ văn",
    "tenCu": [
      "Căn cứ \"Tổ trình sát mặt đường\" - SP môn Ngữ văn",
      "Căn cứ Tổ trinh sát mặt đường"
    ],
    "nhom": "",
    "slogan": "",
    "anh": "",
    "thuvien": [],
    "mucs": [
      {
        "tieude": "1. TỔNG QUAN SẢN PHẨM",
        "cap": 1,
        "khoi": [
          {
            "loai": "doan",
            "noidung": "Căn cứ \"Tổ trinh sát mặt đường\"",
            "nhan": "Tên sản phẩm"
          },
          {
            "loai": "doan",
            "noidung": "Mô hình tái hiện không gian căn cứ “Tổ trinh sát mặt đường” trên tấm formex khổ A0, giúp người xem hình dung bối cảnh, địa hình và cách bố trí các thành phần trong một không gian hoạt động. Sản phẩm hướng tới học sinh và khách tham quan, kết hợp tìm hiểu lịch sử với thực hành thiết kế, tạo hình và trình bày mô hình.",
            "nhan": "Mô tả ngắn gọn"
          }
        ]
      },
      {
        "tieude": "2. THÔNG SỐ KỸ THUẬT (Bản ngắn gọn)",
        "cap": 1,
        "khoi": [
          {
            "loai": "doan",
            "noidung": "Bảng tóm tắt các thông số cơ bản phục vụ cho việc tra cứu nhanh:"
          },
          {
            "loai": "bang",
            "cot": [
              "Tiêu chí",
              "Thông số chi tiết"
            ],
            "hang": [
              [
                "Kích thước (D x R x C)",
                "118,9 cm x 84,1 cm x 30 cm"
              ],
              [
                "Trọng lượng",
                "2 kg"
              ],
              [
                "Chất liệu",
                "Formex A0 và các vật liệu tạo hình/keo dán theo vật tư thực tế"
              ],
              [
                "Nguồn điện / Pin",
                "Không sử dụng"
              ],
              [
                "Độ tuổi khuyến nghị",
                "Học sinh THCS–THPT và khách tham quan"
              ],
              [
                "Kết nối",
                "Không có kết nối điện tử"
              ],
              [
                "Ngôn ngữ lập trình hỗ trợ",
                "Không áp dụng"
              ],
              [
                "Môi trường hoạt động",
                "Trưng bày trong nhà, trên bề mặt phẳng, khô ráo"
              ]
            ]
          }
        ]
      },
      {
        "tieude": "3. THÔNG TIN CHI TIẾT SẢN PHẨM",
        "cap": 1,
        "khoi": []
      },
      {
        "tieude": "3.1. Giới thiệu chung và Bối cảnh",
        "cap": 2,
        "khoi": [
          {
            "loai": "doan",
            "noidung": "Mô hình “Căn cứ Tổ trinh sát mặt đường” được xây dựng dưới dạng sa bàn trực quan trên tấm formex khổ A0. Thông qua việc lựa chọn bố cục, tạo hình địa hình và sắp xếp các chi tiết, người thực hiện chuyển hóa thông tin và ý tưởng thành một sản phẩm có thể quan sát trực tiếp. Mô hình góp phần làm cho nội dung tìm hiểu về tổ trinh sát và không gian hoạt động trở nên sinh động, dễ tiếp cận hơn.\n\nTrong hoạt động giáo dục STEM, sản phẩm tạo cơ hội cho học sinh vận dụng kiến thức liên môn để thiết kế bản vẽ, ước lượng kích thước, lựa chọn vật liệu, chế tạo các chi tiết và điều chỉnh bố cục. Quá trình thực hiện cũng rèn luyện năng lực giải quyết vấn đề, hợp tác nhóm, sáng tạo và thuyết trình. Các chi tiết lịch sử cụ thể cần được đối chiếu với tư liệu hoặc nội dung tác phẩm được sử dụng làm căn cứ để bảo đảm tính chính xác."
          }
        ]
      },
      {
        "tieude": "3.2. Tính năng và Ưu điểm nổi bật",
        "cap": 2,
        "khoi": [
          {
            "loai": "doan",
            "noidung": "Mô hình có những điểm nổi bật sau:"
          },
          {
            "loai": "ds",
            "kieu": "cham",
            "muc": [
              {
                "nhan": "Tính trực quan",
                "noidung": "Thể hiện không gian căn cứ dưới dạng sa bàn, giúp người xem quan sát tổng thể và nhận diện vị trí tương đối của các chi tiết."
              },
              {
                "nhan": "Tính sáng tạo",
                "noidung": "Tận dụng tấm formex A0 làm nền, kết hợp các vật liệu tạo hình phù hợp để xây dựng địa hình, công trình và các chi tiết minh họa."
              },
              {
                "nhan": "Tính giáo dục và trải nghiệm",
                "noidung": "Có thể sử dụng trong hoạt động giới thiệu sản phẩm, thuyết trình nhóm và trao đổi về cách thiết kế, lựa chọn vật liệu, xử lí tỉ lệ."
              }
            ]
          }
        ]
      },
      {
        "tieude": "3.3. Tích hợp giáo dục S-T-E-M",
        "cap": 2,
        "khoi": [
          {
            "loai": "doan",
            "noidung": "Sản phẩm tích hợp các yếu tố STEM thông qua quá trình thiết kế và chế tạo mô hình:"
          },
          {
            "loai": "doan",
            "noidung": "Tìm hiểu đặc điểm không gian, địa hình và mối liên hệ giữa các thành phần trong mô hình; vận dụng kiến thức về vật liệu và tính chất của vật liệu khi chế tạo.",
            "nhan": "S (Science – Khoa học)"
          },
          {
            "loai": "doan",
            "noidung": "Sử dụng công cụ thiết kế, hình ảnh/tư liệu tham khảo và các dụng cụ thủ công phù hợp để xây dựng, hoàn thiện, ghi nhãn và giới thiệu sản phẩm.",
            "nhan": "T (Technology – Công nghệ)"
          },
          {
            "loai": "doan",
            "noidung": "Thực hiện quy trình xác định ý tưởng, phác thảo bố cục, lựa chọn vật liệu, chế tạo chi tiết, lắp ghép và điều chỉnh để mô hình chắc chắn, dễ quan sát.",
            "nhan": "E (Engineering – Kỹ thuật)"
          },
          {
            "loai": "doan",
            "noidung": "Vận dụng đo đạc, ước lượng, tính toán tỉ lệ, khoảng cách và vị trí tương đối của các chi tiết trên nền formex A0.",
            "nhan": "M (Mathematics – Toán học)"
          }
        ]
      },
      {
        "tieude": "3.4. Danh sách vật tư (Packing List)",
        "cap": 2,
        "khoi": [
          {
            "loai": "doan",
            "noidung": "Vật liệu, dụng cụ dự kiến sử dụng (điều chỉnh theo vật tư thực tế của mô hình):"
          },
          {
            "loai": "ds",
            "kieu": "cham",
            "muc": [
              {
                "noidung": "01 tấm formex khổ A0 làm nền mô hình"
              },
              {
                "noidung": "Vật liệu tạo hình địa hình/công trình và các chi tiết minh họa"
              },
              {
                "noidung": "Keo dán, băng dính, thước đo, bút đánh dấu và dụng cụ cắt phù hợp"
              },
              {
                "noidung": "Tư liệu tham khảo, bản phác thảo bố cục và nội dung thuyết minh sản phẩm"
              }
            ]
          }
        ]
      },
      {
        "tieude": "3.5. Hướng dẫn sử dụng cơ bản & Lưu ý",
        "cap": 2,
        "khoi": [
          {
            "loai": "ds",
            "kieu": "cham",
            "muc": [
              {
                "nhan": "Hướng dẫn",
                "noidung": "Đặt mô hình trên mặt phẳng vững chắc -> giới thiệu tên và ý tưởng sản phẩm -> chỉ dẫn các khu vực/chi tiết theo bố cục -> thuyết minh căn cứ tư liệu và quá trình chế tạo."
              },
              {
                "nhan": "An toàn",
                "noidung": "Khi cắt formex hoặc sử dụng keo, cần có người lớn/giáo viên hướng dẫn; dùng dụng cụ đúng cách, tránh cạnh sắc và bảo quản mô hình ở nơi khô ráo."
              },
              {
                "nhan": "Bảo quản/hỗ trợ",
                "noidung": "Đây là mô hình trưng bày thủ công; bảo quản nơi khô ráo, tránh va đập và đè vật nặng lên các chi tiết. Không áp dụng thông tin bảo hành điện tử nếu sản phẩm không có linh kiện điện tử."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "xh-xe-tang",
    "to": "Xã hội",
    "ten": "Xe tăng",
    "tenCu": [
      "Xe tăng",
      "Mô hình xe tăng"
    ],
    "nhom": "Trường TH, THCS và THPT FPT Bắc Giang – Tổ Xã hội",
    "slogan": "30/4/1975 – Mốc son lịch sử, non sông liền một dải, Việt Nam trọn niềm vui thống nhất!",
    "anh": "",
    "thuvien": [],
    "mucs": [
      {
        "tieude": "",
        "cap": 0,
        "khoi": [
          {
            "loai": "doan",
            "noidung": "Được lấy cảm hứng từ một trong những khoảnh khắc hào hùng nhất của lịch sử dân tộc Việt Nam, mô hình xe tăng do học sinh lớp 12 sáng tạo tái hiện hình ảnh xe tăng tiến vào Dinh Độc Lập ngày 30/4/1975 – thời khắc đánh dấu thắng lợi của Chiến dịch Hồ Chí Minh, giải phóng hoàn toàn miền Nam, thống nhất đất nước."
          },
          {
            "loai": "doan",
            "noidung": "Mô hình nổi bật với màu xanh quân đội mạnh mẽ, hệ thống bánh xích được tạo hình tỉ mỉ, tháp pháo vững chắc và lá cờ đỏ sao vàng tung bay kiêu hãnh trên thân xe. Mỗi chi tiết không chỉ thể hiện sự khéo léo, sáng tạo và tinh thần làm việc của học sinh mà còn góp phần tái hiện khí thế tiến công mạnh mẽ của quân và dân ta trong những ngày tháng lịch sử."
          },
          {
            "loai": "doan",
            "noidung": "Hình ảnh xe tăng húc đổ cổng Dinh Độc Lập đã trở thành biểu tượng bất tử của Đại thắng mùa Xuân năm 1975, khép lại cuộc kháng chiến lâu dài, gian khổ, mở ra kỷ nguyên đất nước độc lập, thống nhất và cùng nhau xây dựng tương lai. Đằng sau khoảnh khắc lịch sử ấy là biết bao hy sinh, mất mát và sự cống hiến của các thế hệ cha anh vì độc lập, tự do của Tổ quốc."
          },
          {
            "loai": "doan",
            "noidung": "Thông qua mô hình, học sinh không chỉ được tìm hiểu lịch sử bằng hình thức trực quan, sinh động mà còn có cơ hội vận dụng kiến thức, phát huy khả năng sáng tạo, tinh thần hợp tác và niềm đam mê khám phá quá khứ. Đây cũng là cách để lịch sử bước ra khỏi những trang sách, trở nên gần gũi và có ý nghĩa hơn đối với thế hệ trẻ hôm nay."
          },
          {
            "loai": "doan",
            "noidung": "Mô hình xe tăng không chỉ tái hiện một dấu mốc vàng son của dân tộc, mà còn gửi gắm thông điệp sâu sắc: Hòa bình hôm nay được đánh đổi bằng biết bao mồ hôi, xương máu của các thế hệ đi trước. Tự hào về quá khứ, trân trọng hiện tại và có trách nhiệm với tương lai chính là cách thế hệ trẻ tiếp nối bản hùng ca dân tộc Việt Nam."
          }
        ]
      }
    ]
  },
  {
    "id": "xh-bao-tang-so-artstep",
    "to": "Xã hội",
    "ten": "Bảo tàng số: Artstep_SP môn Lịch sử",
    "tenCu": [
      "Bảo tàng số: Artstep",
      "Artstep"
    ],
    "nhom": "",
    "slogan": "",
    "anh": "",
    "thuvien": [],
    "mucs": []
  },
  {
    "id": "ta-smart-city",
    "to": "Tiếng Anh",
    "ten": "SMART CITY",
    "tenCu": [
      "SMART CITY",
      "Smart City"
    ],
    "nhom": "Trường TH,THCS và thpt FPT Bắc Giang-Tổ Tiếng Anh",
    "slogan": "",
    "anh": "",
    "thuvien": [],
    "mucs": [
      {
        "tieude": "1. Kịch bản Thuyết trình Song ngữ",
        "cap": 1,
        "khoi": [
          {
            "loai": "songngu",
            "nhan": "Nội dung chính (Core Features)",
            "vi": "Trên sa bàn này thể hiện dự án được vận hành trơn tru nhờ 5 hệ thống thông minh, kết nối mật thiết qua một nền tảng dữ liệu tập trung:\n1. Quản lý rác thải AI: Cảm biến IoT kết hợp AI giúp nhận diện, tự động phân loại rác và theo dõi lượng rác trong thùng theo thời gian thực.\n2. Giao thông thông minh: Hệ thống liên tục phân tích dòng xe để tự điều chỉnh nhịp đèn giao thông và nhanh chóng phát hiện sự cố.\n3. Tòa nhà xanh & Điện mặt trời: Tận dụng tối đa năng lượng mặt trời mái nhà cùng thiết kế xanh giúp giảm thiểu lãng phí điện năng.\n4. Công viên sinh thái: Cảm biến tự động chăm sóc cây xanh và liên tục theo dõi chất lượng không khí cho cư dân.\n5. Digital Twin 3D & Trung tâm IOC: Mô hình 3D ảo phản ánh chính xác thực địa, giúp ban quản lý dễ dàng theo dõi và điều phối mọi hoạt động.",
            "en": "As shown on this model, the project seamlessly brings together 5 smart systems linked through a single unified data platform:\n1. AI Waste Management: Smart IoT sensors and AI automate waste sorting and monitor bin fill levels in real time.\n2. Smart Traffic: Live traffic analysis dynamically adjusts signal timing and quickly spots incidents on the road.\n3. Green Buildings & Solar Energy: Rooftop solar power combines with eco-friendly design to optimize energy consumption.\n4. Eco Park: Automated smart irrigation keeps greens thriving while sensors track air quality around the clock.\n5. 3D Digital Twin & IOC: A live 3D replica of the city allows operators to monitor and manage operations smoothly."
          }
        ]
      },
      {
        "tieude": "2. Bộ Câu hỏi & Trả lời Phản biện (Q&A)",
        "cap": 1,
        "khoi": [
          {
            "loai": "qa",
            "hoi": "Câu hỏi 1: AI được ứng dụng cụ thể như thế nào trong mô hình này?",
            "traloi": "AI đóng vai trò làm 'bộ não' phân tích dữ liệu từ cảm biến IoT. Ví dụ: AI nhận diện phân loại rác qua camera, dự báo lưu lượng giao thông để tối ưu hóa chu kỳ đèn tín hiệu, và phân tích lượng tiêu thụ điện năng của các tòa nhà để cảnh báo lãng phí."
          },
          {
            "loai": "qa",
            "hoi": "Câu hỏi 2: Khái niệm Digital Twin (Bản sao số) hoạt động ra sao trên sa bàn?",
            "traloi": "Digital Twin là mô hình 3D ảo mô phỏng chính xác sa bàn thực tế. Khi cảm biến trên sa bàn ghi nhận sự thay đổi (như nhiệt độ, mật độ xe, chất lượng không khí), dữ liệu truyền về Trung tâm IOC và hiển thị trực quan trên giao diện 3D theo thời gian thực."
          },
          {
            "loai": "qa",
            "hoi": "Câu hỏi 3: Dự án này có tính khả thi khi ứng dụng vào thực tế không?",
            "traloi": "Hoàn toàn khả thi! Các giải pháp như điện mặt trời mái nhà, hệ thống cảm biến môi trường và thu gom rác tự động đều dựa trên những công nghệ đang được triển khai thực tế tại các đô thị hiện đại, phù hợp với định hướng chuyển đổi số xanh hiện nay."
          }
        ]
      }
    ]
  },
  {
    "id": "ta-trai-dat-so",
    "to": "Tiếng Anh",
    "ten": "TRÁI ĐẤT SỐ & PHÁT TRIỂN BỀN VỮNG",
    "tenCu": [
      "TRÁI ĐẤT SỐ & PHÁT TRIỂN BỀN VỮNG",
      "Trái đất số"
    ],
    "nhom": "Trường TH, THCS và THPT FPT Bắc Giang - Tổ Tiếng Anh",
    "slogan": "",
    "anh": "",
    "thuvien": [],
    "mucs": [
      {
        "tieude": "1. Kịch bản Thuyết trình Song ngữ",
        "cap": 1,
        "khoi": [
          {
            "loai": "songngu",
            "nhan": "Nội dung chính (Core Features)",
            "vi": "Mô hình quả cầu thể hiện sự kết hợp hài hòa giữa thiên nhiên và công nghệ qua 4 điểm nhấn chính:\n\n1. Theo dõi từ xa & Kết nối toàn cầu: Vệ tinh cùng mạng lưới IoT giúp cập nhật tình hình khí hậu và môi trường theo thời gian thực.\n2. Dữ liệu đám mây & Ứng dụng Xanh: Lưu trữ thông tin sinh thái trên Cloud và gắn kết cộng đồng qua các ứng dụng di động thân thiện với môi trường.\n3. Năng lượng sạch thông minh: Dùng thuật toán để tối ưu hóa việc sản xuất và tiêu thụ điện mặt trời, điện gió.\n4. Sống xanh & Tuần hoàn: Khuyến khích tái chế, chung tay bảo vệ rừng và đại dương.",
            "en": "The globe highlights the harmony between nature and technology through 4 key features:\n1. Space Monitoring & Global Network: Satellites and IoT networks track climate and environmental updates in real time.\n2. Cloud Data & Eco Apps: Storing ecological data on the Cloud while connecting communities through green apps.\n3. Smart Renewable Energy: Using algorithms to optimize solar and wind energy use.\n4. Circular Living: Promoting recycling and helping protect land and ocean ecosystems."
          }
        ]
      },
      {
        "tieude": "III. Ý NGHĨA VÀ CÂU CHUYỆN ĐẰNG SAU MÔ HÌNH THỦ CÔNG",
        "cap": 1,
        "khoi": [
          {
            "loai": "doan",
            "noidung": "Quả cầu Trái Đất được chúng em nặn tay vô cùng tỉ mỉ bằng đất nặn sinh thái. Mỗi biểu tượng nhỏ trên mô hình đều gửi gắm một thông điệp về sự giao thoa giữa công nghệ và thiên nhiên:"
          },
          {
            "loai": "bang",
            "cot": [
              "Biểu tượng trên mô hình",
              "Yếu tố đại diện",
              "Ý nghĩa Chuyển đổi số & Môi trường"
            ],
            "hang": [
              [
                "Vệ tinh & Sóng Wi-Fi / IoT",
                "Hạ tầng Viễn thông & IoT",
                "Theo dõi tài nguyên từ xa, cập nhật liên tục các dữ liệu môi trường."
              ],
              [
                "Biểu tượng Đám mây (Cloud)",
                "Điện toán đám mây & Eco App",
                "Lưu trữ dữ liệu khí hậu (Big Data) và chạy ứng dụng nhắc nhở lối sống xanh, giảm bớt vết chân carbon."
              ],
              [
                "Động vật (Gấu trúc, Cá voi, Penguin, Kangaroo...)",
                "Đa dạng sinh học 5 châu",
                "Đại diện cho muôn loài cần được bảo vệ sớm nhờ sự trợ giúp của trí tuệ nhân tạo (AI)."
              ],
              [
                "Pin mặt trời & Tuabin gió",
                "Năng lượng tái tạo xanh",
                "Đưa công nghệ số vào ngành năng lượng, giúp phân phối điện thông minh và tiết kiệm hơn."
              ],
              [
                "Biểu tượng Tái chế & Rừng cây",
                "Kinh tế tuần hoàn & Phủ xanh",
                "Giảm rác thải nhựa, dùng công nghệ để theo dõi vòng đời sản phẩm và giữ gìn mảng xanh của rừng."
              ]
            ]
          }
        ]
      },
      {
        "tieude": "IV. GÓC HỎI ĐÁP VÀ PHẢN BIỆN (Q&A)",
        "cap": 1,
        "khoi": [
          {
            "loai": "qa",
            "hoi": "Q1: Mô hình Trái Đất này liên quan thế nào đến chủ đề Chuyển đổi số?",
            "traloi": "Công nghệ số không chỉ để phát triển kinh tế, mà còn là chìa khóa giúp chúng ta bảo vệ hành tinh xanh. Mô hình này cho thấy việc kết hợp AI, IoT, Vệ tinh và Cloud giúp thu thập dữ liệu nhanh chóng, từ đó đưa ra những hành động kịp thời để ứng phó với biến đổi khí hậu và giữ gìn thiên nhiên."
          },
          {
            "loai": "qa",
            "hoi": "Q2: Học sinh FPT đã gửi gắm tinh thần công nghệ gì vào mô hình này?",
            "traloi": "Chúng em áp dụng tư duy thiết kế (Design Thinking) cùng tinh thần sáng tạo xanh. Tuy mô hình làm bằng tay mộc mạc, nhưng nó thể hiện một hệ thống hoàn chỉnh: dữ liệu từ cảm biến -> truyền qua IoT/Cloud -> phân tích bằng AI -> gợi ý hành động bảo vệ môi trường."
          },
          {
            "loai": "qa",
            "hoi": "Q3: Làm sao công nghệ số giúp bảo vệ các loài động vật hoang dã trên mô hình?",
            "traloi": "Nhờ gắn các thiết bị định vị IoT tích hợp AI, các nhà khoa học có thể dễ dàng theo dõi đường đi của cá voi, gấu trúc hay chim cánh cụt... Qua đó phát hiện sớm nguy cơ săn bắt trái phép hay môi trường sống bị suy giáp để có giải pháp bảo vệ kịp thời."
          }
        ]
      }
    ]
  },
  {
    "id": "tn-bio-air-classroom",
    "to": "Tự nhiên",
    "ten": "Hệ thống cảnh báo và giảm thiểu CO2 trong lớp học bằng vi tảo",
    "tenCu": [
      "Hệ thống cảnh báo và giảm thiểu CO2 trong lớp học bằng vi tảo",
      "Bio-Air Classroom"
    ],
    "nhom": "",
    "slogan": "",
    "anh": "",
    "thuvien": [],
    "mucs": [
      {
        "tieude": "1. TỔNG QUAN SẢN PHẨM",
        "cap": 1,
        "khoi": [
          {
            "loai": "ds",
            "kieu": "cham",
            "muc": [
              {
                "nhan": "Tên sản phẩm",
                "noidung": "Hệ thống cảnh báo thông minh và giảm thiểu CO₂ trong lớp học bằng vi tảo (Bio-Air Classroom)"
              },
              {
                "nhan": "Mô tả ngắn gọn",
                "noidung": "Hệ thống tích hợp khối lọc khí sinh học bằng vi tảo Spirulina và hộp giám sát thông minh dùng Arduino giúp tự động đo lường, cảnh báo nồng độ CO₂ theo 3 mức, đồng thời hấp thụ CO₂ và cung cấp O₂ tươi, tạo môi trường học tập an toàn và hướng tới kinh tế tuần hoàn."
              }
            ]
          }
        ]
      },
      {
        "tieude": "2. THÔNG SỐ KỸ THUẬT (Bản ngắn gọn)",
        "cap": 1,
        "khoi": [
          {
            "loai": "bang",
            "cot": [
              "Tiêu chí",
              "Thông số chi tiết"
            ],
            "hang": [
              [
                "Kích thước (D x R x C)",
                "Bể vi tảo 3 lít (chai nhựa tái chế), hộp điều khiển nhỏ gọn"
              ],
              [
                "Trọng lượng",
                "Dưới 2 kg (toàn bộ hệ thống di động)"
              ],
              [
                "Chất liệu",
                "Chai nhựa tái chế (>60% linh kiện tái chế), linh kiện điện tử, vỏ hộp nhựa/bìa kỹ thuật"
              ],
              [
                "Nguồn điện / Pin",
                "Pin 18650 (chạy >30 giờ liên tục, hoạt động độc lập không cần ổ cắm điện)"
              ],
              [
                "Độ tuổi khuyến nghị",
                "Học sinh phổ thông, nhà trường và các không gian làm việc kín"
              ],
              [
                "Kết nối",
                "Giao tiếp phần cứng trực tiếp giữa cảm biến và vi điều khiển"
              ],
              [
                "Ngôn ngữ lập trình hỗ trợ",
                "Arduino (C++)"
              ],
              [
                "Môi trường hoạt động",
                "Lớp học kín, phòng máy tính, thư viện, phòng họp (Nhiệt độ 25–35°C, pH môi trường tảo 8,5–10)"
              ]
            ]
          }
        ]
      },
      {
        "tieude": "3. THÔNG TIN CHI TIẾT SẢN PHẨM",
        "cap": 1,
        "khoi": []
      },
      {
        "tieude": "3.1. Giới thiệu chung và Bối cảnh",
        "cap": 2,
        "khoi": [
          {
            "loai": "ds",
            "kieu": "cham",
            "muc": [
              {
                "nhan": "Nhóm tác giả",
                "noidung": "Lê Linh Anh, Nguyễn Khổng Gia Minh, Đỗ Minh Đức, Đăng Tiến Đạt (Lớp 11A1, Trường TH, THCS và THPT FPT Bắc Giang)."
              },
              {
                "nhan": "Bối cảnh & Vấn đề",
                "noidung": "Các hệ thống lọc không khí hiện nay trên thị trường chủ yếu chỉ lọc được bụi mịn, hoàn toàn không giảm thiểu được khí CO₂ cũng như không cung cấp thêm O₂ tươi cho không gian. Trong các lớp học kín, việc tích tụ nồng độ CO₂ cao dẫn đến tình trạng mệt mỏi, đau頭, buồn ngủ, giảm khả năng tập trung của học sinh."
              },
              {
                "nhan": "Giải pháp",
                "noidung": "Dự án Bio-Air Classroom ra đời nhằm giải quyết đồng thời cả hai vấn đề trên bằng phương pháp sinh học kết hợp công nghệ thông minh, đảm bảo chi phí thấp, thân thiện với môi trường và phù hợp với cơ sở vật chất trường học."
              }
            ]
          }
        ]
      },
      {
        "tieude": "3.2. Tính năng và Ưu điểm nổi bật",
        "cap": 2,
        "khoi": [
          {
            "loai": "ds",
            "kieu": "cham",
            "muc": [
              {
                "nhan": "Xử lý kép bằng sinh học",
                "noidung": "Giải quyết đồng thời việc giảm thiểu CO₂ và cung cấp O₂ tươi nhờ quá trình quang hợp của vi tảo Spirulina (hiệu quả hấp thụ CO₂ gấp 10–50 lần cây xanh thông thường)."
              },
              {
                "nhan": "Chi phí tối ưu & Thân thiện môi trường",
                "noidung": "Thiết kế đơn giản, an toàn, chi phí triển khai dưới 800.000 đồng, với hơn 60% linh kiện sử dụng vật liệu tái chế."
              },
              {
                "nhan": "Cảnh báo thông minh 3 mức",
                "noidung": "Tích hợp cảm biến đo đạc thời gian thực, hệ thống cảnh báo 3 mức (AN TOÀN – KHÔNG KHÍ XẤU – NGUY HIỂM) kết hợp đèn LED, còi Buzzer và màn hình OLED hiển thị rõ ràng các chỉ số kèm khuyến nghị hành động cụ thể cho học sinh/giáo viên."
              },
              {
                "nhan": "Kinh tế tuần hoàn",
                "noidung": "Sinh khối vi tảo Spirulina thu hoạch định kỳ có thể ứng dụng làm phân bón hữu cơ, thức ăn chăn nuôi, mỹ phẩm hoặc thực phẩm chức năng."
              }
            ]
          }
        ]
      },
      {
        "tieude": "3.3. Tích hợp giáo dục S-T-E-M",
        "cap": 2,
        "khoi": [
          {
            "loai": "ds",
            "kieu": "cham",
            "muc": [
              {
                "nhan": "S (Science - Khoa học)",
                "noidung": "Nghiên cứu quá trình quang hợp của vi tảo Spirulina, chu trình chuyển hóa CO₂ thành O₂, các yếu tố ảnh hưởng đến sinh trưởng của vi tảo (nhiệt độ, pH, ánh sáng)."
              },
              {
                "nhan": "T (Technology - Công nghệ)",
                "noidung": "Ứng dụng cảm biến đo khí CO₂ MH-Z19C, cảm biến nhiệt độ/độ ẩm DHT22, màn hình OLED 1.3 inch và mạch vi điều khiển Arduino Uno R3."
              },
              {
                "nhan": "E (Engineering - Kỹ thuật)",
                "noidung": "Lắp đặt hệ thống sục khí sinh học, thiết kế mạch điện, tối ưu hóa cơ cấu cơ khí gọn nhẹ, độc lập nguồn điện bằng pin sạc 18650."
              },
              {
                "nhan": "M (Mathematics - Toán học)",
                "noidung": "Xử lý dữ liệu đo lường nồng độ CO₂ (ppm), tính toán thời gian vận hành, phân tích sai số thực nghiệm (±5%) và thống kê hiệu quả giảm CO₂ theo thời gian."
              }
            ]
          }
        ]
      },
      {
        "tieude": "3.4. Danh sách vật tư (Packing List)",
        "cap": 2,
        "khoi": [
          {
            "loai": "ds",
            "kieu": "cham",
            "muc": [
              {
                "noidung": "01 Bể nuôi vi tảo Spirulina 3 lít (chai nhựa tái chế chứa giống tảo và môi trường dinh dưỡng SOT)"
              },
              {
                "noidung": "01 Máy sục khí mini và ống dẫn khí"
              },
              {
                "noidung": "01 Đèn LED chuyên dụng chiếu sáng quang hợp (16 giờ/ngày, phổ đỏ 660nm và xanh 450nm)"
              },
              {
                "noidung": "01 Bộ điều khiển trung tâm Arduino Uno R3"
              },
              {
                "noidung": "01 Cảm biến đo nồng độ CO₂ MH-Z19C"
              },
              {
                "noidung": "01 Cảm biến nhiệt độ và độ ẩm DHT22"
              },
              {
                "noidung": "01 Màn hình hiển thị OLED 1.3 inch giao tiếp I2C"
              },
              {
                "noidung": "03 Đèn LED cảnh báo (Xanh, Vàng, Đỏ) và còi Buzzer"
              },
              {
                "noidung": "01 Pin sạc 18650 (hoạt động độc lập >30 giờ)"
              }
            ]
          }
        ]
      },
      {
        "tieude": "3.5. Hướng dẫn sử dụng cơ bản & Lưu ý",
        "cap": 2,
        "khoi": [
          {
            "loai": "ds",
            "kieu": "cham",
            "muc": [
              {
                "nhan": "Hướng dẫn sử dụng",
                "noidung": "",
                "con": [
                  {
                    "noidung": "Cấp nguồn cho hệ thống bằng pin 18650 hoặc bật công tắc."
                  },
                  {
                    "noidung": "Hệ thống tự động hút không khí qua bể vi tảo để lọc CO₂ và cảm biến liên tục đo đạc các thông số môi trường."
                  },
                  {
                    "noidung": "Theo dõi màn hình OLED và đèn/buzzer cảnh báo:",
                    "con": [
                      {
                        "nhan": "Mức 0 (An toàn)",
                        "noidung": "LED xanh sáng, hiển thị bình thường."
                      },
                      {
                        "nhan": "Mức 1 (Không khí xấu)",
                        "noidung": "LED vàng, buzzer kêu định kỳ, màn hình hiển thị khuyến nghị mở cửa sổ/cửa ra vào."
                      },
                      {
                        "nhan": "Mức 2 (Nguy hiểm)",
                        "noidung": "LED đỏ, buzzer kêu liên tục, hiển thị cảnh báo khẩn cấp."
                      }
                    ]
                  }
                ]
              },
              {
                "nhan": "Lưu ý & Bảo dưỡng",
                "noidung": "",
                "con": [
                  {
                    "noidung": "Duy trì nhiệt độ môi trường 25–35°C, pH nước nuôi tảo 8,5–10."
                  },
                  {
                    "noidung": "Bổ sung môi trường dinh dưỡng SOT định kỳ 2–3 tuần/lần và thu hoạch sinh khối tảo định kỳ."
                  },
                  {
                    "noidung": "Tránh để nước ngấm trực tiếp vào mạch điện tử và hộp giám sát."
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "tn-phan-loai-rac-ai",
    "to": "Tự nhiên",
    "ten": "Ứng dụng AI chế tạo hệ thống quản lí và phân loại rác tại nơi công cộng, nơi vứt rác trực tiếp",
    "tenCu": [
      "Ứng dụng AI chế tạo hệ thống quản lí và phân loại rác tại nơi công cộng, nơi vứt rác trực tiếp",
      "phân loại rác"
    ],
    "nhom": "",
    "slogan": "",
    "anh": "",
    "thuvien": [],
    "mucs": [
      {
        "tieude": "",
        "cap": 0,
        "khoi": [
          {
            "loai": "doan",
            "noidung": "Ứng dụng AI chế tạo hệ thống quản lí và phân loại rác tại nơi công cộng, nơi vứt rác trực tiếp.",
            "nhan": "Tên giải pháp"
          }
        ]
      },
      {
        "tieude": "Tính mới, tính sáng tạo",
        "cap": 1,
        "khoi": [
          {
            "loai": "doan",
            "noidung": "Mô hình được phát triển nhằm khắc phục hạn chế của việc phân loại rác thủ công, vốn phụ thuộc vào ý thức người dùng và gây quá tải hệ thống xử lí."
          },
          {
            "loai": "doan",
            "noidung": "Sản phẩm ứng dụng AI để phân loại rác tại nguồn, phù hợp với trường học và nơi công cộng."
          },
          {
            "loai": "doan",
            "noidung": "Với thiết kế trực quan, mô hình giúp nâng cao nhận thức và hình thành thói quen bảo vệ môi trường cho học sinh. Đồng thời, hệ thống giảm phụ thuộc lao động thủ công, tăng hiệu quả tái chế và giảm áp lực xử lí phía sau."
          },
          {
            "loai": "doan",
            "noidung": "Việc tích hợp năng lượng mặt trời, pin Lithium cùng Raspberry Pi và Teachable Machine giúp thiết bị hoạt động ổn định, chính xác và liên tục."
          }
        ]
      },
      {
        "tieude": "Cấu tạo và nguyên lý hoạt động",
        "cap": 1,
        "khoi": [
          {
            "loai": "doan",
            "noidung": "SƠ ĐỒ KHỐI"
          },
          {
            "loai": "ds",
            "kieu": "cham",
            "muc": [
              {
                "nhan": "Khối đầu vào",
                "noidung": "(cảm biến camera)"
              },
              {
                "nhan": "Khối xử lý",
                "noidung": "(Raspberry pi, AI Teachable machine)"
              },
              {
                "nhan": "Khối chấp hành",
                "noidung": "(servo)"
              },
              {
                "nhan": "Khối nguồn",
                "noidung": "(Gồm Pin Lithium và pin năng lượng mặt trời)"
              }
            ]
          }
        ]
      },
      {
        "tieude": "Nguyên lí hoạt động",
        "cap": 2,
        "khoi": [
          {
            "loai": "ds",
            "kieu": "cham",
            "muc": [
              {
                "nhan": "Khối nguồn (Gồm Pin Lithium và pin năng lượng mặt trời, mạch sạc)",
                "noidung": "Pin năng lượng mặt trời thông qua mạch sạc tích trữ năng lượng điện cho pin sạc Lithium. Dòng điện một chiều điện áp 12V từ pin qua mạch giảm áp xuống 5V cung cấp năng lượng cho hệ thống làm việc."
              },
              {
                "nhan": "Khối đầu vào (Cảm biến camera)",
                "noidung": "Thu thập dữ liệu hình ảnh đưa vào vi điều khiển Raspberry Pi Camera Module."
              },
              {
                "nhan": "Khối xử lý",
                "noidung": "(Raspberry pi + trí tuệ nhân tạo AI Techable Machine): Nhận dữ liệu từ camera xử lý từ thuật toán AI qua thư viện Teachable Machine để nhận diện các loại rác sau đó đưa thông tin đã được xử lí gửi tín hiệu đến servor, điều khiển servor hoạt động phân loại rác vào ngăn tương ứng."
              },
              {
                "nhan": "Khối chấp hành",
                "noidung": "Qua hai servo quay góc để đưa các loại rác vào đúng thùng chứa."
              }
            ]
          }
        ]
      },
      {
        "tieude": "Khả năng áp dụng",
        "cap": 1,
        "khoi": [
          {
            "loai": "doan",
            "noidung": "Mô hình của chúng em đã được áp dụng tại lớp học 11A1 vào học kì II (Năm học 2025 – 2026) ngay sau khi hoàn thiện sản phẩm. Mong muốn được áp dụng tại các địa điểm công cộng."
          }
        ]
      },
      {
        "tieude": "Hiệu quả của mô hình",
        "cap": 1,
        "khoi": [
          {
            "loai": "doan",
            "noidung": "Phân loại chính xác các loại rác phổ biến (nhựa, giấy, hữu cơ, rác tổng hợp), góp phần giảm ô nhiễm môi trường và tăng tỉ lệ tái chế."
          },
          {
            "loai": "doan",
            "noidung": "Giảm phụ thuộc vào lao động thủ công, hạn chế rủi ro cho người xử lí rác và tiết kiệm nhân lực."
          },
          {
            "loai": "doan",
            "noidung": "Ứng dụng AI và tự động hóa, nâng cao hiệu quả phân loại và hướng tới đô thị thông minh."
          },
          {
            "loai": "doan",
            "noidung": "Sử dụng năng lượng mặt trời kết hợp pin sạc, đảm bảo vận hành liên tục và thân thiện môi trường."
          },
          {
            "loai": "doan",
            "noidung": "Tích hợp Raspberry Pi và Teachable Machine, giúp xử lí nhanh, chính xác, độ trễ thấp và hoạt động ổn định."
          },
          {
            "loai": "doan",
            "noidung": "Mô hình trực quan, dễ triển khai trong giáo dục STEM, góp phần nâng cao ý thức bảo vệ môi trường và phát triển bền vững."
          }
        ]
      }
    ]
  },
  {
    "id": "stem-hologram-he-mat-troi",
    "to": "STEM - Công nghệ",
    "ten": "Hologram hệ mặt trời",
    "tenCu": [
      "Hologram hệ mặt trời",
      "Hệ mặt trời bằng động cơ có thể chuyển động được"
    ],
    "nhom": "",
    "slogan": "",
    "anh": "",
    "thuvien": [],
    "mucs": [
      {
        "tieude": "1. TỔNG QUAN SẢN PHẨM",
        "cap": 1,
        "khoi": [
          {
            "loai": "doan",
            "noidung": "Hologram Hệ Mặt Trời (The Solar System)",
            "nhan": "Tên sản phẩm"
          },
          {
            "loai": "doan",
            "noidung": "Đây là mô hình trình chiếu hình ảnh Mặt Trời và các hành tinh dưới dạng hologram nổi trong một khoang tối, đặt trong khung sân khấu rạp chiếu phim với chủ đề \"Lights, Camera, Explore!\". Sản phẩm dành cho học sinh tiểu học và THCS, giúp các em quan sát trực quan hệ Mặt Trời, hiểu nguyên lý phản xạ ánh sáng và rèn kỹ năng thiết kế, chế tạo mô hình.",
            "nhan": "Mô tả ngắn gọn"
          }
        ]
      },
      {
        "tieude": "2. THÔNG SỐ KỸ THUẬT (Bản ngắn gọn)",
        "cap": 1,
        "khoi": [
          {
            "loai": "doan",
            "noidung": "Bảng tóm tắt các thông số cơ bản phục vụ cho việc tra cứu nhanh:"
          },
          {
            "loai": "bang",
            "cot": [
              "Tiêu chí",
              "Thông số chi tiết"
            ],
            "hang": [
              [
                "Kích thước (D x R x C)",
                "Khoảng 55cm x 30cm x 40cm"
              ],
              [
                "Trọng lượng",
                "Khoảng 2 kg, chưa gồm màn hình"
              ],
              [
                "Chất liệu",
                "Bìa cứng/giấy bồi, tấm mica hoặc phim trong suốt, decal in hình"
              ],
              [
                "Nguồn điện / Pin",
                "Cấp nguồn cho màn hình/thiết bị hiển thị qua điện lưới"
              ],
              [
                "Độ tuổi khuyến nghị",
                "Từ 8 tuổi trở lên (học sinh tiểu học, THCS), có giáo viên hoặc người lớn hướng dẫn"
              ],
              [
                "Kết nối",
                "Cáp HDMI hoặc USB nối màn hình với máy tính"
              ],
              [
                "Ngôn ngữ lập trình hỗ trợ",
                "Không bắt buộc; có thể mở rộng với Scratch hoặc Python để tạo mô phỏng chuyển động các hành tinh"
              ],
              [
                "Môi trường hoạt động",
                "Trong nhà, đặt trên bàn phẳng, nơi ánh sáng yếu để hình ảnh hologram nổi rõ"
              ]
            ]
          }
        ]
      },
      {
        "tieude": "3. THÔNG TIN CHI TIẾT SẢN PHẨM",
        "cap": 1,
        "khoi": []
      },
      {
        "tieude": "3.1. Giới thiệu chung và Bối cảnh",
        "cap": 2,
        "khoi": [
          {
            "loai": "doan",
            "noidung": "Hệ Mặt Trời là nội dung quan trọng của môn Khoa học, nhưng học sinh thường chỉ được tiếp cận qua hình vẽ phẳng trong sách nên khó hình dung vị trí và hình dạng của các thiên thể. Hologram Hệ Mặt Trời được xây dựng để đưa các hành tinh \"bước ra\" khỏi trang sách: hình ảnh hiện lên như đang lơ lửng trong khoang tối, đặt trong khung sân khấu rạp chiếu phim giúp bài học trở nên hấp dẫn hơn."
          },
          {
            "loai": "doan",
            "noidung": "Khi tự thiết kế, lắp ráp và thử nghiệm mô hình, học sinh được tìm hiểu nguyên lý phản xạ ánh sáng trên bề mặt trong suốt để tạo ảo giác hình nổi, đồng thời vận dụng kiến thức thiên văn vào một sản phẩm cụ thể. Qua đó các em học theo hướng \"học qua làm\", phát triển trí tò mò khoa học, sự sáng tạo và kỹ năng làm việc nhóm."
          }
        ]
      },
      {
        "tieude": "3.2. Tính năng và Ưu điểm nổi bật",
        "cap": 2,
        "khoi": [
          {
            "loai": "doan",
            "noidung": "Sản phẩm bao gồm các tính năng chính sau đây, mang lại trải nghiệm học tập vượt trội:"
          },
          {
            "loai": "ds",
            "kieu": "cham",
            "muc": [
              {
                "noidung": "Hiển thị Mặt Trời và các hành tinh dưới dạng hình nổi (hologram) trong khoang tối, nhìn rõ từ phía trước mà không cần kính đặc biệt."
              },
              {
                "noidung": "Thiết kế khung sân khấu rạp chiếu phim với tiêu đề \"The Solar System\", hình phi hành gia và rèm đỏ sinh động, thu hút học sinh khi trưng bày và thuyết trình."
              },
              {
                "noidung": "Chi phí thấp, dễ chế tạo và tái sử dụng; có thể thay đổi nội dung hình ảnh/video để trình chiếu các chủ đề khác như Trái Đất – Mặt Trăng, các hành tinh hoặc các chòm sao."
              }
            ]
          }
        ]
      },
      {
        "tieude": "3.3. Tích hợp giáo dục S-T-E-M",
        "cap": 2,
        "khoi": [
          {
            "loai": "doan",
            "noidung": "Sản phẩm đáp ứng đầy đủ các tiêu chí của giáo dục STEM qua các khía cạnh:"
          },
          {
            "loai": "doan",
            "noidung": "Tìm hiểu cấu trúc hệ Mặt Trời (Mặt Trời và các hành tinh, thứ tự và quỹ đạo), cùng hiện tượng phản xạ và truyền qua của ánh sáng trên bề mặt trong suốt.",
            "nhan": "S (Science - Khoa học)"
          },
          {
            "loai": "doan",
            "noidung": "Làm quen với công nghệ hiển thị hình ảnh, trình chiếu video và mô phỏng thiên văn bằng phần mềm; có thể mở rộng sang thiết kế hoạt ảnh.",
            "nhan": "T (Technology - Công nghệ)"
          },
          {
            "loai": "doan",
            "noidung": "Thực hành quy trình thiết kế kỹ thuật: làm khung và buồng tối, chọn góc đặt tấm trong suốt, bố trí màn hình, thử nghiệm và điều chỉnh để hình ảnh nổi rõ nhất.",
            "nhan": "E (Engineering - Kỹ thuật)"
          },
          {
            "loai": "doan",
            "noidung": "Vận dụng định luật phản xạ ánh sáng (góc tới bằng góc phản xạ), đo đạc kích thước khung, tính tỉ lệ kích thước và khoảng cách giữa các hành tinh khi mô phỏng.",
            "nhan": "M (Mathematics - Toán học)"
          }
        ]
      },
      {
        "tieude": "3.4. Danh sách vật tư (Packing List)",
        "cap": 2,
        "khoi": [
          {
            "loai": "doan",
            "noidung": "Trong một hộp sản phẩm tiêu chuẩn bao gồm:"
          },
          {
            "loai": "ds",
            "kieu": "so",
            "muc": [
              {
                "noidung": "01 Khung mô hình bằng bìa cứng, dán decal sân khấu \"The Solar System\""
              },
              {
                "noidung": "01 Buồng tối (mặt trong phủ màu đen) để làm nổi hình ảnh"
              },
              {
                "noidung": "01 Tấm mica hoặc phim trong suốt kèm khung giữ"
              },
              {
                "noidung": "01 Màn hình/thiết bị hiển thị và bộ dây nguồn, dây kết nối"
              },
              {
                "noidung": "01 Tệp video/hình ảnh hệ Mặt Trời dùng để trình chiếu hologram"
              }
            ]
          }
        ]
      },
      {
        "tieude": "3.5. Hướng dẫn sử dụng cơ bản & Lưu ý",
        "cap": 2,
        "khoi": [
          {
            "loai": "ds",
            "kieu": "cham",
            "muc": [
              {
                "nhan": "Hướng dẫn",
                "noidung": "Đặt mô hình trên bàn phẳng -> Kết nối màn hình với máy tính và cấp nguồn -> Mở video hệ Mặt Trời ở chế độ toàn màn hình -> Giảm ánh sáng xung quanh -> Quan sát hình hologram từ phía trước khung."
              },
              {
                "nhan": "An toàn",
                "noidung": "Cẩn thận với cạnh của tấm mica/phim và khung bìa; đặt màn hình chắc chắn để tránh rơi đổ; giữ dây điện gọn gàng, không để nước dính vào thiết bị điện; người lớn hỗ trợ khi trẻ nhỏ sử dụng. Có các chi tiết nhỏ, không phù hợp cho trẻ dưới 3 tuổi."
              },
              {
                "nhan": "Bảo hành",
                "noidung": "Theo thỏa thuận với đơn vị phát triển; hỗ trợ kỹ thuật khi cần."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "stem-phong-chay-chua-chay",
    "to": "STEM - Công nghệ",
    "ten": "Sản phẩm phòng cháy chữa cháy",
    "tenCu": [
      "Sản phẩm phòng cháy chữa cháy",
      "Hệ thống chữa cháy thông minh"
    ],
    "nhom": "",
    "slogan": "",
    "anh": "",
    "thuvien": [],
    "mucs": [
      {
        "tieude": "1. TỔNG QUAN SẢN PHẨM",
        "cap": 1,
        "khoi": [
          {
            "loai": "doan",
            "noidung": "Hệ thống chữa cháy thông minh",
            "nhan": "Tên sản phẩm"
          },
          {
            "loai": "doan",
            "noidung": "Đây là mô hình bằng gỗ gồm khoang điều khiển phía trên (vi điều khiển, rơ-le, còi báo động, hộp pin) và khoang mô phỏng phía dưới có vòi phun nước gắn trên động cơ servo. Khi cảm biến phát hiện lửa, hệ thống phát còi cảnh báo, xoay vòi phun về hướng đám cháy và kích hoạt phun nước để dập lửa. Sản phẩm dành cho học sinh THCS và THPT, giúp các em làm quen với điện tử, lập trình điều khiển và kiến thức phòng cháy chữa cháy (PCCC).",
            "nhan": "Mô tả ngắn gọn"
          }
        ]
      },
      {
        "tieude": "2. THÔNG SỐ KỸ THUẬT (Bản ngắn gọn)",
        "cap": 1,
        "khoi": [
          {
            "loai": "doan",
            "noidung": "Bảng tóm tắt các thông số cơ bản phục vụ cho việc tra cứu nhanh:"
          },
          {
            "loai": "bang",
            "cot": [
              "Tiêu chí",
              "Thông số chi tiết"
            ],
            "hang": [
              [
                "Kích thước (D x R x C)",
                "Khoảng 50cm x 30cm x 30cm"
              ],
              [
                "Trọng lượng",
                "Khoảng 3 kg"
              ],
              [
                "Chất liệu",
                "Gỗ ghép (khung và đế), nhựa, linh kiện điện tử"
              ],
              [
                "Nguồn điện / Pin",
                "Hộp pin rời có công tắc, kết hợp cổng USB (cấp nguồn/nạp chương trình)"
              ],
              [
                "Độ tuổi khuyến nghị",
                "Từ 10 tuổi trở lên (học sinh THCS, THPT), có giáo viên hoặc người lớn hướng dẫn"
              ],
              [
                "Kết nối",
                "Đấu nối trực tiếp bằng dây (bo mạch thử/breadboard); cổng USB để nạp chương trình"
              ],
              [
                "Ngôn ngữ lập trình hỗ trợ",
                "Arduino C/C++ (có thể dùng lập trình khối lệnh)"
              ],
              [
                "Môi trường hoạt động",
                "Trong nhà, trên mặt phẳng khô ráo; chỉ thử nghiệm với nguồn lửa nhỏ dưới sự giám sát của giáo viên"
              ]
            ]
          }
        ]
      },
      {
        "tieude": "3. THÔNG TIN CHI TIẾT SẢN PHẨM",
        "cap": 1,
        "khoi": []
      },
      {
        "tieude": "3.1. Giới thiệu chung và Bối cảnh",
        "cap": 2,
        "khoi": [
          {
            "loai": "doan",
            "noidung": "Cháy nổ là một trong những rủi ro nghiêm trọng đối với nhà ở, trường học và khu dân cư, trong khi kiến thức và kỹ năng PCCC của học sinh còn thiên về lý thuyết, ít cơ hội thực hành. Hệ thống chữa cháy thông minh được xây dựng nhằm biến nội dung này thành một dự án học tập trực quan: học sinh tự lắp ráp, đấu nối, lập trình và thử nghiệm một hệ thống tự động phát hiện lửa và chữa cháy trên mô hình gỗ."
          },
          {
            "loai": "doan",
            "noidung": "Mô hình được thiết kế dạng mở: toàn bộ mạch điều khiển đặt ở khoang phía trên, cơ cấu phun nước ở khoang phía dưới, giúp học sinh dễ quan sát từng bộ phận hoạt động, dễ tháo lắp, chỉnh sửa. Qua đó các em học theo hướng \"học qua làm\", rèn tư duy giải quyết vấn đề, làm việc nhóm và hình thành ý thức an toàn cho bản thân và cộng đồng."
          }
        ]
      },
      {
        "tieude": "3.2. Tính năng và Ưu điểm nổi bật",
        "cap": 2,
        "khoi": [
          {
            "loai": "doan",
            "noidung": "Sản phẩm bao gồm các tính năng chính sau đây, mang lại trải nghiệm học tập vượt trội:"
          },
          {
            "loai": "ds",
            "kieu": "cham",
            "muc": [
              {
                "noidung": "Cảm biến lửa gắn cùng vòi phun trên cơ cấu servo, giúp hệ thống phát hiện đám cháy và xoay vòi phun về đúng hướng cần chữa."
              },
              {
                "nhan": "Tự động hóa toàn bộ quy trình",
                "noidung": "phát hiện lửa, phát còi báo động và kích hoạt phun nước thông qua mô-đun rơ-le, không cần thao tác thủ công."
              },
              {
                "noidung": "Cấu trúc mở bằng gỗ, dùng bo mạch thử và dây nối nên dễ thay đổi sơ đồ, thay linh kiện và mở rộng thêm cảm biến hoặc chức năng mới cho các dự án sáng tạo riêng."
              }
            ]
          }
        ]
      },
      {
        "tieude": "3.3. Tích hợp giáo dục S-T-E-M",
        "cap": 2,
        "khoi": [
          {
            "loai": "doan",
            "noidung": "Sản phẩm đáp ứng đầy đủ các tiêu chí của giáo dục STEM qua các khía cạnh:"
          },
          {
            "loai": "doan",
            "noidung": "Tìm hiểu điều kiện xảy ra sự cháy (tam giác lửa: nhiên liệu – oxy – nhiệt), bức xạ hồng ngoại từ ngọn lửa mà cảm biến phát hiện và nguyên lý dập lửa bằng nước.",
            "nhan": "S (Science - Khoa học)"
          },
          {
            "loai": "doan",
            "noidung": "Làm quen với cảm biến lửa, vi điều khiển, mô-đun rơ-le, động cơ servo và còi báo động trong một hệ thống điều khiển tự động.",
            "nhan": "T (Technology - Công nghệ)"
          },
          {
            "loai": "doan",
            "noidung": "Thực hành quy trình thiết kế kỹ thuật: làm khung gỗ, bố trí khoang điều khiển, lắp cơ cấu servo và vòi phun, đi dây, thử nghiệm và cải tiến hệ thống.",
            "nhan": "E (Engineering - Kỹ thuật)"
          },
          {
            "loai": "doan",
            "noidung": "Điều khiển góc quay của servo, thiết lập ngưỡng cảm biến, tính thời gian phun nước và vận dụng tư duy thuật toán (điều kiện, vòng lặp).",
            "nhan": "M (Mathematics - Toán học)"
          }
        ]
      },
      {
        "tieude": "3.4. Danh sách vật tư (Packing List)",
        "cap": 2,
        "khoi": [
          {
            "loai": "doan",
            "noidung": "Trong một hộp sản phẩm tiêu chuẩn bao gồm:"
          },
          {
            "loai": "ds",
            "kieu": "so",
            "muc": [
              {
                "noidung": "01 Khung mô hình bằng gỗ kèm đế"
              },
              {
                "noidung": "01 Vi điều khiển, bo mạch thử (breadboard) và bộ dây nối"
              },
              {
                "noidung": "01 Cảm biến lửa và 01 còi báo động"
              },
              {
                "noidung": "02 Mô-đun rơ-le và 01 hộp pin có công tắc"
              },
              {
                "noidung": "01 Động cơ servo kèm giá đỡ, vòi phun và ống dẫn nước"
              }
            ]
          }
        ]
      },
      {
        "tieude": "3.5. Hướng dẫn sử dụng cơ bản & Lưu ý",
        "cap": 2,
        "khoi": [
          {
            "loai": "ds",
            "kieu": "cham",
            "muc": [
              {
                "nhan": "Hướng dẫn",
                "noidung": "Bật công tắc hộp pin/cấp nguồn -> Nạp chương trình điều khiển -> Đặt nguồn lửa nhỏ trước cảm biến -> Quan sát còi báo động, servo xoay vòi phun và hệ thống phun nước dập lửa."
              },
              {
                "nhan": "An toàn",
                "noidung": "Chỉ thử nghiệm với nguồn lửa nhỏ, có giáo viên hoặc người lớn giám sát và chuẩn bị sẵn dụng cụ dập lửa; giữ mạch điện và pin khô ráo, tránh để nước bắn vào khoang điều khiển. Có các chi tiết nhỏ, không phù hợp cho trẻ dưới 3 tuổi."
              },
              {
                "nhan": "Bảo hành",
                "noidung": "Theo thỏa thuận với đơn vị phát triển; hỗ trợ kỹ thuật khi cần."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "stem-can-ai",
    "to": "STEM - Công nghệ",
    "ten": "Cân AI - Khám sức khoẻ cơ bản",
    "tenCu": [
      "Cân AI - Khám sức khoẻ cơ bản",
      "Cân AI"
    ],
    "nhom": "",
    "slogan": "",
    "anh": "",
    "thuvien": [],
    "mucs": [
      {
        "tieude": "1. TỔNG QUAN SẢN PHẨM",
        "cap": 1,
        "khoi": [
          {
            "loai": "doan",
            "noidung": "Cân AI – Thiết bị đo chỉ số cơ thể và tư vấn sức khỏe theo BMI",
            "nhan": "Tên sản phẩm"
          },
          {
            "loai": "doan",
            "noidung": "Cân AI là thiết bị dạng cột đứng làm từ ống PVC, đo được chiều cao, cân nặng, nhịp tim và nồng độ oxy trong máu (SpO2) chỉ trong một lần đo. Hệ thống tự tính chỉ số BMI và đưa ra lời tư vấn sức khỏe bằng AI dựa trên chỉ số này.",
            "nhan": "Mô tả ngắn gọn"
          }
        ]
      },
      {
        "tieude": "2. THÔNG SỐ KỸ THUẬT (Bản ngắn gọn)",
        "cap": 1,
        "khoi": [
          {
            "loai": "doan",
            "noidung": "Bảng tóm tắt các thông số cơ bản phục vụ cho việc tra cứu nhanh:"
          },
          {
            "loai": "bang",
            "cot": [
              "Tiêu chí",
              "Thông số chi tiết"
            ],
            "hang": [
              [
                "Kích thước (D x R x C)",
                "Khoảng 50cm x 50cm x 200cm"
              ],
              [
                "Trọng lượng",
                "Khoảng 5 kg"
              ],
              [
                "Chất liệu",
                "Ống và co nối nhựa PVC, bệ cân mặt kính/mica, linh kiện điện tử"
              ],
              [
                "Nguồn điện / Pin",
                "Bộ nguồn adapter 5V cắm điện lưới"
              ],
              [
                "Độ tuổi khuyến nghị",
                "Từ 10 tuổi trở lên (học sinh THCS, THPT), có giáo viên hoặc người lớn hướng dẫn"
              ],
              [
                "Kết nối",
                "Wi-Fi (kết nối dịch vụ AI tư vấn), USB (nạp chương trình)"
              ],
              [
                "Ngôn ngữ lập trình hỗ trợ",
                "Arduino C/C++"
              ],
              [
                "Môi trường hoạt động",
                "Trong nhà, đặt trên nền phẳng, khô ráo, gần ổ cắm điện"
              ]
            ]
          }
        ]
      },
      {
        "tieude": "3. THÔNG TIN CHI TIẾT SẢN PHẨM",
        "cap": 1,
        "khoi": []
      },
      {
        "tieude": "3.1. Giới thiệu chung và Bối cảnh",
        "cap": 2,
        "khoi": [
          {
            "loai": "doan",
            "noidung": "Kiểm tra sức khỏe định kỳ là việc quan trọng với học sinh, nhưng việc đo chiều cao, cân nặng, nhịp tim, SpO2 thường phải dùng nhiều thiết bị riêng lẻ, tốn thời gian và học sinh ít khi hiểu các chỉ số đó nói lên điều gì. Cân AI được xây dựng để tích hợp các phép đo vào một thiết bị duy nhất, đồng thời dùng AI để giải thích kết quả và đưa ra lời khuyên dễ hiểu theo chỉ số BMI."
          },
          {
            "loai": "doan",
            "noidung": "Khi tự lắp ráp, hiệu chuẩn và lập trình sản phẩm, học sinh được tiếp cận cảm biến siêu âm, cảm biến lực, cảm biến quang học đo nhịp tim – SpO2, vi điều khiển và ứng dụng AI vào một bài toán gần gũi với đời sống. Qua đó các em học theo hướng \"học qua làm\", hiểu rõ cách số liệu được đo, xử lý và chuyển thành thông tin hữu ích cho sức khỏe."
          }
        ]
      },
      {
        "tieude": "3.2. Tính năng và Ưu điểm nổi bật",
        "cap": 2,
        "khoi": [
          {
            "loai": "doan",
            "noidung": "Sản phẩm bao gồm các tính năng chính sau đây, mang lại trải nghiệm học tập vượt trội:"
          },
          {
            "loai": "ds",
            "kieu": "cham",
            "muc": [
              {
                "nhan": "Đo 4 chỉ số trong một lần đứng",
                "noidung": "chiều cao (cảm biến siêu âm ở đỉnh khung), cân nặng (cảm biến lực ở bệ cân), nhịp tim và nồng độ oxy trong máu SpO2."
              },
              {
                "noidung": "Tự động tính BMI, hiển thị kết quả trên màn hình và đọc kết quả bằng loa, giúp người dùng theo dõi dễ dàng."
              },
              {
                "nhan": "Tư vấn bằng AI theo BMI",
                "noidung": "đánh giá mức thể trạng và gợi ý về dinh dưỡng, vận động phù hợp; khung PVC chắc chắn, dễ lắp đặt và tháo rời."
              }
            ]
          }
        ]
      },
      {
        "tieude": "3.3. Tích hợp giáo dục S-T-E-M",
        "cap": 2,
        "khoi": [
          {
            "loai": "doan",
            "noidung": "Sản phẩm đáp ứng đầy đủ các tiêu chí của giáo dục STEM qua các khía cạnh:"
          },
          {
            "loai": "doan",
            "noidung": "Tìm hiểu lực và khối lượng (cảm biến lực), sóng siêu âm và tốc độ truyền âm, nguyên lý đo SpO2 dựa trên sự hấp thụ ánh sáng của máu, cùng mối liên hệ giữa BMI và sức khỏe.",
            "nhan": "S (Science - Khoa học)"
          },
          {
            "loai": "doan",
            "noidung": "Làm quen với cảm biến siêu âm, cảm biến lực, cảm biến nhịp tim – SpO2, vi điều khiển, màn hình, loa và ứng dụng trí tuệ nhân tạo qua kết nối Wi-Fi.",
            "nhan": "T (Technology - Công nghệ)"
          },
          {
            "loai": "doan",
            "noidung": "Thực hành quy trình thiết kế kỹ thuật: dựng khung PVC, làm bệ cân, bố trí cảm biến, đi dây, hiệu chuẩn và cải tiến độ chính xác của thiết bị.",
            "nhan": "E (Engineering - Kỹ thuật)"
          },
          {
            "loai": "doan",
            "noidung": "Chiều cao = chiều cao khung – khoảng cách đo được (khoảng cách = vận tốc âm × thời gian ÷ 2); BMI = cân nặng (kg) ÷ chiều cao² (m²); hiệu chuẩn tuyến tính, lấy trung bình để lọc nhiễu và tư duy thuật toán.",
            "nhan": "M (Mathematics - Toán học)"
          }
        ]
      },
      {
        "tieude": "3.4. Danh sách vật tư (Packing List)",
        "cap": 2,
        "khoi": [
          {
            "loai": "doan",
            "noidung": "Trong một hộp sản phẩm tiêu chuẩn bao gồm:"
          },
          {
            "loai": "ds",
            "kieu": "so",
            "muc": [
              {
                "noidung": "01 Khung ống PVC (cột đo) kèm bệ đứng"
              },
              {
                "noidung": "01 Hộp điều khiển gồm vi điều khiển, màn hình hiển thị và mạch xử lý tín hiệu"
              },
              {
                "noidung": "01 Cảm biến siêu âm (đo chiều cao) và cảm biến lực (đo cân nặng)"
              },
              {
                "noidung": "01 Cảm biến nhịp tim – SpO2 và 02 loa phát âm thanh"
              },
              {
                "noidung": "01 Bộ nguồn adapter, dây nối và phụ kiện lắp đặt"
              }
            ]
          }
        ]
      },
      {
        "tieude": "3.5. Hướng dẫn sử dụng cơ bản & Lưu ý",
        "cap": 2,
        "khoi": [
          {
            "loai": "ds",
            "kieu": "cham",
            "muc": [
              {
                "nhan": "Hướng dẫn",
                "noidung": "Cắm nguồn -> Chờ thiết bị khởi động -> Đứng thẳng trên bệ cân, hai chân đặt đúng vị trí -> Thực hiện đo nhịp tim – SpO2 theo hướng dẫn trên màn hình -> Xem và nghe kết quả cùng lời tư vấn AI theo BMI."
              },
              {
                "nhan": "An toàn",
                "noidung": "Kết quả chỉ mang tính tham khảo phục vụ học tập, không thay thế thiết bị y tế hay tư vấn của bác sĩ. Giữ thiết bị khô ráo, cố định khung chắc chắn để tránh đổ, người lớn hỗ trợ khi trẻ nhỏ sử dụng. Có các chi tiết nhỏ, không phù hợp cho trẻ dưới 3 tuổi."
              },
              {
                "nhan": "Bảo hành",
                "noidung": "Theo thỏa thuận với đơn vị phát triển; hỗ trợ kỹ thuật khi cần."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "stem-robot-ban-bong",
    "to": "STEM - Công nghệ",
    "ten": "Robot bắn bóng",
    "tenCu": [
      "Robot bắn bóng"
    ],
    "nhom": "",
    "slogan": "",
    "anh": "",
    "thuvien": [],
    "mucs": []
  },
  {
    "id": "pdp-jobi",
    "to": "PDP",
    "ten": "Jobi - Trợ lý hướng nghiệp",
    "tenCu": [
      "Jobi - Trợ lý hướng nghiệp",
      "Jobi là trợ lý hướng nghiệp"
    ],
    "nhom": "",
    "slogan": "",
    "anh": "",
    "thuvien": [],
    "mucs": [
      {
        "tieude": "1. TỔNG QUAN SẢN PHẨM",
        "cap": 1,
        "khoi": [
          {
            "loai": "doan",
            "noidung": "Jobi – Robot hướng nghiệp ứng dụng trí tuệ nhân tạo (AI) cho học sinh FPT School Bắc Giang.",
            "nhan": "Tên sản phẩm"
          },
          {
            "loai": "doan",
            "noidung": "Jobi là robot trò chuyện bằng giọng nói tiếng Việt, được chế tạo từ một máy tính bảng đặt trong mô hình đầu robot, giúp học sinh THCS và THPT khám phá bản thân, lựa chọn ngành học và trường học phù hợp thông qua quy trình tư vấn hướng nghiệp bài bản. Sản phẩm hướng tới mục tiêu đưa công nghệ AI vào hoạt động hướng nghiệp tại nhà trường với chi phí thấp, dễ triển khai và dễ nhân rộng.",
            "nhan": "Mô tả ngắn gọn"
          }
        ]
      },
      {
        "tieude": "2. THÔNG SỐ KỸ THUẬT",
        "cap": 1,
        "khoi": [
          {
            "loai": "bang",
            "cot": [
              "Tiêu chí",
              "Thông số chi tiết"
            ],
            "hang": [
              [
                "Kích thước (D x R x C)",
                "Khoảng 30 x 32 x 28 cm (mô hình đầu robot trưng bày), màn hình cảm ứng 11 inch độ phân giải 2880 x 1800"
              ],
              [
                "Trọng lượng",
                "Khoảng 1,5 kg (gồm máy tính bảng 490 g và mô hình đầu robot)"
              ],
              [
                "Chất liệu",
                "Mô hình đầu robot bằng bìa carton và vật liệu mô hình nhẹ, trang trí tai và ăng-ten; máy tính bảng khung nhôm, mặt kính cảm ứng"
              ],
              [
                "Nguồn điện / Pin",
                "Pin 8.840 mAh tích hợp trong máy tính bảng, sạc nhanh 33W qua cổng USB-C; sử dụng liên tục khoảng 6–8 giờ"
              ],
              [
                "Độ tuổi khuyến nghị",
                "Học sinh từ 11 tuổi trở lên (THCS và THPT)"
              ],
              [
                "Kết nối",
                "Wi-Fi (kết nối máy chủ AI qua giao thức WebSocket), USB-C để sạc"
              ],
              [
                "Ngôn ngữ lập trình hỗ trợ",
                "Kotlin (ứng dụng Android); nền tảng Xiaozhi mã nguồn mở; cấu hình trợ lý AI và bộ tri thức trên xiaozhi.me"
              ],
              [
                "Môi trường hoạt động",
                "Trong nhà: lớp học, phòng hướng nghiệp, gian trưng bày; đặt trên mặt phẳng khô ráo, có kết nối Wi-Fi"
              ]
            ]
          }
        ]
      },
      {
        "tieude": "3. THÔNG TIN CHI TIẾT SẢN PHẨM",
        "cap": 1,
        "khoi": []
      },
      {
        "tieude": "3.1. Giới thiệu chung và Bối cảnh",
        "cap": 2,
        "khoi": [
          {
            "loai": "doan",
            "noidung": "Chọn ngành, chọn trường là quyết định quan trọng nhưng cũng là bài toán khó với nhiều học sinh: không ít em đến lớp 12 vẫn chưa biết mình thích gì, mạnh ở đâu; việc chọn tổ hợp môn theo Chương trình Giáo dục phổ thông 2018 phải thực hiện ngay từ lớp 10 khiến áp lực định hướng đến sớm hơn, trong khi mỗi giáo viên hướng nghiệp phải phụ trách hàng trăm học sinh nên khó tư vấn sâu cho từng em. Tại FPT School Bắc Giang, hoạt động hướng nghiệp nằm trong chương trình Phát triển cá nhân (PDP) của nhà trường, đặt ra nhu cầu về một \"trạm tư vấn\" thân thiện, luôn sẵn sàng, giúp học sinh bắt đầu hành trình khám phá bản thân mọi lúc."
          },
          {
            "loai": "doan",
            "noidung": "Từ bối cảnh đó, dự án Jobi ra đời với ý tưởng biến một chiếc máy tính bảng phổ thông thành robot hướng nghiệp ứng dụng trí tuệ nhân tạo: học sinh chỉ cần chạm vào khuôn mặt robot và trò chuyện bằng giọng nói tiếng Việt như nói với một giáo viên. Toàn bộ phần mềm của dự án được thực hiện theo phương pháp \"vibe coding\" – con người mô tả ý tưởng, góp ý và kiểm chứng trên thiết bị thật, còn việc viết mã nguồn do trợ lý AI Muse (Meta) hỗ trợ – thể hiện cách tiếp cận khoa học công nghệ hiện đại: kết hợp trí tuệ con người với trí tuệ nhân tạo để tạo ra sản phẩm thật, phục vụ thật ngay tại nhà trường."
          }
        ]
      },
      {
        "tieude": "3.2. Tính năng và Ưu điểm nổi bật",
        "cap": 2,
        "khoi": [
          {
            "loai": "ds",
            "kieu": "cham",
            "muc": [
              {
                "nhan": "Trò chuyện bằng giọng nói tiếng Việt tự nhiên",
                "noidung": "học sinh chạm vào khuôn mặt là bắt đầu trò chuyện; hệ thống tự nhận biết khi học sinh ngừng nói để trả lời, chạm khi robot đang nói để ngắt lời – cuộc hội thoại diễn ra liên tục như với người thật."
              },
              {
                "nhan": "Tư vấn theo quy trình hướng nghiệp bài bản",
                "noidung": "Jobi dẫn dắt học sinh qua quy trình tư vấn 4 bước (làm rõ mong đợi – xác định vấn đề – hỗ trợ tại chỗ – thống nhất bước tiếp theo) với mô hình chìa khóa 3 câu hỏi \"Em là ai? Em muốn đi về đâu? Làm sao để đến đó?\", kết hợp gợi ý theo trắc nghiệm tính cách nghề nghiệp Holland (RIASEC)."
              },
              {
                "nhan": "Trả lời dựa trên tri thức được kiểm chứng",
                "noidung": "Jobi tra cứu bộ tài liệu Knowledge Base của nhà trường (thông tin trường, chương trình học, nhóm ngành nghề, tuyển sinh đại học) khi trả lời; phần chưa có dữ liệu, Jobi nói rõ và hướng học sinh gặp giáo viên, tuyệt đối không tự bịa số liệu như học phí hay điểm chuẩn."
              },
              {
                "nhan": "Khuôn mặt biểu cảm sống động",
                "noidung": "khuôn mặt cô giáo chibi được vẽ và chuyển động theo thời gian thực: chớp mắt, liếc nhìn, lông mày biểu cảm theo cảm xúc, miệng nhép khớp theo giọng nói, má hồng và cử chỉ vẫy tay chào."
              },
              {
                "nhan": "Tự giới thiệu dự án khi trưng bày",
                "noidung": "chỉ cần bấm một nút, Jobi tự trình bày toàn bộ quá trình thực hiện dự án (ý tưởng, phần cứng, phần mềm, cách triển khai) bằng lời giới thiệu ghi âm sẵn trong máy – hoạt động tốt cả khi mất kết nối Internet."
              },
              {
                "nhan": "Chi phí thấp, dễ triển khai",
                "noidung": "chế độ kiosk toàn màn hình, khóa giao diện vào khuôn mặt robot; tận dụng máy tính bảng sẵn có và vật liệu mô hình rẻ, không cần phần cứng robot chuyên dụng đắt tiền nên dễ nhân rộng cho nhiều trường."
              }
            ]
          }
        ]
      },
      {
        "tieude": "3.3. Tích hợp giáo dục S-T-E-M",
        "cap": 2,
        "khoi": [
          {
            "loai": "doan",
            "noidung": "học sinh khám phá nguyên lý xử lý tín hiệu âm thanh số (thu âm, nén và truyền giọng nói), cơ chế hoạt động của AI hội thoại (nhận dạng giọng nói – mô hình ngôn ngữ – tổng hợp giọng nói) và cơ sở khoa học của hướng nghiệp qua mô hình tính cách nghề nghiệp Holland.",
            "nhan": "S (Science – Khoa học)"
          },
          {
            "loai": "doan",
            "noidung": "ứng dụng công nghệ trí tuệ nhân tạo, giao thức truyền thông WebSocket, bộ mã hóa âm thanh Opus, hệ điều hành Android và điện toán đám mây; tính cách, giọng nói và tri thức của robot được cấu hình trên nền tảng xiaozhi.me.",
            "nhan": "T (Technology – Công nghệ)"
          },
          {
            "loai": "doan",
            "noidung": "thực hành trọn vẹn quy trình thiết kế kỹ thuật: lên ý tưởng – thiết kế mô hình đầu robot (kích thước, ô cửa sổ màn hình, lỗ sạc, khe loa) – lập trình – kiểm thử trên thiết bị thật – sửa lỗi và hoàn thiện qua nhiều phiên bản (từ 1.0 đến 1.10), đúng vòng lặp thiết kế – chế tạo – cải tiến.",
            "nhan": "E (Engineering – Kỹ thuật)"
          },
          {
            "loai": "doan",
            "noidung": "áp dụng toán học trong xử lý âm thanh (tần số lấy mẫu 16.000 Hz, khung âm thanh 60 ms), hình học tọa độ khi lập trình vẽ và đồng bộ biểu cảm khuôn mặt theo thời gian thực, cùng tư duy thống kê khi phân tích kết quả trắc nghiệm Holland để gợi ý nhóm ngành phù hợp.",
            "nhan": "M (Mathematics – Toán học)"
          }
        ]
      },
      {
        "tieude": "3.4. Danh sách vật tư (Packing List)",
        "cap": 2,
        "khoi": [
          {
            "loai": "ds",
            "kieu": "so",
            "muc": [
              {
                "noidung": "01 Máy tính bảng Xiaomi Pad 6 (màn hình 11 inch) đã cài đặt ứng dụng Jobi phiên bản mới nhất."
              },
              {
                "noidung": "01 Mô hình đầu robot bằng bìa carton/vật liệu mô hình, có ô cửa sổ màn hình, tai và ăng-ten trang trí."
              },
              {
                "noidung": "01 Bộ sạc USB-C kèm cáp sạc."
              },
              {
                "noidung": "01 Tài liệu hướng dẫn sử dụng và kịch bản trải nghiệm mẫu cho học sinh."
              },
              {
                "nhan": "Bộ tài liệu mềm đi kèm",
                "noidung": "cấu hình trợ lý Jobi trên xiaozhi.me và bộ Knowledge Base hướng nghiệp (10 tài liệu) của nhà trường."
              }
            ]
          }
        ]
      },
      {
        "tieude": "3.5. Hướng dẫn sử dụng cơ bản & Lưu ý",
        "cap": 2,
        "khoi": [
          {
            "loai": "doan",
            "noidung": "Bật máy tính bảng -> mở ứng dụng Jobi -> chạm vào khuôn mặt để bắt đầu trò chuyện -> nói câu hỏi, ngừng nói một lúc để Jobi trả lời -> nhấn giữ mặt khoảng 1,2 giây để kết thúc phiên. Khi trưng bày, bấm nút \"Giới thiệu dự án\" để Jobi tự trình bày về dự án.",
            "nhan": "Hướng dẫn"
          },
          {
            "loai": "doan",
            "noidung": "đặt sản phẩm nơi khô ráo, tránh nước và nguồn nhiệt; dùng đúng bộ sạc đi kèm; không để học sinh cung cấp cho robot các thông tin cá nhân nhạy cảm (địa chỉ nhà, số điện thoại, mật khẩu); học sinh có dấu hiệu căng thẳng tâm lý cần được giới thiệu gặp giáo viên và bộ phận tham vấn tâm lý của trường.",
            "nhan": "An toàn"
          },
          {
            "loai": "doan",
            "noidung": "thiết bị máy tính bảng theo chế độ bảo hành của nhà sản xuất; phần mềm Jobi được nhóm dự án hỗ trợ và cập nhật miễn phí qua các bản cài đặt mới.",
            "nhan": "Bảo hành"
          }
        ]
      }
    ]
  },
  {
    "id": "pdp-nha-di-dong",
    "to": "PDP",
    "ten": "Nhà Di Động",
    "tenCu": [
      "Nhà Di Động"
    ],
    "nhom": "",
    "slogan": "",
    "anh": "",
    "thuvien": [],
    "mucs": []
  }
];
