import React from "react";
import {DialogTitle, Dialog, DialogContent, Typography} from "@material-ui/core";

import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    dialogTitle: {
        paddingRight: '0px'
    }
}))


function Popup(props) {
    const classes = useStyles();
    const {title, children, openPopup, setOpenPopup} = props;
    return(
        <Dialog open={openPopup} maxWidth="md">
            <DialogTitle className={classes.dialogTitle}>
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                        {title}
                    </Typography>

                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    )
}
export default Popup;