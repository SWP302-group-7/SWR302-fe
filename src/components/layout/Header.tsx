import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import icongender from '../../images/icongender.png';

const Header: React.FC = () => {
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                        <img
                            src={icongender}
                            alt="Gender Healthcare Icon"
                            style={{ width: '2em', height: '2em', marginRight: '20px' }}
                        />
                        <Typography variant="h6" component="div">
                            Gender Healthcare
                        </Typography>

                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header; 