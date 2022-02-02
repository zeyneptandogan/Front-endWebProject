import React from 'react'
import { Dialog, DialogContent, DialogActions, Typography, makeStyles } from '@material-ui/core'
import Controls from "../controls/Controls";
import {ArrowForwardOutlined} from "@material-ui/icons";


const useStyles = makeStyles(theme => ({
    dialog: { //bu yukarıda cikmasina yol acacak silelim bence
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5)
    },
    //dialog title sildim.
    dialogContent: {
        textAlign: 'center'
    },
    dialogAction: {
        justifyContent: 'center'
    },
    titleIcon: {
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.secondary.main,
        '&:hover': {
            backgroundColor: theme.palette.secondary.light,
            cursor: 'default'
        },
        '& .MuiSvgIcon-root': {
            fontSize: '8rem',
        }
    }
}))

export default function ConfirmTransaction(props) {

    const { confirmTransaction, setConfirmTransaction } = props;
    const classes = useStyles()

    return (
        <Dialog open={confirmTransaction.isOpen} classes={{ paper: classes.dialog }}>

            <DialogContent className={classes.dialogContent}>
                <Typography variant="h6">
                    {confirmTransaction.title}
                </Typography>
                <Typography variant="subtitle2">
                    {confirmTransaction.subTitle}
                </Typography>
            </DialogContent>
            <DialogActions className={classes.dialogAction}>
                <Controls.Button
                    text="Continue"
                    color="default"
                    startIcon={<ArrowForwardOutlined/>}
                    onClick={confirmTransaction.onConfirm}
                />
            </DialogActions>
        </Dialog>
    )
}