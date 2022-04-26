import React from 'react';
import CompanyColumnHead from '../../constants/companyTableColumnsHead';
import CompanyColumns from '../../constants/companyTableColumns';
import { 
    TableBody,
    TableHead
} from '@material-ui/core';

const CompanyTableRecords = (props) => {
    const { rows, page, rowsPerPage, editFunc } = props;
    //console.log(rows);
    return (
        <>
            <TableHead>
                <CompanyColumnHead />
            </TableHead>
            <TableBody>
                <CompanyColumns editFunc={editFunc} rows={rows} page={page} rowsPerPage={rowsPerPage} />
            </TableBody>
        </>
    )
}

export default CompanyTableRecords;