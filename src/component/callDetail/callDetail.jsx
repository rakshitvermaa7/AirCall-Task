import React, { useState, useEffect } from 'react';
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton,
    Typography,
    Box,
    Divider,
    Grid,
    duration
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MessageIcon from '@mui/icons-material/Message';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BlockIcon from '@mui/icons-material/Block';
import DeleteIcon from '@mui/icons-material/Delete';
import { avatar } from '../../assests';
import { formatDuration } from '../../utils/formatDuration';
import RestoreIcon from '@mui/icons-material/Restore';
import { deleteCallById, getCallDetailById } from '../../services/feedCallService';
import { CommonText } from '../../enum/common';

export default function ContactActions({ call, onBack, onDelete, onRestore, isArchived }) {
    const { RestoreContact, DeleteContact, SendMessage, ShareContact, BlockThisCaller, AddToFavourites, BackToList, CallFrom, Direction, CallType, Via, Duration } = CommonText;
    if (!call) return null;

    const callID = call;
    const [callDetail, setCallDetail] = useState([]);

    const fetchCallDetailById = async () => {
        const callDetail = await getCallDetailById(callID);
        setCallDetail(callDetail)
    };

    const handleDeleteCall = async () => {
        const data = {
            is_archived: true
        };
        await deleteCallById(callID, data);
        onDelete(callID);
    };

    const handleRestoreCall = () => {
        onRestore(callID);
    };

    useEffect(() => {
        fetchCallDetailById()
    }, [])

    const actions = [
        isArchived
            ? { icon: <RestoreIcon />, text: RestoreContact, color: 'error', onClick: handleRestoreCall }
            : { icon: <DeleteIcon />, text: DeleteContact, color: 'error', onClick: handleDeleteCall },
        { icon: <MessageIcon />, text: SendMessage, color: 'primary' },
        { icon: <ShareIcon />, text: ShareContact, color: 'primary' },
        { icon: <BlockIcon />, text: BlockThisCaller, color: 'primary', separate: true },
        { icon: <FavoriteIcon />, text: AddToFavourites, color: 'primary', separate: true },
    ];

    return (
        <>
            <IconButton onClick={onBack} aria-label={BackToList}>
                <ArrowBackIcon />
            </IconButton>
            <Box sx={{ bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1, overflow: 'hidden' }}>
                <Box sx={{ p: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img src={avatar} alt="user" height={80} />
                    <Typography variant="body2" m={2}>{`${CallFrom} ${callDetail?.from}`}</Typography>
                    <Grid container spacing={2} pl={2}>
                        <Grid item xs={6}>
                            <Typography variant="caption">{`${Duration}: ${formatDuration(callDetail?.duration)}`}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="caption">{`${Direction}: ${callDetail?.direction}`}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="caption">{`${CallType}: ${callDetail?.call_type}`}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="caption">{`${Via}: ${callDetail?.via}`}</Typography>
                        </Grid>

                    </Grid>
                </Box>
                <Divider />
                <List disablePadding>
                    {actions.map((action, index) => (
                        <React.Fragment key={index}>
                            {action.separate && <Divider />}
                            <ListItem
                                button
                                onClick={action.text === DeleteContact || action.text === RestoreContact ? action.onClick : null}
                            >
                                <ListItemIcon sx={{ color: action.color === 'error' ? 'red' : '#1976d2' }}>
                                    {action.icon}
                                </ListItemIcon>
                                <ListItemText primary={action.text} sx={{ color: action.color === 'error' ? 'red' : '#1976d2' }} />
                            </ListItem>
                        </React.Fragment>
                    ))}
                </List>
            </Box>
        </>
    );
}
