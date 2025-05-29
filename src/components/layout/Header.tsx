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
    const [teamMenuOpen, setTeamMenuOpen] = useState(false);
    const servicesButtonRef = useRef<HTMLButtonElement>(null);
    const teamButtonRef = useRef<HTMLButtonElement>(null);

    // Các dịch vụ dropdown với thông tin tab
    const serviceItems = [
        { name: 'Tất cả', path: '/services', tabIndex: 0 },
        { name: 'Chăm Sóc Khẳng Định Giới Tính', path: '/services', tabIndex: 1 },
        { name: 'Sức Khỏe Tâm Thần', path: '/services', tabIndex: 2 },
        { name: 'Chăm Sóc Cơ Bản', path: '/services', tabIndex: 3 }
    ];

    // Các danh mục đội ngũ dropdown với thông tin tab
    const teamItems = [
        { name: 'Tất Cả', path: '/team', tabIndex: 0 },
        { name: 'Đội Ngũ Y Tế', path: '/team', tabIndex: 1 },
        { name: 'Tư Vấn Tâm Lý', path: '/team', tabIndex: 2 },
        { name: 'Hành Chính', path: '/team', tabIndex: 3 }
    ];

    // Kiểm tra đường dẫn hiện tại để xác định nút nào đang được active
    const isActive = (path: string) => {
        if (path === '/services') {
            return location.pathname === path || location.pathname.includes('/services');
        }
        if (path === '/team') {
            return location.pathname === path || location.pathname.includes('/team');
        }
        return location.pathname === path;
    };

    // Mở/đóng menu dịch vụ
    const handleServicesMenuToggle = () => {
        setServicesMenuOpen((prevOpen) => !prevOpen);
    };

    // Mở/đóng menu đội ngũ
    const handleTeamMenuToggle = () => {
        setTeamMenuOpen((prevOpen) => !prevOpen);
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

    // Đóng menu đội ngũ khi click ra ngoài
    const handleTeamMenuClose = (event: Event | React.SyntheticEvent) => {
        if (
            teamButtonRef.current &&
            teamButtonRef.current.contains(event.target as HTMLElement)
        ) {
            return;
        }
        setTeamMenuOpen(false);
    };

    // Xử lý chọn một mục dịch vụ
    const handleServiceItemClick = (tabIndex: number) => {
        setServicesMenuOpen(false);

        // Kiểm tra xem người dùng có đang ở trang dịch vụ không
        if (location.pathname === '/services') {
            // Nếu đang ở trang dịch vụ, dispatch custom event để chuyển tab ngay lập tức
            const event = new CustomEvent('serviceTabChange', {
                detail: { tabIndex }
            });
            window.dispatchEvent(event);
        } else {
            // Nếu không ở trang dịch vụ, lưu vào localStorage để chuyển tab khi navigate đến trang dịch vụ
            localStorage.setItem('selectedServiceTab', tabIndex.toString());
        }
    };

    // Xử lý chọn một mục đội ngũ
    const handleTeamItemClick = (tabIndex: number) => {
        setTeamMenuOpen(false);

        // Kiểm tra xem người dùng có đang ở trang đội ngũ không
        if (location.pathname === '/team') {
            // Nếu đang ở trang đội ngũ, dispatch custom event để chuyển tab ngay lập tức
            const event = new CustomEvent('teamTabChange', {
                detail: { tabIndex }
            });
            window.dispatchEvent(event);
        } else {
            // Nếu không ở trang đội ngũ, lưu vào localStorage để chuyển tab khi navigate đến trang đội ngũ
            localStorage.setItem('selectedTeamTab', tabIndex.toString());
        }
    };

    const navItems = [
        { name: 'Trang chủ', path: '/' },
        // Dịch vụ và Đội ngũ được xử lý riêng với dropdown
        { name: 'Về chúng tôi', path: '/about' },
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
                        {/* Trang chủ */}
                        <Button
                            component={RouterLink}
                            to="/"
                            sx={{
                                color: isActive('/') ? 'primary.main' : 'text.secondary',
                                fontWeight: isActive('/') ? 'bold' : 'normal',
                                borderBottom: isActive('/') ? '2px solid' : 'none',
                                borderRadius: 0,
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                    color: 'primary.main',
                                }
                            }}
                        >
                            Trang chủ
                        </Button>

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
                                                {serviceItems.map((item, index) => (
                                                    <MenuItem
                                                        key={item.name}
                                                        component={RouterLink}
                                                        to={item.path}
                                                        onClick={() => handleServiceItemClick(item.tabIndex)}
                                                        sx={{
                                                            py: 1,
                                                            ...(index === 0 && {
                                                                color: 'primary.main',
                                                                fontWeight: 'bold',
                                                                borderLeft: '3px solid',
                                                            })
                                                        }}
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

                        {/* Nút Đội ngũ với dropdown */}
                        <Button
                            ref={teamButtonRef}
                            onClick={handleTeamMenuToggle}
                            sx={{
                                color: isActive('/team') ? 'primary.main' : 'text.secondary',
                                fontWeight: isActive('/team') ? 'bold' : 'normal',
                                borderBottom: isActive('/team') ? '2px solid' : 'none',
                                borderRadius: 0,
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                    color: 'primary.main',
                                }
                            }}
                            endIcon={<KeyboardArrowDownIcon />}
                        >
                            Đội ngũ
                        </Button>
                        <Popper
                            open={teamMenuOpen}
                            anchorEl={teamButtonRef.current}
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
                                        <ClickAwayListener onClickAway={handleTeamMenuClose}>
                                            <MenuList
                                                autoFocusItem={teamMenuOpen}
                                                id="team-menu"
                                                aria-labelledby="team-button"
                                            >
                                                {teamItems.map((item, index) => (
                                                    <MenuItem
                                                        key={item.name}
                                                        component={RouterLink}
                                                        to={item.path}
                                                        onClick={() => handleTeamItemClick(item.tabIndex)}
                                                        sx={{
                                                            py: 1,
                                                            ...(index === 0 && {
                                                                color: 'primary.main',
                                                                fontWeight: 'bold',
                                                                borderLeft: '3px solid',
                                                            })
                                                        }}
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

                        {/* Các mục điều hướng còn lại */}
                        {navItems.slice(1).map((item) => (
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