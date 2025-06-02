# Hướng Dẫn Cài Đặt Google Maps

## 1. Lấy Google Maps API Key

### Bước 1: Truy cập Google Cloud Console
1. Đi đến [Google Cloud Console](https://console.cloud.google.com/)
2. Đăng nhập bằng tài khoản Google của bạn
3. Tạo project mới hoặc chọn project hiện có

### Bước 2: Bật Google Maps JavaScript API
1. Trong Google Cloud Console, đi đến **APIs & Services** > **Library**
2. Tìm kiếm "Maps JavaScript API"
3. Click vào "Maps JavaScript API" và nhấn **Enable**

### Bước 3: Tạo API Key
1. Đi đến **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **API Key**
3. Copy API key được tạo

### Bước 4: Cấu hình API Key (Khuyến nghị)
1. Click vào API key vừa tạo để chỉnh sửa
2. Trong **Application restrictions**, chọn **HTTP referrers**
3. Thêm domain của bạn (ví dụ: `localhost:5173/*` cho development)
4. Trong **API restrictions**, chọn **Restrict key** và chọn "Maps JavaScript API"

## 2. Cấu Hình Trong Dự Án

### Tạo file .env
Tạo file `.env` trong thư mục `SWR302-fe/` với nội dung:

```env
VITE_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```

**Lưu ý**: Thay `your_actual_api_key_here` bằng API key thực tế của bạn.

### Cập nhật .gitignore
Đảm bảo file `.env` được thêm vào `.gitignore` để không commit API key:

```gitignore
# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
```

## 3. Sử Dụng Components

### GoogleMap Component (Cơ bản)
```tsx
import GoogleMap from '../components/GoogleMap';
import { GOOGLE_MAPS_CONFIG, DEFAULT_MARKERS } from '../config/maps';

<GoogleMap
    center={GOOGLE_MAPS_CONFIG.CLINIC_LOCATION}
    zoom={15}
    markers={DEFAULT_MARKERS}
    height={400}
    apiKey={getGoogleMapsApiKey()}
/>
```

### InteractiveMap Component (Nâng cao)
```tsx
import InteractiveMap from '../components/InteractiveMap';

<InteractiveMap
    initialMarkers={DEFAULT_MARKERS}
    allowAddMarkers={true}
    allowEditMarkers={true}
    onMarkersChange={(markers) => console.log('Markers updated:', markers)}
/>
```

## 4. Tùy Chỉnh Vị Trí

### Thêm marker mới
Trong file `src/config/maps.ts`, bạn có thể thêm marker mới:

```typescript
export const DEFAULT_MARKERS = [
    {
        position: { lat: 10.7308, lng: 106.7193 },
        title: 'Phòng Khám Chính',
        info: 'Thông tin chi tiết về phòng khám...',
        icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
    },
    {
        position: { lat: 10.7400, lng: 106.7200 },
        title: 'Chi Nhánh 2',
        info: 'Thông tin chi nhánh 2...',
        icon: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
    }
];
```

### Tùy chỉnh icon marker
Bạn có thể sử dụng các icon có sẵn của Google Maps:
- `https://maps.google.com/mapfiles/ms/icons/red-dot.png` (đỏ)
- `https://maps.google.com/mapfiles/ms/icons/blue-dot.png` (xanh dương)
- `https://maps.google.com/mapfiles/ms/icons/green-dot.png` (xanh lá)
- `https://maps.google.com/mapfiles/ms/icons/yellow-dot.png` (vàng)

Hoặc sử dụng icon tùy chỉnh:
```typescript
icon: {
    url: '/path/to/your/custom-icon.png',
    scaledSize: new google.maps.Size(32, 32)
}
```

## 5. Tìm Tọa Độ

### Cách 1: Sử dụng Google Maps
1. Mở [Google Maps](https://maps.google.com/)
2. Tìm kiếm địa điểm
3. Click chuột phải vào vị trí chính xác
4. Click vào tọa độ hiển thị để copy

### Cách 2: Sử dụng GPS
- Sử dụng ứng dụng GPS trên điện thoại để lấy tọa độ chính xác

## 6. Troubleshooting

### Lỗi "Google Maps JavaScript API error: RefererNotAllowedMapError"
- Kiểm tra cấu hình HTTP referrers trong Google Cloud Console
- Đảm bảo domain hiện tại được thêm vào danh sách cho phép

### Lỗi "Google Maps JavaScript API error: ApiNotActivatedMapError"
- Đảm bảo Maps JavaScript API đã được bật trong Google Cloud Console

### Bản đồ không hiển thị
- Kiểm tra API key có đúng không
- Kiểm tra console browser để xem lỗi chi tiết
- Đảm bảo có kết nối internet

## 7. Chi Phí

Google Maps JavaScript API có:
- **$200 credit miễn phí mỗi tháng**
- Sau đó tính phí theo lượng sử dụng
- Đối với ứng dụng nhỏ, thường không vượt quá mức miễn phí

Xem thêm: [Google Maps Pricing](https://developers.google.com/maps/pricing) 