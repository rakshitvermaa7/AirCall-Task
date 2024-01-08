import React from 'react';
import { Box, Tab, Tabs, Typography, Stack } from '@mui/material';
import { cellPhoneImage } from '../../assests';
import { CustomIcon } from '../../assests';
import { AppText } from '../../enum/appText';
import { CommonText } from '../../enum/common';

function MyTabs({ onTabChange }) {
    const [value, setValue] = React.useState(AppText.INBOX);

    const handleChange = (event,newValue) => {
        setValue(newValue);
        onTabChange(newValue);
    };

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '0px 10px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Stack mr={1}>
                        <img src={cellPhoneImage} alt={CommonText.call} height={30} />
                    </Stack>
                    <Typography variant="subtitle1" sx={{ fontSize: '16px', textTransform: 'none', fontWeight: 600 }}>{CommonText.activity}</Typography>
                </Box>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    TabIndicatorProps={{
                        style: { backgroundColor: 'red' }
                    }}
                    sx={{
                        '.MuiTab-root': {
                            textTransform: 'none',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            color: 'rgba(0, 0, 0, 0.54)',
                        },
                        '.Mui-selected': {
                            color: 'black',
                        },
                    }}
                >
                    <Tab value={AppText.INBOX} label={AppText.INBOX} />
                    <Tab value={AppText.ARCHIVE} label={AppText.ARCHIVE} />
                </Tabs>
                <CustomIcon sx={{ fontSize: '24px', color: '#00000099', fontWeight: 'bold', padding: '0px 20px' }} />
            </Box>
        </>
    );
}

export default MyTabs;
