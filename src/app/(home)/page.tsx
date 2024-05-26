import { Box } from '@mui/material'
import { FormCar } from './components/form-car'

export default function HomePage() {
  return (
    <Box
      sx={{
        padding: '20px',
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: '#EFE4F7',
        gap: '16px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
        }}
      >
        <h1>Tabela FIPE</h1>
        <h2>Consulte o valor de um veículo de forma gratuita</h2>
      </Box>

      <FormCar />
    </Box>
  )
}
