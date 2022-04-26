import React from 'react';
import { 
    TableCell,
    TableRow,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme)=>({
    table: {
      minWidth: 650,
    },
    tableContainer: {
        borderRadius:15,
        margin: '10px 10px'
    },
    tableHeaderCell: {
        fontWeight:'bold',
        //backgroundColor:theme.palette.primary.dark,
        backgroundColor: '#0973b9',
        color: theme.palette.getContrastText(theme.palette.primary.dark)
    }
  }));

const ServicecallColumnHead= () =>{
    const classes = useStyles();
    return(
        <TableRow>
            <TableCell className={classes.tableHeaderCell}>Bug Id</TableCell>
            <TableCell className={classes.tableHeaderCell}>Company</TableCell>
            <TableCell className={classes.tableHeaderCell}>Product</TableCell>
            <TableCell className={classes.tableHeaderCell}>Filed By</TableCell>
            <TableCell className={classes.tableHeaderCell}>Assigned To</TableCell>
            <TableCell className={classes.tableHeaderCell}>Expected Completion Date</TableCell>
            <TableCell className={classes.tableHeaderCell}>Status</TableCell>
            <TableCell className={classes.tableHeaderCell}>Action</TableCell>
          </TableRow>
    )
}

export default ServicecallColumnHead;