import React from 'react';
import moment from 'moment';
import { 
    TableCell,
    TableRow,
    Typography
} from '@material-ui/core';
import { Edit, Delete, InsertDriveFile } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import * as servicecallTypes from '../redux/types/servicecallTypes';


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

const CommentColumns= (props) =>{
    const classes = useStyles();
    const { rows, page, rowsPerPage, editFunc, deleteFunc, filePopupPage } = props;

    const loggedPrivilegeId = localStorage.getItem('privilegeId');

    return(
        <>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow key={row._id}>
                <TableCell  style={{ 'width': '50%' }} component="th" scope="row">
                    <Typography className={classes.fullname}>{row.bugDescription} 
                    
                            { 
                                row.changedStatus>=0  ? (
                                    servicecallTypes.bug_status.map((item)=>{
                                        
                                        if(item._id === row.changedStatus){
                                            return ' to '+ item.Status
                                        }
                                        else{ return null }
                                        
                                    })
                                ) : ''
                            }
                    </Typography>
                </TableCell>
                <TableCell style={{ 'width': '20%' }} >{row.updatedBy? row.updatedBy.fullName : '' }</TableCell>
                <TableCell style={{ 'width': '15%' }} >{moment(row.updatedAt).format('DD-MM-YYYY')}</TableCell>
                <TableCell style={{ 'width': '15%' }} >
                    {/* <a href={'https://servicecalluploads.s3.ap-south-1.amazonaws.com/'+row.bugAttachmentsUrl} target='_blank'><InsertDriveFile /></a> */}
                    {
                        row.bugAttachmentsUrl? <InsertDriveFile onClick={() =>filePopupPage(row._id)}  /> : ""
                    }
                    <Edit color="primary" onClick={() => editFunc(row._id)}  /> 
                {
                    loggedPrivilegeId=='1' ? <Delete onClick={() => deleteFunc(row._id)} color="error" /> : ''
                }
                
                </TableCell>
                </TableRow>
            ))}
        </>
    )
}


export default CommentColumns;