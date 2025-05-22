import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Button,
    Divider,
    Tabs,
    Tab,
    TextField,
    InputAdornment,
    Chip,
} from '@mui/material';
import {
    Search as SearchIcon,
    AccessTime as AccessTimeIcon,
    AttachMoney as AttachMoneyIcon,
    ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`services-tabpanel-${index}`}
            aria-labelledby={`services-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `services-tab-${index}`,
        'aria-controls': `services-tabpanel-${index}`,
    };
}

const ServicesPage: React.FC = () => {
    const [tabValue, setTabValue] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const filteredServices = services.filter((service) =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filterByCategory = (category: string) => {
        return filteredServices.filter((service) => service.category === category);
    };

    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            <Typography variant="h3" component="h1" gutterBottom>
                Our Services
            </Typography>
            <Typography variant="subtitle1" paragraph>
                We offer a comprehensive range of gender-affirming healthcare services designed to meet your unique needs.
            </Typography>

            {/* Search bar */}
            <Box sx={{ mb: 4, mt: 2 }}>
                <TextField
                    fullWidth
                    placeholder="Search services..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    variant="outlined"
                />
            </Box>

            {/* Tabs */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    aria-label="service categories"
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    <Tab label="All Services" {...a11yProps(0)} />
                    <Tab label="Gender-Affirming Care" {...a11yProps(1)} />
                    <Tab label="Mental Health" {...a11yProps(2)} />
                    <Tab label="Primary Care" {...a11yProps(3)} />
                </Tabs>
            </Box>

            {/* All Services Tab */}
            <TabPanel value={tabValue} index={0}>
                <Grid container spacing={4}>
                    {filteredServices.map((service) => (
                        <Grid item xs={12} sm={6} md={4} key={service.id}>
                            <ServiceCard service={service} />
                        </Grid>
                    ))}
                    {filteredServices.length === 0 && (
                        <Box sx={{ width: '100%', textAlign: 'center', py: 4 }}>
                            <Typography variant="h6">No services found matching "{searchTerm}"</Typography>
                        </Box>
                    )}
                </Grid>
            </TabPanel>

            {/* Gender-Affirming Care Tab */}
            <TabPanel value={tabValue} index={1}>
                <Grid container spacing={4}>
                    {filterByCategory('Gender-Affirming').map((service) => (
                        <Grid item xs={12} sm={6} md={4} key={service.id}>
                            <ServiceCard service={service} />
                        </Grid>
                    ))}
                    {filterByCategory('Gender-Affirming').length === 0 && (
                        <Box sx={{ width: '100%', textAlign: 'center', py: 4 }}>
                            <Typography variant="h6">No gender-affirming services found matching "{searchTerm}"</Typography>
                        </Box>
                    )}
                </Grid>
            </TabPanel>

            {/* Mental Health Tab */}
            <TabPanel value={tabValue} index={2}>
                <Grid container spacing={4}>
                    {filterByCategory('Mental Health').map((service) => (
                        <Grid item xs={12} sm={6} md={4} key={service.id}>
                            <ServiceCard service={service} />
                        </Grid>
                    ))}
                    {filterByCategory('Mental Health').length === 0 && (
                        <Box sx={{ width: '100%', textAlign: 'center', py: 4 }}>
                            <Typography variant="h6">No mental health services found matching "{searchTerm}"</Typography>
                        </Box>
                    )}
                </Grid>
            </TabPanel>

            {/* Primary Care Tab */}
            <TabPanel value={tabValue} index={3}>
                <Grid container spacing={4}>
                    {filterByCategory('Primary Care').map((service) => (
                        <Grid item xs={12} sm={6} md={4} key={service.id}>
                            <ServiceCard service={service} />
                        </Grid>
                    ))}
                    {filterByCategory('Primary Care').length === 0 && (
                        <Box sx={{ width: '100%', textAlign: 'center', py: 4 }}>
                            <Typography variant="h6">No primary care services found matching "{searchTerm}"</Typography>
                        </Box>
                    )}
                </Grid>
            </TabPanel>
        </Container>
    );
};

interface ServiceCardProps {
    service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
    return (
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
                image={service.image || '/default-service.jpg'}
                alt={service.name}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ mb: 1 }}>
                    <Chip
                        label={service.category}
                        color={
                            service.category === 'Gender-Affirming' ? 'primary' :
                                service.category === 'Mental Health' ? 'secondary' : 'default'
                        }
                        size="small"
                    />
                </Box>
                <Typography gutterBottom variant="h5" component="h2">
                    {service.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {service.description}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <AccessTimeIcon fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                            {service.duration} min
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <AttachMoneyIcon fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                            ${service.price}
                        </Typography>
                    </Box>
                </Box>
                <Button
                    component={RouterLink}
                    to={`/app/appointments?service=${service.id}`}
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                    endIcon={<ArrowForwardIcon />}
                >
                    Book Appointment
                </Button>
            </CardContent>
        </Card>
    );
};

// Service type
interface Service {
    id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    duration: number;
    image?: string;
}

// Sample data
const services: Service[] = [
    {
        id: '1',
        name: 'Hormone Therapy Consultation',
        description: 'Initial or follow-up consultation for hormone replacement therapy.',
        category: 'Gender-Affirming',
        price: 150,
        duration: 60,
        image: '/service-hormone.jpg',
    },
    {
        id: '2',
        name: 'Gender Therapy Session',
        description: 'One-on-one therapy session focused on gender identity and transition.',
        category: 'Mental Health',
        price: 120,
        duration: 50,
        image: '/service-therapy.jpg',
    },
    {
        id: '3',
        name: 'Voice and Communication Therapy',
        description: 'Voice feminization or masculinization therapy with a speech pathologist.',
        category: 'Gender-Affirming',
        price: 100,
        duration: 45,
        image: '/service-voice.jpg',
    },
    {
        id: '4',
        name: 'Annual Physical Exam',
        description: 'Comprehensive annual health check-up with gender-affirming care providers.',
        category: 'Primary Care',
        price: 200,
        duration: 60,
        image: '/service-physical.jpg',
    },
    {
        id: '5',
        name: 'Pre-Surgery Consultation',
        description: 'Consultation and preparation for gender-affirming surgical procedures.',
        category: 'Gender-Affirming',
        price: 180,
        duration: 90,
        image: '/service-surgery.jpg',
    },
    {
        id: '6',
        name: 'Individual Counseling',
        description: 'General mental health counseling with gender-specialized therapists.',
        category: 'Mental Health',
        price: 110,
        duration: 50,
        image: '/service-counseling.jpg',
    },
    {
        id: '7',
        name: 'Sexual Health Consultation',
        description: 'Confidential consultation focused on sexual health needs.',
        category: 'Primary Care',
        price: 130,
        duration: 45,
        image: '/service-sexual-health.jpg',
    },
    {
        id: '8',
        name: 'Support Group Session',
        description: 'Facilitated group therapy and support for gender-diverse individuals.',
        category: 'Mental Health',
        price: 40,
        duration: 120,
        image: '/service-group.jpg',
    },
    {
        id: '9',
        name: 'Post-Transition Care',
        description: 'Ongoing healthcare services for post-transition individuals.',
        category: 'Gender-Affirming',
        price: 120,
        duration: 45,
        image: '/service-post-transition.jpg',
    },
];

export default ServicesPage; 