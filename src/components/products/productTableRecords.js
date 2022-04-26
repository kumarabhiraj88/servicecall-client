import React from 'react';
import ProductColumnHead from '../../constants/productTableColumnsHead';
import ProductColumns from '../../constants/productTableColumns';
import { 
    TableBody,
    TableHead
} from '@material-ui/core';

const ProductTableRecords = (props) => {
    const { rows, page, rowsPerPage, editFunc } = props;
    //console.log(rows);
    return (
        <>
            <TableHead>
                <ProductColumnHead />
            </TableHead>
            <TableBody>
                <ProductColumns editFunc={editFunc} rows={rows} page={page} rowsPerPage={rowsPerPage} />
            </TableBody>
        </>
    )
}

export default ProductTableRecords;