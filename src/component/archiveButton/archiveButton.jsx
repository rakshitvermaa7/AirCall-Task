import React from 'react';
import { ListItem, ListItemText, ListItemAvatar, Badge } from '@mui/material';
import { ArchiveIcon } from '../../assests';
import { CommonText } from '../../enum/common';

function buttonItem({ feedCalls, onArchiveClick, isArchived, archivedItems, activeCalls }) {
  console.log("archivedItems", archivedItems);
  console.log("activeCalls", activeCalls)

  return (
    <>
      <ListItem
        sx={{
          border: '1px solid rgba(0, 0, 0, 0.12)',
          margin: '8px 0',
          borderRadius: '14px',
          '& .MuiListItemAvatar-root': {
            minWidth: 'unset',
          },
          '& .MuiBadge-root': {
            marginRight: '8px',
          },
          cursor: "pointer"
        }} onClick={onArchiveClick}>
        <ListItemAvatar>
          <Badge badgeContent={feedCalls?.is_archived ? "A" : null} color="error" overlap="circular" >
            <img src={ArchiveIcon} height={25} width={25} />
          </Badge>

        </ListItemAvatar>
        <ListItemText
          primary={isArchived || archivedItems > 0 ? CommonText.UnarchiveText : CommonText.ArchiveText}
          primaryTypographyProps={{
            fontWeight: 'bold',
            color: '#00000099',
            fontSize: '14px'
          }}
        />
      </ListItem>
    </>
  );
}

export default buttonItem;