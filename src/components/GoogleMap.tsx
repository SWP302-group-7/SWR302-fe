import React, { useEffect, useRef, useState } from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { Box, Typography, CircularProgress } from '@mui/material';

// Interface cho marker
interface MapMarker {
    position: google.maps.LatLngLiteral;
    title: string;
    info?: string;
    icon?: string;
}

// Interface cho props của component
interface GoogleMapProps {
    center: google.maps.LatLngLiteral;
    zoom: number;
    markers?: MapMarker[];
    height?: number | string;
    width?: number | string;
    apiKey: string;
}

// Component Map chính
const Map: React.FC<{
    center: google.maps.LatLngLiteral;
    zoom: number;
    markers?: MapMarker[];
    height?: number | string;
    width?: number | string;
}> = ({ center, zoom, markers = [], height = 400, width = '100%' }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<google.maps.Map>();
    const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow>();

    useEffect(() => {
        if (ref.current && !map) {
            const newMap = new window.google.maps.Map(ref.current, {
                center,
                zoom,
                mapTypeControl: true,
                streetViewControl: true,
                fullscreenControl: true,
                zoomControl: true,
                styles: [
                    {
                        featureType: 'poi',
                        elementType: 'labels',
                        stylers: [{ visibility: 'on' }]
                    }
                ]
            });
            setMap(newMap);

            // Tạo InfoWindow
            const newInfoWindow = new window.google.maps.InfoWindow();
            setInfoWindow(newInfoWindow);
        }
    }, [ref, map, center, zoom]);

    // Thêm markers khi map và markers thay đổi
    useEffect(() => {
        if (map && markers.length > 0) {
            markers.forEach((markerData) => {
                const marker = new window.google.maps.Marker({
                    position: markerData.position,
                    map: map,
                    title: markerData.title,
                    icon: markerData.icon || {
                        url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
                        scaledSize: new window.google.maps.Size(32, 32)
                    },
                    animation: google.maps.Animation.DROP
                });

                // Thêm click listener cho marker
                if (markerData.info && infoWindow) {
                    marker.addListener('click', () => {
                        infoWindow.setContent(`
                            <div style="padding: 10px; max-width: 200px;">
                                <h3 style="margin: 0 0 8px 0; color: #1976d2;">${markerData.title}</h3>
                                <p style="margin: 0; color: #666;">${markerData.info}</p>
                            </div>
                        `);
                        infoWindow.open(map, marker);
                    });
                }
            });
        }
    }, [map, markers, infoWindow]);

    return <div ref={ref} style={{ height, width }} />;
};

// Component render cho các trạng thái loading
const render = (status: Status): React.ReactElement => {
    switch (status) {
        case Status.LOADING:
            return (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 400,
                        bgcolor: '#f5f5f5'
                    }}
                >
                    <CircularProgress />
                    <Typography sx={{ ml: 2 }}>Đang tải bản đồ...</Typography>
                </Box>
            );
        case Status.FAILURE:
            return (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 400,
                        bgcolor: '#ffebee',
                        color: '#c62828'
                    }}
                >
                    <Typography>Không thể tải bản đồ. Vui lòng thử lại sau.</Typography>
                </Box>
            );
        default:
            return (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 400,
                        bgcolor: '#f5f5f5'
                    }}
                >
                    <Typography>Đang khởi tạo bản đồ...</Typography>
                </Box>
            );
    }
};

// Component GoogleMap chính
const GoogleMap: React.FC<GoogleMapProps> = ({
    center,
    zoom,
    markers,
    height,
    width,
    apiKey
}) => {
    return (
        <Wrapper apiKey={apiKey} render={render}>
            <Map
                center={center}
                zoom={zoom}
                markers={markers}
                height={height}
                width={width}
            />
        </Wrapper>
    );
};

export default GoogleMap;
export type { MapMarker }; 