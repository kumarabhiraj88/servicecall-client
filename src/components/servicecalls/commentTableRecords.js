import React from 'react';
import CommentColumnHead from '../../constants/commentTableColumnsHead';
import CommentColumns from '../../constants/commentTableColumns';
import { 
    TableBody,
    TableHead
} from '@material-ui/core';

const CommentTableRecords = (props) => {
    const { rows, page, rowsPerPage, editFunc, deleteFunc, filePopupPage } = props;
    return (
        <>
            <TableHead>
                <CommentColumnHead />
            </TableHead>
            <TableBody>
                <CommentColumns editFunc={editFunc} deleteFunc={deleteFunc} filePopupPage={filePopupPage} rows={rows} page={page} rowsPerPage={rowsPerPage} />
            </TableBody>
        </>
    )
}

export default CommentTableRecords;