import React from 'react';
import { Dialog, DialogContent } from '@mui/material';

const ReusbaleDialog = (props) => {
  const { open, onClose, children } = props
  return (
    <Dialog disableBackdropClick {...props} open={open} onClose={onClose} fullWidth>
      <DialogContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'auto' }}>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default ReusbaleDialog;
