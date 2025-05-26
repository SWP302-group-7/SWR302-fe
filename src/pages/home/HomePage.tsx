import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Container,
    Typography,
    Stack,
} from '@mui/material';
import {
    CalendarMonth as CalendarIcon,
    Forum as ForumIcon,
    Healing as HealingIcon,
    ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';

const HomePage: React.FC = () => {
    return (
        <Box>
            {/* Hero Section */}
            <Box
                sx={{
                    bgcolor: 'primary.light',
                    color: 'primary.contrastText',
                    py: 8,
                    borderRadius: 2,
                    mb: 6,
                    mt: 2,
                    backgroundImage: 'linear-gradient(45deg, #7E57C2 30%, #26A69A 90%)',
                }}
            >
                <Container maxWidth="lg">
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'center' }}>
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="h3" component="h1" gutterBottom>
                                Chăm Sóc Sức Khỏe Toàn Diện Cho Mọi Bản Dạng Giới
                            </Typography>
                            <Typography variant="h6" paragraph>
                                Chúng tôi cung cấp các dịch vụ chăm sóc sức khỏe chuyên biệt trong môi trường an toàn,
                                tôn trọng và tôn vinh sự đa dạng giới tính.
                            </Typography>
                            <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    size="large"
                                    component={RouterLink}
                                    to="/services"
                                    endIcon={<ArrowForwardIcon />}
                                >
                                    Dịch Vụ Của Chúng Tôi
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="inherit"
                                    size="large"
                                    component={RouterLink}
                                    to="/auth/register"
                                >
                                    Tham Gia Ngay
                                </Button>
                            </Stack>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Box
                                component="img"
                                src="/diverse-group.jpg"
                                alt="Nhóm người đa dạng"
                                sx={{
                                    width: '100%',
                                    borderRadius: 2,
                                    boxShadow: 3,
                                    display: { xs: 'none', sm: 'block' },
                                }}
                            />
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* Services Overview */}
            <Container maxWidth="lg" sx={{ my: 8 }}>
                <Typography variant="h4" component="h2" align="center" gutterBottom>
                    Dịch Vụ Của Chúng Tôi
                </Typography>
                <Typography variant="subtitle1" align="center" color="text.secondary" paragraph sx={{ mb: 6 }}>
                    Các dịch vụ chăm sóc sức khỏe khẳng định giới tính toàn diện
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4, flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
                    {services.map((service) => (
                        <Box key={service.title} sx={{ width: { xs: '100%', sm: 'calc(50% - 16px)', md: '33.333%' } }}>
                            <Card
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transition: '0.3s',
                                    '&:hover': {
                                        transform: 'translateY(-5px)',
                                        boxShadow: 6,
                                    },
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={service.image}
                                    alt={service.title}
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h5" component="h3">
                                        {service.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" paragraph>
                                        {service.description}
                                    </Typography>
                                    <Button
                                        size="small"
                                        color="primary"
                                        component={RouterLink}
                                        to={service.link}
                                        endIcon={<ArrowForwardIcon />}
                                    >
                                        Tìm hiểu thêm
                                    </Button>
                                </CardContent>
                            </Card>
                        </Box>
                    ))}
                </Box>
            </Container>

            {/* Features Section */}
            <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
                <Container maxWidth="lg">
                    <Typography variant="h4" component="h2" align="center" gutterBottom>
                        Tại Sao Chọn Chúng Tôi
                    </Typography>
                    <Typography variant="subtitle1" align="center" color="text.secondary" paragraph sx={{ mb: 6 }}>
                        Cam kết của chúng tôi về chăm sóc chất lượng và dịch vụ toàn diện
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4, flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
                        {features.map((feature) => (
                            <Box
                                key={feature.title}
                                sx={{
                                    width: { xs: '100%', sm: 'calc(50% - 16px)', md: '33.333%' },
                                    textAlign: 'center',
                                    p: 2
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        mb: 2,
                                    }}
                                >
                                    {feature.icon}
                                </Box>
                                <Typography variant="h5" component="h3" gutterBottom>
                                    {feature.title}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    {feature.description}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Container>
            </Box>

            {/* CTA Section */}
            <Container maxWidth="md" sx={{ my: 8, textAlign: 'center' }}>
                <Typography variant="h4" component="h2" gutterBottom>
                    Sẵn Sàng Bắt Đầu?
                </Typography>
                <Typography variant="body1" paragraph color="text.secondary">
                    Tham gia cộng đồng bệnh nhân của chúng tôi và trải nghiệm dịch vụ chăm sóc sức khỏe được thiết kế riêng cho nhu cầu đặc biệt của bạn.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    component={RouterLink}
                    to="/auth/register"
                    sx={{ mt: 2 }}
                >
                    Tạo Tài Khoản
                </Button>
            </Container>
        </Box>
    );
};

// Sample data
const services = [
    {
        title: 'Chăm Sóc Khẳng Định Giới Tính',
        description: 'Dịch vụ toàn diện bao gồm liệu pháp hormone, tư vấn phẫu thuật và luyện giọng nói.',
        image: '/service-1.svg',
        link: '/services#gender-affirming',
    },
    {
        title: 'Hỗ Trợ Sức Khỏe Tâm Thần',
        description: 'Dịch vụ tư vấn và trị liệu chuyên biệt cho các trải nghiệm và quá trình chuyển đổi giới tính.',
        image: '/service-2.svg',
        link: '/services#mental-health',
    },
    {
        title: 'Chăm Sóc Sức Khỏe Cơ Bản',
        description: 'Khám sức khỏe định kỳ, chăm sóc dự phòng và các dịch vụ y tế chung trong môi trường tôn trọng.',
        image: '/service-3.svg',
        link: '/services#primary-care',
    },
];

const features = [
    {
        title: 'Đặt Lịch Hẹn Dễ Dàng',
        description: 'Lên lịch hẹn trực tuyến thuận tiện với hệ thống đặt lịch thân thiện với người dùng của chúng tôi.',
        icon: <CalendarIcon sx={{ fontSize: 50, color: 'primary.main' }} />,
    },
    {
        title: 'Tư Vấn Chuyên Gia',
        description: 'Tiếp cận kiến thức chuyên môn thông qua dịch vụ tư vấn trực tuyến với các chuyên gia y tế giàu kinh nghiệm.',
        icon: <ForumIcon sx={{ fontSize: 50, color: 'primary.main' }} />,
    },
    {
        title: 'Chăm Sóc Toàn Diện',
        description: 'Trải nghiệm dịch vụ chăm sóc sức khỏe tôn trọng bản dạng và đáp ứng nhu cầu cụ thể của bạn một cách đầy tôn trọng.',
        icon: <HealingIcon sx={{ fontSize: 50, color: 'primary.main' }} />,
    },
];

export default HomePage; 