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
                                Inclusive Healthcare for All Gender Identities
                            </Typography>
                            <Typography variant="h6" paragraph>
                                We provide specialized healthcare services in a safe, affirming environment
                                that respects and celebrates gender diversity.
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
                                    Our Services
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="inherit"
                                    size="large"
                                    component={RouterLink}
                                    to="/auth/register"
                                >
                                    Join Us
                                </Button>
                            </Stack>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Box
                                component="img"
                                src="/diverse-group.jpg"
                                alt="Diverse group of people"
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
                    Our Services
                </Typography>
                <Typography variant="subtitle1" align="center" color="text.secondary" paragraph sx={{ mb: 6 }}>
                    Comprehensive gender-affirming healthcare services
                </Typography>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                    {services.map((service) => (
                        <Box key={service.title} sx={{ width: { xs: '100%', sm: 'calc(50% - 16px)', md: 'calc(33.333% - 16px)' } }}>
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
                                        Learn More
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
                        Why Choose Us
                    </Typography>
                    <Typography variant="subtitle1" align="center" color="text.secondary" paragraph sx={{ mb: 6 }}>
                        Our commitment to quality care and inclusive services
                    </Typography>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                        {features.map((feature) => (
                            <Box
                                key={feature.title}
                                sx={{
                                    width: { xs: '100%', md: 'calc(33.333% - 16px)' },
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
                    Ready to Get Started?
                </Typography>
                <Typography variant="body1" paragraph color="text.secondary">
                    Join our community of patients and experience healthcare designed for your unique needs.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    component={RouterLink}
                    to="/auth/register"
                    sx={{ mt: 2 }}
                >
                    Create an Account
                </Button>
            </Container>
        </Box>
    );
};

// Sample data
const services = [
    {
        title: 'Gender-Affirming Care',
        description: 'Comprehensive services including hormone therapy, surgical consultations, and voice therapy.',
        image: '/service-1.svg',
        link: '/services#gender-affirming',
    },
    {
        title: 'Mental Health Support',
        description: 'Counseling and therapy services specialized for gender-related experiences and transitions.',
        image: '/service-2.svg',
        link: '/services#mental-health',
    },
    {
        title: 'Primary Healthcare',
        description: 'Regular check-ups, preventive care, and general health services in an affirming environment.',
        image: '/service-3.svg',
        link: '/services#primary-care',
    },
];

const features = [
    {
        title: 'Easy Appointment Booking',
        description: 'Schedule appointments online at your convenience with our user-friendly booking system.',
        icon: <CalendarIcon sx={{ fontSize: 50, color: 'primary.main' }} />,
    },
    {
        title: 'Expert Consultations',
        description: 'Access specialized knowledge through our online consultation service with experienced healthcare providers.',
        icon: <ForumIcon sx={{ fontSize: 50, color: 'primary.main' }} />,
    },
    {
        title: 'Inclusive Care',
        description: 'Experience healthcare that respects your identity and addresses your specific needs with dignity.',
        icon: <HealingIcon sx={{ fontSize: 50, color: 'primary.main' }} />,
    },
];

export default HomePage; 