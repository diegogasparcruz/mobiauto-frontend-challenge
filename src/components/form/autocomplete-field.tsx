import { AutocompleteOption } from '@/types'
import { Box } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import useId from '@mui/material/utils/useId'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'

interface AutocompleteFieldProps<
  O extends AutocompleteOption,
  TField extends FieldValues,
> {
  control: Control<TField>
  name: Path<TField>
  options: O[]
  placeholder?: string
  isLoading?: boolean
  isDisabled?: boolean
}

export const AutocompleteField = <
  O extends { id: string; label: string },
  TField extends FieldValues,
>({
  control,
  options,
  name,
  isDisabled,
  isLoading,
  placeholder,
}: AutocompleteFieldProps<O, TField>) => {
  const inputId = useId()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => {
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <Autocomplete
              value={
                value
                  ? options.find((option) => {
                      return value === option.id
                    }) ?? null
                  : null
              }
              getOptionLabel={(option) => {
                return option.label
              }}
              onChange={(_, newValue) => {
                onChange(newValue ? newValue.id : null)
              }}
              id={inputId}
              options={options}
              loading={isLoading}
              loadingText="Carregando..."
              disabled={isDisabled}
              noOptionsText="Nenhuma opção encontrada"
              renderInput={(params) => (
                <TextField {...params} label={placeholder} inputRef={ref} />
              )}
            />
            {error ? (
              <span style={{ color: 'red' }}>{error.message}</span>
            ) : null}
          </Box>
        )
      }}
    />
  )
}
