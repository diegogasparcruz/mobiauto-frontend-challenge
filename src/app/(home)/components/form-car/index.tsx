'use client'
import { AutocompleteField } from '@/components/form/autocomplete-field'
import { Button, Card, CardContent } from '@mui/material'
import { useFormCar } from './hooks/use-form-car'

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
          xs: 300,
          sm: 500,
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
            name="brandCod"
            options={brandOptions}
            control={control}
            placeholder="Marcas"
            isLoading={isLoadingBrand}
          />

          <AutocompleteField
            name="modelCarCod"
            options={modelCarOptions}
            control={control}
            placeholder="Modelos"
            isLoading={isLoadingModelCar}
            isDisabled={!brandWatched}
          />

          {!!modelCarWatched && (
            <AutocompleteField
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
