import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Tabs,
    Tab,
    Card,
    CardContent,
    Button,
    Divider,
    Chip,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Alert,
    Paper,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    useTheme,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {
    CalendarMonth as CalendarIcon,
    Person as PersonIcon,
    MedicalServices as MedicalServicesIcon,
    AccessTime as TimeIcon,
    Close as CloseIcon,
    Add as AddIcon,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Appointment, Doctor, Service } from '../../types';
import { format } from 'date-fns';

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
            id={`appointment-tabpanel-${index}`}
            aria-labelledby={`appointment-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `appointment-tab-${index}`,
        'aria-controls': `appointment-tabpanel-${index}`,
    };
}

const AppointmentPage: React.FC = () => {
    const theme = useTheme();
    const [tabValue, setTabValue] = useState(0);
    const [openBooking, setOpenBooking] = useState(false);
    const [selectedService, setSelectedService] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [selectedTime, setSelectedTime] = useState('');
    const [notes, setNotes] = useState('');
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [bookingError, setBookingError] = useState('');

    const { user } = useSelector((state: RootState) => state.auth);

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleOpenBooking = () => {
        setOpenBooking(true);
        resetForm();
    };

    const handleCloseBooking = () => {
        setOpenBooking(false);
        if (bookingSuccess) {
            setBookingSuccess(false);
        }
    };

    const resetForm = () => {
        setSelectedService('');
        setSelectedDoctor('');
        setSelectedDate(new Date());
        setSelectedTime('');
        setNotes('');
        setBookingError('');
    };

    const handleBookAppointment = () => {
        // Validate form
        if (!selectedService || !selectedDoctor || !selectedDate || !selectedTime) {
            setBookingError('Please fill all required fields');
            return;
        }

        // Simulate appointment booking
        setTimeout(() => {
            // In a real app, this would be an API call and you would add the appointment to state
            // For demo purposes, we're just showing success message
            setBookingSuccess(true);
            setBookingError('');
        }, 1000);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'confirmed':
                return theme.palette.success.main;
            case 'pending':
                return theme.palette.warning.main;
            case 'cancelled':
                return theme.palette.error.main;
            case 'completed':
                return theme.palette.info.main;
            default:
                return theme.palette.grey[500];
        }
    };

    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" component="h1">
                    Appointments
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleOpenBooking}
                >
                    Book New Appointment
                </Button>
            </Box>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    aria-label="appointment tabs"
                >
                    <Tab label="Upcoming" {...a11yProps(0)} />
                    <Tab label="Past" {...a11yProps(1)} />
                    <Tab label="Cancelled" {...a11yProps(2)} />
                </Tabs>
            </Box>

            <TabPanel value={tabValue} index={0}>
                {upcomingAppointments.length > 0 ? (
                    upcomingAppointments.map((appointment) => (
                        <AppointmentCard
                            key={appointment.id}
                            appointment={appointment}
                            statusColor={getStatusColor(appointment.status)}
                        />
                    ))
                ) : (
                    <Paper sx={{ p: 4, textAlign: 'center' }}>
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                            No upcoming appointments
                        </Typography>
                        <Button
                            variant="outlined"
                            color="primary"
                            startIcon={<AddIcon />}
                            onClick={handleOpenBooking}
                            sx={{ mt: 2 }}
                        >
                            Book an Appointment
                        </Button>
                    </Paper>
                )}
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
                {pastAppointments.length > 0 ? (
                    pastAppointments.map((appointment) => (
                        <AppointmentCard
                            key={appointment.id}
                            appointment={appointment}
                            statusColor={getStatusColor(appointment.status)}
                        />
                    ))
                ) : (
                    <Paper sx={{ p: 4, textAlign: 'center' }}>
                        <Typography variant="h6" color="text.secondary">
                            No past appointments
                        </Typography>
                    </Paper>
                )}
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
                {cancelledAppointments.length > 0 ? (
                    cancelledAppointments.map((appointment) => (
                        <AppointmentCard
                            key={appointment.id}
                            appointment={appointment}
                            statusColor={getStatusColor(appointment.status)}
                        />
                    ))
                ) : (
                    <Paper sx={{ p: 4, textAlign: 'center' }}>
                        <Typography variant="h6" color="text.secondary">
                            No cancelled appointments
                        </Typography>
                    </Paper>
                )}
            </TabPanel>

            {/* Book Appointment Dialog */}
            <Dialog open={openBooking} onClose={handleCloseBooking} maxWidth="md" fullWidth>
                <DialogTitle>
                    {bookingSuccess ? 'Appointment Booked' : 'Book an Appointment'}
                </DialogTitle>
                <DialogContent>
                    {bookingSuccess ? (
                        <Box sx={{ textAlign: 'center', py: 2 }}>
                            <Alert severity="success" sx={{ mb: 2 }}>
                                Your appointment has been booked successfully!
                            </Alert>
                            <DialogContentText>
                                You will receive a confirmation email with the details of your appointment.
                                You can view and manage your appointments on this page.
                            </DialogContentText>
                        </Box>
                    ) : (
                        <>
                            {bookingError && (
                                <Alert severity="error" sx={{ mb: 2 }}>
                                    {bookingError}
                                </Alert>
                            )}
                            <DialogContentText sx={{ mb: 3 }}>
                                Please fill in the details below to book your appointment.
                            </DialogContentText>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Box>
                                    <FormControl fullWidth required>
                                        <InputLabel id="service-select-label">Service</InputLabel>
                                        <Select
                                            labelId="service-select-label"
                                            id="service-select"
                                            value={selectedService}
                                            label="Service"
                                            onChange={(e) => setSelectedService(e.target.value)}
                                        >
                                            {services.map((service) => (
                                                <MenuItem key={service.id} value={service.id}>
                                                    {service.name} (${service.price}, {service.duration} min)
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                                <Box>
                                    <FormControl fullWidth required>
                                        <InputLabel id="doctor-select-label">Doctor</InputLabel>
                                        <Select
                                            labelId="doctor-select-label"
                                            id="doctor-select"
                                            value={selectedDoctor}
                                            label="Doctor"
                                            onChange={(e) => setSelectedDoctor(e.target.value)}
                                        >
                                            {doctors.map((doctor) => (
                                                <MenuItem key={doctor.id} value={doctor.id}>
                                                    Dr. {doctor.firstName} {doctor.lastName} ({doctor.specialization})
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                                    <Box sx={{ flex: 1 }}>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                label="Date"
                                                value={selectedDate}
                                                onChange={setSelectedDate}
                                                minDate={new Date()}
                                                sx={{ width: '100%' }}
                                            />
                                        </LocalizationProvider>
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <FormControl fullWidth required>
                                            <InputLabel id="time-select-label">Time</InputLabel>
                                            <Select
                                                labelId="time-select-label"
                                                id="time-select"
                                                value={selectedTime}
                                                label="Time"
                                                onChange={(e) => setSelectedTime(e.target.value)}
                                            >
                                                {timeSlots.map((slot) => (
                                                    <MenuItem key={slot} value={slot}>
                                                        {slot}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Box>
                                <Box>
                                    <TextField
                                        fullWidth
                                        id="notes"
                                        label="Notes (Optional)"
                                        multiline
                                        rows={3}
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                    />
                                </Box>
                            </Box>
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseBooking}>
                        {bookingSuccess ? 'Close' : 'Cancel'}
                    </Button>
                    {!bookingSuccess && (
                        <Button onClick={handleBookAppointment} variant="contained" color="primary">
                            Book Appointment
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </Container>
    );
};

interface AppointmentCardProps {
    appointment: Appointment;
    statusColor: string;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment, statusColor }) => {
    return (
        <Card sx={{ mb: 2 }}>
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box>
                        <Typography variant="h6" component="div">
                            {appointment.serviceName}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                            <PersonIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                            <Typography variant="body2" color="text.secondary">
                                Dr. {appointment.doctorName}
                            </Typography>
                        </Box>
                    </Box>
                    <Chip
                        label={appointment.status}
                        sx={{
                            backgroundColor: statusColor,
                            color: '#fff',
                            textTransform: 'capitalize'
                        }}
                    />
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    <Box sx={{ width: { xs: '100%', sm: 'calc(33.333% - 8px)' }, display: 'flex', alignItems: 'center' }}>
                        <CalendarIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2">
                            {appointment.date}
                        </Typography>
                    </Box>
                    <Box sx={{ width: { xs: '100%', sm: 'calc(33.333% - 8px)' }, display: 'flex', alignItems: 'center' }}>
                        <TimeIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2">
                            {appointment.startTime}
                        </Typography>
                    </Box>
                    <Box sx={{ width: { xs: '100%', sm: 'calc(33.333% - 8px)' }, display: 'flex', alignItems: 'center' }}>
                        <MedicalServicesIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2">
                            Appointment ID: {appointment.id.substring(0, 8)}
                        </Typography>
                    </Box>
                </Box>

                {appointment.status === 'confirmed' && (
                    <Box sx={{ mt: 2 }}>
                        <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            startIcon={<CloseIcon />}
                        >
                            Cancel Appointment
                        </Button>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

// Sample data
const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '01:00 PM', '01:30 PM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
    '04:00 PM', '04:30 PM'
];

const services: Service[] = [
    {
        id: '1',
        name: 'Hormone Therapy Consultation',
        description: 'Initial or follow-up consultation for hormone replacement therapy.',
        category: 'Gender-Affirming',
        price: 150,
        duration: 60,
    },
    {
        id: '2',
        name: 'Gender Therapy Session',
        description: 'One-on-one therapy session focused on gender identity and transition.',
        category: 'Mental Health',
        price: 120,
        duration: 50,
    },
    {
        id: '3',
        name: 'Voice and Communication Therapy',
        description: 'Voice feminization or masculinization therapy with a speech pathologist.',
        category: 'Gender-Affirming',
        price: 100,
        duration: 45,
    },
];

const doctors: Doctor[] = [
    {
        id: '1',
        firstName: 'Sarah',
        lastName: 'Johnson',
        specialization: 'Endocrinology',
        experience: 8,
        gender: 'female',
        bio: 'Specializes in hormone therapy for gender transition.',
        available: true,
    },
    {
        id: '2',
        firstName: 'Michael',
        lastName: 'Chen',
        specialization: 'Psychiatry',
        experience: 12,
        gender: 'male',
        bio: 'Expertise in gender identity and mental health support during transition.',
        available: true,
    },
    {
        id: '3',
        firstName: 'Aisha',
        lastName: 'Khan',
        specialization: 'Speech Therapy',
        experience: 6,
        gender: 'female',
        bio: 'Voice feminization and masculinization specialist.',
        available: true,
    },
];

const upcomingAppointments: Appointment[] = [
    {
        id: 'apt12345',
        patientId: '1',
        doctorId: '1',
        serviceId: '1',
        date: '2023-06-15',
        startTime: '10:00 AM',
        endTime: '11:00 AM',
        status: 'confirmed',
        patientName: 'Demo User',
        doctorName: 'Sarah Johnson',
        serviceName: 'Hormone Therapy Consultation',
    },
    {
        id: 'apt12346',
        patientId: '1',
        doctorId: '2',
        serviceId: '2',
        date: '2023-06-22',
        startTime: '02:30 PM',
        endTime: '03:20 PM',
        status: 'pending',
        patientName: 'Demo User',
        doctorName: 'Michael Chen',
        serviceName: 'Gender Therapy Session',
    },
];

const pastAppointments: Appointment[] = [
    {
        id: 'apt12340',
        patientId: '1',
        doctorId: '1',
        serviceId: '1',
        date: '2023-05-05',
        startTime: '09:30 AM',
        endTime: '10:30 AM',
        status: 'completed',
        patientName: 'Demo User',
        doctorName: 'Sarah Johnson',
        serviceName: 'Hormone Therapy Consultation',
    },
];

const cancelledAppointments: Appointment[] = [
    {
        id: 'apt12339',
        patientId: '1',
        doctorId: '3',
        serviceId: '3',
        date: '2023-05-20',
        startTime: '01:00 PM',
        endTime: '01:45 PM',
        status: 'cancelled',
        patientName: 'Demo User',
        doctorName: 'Aisha Khan',
        serviceName: 'Voice and Communication Therapy',
    },
];

export default AppointmentPage; 