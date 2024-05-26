'use client'
import { CarService } from '@/services/car-service'
import { Car } from '@/types'
import { useSearchParams } from 'next/navigation'
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'

type SaveInfoCarProps = {
  brandCod: string
  modelCarCod: string
  yearModel: string
}

type CarContextProps = {
  infoCar: Car | null
  saveInfoCar: (props: SaveInfoCarProps) => Promise<void>
  isLoading: boolean
}

export const CarContext = createContext({} as CarContextProps)

export const CarProvider = ({ children }: { children: ReactNode }) => {
  const [infoCar, setInfoCar] = useState<Car | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const searchParams = useSearchParams()
  const brandCar = searchParams.get('marca')
  const modelCar = searchParams.get('modelo')
  const yearModelCar = searchParams.get('ano')

  const saveInfoCar = useCallback(
    async ({ brandCod, modelCarCod, yearModel }: SaveInfoCarProps) => {
      setIsLoading(true)

      try {
        const response = await CarService.getCar({
          brandCod,
          modelCarCod,
          yearModel,
        })
        setInfoCar(response)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    },
    [],
  )

  useEffect(() => {
    if (!infoCar && brandCar && modelCar && yearModelCar) {
      saveInfoCar({
        brandCod: brandCar as string,
        modelCarCod: modelCar as string,
        yearModel: yearModelCar as string,
      })
    }
  }, [saveInfoCar, brandCar, modelCar, yearModelCar, infoCar])

  return (
    <CarContext.Provider
      value={{
        infoCar,
        saveInfoCar,
        isLoading,
      }}
    >
      {children}
    </CarContext.Provider>
  )
}
