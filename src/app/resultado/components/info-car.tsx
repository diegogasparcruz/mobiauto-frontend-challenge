'use client'

import { useCarContext } from '@/hooks/use-car-context'
import { Box, Chip, Skeleton, Typography } from '@mui/material'

export const InfoCar = () => {
  const { infoCar, isLoading } = useCarContext()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: {
          xs: '300px',
          sm: '420px',
          md: '500px',
        },
        height: '100vh',
        gap: '16px',
      }}
    >
      <h2 style={{ textAlign: 'center' }}>
        Tabela Fipe:
        <span>
          {isLoading || !infoCar ? (
            <Skeleton
              variant="rounded"
              sx={{
                width: {
                  xs: '300px',
                  sm: '320px',
                },
                height: '40px',
              }}
            />
          ) : (
            ` Preço ${infoCar?.Marca} ${infoCar?.Modelo} ${infoCar?.AnoModelo}`
          )}
        </span>
      </h2>

      {isLoading || !infoCar ? (
        <Skeleton variant="rounded" width="130px" height="40px" />
      ) : (
        <Chip
          sx={{
            background: '#04a48d',
            fontSize: '18px',
            color: '#FFF',
            height: '40px',
            fontWeight: 600,
            borderRadius: '20px',
          }}
          label={infoCar?.Valor || 'R$ 0,00'}
        />
      )}

      <Typography component="span" sx={{ color: '#888' }}>
        Este é o preço de compra do veículo
      </Typography>
    </Box>
  )
}
