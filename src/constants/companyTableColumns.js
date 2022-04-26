import React from 'react';
import { 
    TableCell,
    TableRow,
    Typography
} from '@material-ui/core';
import { Edit } from '@material-ui/icons';
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
        backgroundColor:theme.palette.primary.dark,
        color: theme.palette.getContrastText(theme.palette.primary.dark)
    },
    fullname:{
        fontWeight: 'bold',
        color:theme.palette.secondary.dark
      }
  }));

const CompanyColumns= (props) =>{
    const classes = useStyles();
    const { rows, page, rowsPerPage, editFunc } = props;

    //console.log(rows);

    return(
        <>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow key={row._id}>
                <TableCell component="th" scope="row">
                <Typography className={classes.fullname}>{row.companyName}</Typography>
                </TableCell>
                <TableCell ><Edit onClick={() => editFunc(row._id)}  /></TableCell>
                </TableRow>
            ))}
        </>
    )
}


export default CompanyColumns;