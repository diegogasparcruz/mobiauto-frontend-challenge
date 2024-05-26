// 'use client'
import { Car, ModelCar, YearModel } from '@/types'
import { Brand } from '@/types/brand'
import { api } from './api'

type GetModelCarByBrandResponse = {
  modelos: ModelCar[]
}

type GetYearsByModelCarParams = {
  brandCod: string
  modelCarCod: string
}

type GetCarParams = {
  brandCod: string
  modelCarCod: string
  yearModel: string
}

export const CarService = {
  listBrands: async () => {
    const response = api<Brand[]>('/carros/marcas')

    return response
  },
  getModelCarByBrand: async (brandCod: string) => {
    const response = api<GetModelCarByBrandResponse>(
      `/carros/marcas/${brandCod}/modelos`,
      {
        cache: 'no-store',
      },
    )

    return response
  },
  getYearsByModelCar: async ({
    brandCod,
    modelCarCod,
  }: GetYearsByModelCarParams) => {
    const response = api<YearModel[]>(
      `/carros/marcas/${brandCod}/modelos/${modelCarCod}/anos`,
      {
        cache: 'no-store',
      },
    )

    return response
  },
  getCar: async ({ brandCod, modelCarCod, yearModel }: GetCarParams) => {
    const response = api<Car>(
      `/carros/marcas/${brandCod}/modelos/${modelCarCod}/anos/${yearModel}`,
      {
        cache: 'no-store',
      },
    )

    return response
  },
}
