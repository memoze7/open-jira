import { FC, useEffect, useReducer } from 'react';

import { useSnackbar } from 'notistack';

import { entriesApi } from '../../apis';
import { Entry } from '../../interface'
import { EntriesContext, entriesReducer } from './'

export interface EntriesState {
  entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
}


export const EntriesProvider: FC = ({ children }) => {

  const { enqueueSnackbar } = useSnackbar();

  const [ state, dispatch ] = useReducer(entriesReducer, Entries_INITIAL_STATE)

  const addNewEntry = async (description: string) => {

    const { data: newEntry } = await entriesApi.post<Entry>('/entries', { description })

    dispatch({ type: '[Entry] - Add-Entry', payload: newEntry })
  }

  const updateEntry = async ({ _id, description, status }: Entry, showSnackbar = false) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, { description, status })

      dispatch({ type: '[Entry] - Entry-Updated', payload: data })

      if (showSnackbar)
        enqueueSnackbar('Entrada actualizada', {
          variant: 'success',
          autoHideDuration: 1904,
          anchorOrigin: {
            horizontal: 'right',
            vertical: 'top'
          }
        });
    } catch (error) {
      console.log('error :>> ', error);
    }
  }

  const getEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>('/entries')
    dispatch({ type: '[Entry] - Refresh-Data', payload: data })
  }

  useEffect(() => {
    getEntries()

  }, [])


  return (
    <EntriesContext.Provider value={{
      ...state,
      addNewEntry,
      updateEntry
    }}>
      {children}
    </EntriesContext.Provider>
  )

}