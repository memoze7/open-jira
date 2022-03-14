import { createContext } from 'react';
import { Entry } from '../../interface';

interface ContextProps {
  entries: Entry[]; // todo: falta el tipo de entrues
  addNewEntry: (description: string) => void
  updateEntry: (entry: Entry) => void
}

export const EntriesContext = createContext({} as ContextProps)