import { useCarContext } from '@/hooks/use-car-context'
import { CarService } from '@/services/car-service'
import { AutocompleteOption } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  brandCod: z
    .string({ message: 'Informe uma marca' })
    .min(1, 'Informe uma marca'),
  modelCarCod: z
    .string({ message: 'Informe um modelo' })
    .min(1, 'Informe um modelo'),
  yearModel: z
    .string({ message: 'Informe o ano do modelo' })
    .min(1, 'Informe o ano do modelo'),
})

export type FormCarProps = z.infer<typeof schema>

export const useFormCar = () => {
  const { saveInfoCar, isLoading } = useCarContext()
  const router = useRouter()

  const [brandOptions, setBrandOptions] = useState<AutocompleteOption[]>([])
  const [modelCarOptions, setModelCarOptions] = useState<AutocompleteOption[]>(
    [],
  )
  const [yearOptions, setYearOptions] = useState<AutocompleteOption[]>([])

  const [isLoadingBrand, setIsLoadingBrand] = useState(false)
  const [isLoadingModelCar, setIsLoadingModelCar] = useState(false)
  const [isLoadingYearModel, setIsLoadingYearModel] = useState(false)

  const { control, handleSubmit, watch, resetField } = useForm<FormCarProps>({
    mode: 'all',
    resolver: zodResolver(schema),
    defaultValues: {
      brandCod: '',
      modelCarCod: '',
      yearModel: '',
    },
  })

  const brandWatched = watch('brandCod')
  const modelCarWatched = watch('modelCarCod')
  const yearWatched = watch('yearModel')

  const fetchBrands = useCallback(async () => {
    setIsLoadingBrand(true)

    try {
      const response = await CarService.listBrands()

      const brandsMapped = response?.map((brand) => ({
        label: brand.nome,
        id: brand.codigo,
      }))

      setBrandOptions(brandsMapped)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoadingBrand(false)
    }
  }, [])

  const fetchModelCar = useCallback(async (brandCod: string) => {
    setIsLoadingModelCar(true)

    try {
      const response = await CarService.getModelCarByBrand(brandCod)

      const modelCarMapped = response?.modelos?.map((modelCar) => ({
        label: modelCar.nome,
        id: String(modelCar.codigo),
      }))

      setModelCarOptions(modelCarMapped)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoadingModelCar(false)
    }
  }, [])

  const fetchYearsModel = useCallback(
    async (brandCod: string, modelCarCod: string) => {
      setIsLoadingYearModel(true)

      try {
        const response = await CarService.getYearsByModelCar({
          brandCod,
          modelCarCod,
        })

        const yearsModelCarMapped = response?.map((year) => ({
          label: year.codigo.split('-')[0],
          id: year.codigo,
        }))

        setYearOptions(yearsModelCarMapped)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoadingYearModel(false)
      }
    },
    [],
  )

  const onSubmit: SubmitHandler<FormCarProps> = async (data) => {
    await saveInfoCar(data)
    router.push(
      `/resultado?marca=${data.brandCod}&modelo=${data.modelCarCod}&ano=${data.yearModel}`,
    )
  }

  useEffect(() => {
    fetchBrands()
  }, [fetchBrands])

  useEffect(() => {
    if (brandWatched) {
      fetchModelCar(brandWatched)
    } else {
      setModelCarOptions([])
      resetField('modelCarCod')
    }
  }, [fetchModelCar, brandWatched, resetField])

  useEffect(() => {
    if (brandWatched && modelCarWatched) {
      fetchYearsModel(brandWatched, modelCarWatched)
    } else {
      setYearOptions([])
      resetField('yearModel')
    }
  }, [
    fetchModelCar,
    brandWatched,
    modelCarWatched,
    fetchYearsModel,
    resetField,
  ])

  return {
    handleSubmit,
    onSubmit,
    control,
    isLoading,
    isLoadingBrand,
    isLoadingModelCar,
    isLoadingYearModel,
    brandOptions,
    modelCarOptions,
    yearOptions,
    brandWatched,
    modelCarWatched,
    yearWatched,
  }
}
