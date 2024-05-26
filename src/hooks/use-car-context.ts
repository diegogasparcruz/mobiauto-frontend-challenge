import { CarContext } from '@/contexts/car-context'
import { useContext } from 'react'

export const useCarContext = () => useContext(CarContext)
