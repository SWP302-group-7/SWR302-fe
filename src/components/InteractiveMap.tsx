import React, { useState, useCallback } from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Chip,
    Stack
} from '@mui/material';
import {
    Add as AddIcon,
    Delete as DeleteIcon,
    LocationOn as LocationIcon,
    Edit as EditIcon
} from '@mui/icons-material';
import GoogleMap, { MapMarker } from './GoogleMap';
import { GOOGLE_MAPS_CONFIG, getGoogleMapsApiKey } from '../config/maps';

interface InteractiveMapProps {
    initialMarkers?: MapMarker[];
    center?: google.maps.LatLngLiteral;
    zoom?: number;
    height?: number | string;
    allowAddMarkers?: boolean;
    allowEditMarkers?: boolean;
    onMarkersChange?: (markers: MapMarker[]) => void;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({
    initialMarkers = [],
    center = GOOGLE_MAPS_CONFIG.CLINIC_LOCATION,
    zoom = GOOGLE_MAPS_CONFIG.DEFAULT_ZOOM,
    height = 400,
    allowAddMarkers = true,
    allowEditMarkers = true,
    onMarkersChange
}) => {
    const [markers, setMarkers] = useState<MapMarker[]>(initialMarkers);
    const [openDialog, setOpenDialog] = useState(false);
    const [editingMarker, setEditingMarker] = useState<number | null>(null);
    const [newMarker, setNewMarker] = useState({
        title: '',
        info: '',
        lat: center.lat,
        lng: center.lng
    });

    const handleAddMarker = useCallback(() => {
        setEditingMarker(null);
        setNewMarker({
            title: '',
            info: '',
            lat: center.lat,
            lng: center.lng
        });
        setOpenDialog(true);
    }, [center]);

    const handleEditMarker = useCallback((index: number) => {
        const marker = markers[index];
        setEditingMarker(index);
        setNewMarker({
            title: marker.title,
            info: marker.info || '',
            lat: marker.position.lat,
            lng: marker.position.lng
        });
        setOpenDialog(true);
    }, [markers]);

    const handleSaveMarker = useCallback(() => {
        const markerData: MapMarker = {
            position: { lat: newMarker.lat, lng: newMarker.lng },
            title: newMarker.title,
            info: newMarker.info,
            icon: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        };

        let updatedMarkers: MapMarker[];
        if (editingMarker !== null) {
            updatedMarkers = [...markers];
            updatedMarkers[editingMarker] = markerData;
        } else {
            updatedMarkers = [...markers, markerData];
        }

        setMarkers(updatedMarkers);
        onMarkersChange?.(updatedMarkers);
        setOpenDialog(false);
    }, [newMarker, markers, editingMarker, onMarkersChange]);

    const handleDeleteMarker = useCallback((index: number) => {
        const updatedMarkers = markers.filter((_, i) => i !== index);
        setMarkers(updatedMarkers);
        onMarkersChange?.(updatedMarkers);
    }, [markers, onMarkersChange]);

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditingMarker(null);
    };

    return (
        <Box>
            {/* Controls */}
            {(allowAddMarkers || allowEditMarkers) && (
                <Box sx={{ mb: 2 }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                        {allowAddMarkers && (
                            <Button
                                variant="contained"
                                startIcon={<AddIcon />}
                                onClick={handleAddMarker}
                                size="small"
                            >
                                Thêm Vị Trí
                            </Button>
                        )}
                        <Chip
                            icon={<LocationIcon />}
                            label={`${markers.length} vị trí đã ghim`}
                            variant="outlined"
                        />
                    </Stack>
                </Box>
            )}

            {/* Map */}
            <GoogleMap
                center={center}
                zoom={zoom}
                markers={markers}
                height={height}
                width="100%"
                apiKey={getGoogleMapsApiKey()}
            />

            {/* Marker List */}
            {markers.length > 0 && (allowEditMarkers || allowAddMarkers) && (
                <Box sx={{ mt: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        Danh Sách Vị Trí
                    </Typography>
                    <List dense>
                        {markers.map((marker, index) => (
                            <ListItem key={index} divider>
                                <ListItemText
                                    primary={marker.title}
                                    secondary={`${marker.position.lat.toFixed(6)}, ${marker.position.lng.toFixed(6)}`}
                                />
                                <ListItemSecondaryAction>
                                    {allowEditMarkers && (
                                        <IconButton
                                            edge="end"
                                            aria-label="edit"
                                            onClick={() => handleEditMarker(index)}
                                            size="small"
                                            sx={{ mr: 1 }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    )}
                                    {allowEditMarkers && (
                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                            onClick={() => handleDeleteMarker(index)}
                                            size="small"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    )}
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            )}

            {/* Add/Edit Marker Dialog */}
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {editingMarker !== null ? 'Chỉnh Sửa Vị Trí' : 'Thêm Vị Trí Mới'}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                        <TextField
                            label="Tên vị trí"
                            value={newMarker.title}
                            onChange={(e) => setNewMarker({ ...newMarker, title: e.target.value })}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Thông tin chi tiết"
                            value={newMarker.info}
                            onChange={(e) => setNewMarker({ ...newMarker, info: e.target.value })}
                            fullWidth
                            multiline
                            rows={3}
                        />
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <TextField
                                label="Vĩ độ (Latitude)"
                                type="number"
                                value={newMarker.lat}
                                onChange={(e) => setNewMarker({ ...newMarker, lat: parseFloat(e.target.value) || 0 })}
                                fullWidth
                                inputProps={{ step: 0.000001 }}
                            />
                            <TextField
                                label="Kinh độ (Longitude)"
                                type="number"
                                value={newMarker.lng}
                                onChange={(e) => setNewMarker({ ...newMarker, lng: parseFloat(e.target.value) || 0 })}
                                fullWidth
                                inputProps={{ step: 0.000001 }}
                            />
                        </Box>
                        <Typography variant="caption" color="text.secondary">
                            Tip: Bạn có thể tìm tọa độ chính xác bằng cách click chuột phải trên Google Maps và chọn tọa độ.
                        </Typography>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Hủy</Button>
                    <Button
                        onClick={handleSaveMarker}
                        variant="contained"
                        disabled={!newMarker.title.trim()}
                    >
                        {editingMarker !== null ? 'Cập Nhật' : 'Thêm'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default InteractiveMap; 