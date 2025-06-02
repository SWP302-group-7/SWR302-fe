// Cấu hình Google Maps
export const GOOGLE_MAPS_CONFIG = {
    // API Key - Trong production, nên lưu trong environment variables
    API_KEY: 'YOUR_GOOGLE_MAPS_API_KEY', // Thay thế bằng API key thực tế

    // Vị trí mặc định (TP. Hồ Chí Minh)
    DEFAULT_CENTER: {
        lat: 10.8231,
        lng: 106.6297
    },

    // Zoom level mặc định
    DEFAULT_ZOOM: 15,

    // Vị trí cụ thể của phòng khám
    CLINIC_LOCATION: {
        lat: 10.7308, // Tọa độ Quận 7, TP. Hồ Chí Minh
        lng: 106.7193
    }
};

// Các marker mặc định cho bản đồ
export const DEFAULT_MARKERS = [
    {
        position: GOOGLE_MAPS_CONFIG.CLINIC_LOCATION,
        title: 'Phòng Khám Chăm Sóc Sức Khỏe Giới Tính',
        info: '123 Đường Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh<br/>Điện thoại: (028) 3812 3456<br/>Giờ làm việc: 8:00 - 17:00 (T2-T6)',
        icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
    }
];

// Hàm để lấy API key từ environment variables hoặc fallback
export const getGoogleMapsApiKey = (): string => {
    // Trong development, có thể sử dụng API key cố định
    // Trong production, nên sử dụng environment variables
    return import.meta.env.VITE_GOOGLE_MAPS_API_KEY || GOOGLE_MAPS_CONFIG.API_KEY;
}; 