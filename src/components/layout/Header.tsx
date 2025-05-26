import React, { useState, useRef } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    Box,
    Button,
    IconButton,
    Stack,
    Menu,
    MenuItem,
    Popper,
    Grow,
    Paper,
    ClickAwayListener,
    MenuList
} from '@mui/material';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import icongender from '../../images/icongender.png';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Header: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
    const servicesButtonRef = useRef<HTMLButtonElement>(null);

    // Các dịch vụ dropdown với thông tin tab
    const serviceItems = [
        { name: 'Chăm sóc khẳng định giới tính', path: '/services', tabIndex: 1 },
        { name: 'Hỗ trợ sức khỏe tâm thần', path: '/services', tabIndex: 2 },
        { name: 'Chăm sóc sức khỏe cơ bản', path: '/services', tabIndex: 3 },
        { name: 'Tư vấn giải phẫu', path: '/services', tabIndex: 1 }, // Thuộc tab Chăm sóc khẳng định giới tính
        { name: 'Liệu pháp giọng nói', path: '/services', tabIndex: 1 }  // Thuộc tab Chăm sóc khẳng định giới tính
    ];

    // Kiểm tra đường dẫn hiện tại để xác định nút nào đang được active
    const isActive = (path: string) => {
        if (path === '/services') {
            return location.pathname === path || location.pathname.includes('/services');
        }
        return location.pathname === path;
    };

    // Mở/đóng menu dịch vụ
    const handleServicesMenuToggle = () => {
        setServicesMenuOpen((prevOpen) => !prevOpen);
    };

    // Đóng menu dịch vụ khi click ra ngoài
    const handleServicesMenuClose = (event: Event | React.SyntheticEvent) => {
        if (
            servicesButtonRef.current &&
            servicesButtonRef.current.contains(event.target as HTMLElement)
        ) {
            return;
        }
        setServicesMenuOpen(false);
    };

    // Xử lý chọn một mục dịch vụ
    const handleServiceItemClick = (tabIndex: number) => {
        setServicesMenuOpen(false);
        // Lưu tab index vào localStorage để trang dịch vụ biết phải hiển thị tab nào
        localStorage.setItem('selectedServiceTab', tabIndex.toString());
    };

    // Xử lý khi nhấn vào nút "Tất cả dịch vụ"
    const handleAllServicesClick = () => {
        setServicesMenuOpen(false);
        // Đặt tab index về 0 (tab "Tất cả dịch vụ")
        localStorage.setItem('selectedServiceTab', '0');
    };

    const navItems = [
        { name: 'Trang chủ', path: '/' },
        // Dịch vụ được xử lý riêng với dropdown
        { name: 'Về chúng tôi', path: '/about' },
        { name: 'Đội ngũ', path: '/team' },
        { name: 'Liên hệ', path: '/contact' },
    ];

    return (
        <AppBar position="sticky" sx={{ backgroundColor: 'white', color: 'primary.main', boxShadow: 2 }}>
            <Container maxWidth="xl">
                <Toolbar>
                    <Box sx={{ display: 'flex', alignItems: 'center', mr: 4 }}>
                        <IconButton
                            component={RouterLink}
                            to="/"
                            sx={{ display: 'flex', alignItems: 'center', p: 0 }}
                        >
                            <img
                                src={icongender}
                                alt="Biểu tượng Chăm Sóc Sức Khỏe Giới Tính"
                                style={{ width: '2em', height: '2em', marginRight: '10px' }}
                            />
                            <Typography variant="h6" component="div" sx={{ ml: 1 }}>
                                Chăm Sóc Sức Khỏe Giới Tính
                            </Typography>
                        </IconButton>
                    </Box>

                    {/* Thanh điều hướng chính */}
                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            flexGrow: 1
                        }}
                    >
                        {/* Các mục điều hướng thông thường */}
                        {navItems.map((item) => (
                            <Button
                                key={item.path}
                                component={RouterLink}
                                to={item.path}
                                sx={{
                                    color: isActive(item.path) ? 'primary.main' : 'text.secondary',
                                    fontWeight: isActive(item.path) ? 'bold' : 'normal',
                                    borderBottom: isActive(item.path) ? '2px solid' : 'none',
                                    borderRadius: 0,
                                    '&:hover': {
                                        backgroundColor: 'transparent',
                                        color: 'primary.main',
                                    }
                                }}
                            >
                                {item.name}
                            </Button>
                        ))}

                        {/* Nút Dịch vụ với dropdown */}
                        <Button
                            ref={servicesButtonRef}
                            onClick={handleServicesMenuToggle}
                            sx={{
                                color: isActive('/services') ? 'primary.main' : 'text.secondary',
                                fontWeight: isActive('/services') ? 'bold' : 'normal',
                                borderBottom: isActive('/services') ? '2px solid' : 'none',
                                borderRadius: 0,
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                    color: 'primary.main',
                                }
                            }}
                            endIcon={<KeyboardArrowDownIcon />}
                        >
                            Dịch vụ
                        </Button>
                        <Popper
                            open={servicesMenuOpen}
                            anchorEl={servicesButtonRef.current}
                            role={undefined}
                            placement="bottom-start"
                            transition
                            disablePortal
                            sx={{ zIndex: 1300 }}
                        >
                            {({ TransitionProps }) => (
                                <Grow
                                    {...TransitionProps}
                                    style={{ transformOrigin: 'top left' }}
                                >
                                    <Paper elevation={3} sx={{ mt: 1 }}>
                                        <ClickAwayListener onClickAway={handleServicesMenuClose}>
                                            <MenuList
                                                autoFocusItem={servicesMenuOpen}
                                                id="services-menu"
                                                aria-labelledby="services-button"
                                            >
                                                <MenuItem
                                                    component={RouterLink}
                                                    to="/services"
                                                    onClick={handleAllServicesClick}
                                                    sx={{
                                                        color: 'primary.main',
                                                        fontWeight: 'bold',
                                                        borderLeft: '3px solid',
                                                        py: 1
                                                    }}
                                                >
                                                    Tất cả dịch vụ
                                                </MenuItem>
                                                {serviceItems.map((item) => (
                                                    <MenuItem
                                                        key={item.name}
                                                        component={RouterLink}
                                                        to={item.path}
                                                        onClick={() => handleServiceItemClick(item.tabIndex)}
                                                        sx={{ py: 1 }}
                                                    >
                                                        {item.name}
                                                    </MenuItem>
                                                ))}
                                            </MenuList>
                                        </ClickAwayListener>
                                    </Paper>
                                </Grow>
                            )}
                        </Popper>
                    </Stack>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button
                            variant="outlined"
                            color="primary"
                            component={RouterLink}
                            to="/auth/login"
                            size="small"
                        >
                            Đăng nhập
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            component={RouterLink}
                            to="/auth/register"
                            size="small"
                        >
                            Đăng ký
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header; 