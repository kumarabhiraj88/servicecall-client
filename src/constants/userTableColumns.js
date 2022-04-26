import React from 'react';
import { 
    TableCell,
    TableRow,
    Typography,
    Switch
} from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import * as userTypes from '../redux/types/userTypes';
import { 
	userEnableDisable
	 } from "../redux/actions/userActions";
import { connect } from 'react-redux';



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

const UserColumns= (props) =>{
    const classes = useStyles();
    const { rows, page, rowsPerPage, userEnableDisable, editFunc } = props;
    //const [userStatusState, setUserStatusState]= useState();

    //console.log(rows);

    return(
        <>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow key={row._id}>
                <TableCell component="th" scope="row">
                <Typography className={classes.fullname}>{row.fullName}</Typography>
                </TableCell>
                <TableCell >{row.email}</TableCell>
                <TableCell >
                            {
                                 userTypes.privileges.map((item)=>{
                                    if(item._id === row.privilegeId){
                                        return item.Role;
                                    }
                                    else{ return null }
                                })
                            }
                </TableCell>
                <TableCell >{row.companyId? row.companyId.companyName : ''}</TableCell>
                <TableCell >
                    <Switch 
                        name="status" 
                        color="primary" 
                        checked={row.status}
                        onChange={() => userEnableDisable(row._id, row.status)}
                    />
                </TableCell>
                <TableCell ><Edit onClick={() => editFunc(row._id)}  /></TableCell>
                </TableRow>
            ))}
        </>
    )
}
const mapDispatchToProps = {
    userEnableDisable
}

export default connect(null, mapDispatchToProps) (UserColumns);