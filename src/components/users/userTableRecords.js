import React from 'react';
import UserColumnHead from '../../constants/userTableColumnsHead';
import UserColumns from '../../constants/userTableColumns';
import { 
    TableBody,
    TableHead
} from '@material-ui/core';

const UserTableRecords = (props) => {
    const { rows, page, rowsPerPage, editFunc } = props;
    //console.log(rows);
    return (
        <>
            <TableHead>
                <UserColumnHead />
            </TableHead>
            <TableBody>
                <UserColumns editFunc={editFunc} rows={rows} page={page} rowsPerPage={rowsPerPage} />
            </TableBody>
        </>
    )
}

export default UserTableRecords;