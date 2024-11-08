import {useTranslation} from 'react-i18next';
import {useSnackbar} from 'notistack';

import {Paper, Table, TableBody, TableContainer, useMediaQuery, Stack} from '@mui/material';

import {useMutationProductsDelete} from '~/services/products';

import {TableRowEmpty} from '~/global/components/table-row-empty';

import {ApiProduct} from '~/api-client/types';

import {ProductsTableHead} from './table-head';
import {ProductsTableRow} from './table-row';
import {ProductsTableRowSkeleton} from './table-row-skeleton';
import {ProductCard} from './mobile/card';

//
//

export const ProductsTable = ({data, isLoading}: {data?: ApiProduct[]; isLoading: boolean}) => {
  const {t} = useTranslation(['common']);
  const {enqueueSnackbar} = useSnackbar();
  const deleteItem = useMutationProductsDelete();
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));

  //

  const doDeleteItem = (item: ApiProduct) => {
    if (!window.confirm(t('common:deleteConfirm', {item: item.title.en || item.title.ar}))) return;

    deleteItem.mutate(
      {id: item.productId},
      {
        onSuccess: async result => {
          result?.meta?.message && enqueueSnackbar(result?.meta?.message, {variant: 'success'});
        },
        onError: err => {
          enqueueSnackbar(err?.message || 'unknown error', {variant: 'error'});
        },
      },
    );
  };

  //
  //

  return isMobile ? (
    <Stack spacing={2}>
      {data?.map(p => <ProductCard key={p.productId} product={p} doDeleteItem={doDeleteItem} />)}
    </Stack>
  ) : (
    <TableContainer component={Paper}>
      <Table sx={{minWidth: 650}}>
        <ProductsTableHead />
        <TableBody>
          {isLoading ? (
            <ProductsTableRowSkeleton />
          ) : !data?.length ? (
            <TableRowEmpty actionURL="/products/create" colSpan={4} />
          ) : (
            data?.map(row => (
              <ProductsTableRow key={row.productId} row={row} doDeleteItem={doDeleteItem} />
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
