import React, { useState, useEffect } from 'react';
import { List, Typography, Box } from '@mui/material';
import CallLogItem from '../CallLogs/callLogItem.jsx';
import { callsGroupedByDate } from '../../utils/groupCallByDate.js';
import ArchiveButton from '../archiveButton/archiveButton.jsx';
import { nodata } from '../../assests/index.js';
import CallDetail from '../callDetail/callDetail.jsx';
import { archivedAllCall, getAllFeedCall } from '../../services/feedCallService.js';
import { AppText } from '../../enum/appText.js';

function CallLogsList({ currentTab, onActiveCallsCountChange }) {
    const [activeCalls, setActiveCalls] = useState([]);
    const [archivedCalls, setArchivedCalls] = useState([]);
    const [selectedCall, setSelectedCall] = useState(null);
    const [isArchived, setIsArchived] = useState(false);
    console.log("isArchived", isArchived);

    const fetchAllCallFeedData = async () => {
        const feedCallData = await getAllFeedCall();
        setActiveCalls(feedCallData)
    };

    useEffect(() => {
        if (typeof onActiveCallsCountChange === 'function') {
            onActiveCallsCountChange(activeCalls.length);
        } else {
            console.error('onActiveCallsCountChange is not a function');
        }
    }, [activeCalls, onActiveCallsCountChange]);


    useEffect(() => {
        if (!isArchived) {
            fetchAllCallFeedData();
        }
    }, [isArchived]);

    const handleArchiveClick = async () => {
        await archivedAllCall();
        setIsArchived(!isArchived);
        if (currentTab === AppText.INBOX) {
            setArchivedCalls([...activeCalls]);
            setActiveCalls([]);
        } else {
            setActiveCalls([...activeCalls, ...archivedCalls]);
            setArchivedCalls([]);
        }
    };

    const handleCallSelect = (call) => {
        setSelectedCall(call);
    };

    const handleBack = () => {
        setSelectedCall(null);
    };
    const handleDeleteCall = (callId) => {
        const updatedActiveCalls = activeCalls.filter(call => call.id !== callId);
        const callToArchive = activeCalls.find(call => call.id === callId);
        setActiveCalls(updatedActiveCalls);
        setArchivedCalls([...archivedCalls, callToArchive]);
        setSelectedCall(null);
    };
    const handleRestore = (callId) => {
        const restoredCall = archivedCalls.find(call => call.id === callId);
        if (restoredCall) {
            setArchivedCalls(prev => prev.filter(call => call.id !== callId));
            setActiveCalls(prev => [restoredCall, ...prev]);
            setSelectedCall(null);
        }
    };

    const renderCalls = (calls) => {
        const groupedCalls = callsGroupedByDate(calls || []);
        const sortedDates = Object.keys(groupedCalls).sort((a, b) => new Date(b) - new Date(a));

        return sortedDates.map((date) => (
            <Box key={date}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    '&::before, &::after': {
                        content: '""',
                        flex: 1,
                        borderTop: '1px dashed rgba(0,0,0,0.1)'
                    }
                }}>
                    <Typography variant="caption" sx={{ color: 'text.secondary', mx: 1 }}>
                        {date}
                    </Typography>
                </Box>
                {groupedCalls[date].map((call) => (
                    <CallLogItem key={call.id} call={call} onSelect={() => handleCallSelect(call)} />
                ))}
            </Box>
        ));
    };

    return (
        <>
            {!selectedCall && currentTab === AppText.INBOX && <ArchiveButton onArchiveClick={handleArchiveClick} isArchived={isArchived} />}
            {!selectedCall && currentTab === AppText.ARCHIVE && archivedCalls.length > 0 && (
                <ArchiveButton onArchiveClick={handleArchiveClick} isArchived={isArchived} archivedItems={archivedCalls?.length} activeCalls={activeCalls} />
            )}
            <List>
                {!selectedCall && (currentTab === AppText.INBOX ? renderCalls(activeCalls) : renderCalls(archivedCalls))}
            </List>
            {selectedCall && <CallDetail call={selectedCall.id}
                onBack={handleBack}
                onDelete={handleDeleteCall}
                onRestore={handleRestore}
                isArchived={currentTab === AppText.ARCHIVE} />}
            {isArchived && currentTab === AppText.INBOX && !activeCalls.length && (
                <div style={{ padding: "70px" }}>
                    <img src={nodata} alt={AppText.NODATA} />
                </div>
            )}

            {!isArchived && currentTab === AppText.ARCHIVE && !archivedCalls.length && (
                <div style={{ padding: "70px" }}>
                    <img src={nodata} alt={AppText.NODATA} />
                </div>
            )}
        </>
    );

}

export default CallLogsList;