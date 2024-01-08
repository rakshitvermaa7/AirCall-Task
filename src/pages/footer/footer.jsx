import React, { useState } from 'react';
import { BottomNavigation, BottomNavigationAction, Badge, Paper } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { dialpad, status } from '../../assests';

const iconStyle = {
    fontSize: '1.8rem',
};

const Footer = ({ activeCallsCount }) => {
    const [value, setValue] = useState(0);

    return (
        <Paper sx={{ bottom: 0, left: 0, right: 0, zIndex: 100 }} elevation={3}>
            <BottomNavigation
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                showLabels
            >
                <BottomNavigationAction
                    icon={
                        <Badge badgeContent={activeCallsCount} color="error">
                            <PhoneIcon style={iconStyle} />
                        </Badge>
                    }
                />
                <BottomNavigationAction
                    icon={<PersonOutlineOutlinedIcon style={iconStyle} />}
                />
                <BottomNavigationAction
                    icon={<img src={dialpad} alt="call" style={{
                        height: '50px',
                        borderRadius: '100%',
                        border: '2px solid white',
                        backgroundColor: 'white',
                        padding: '5px',
                        marginBottom: '30px',
                        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
                    }} />}
                />
                <BottomNavigationAction
                    icon={<SettingsOutlinedIcon style={iconStyle} />}
                />
                <BottomNavigationAction
                    icon={<img src={status} alt="call" style={{
                        height: '13px',
                        borderRadius: '100%',
                        border: '2px solid white',
                        backgroundColor: 'white',
                        padding: '5px',
                        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.15)',
                    }} />}
                />
            </BottomNavigation>
        </Paper>
    );
};

export default Footer;
