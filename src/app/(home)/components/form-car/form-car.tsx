'use client'
import { AutocompleteField } from '@/components/form/autocomplete-field'
import { Button, Card, CardContent } from '@mui/material'
import { useFormCar } from './use-form-car'

export const FormCar = () => {
  const {
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
  } = useFormCar()

  return (
    <Card
      sx={{
        width: {
          xs: '300px',
          sm: '500px',
        },
        padding: '30px',
        paddingBottom: '0',
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
            padding: '0',
          }}
        >
          <AutocompleteField
            id="input-brand"
            name="brandCod"
            options={brandOptions}
            control={control}
            placeholder="Marcas"
            isLoading={isLoadingBrand}
          />

          <AutocompleteField
            name="modelCarCod"
            id="input-model-car"
            options={modelCarOptions}
            control={control}
            placeholder="Modelos"
            isLoading={isLoadingModelCar}
            isDisabled={!brandWatched}
          />

          {!!modelCarWatched && (
            <AutocompleteField
              id="input-year-model"
              name="yearModel"
              options={yearOptions}
              control={control}
              placeholder="Ano"
              isLoading={isLoadingYearModel}
            />
          )}

          <Button
            type="submit"
            sx={{ width: '180px' }}
            variant="contained"
            color="secondary"
            disabled={
              !brandWatched || !modelCarWatched || !yearWatched || isLoading
            }
          >
            {isLoading ? 'Consultando...' : 'Consultar preço'}
          </Button>
        </CardContent>
      </form>
    </Card>
  )
}
