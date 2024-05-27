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
          xs: 300,
          sm: 420,
          md: 500,
        },
        height: '100vh',
        gap: '16px',
      }}
    >
      <h2 style={{ textAlign: 'center' }}>
        Tabela Fipe:
        <span>
          {isLoading || !infoCar ? (
            <Skeleton variant="rounded" width={320} height={40} />
          ) : (
            ` Preço ${infoCar?.Marca} ${infoCar?.Modelo} ${infoCar?.AnoModelo}`
          )}
        </span>
      </h2>

      {isLoading || !infoCar ? (
        <Skeleton variant="rounded" width={130} height={40} />
      ) : (
        <Chip
          sx={{
            background: '#04a48d',
            fontSize: '18px',
            color: '#FFF',
            height: '40px',
            fontWeight: 600,
            borderRadius: 20,
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
