import React, { useState } from 'react';
import { ListItem, ListItemText, ListItemAvatar, Avatar, Badge, Typography, Box, Collapse, IconButton } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import VoicemailIcon from '@mui/icons-material/Voicemail';
import CallMissedIcon from '@mui/icons-material/CallMissed';
import { formatDuration } from '../../utils/formatDuration';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { AppText } from '../../enum/appText';
import { CommonText } from '../../enum/common';

function CallLogItem({ call, onSelect }) {
    const [baseTime, period] = new Date(call.created_at).toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit', hour12: true
    }).split(' ');

    const getIcon = () => {
        switch (call.call_type) {
            case AppText.MISSED:
                return <CallMissedIcon color="error" />;
            case AppText.VOICEMAIL:
                return <VoicemailIcon />;
            default:
                return <PhoneIcon />;
        }
    };

    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const formattedDuration = formatDuration(call.duration);

    return (
        <>
            <ListItem sx={{
                border: '1px solid rgba(0, 0, 0, 0.12)',
                margin: '8px 0',
                borderRadius: '14px',
                cursor: 'pointer'
            }} onClick={handleClick}>
                <ListItemAvatar>
                    <Badge badgeContent={call.is_archived ? "A" : null} color="error">
                        <Avatar>
                            {getIcon()}
                        </Avatar>
                    </Badge>
                </ListItemAvatar>
                <ListItemText
                    primary={`+${call.from}`}
                    secondary={`${CommonText.CallOn} +${call.to}`}
                    primaryTypographyProps={{
                        noWrap: true,
                        fontWeight: 'bold',
                    }}
                    secondaryTypographyProps={{
                        noWrap: true,
                        fontSize: '0.75rem',
                    }}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                        : {baseTime}
                    </Typography>
                    <Box sx={{ border: '0.5px solid #d3d3d3', color: "#968e8e", padding: '2px 6px', borderRadius: '4px', ml: '4px', fontSize: '0.75rem' }}>
                        {period}
                    </Box>
                </Box>
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 4, paddingRight: 4 }}>
                    <Typography variant="body2" color="textSecondary" fontSize={12}>{CommonText.Duration}: {formattedDuration}</Typography>
                    <IconButton onClick={onSelect} edge="end" aria-label="delete">
                        <InfoOutlinedIcon />
                    </IconButton>
                </Box>
            </Collapse>
        </>
    );
}

export default CallLogItem;
