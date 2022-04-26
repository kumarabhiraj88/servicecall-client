import React from 'react';
import ServicecallColumnHead from '../../constants/servicecallTableColumnsHead';
import ServicecallColumns from '../../constants/servicecallTableColumns';
import { 
    TableBody,
    TableHead
} from '@material-ui/core';

const ServicecallTableRecords = (props) => {
    const { rows, page, rowsPerPage, detailedPage, deleteFunc , searchStatus} = props;
    //console.log(rows);

    return (
        <>
            <TableHead>
                <ServicecallColumnHead />
            </TableHead>
            <TableBody>
                <ServicecallColumns searchStatus={searchStatus} detailedPage={detailedPage}  deleteFunc={deleteFunc} rows={rows} page={page} rowsPerPage={rowsPerPage} />
            </TableBody>
        </>
    )
}

export default ServicecallTableRecords;