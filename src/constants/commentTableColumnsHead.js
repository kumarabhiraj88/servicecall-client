import React from 'react';
import { 
    TableCell,
    TableRow
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
       // backgroundColor:theme.palette.primary.dark,
        backgroundColor: '#0973b9',
        color: theme.palette.getContrastText(theme.palette.primary.dark)
    }
  }));

const CommentColumnHead= () =>{
    const classes = useStyles();
    return(
        <TableRow>
            <TableCell className={classes.tableHeaderCell}>Comment</TableCell>
            <TableCell className={classes.tableHeaderCell}>Updated By</TableCell>
            <TableCell className={classes.tableHeaderCell}>Updated On</TableCell>
            <TableCell className={classes.tableHeaderCell}>Action</TableCell>
          </TableRow>
    )
}

export default CommentColumnHead;