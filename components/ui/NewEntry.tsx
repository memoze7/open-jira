import { ChangeEvent, useState, useContext } from 'react';
import { Box, Button, TextField } from "@mui/material";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import Html from 'next/document';
import { EntriesContext } from '../../context/entries/EntriesContext';
import { UIContext } from '../../context/ui/UIContext';

export const NewEntry = () => {

  const { addNewEntry } = useContext(EntriesContext)
  const { setIsAddingEntry, isAddingEntry } = useContext(UIContext)

  const [ inputValue, setInputValue ] = useState('')

  const [ touched, setTouched ] = useState(false)

  const onTextChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setInputValue(ev.target.value)

  }

  const onSave = () => {
    if (inputValue.trim().length <= 0) return

    addNewEntry(inputValue)
    setIsAddingEntry(false)
    setTouched(false)
    setInputValue('')

  }

  return (
    <Box sx={{ marginBottom: 2, paddingX: 1 }}>

      {
        isAddingEntry
          ? <>

            <TextField fullWidth multiline autoFocus
              sx={{ marginTop: 2, marginBottom: 1 }}
              placeholder='Nueva Entrada'
              label="Nueva Entrada"
              helperText={inputValue.trim().length <= 0 && touched && 'Ingrese un valor'}
              value={inputValue}
              onChange={onTextChange}
              error={inputValue.trim().length <= 0 && touched}
              onBlur={() => setTouched(true)}
            />

            <Box display={"flex"} justifyContent='space-between' >

              <Button
                variant="text"
                endIcon={<CancelOutlinedIcon />}
                onClick={() => { setIsAddingEntry(false); setTouched(false) }}

              >
                Concelar
              </Button>

              <Button
                variant="outlined"
                color="secondary"
                endIcon={<SaveOutlinedIcon />}
                onClick={onSave}
              >
                Guardar
              </Button>
            </Box>
          </>
          : <Button
            fullWidth
            variant='outlined'
            startIcon={<AddCircleOutlineOutlinedIcon />}
            onClick={() => setIsAddingEntry(true)}
          >
            Agregar Tarea
          </Button>
      }


    </Box>
  )
}
