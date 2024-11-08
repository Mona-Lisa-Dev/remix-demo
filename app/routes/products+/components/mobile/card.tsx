import {useTranslation} from 'react-i18next';
import {Box, Card, CardContent, Typography, CardMedia, Button} from '@mui/material';
import {DeleteOutline} from '@mui/icons-material';
import {formatRelative} from 'date-fns';

import {AppButton} from '~/global/components/app-button';
import {ApiProduct} from '~/api-client/types';

type ProductsCardProps = {product: ApiProduct; doDeleteItem: (item: ApiProduct) => void};

export const ProductCard: React.FC<ProductsCardProps> = ({
  product,
  doDeleteItem,
}: ProductsCardProps) => {
  const {t} = useTranslation(['products', 'common']);

  return (
    <Card sx={{display: 'flex', flexDirection: 'column', marginBottom: 2}} key={product.productId}>
      <CardMedia
        component="img"
        alt={product.title.en || product.title.ar}
        height="200"
        image={product.image || '/no-image.jpg'}
        sx={{
          objectFit: 'contain',
          objectPosition: 'center',
        }}
      />
      <CardContent sx={{position: 'relative'}}>
        <Typography variant="h6"> {product.title.en || product.title.ar}</Typography>
        {product.isActive ? (
          <Typography
            variant="caption"
            color="success"
            ml={1}
            position={'absolute'}
            top={20}
            right={20}
          >
            {t('common:active')}
          </Typography>
        ) : null}
        <Box>
          <Box>
            <Typography variant="body2" color="textSecondary">
              Price: ${Number(product.price).toLocaleString() || '---'}
            </Typography>
          </Box>
          <Typography variant="caption" color="textDisabled">
            Sale Price:{' '}
            {product?.priceSale ? '$' + Number(product.priceSale).toLocaleString() : '---'}
          </Typography>
        </Box>

        <Typography variant="caption" color="textSecondary">
          Created: {formatRelative(new Date(product.createdAt), new Date())} | Updated:{' '}
          {product.updatedAt && product.updatedAt !== product.createdAt
            ? formatRelative(new Date(product.updatedAt), new Date())
            : '---'}
        </Typography>
      </CardContent>
      <Box sx={{padding: 2}} display={'flex'} flexDirection={'row-reverse'}>
        <AppButton to={`/products/${product.productId}`} variant="contained">
          {t('common:edit')}
        </AppButton>
        <Button variant="text" onClick={() => doDeleteItem(product)}>
          <DeleteOutline />
        </Button>
      </Box>
    </Card>
  );
};
