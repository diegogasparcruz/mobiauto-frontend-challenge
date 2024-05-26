import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Box, Button } from '@mui/material'
import Link from 'next/link'
import { InfoCar } from './components/info-car'

export default function ResultPage() {
  return (
    <Box
      sx={{
        padding: '20px',
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: '#dcf4f4',
      }}
    >
      <Box sx={{ width: '100%', display: 'flex', alignItems: 'flex-start' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Button sx={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            <ArrowBackIcon sx={{ width: '20px', height: '20px' }} />
            Voltar
          </Button>
        </Link>
      </Box>

      <InfoCar />
    </Box>
  )
}
