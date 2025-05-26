import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import icongender from '../../images/icongender.png';

const Header: React.FC = () => {
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                        <Typography variant="h6" component="div">
                            Gender Healthcare
                        </Typography>
                        <img src={icongender} alt="Gender Healthcare Icon" sx={{ ml: 1, height: '24px', width: '24px' }} />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header; 