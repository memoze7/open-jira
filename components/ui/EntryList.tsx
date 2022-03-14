import { DragEvent, FC, useContext, useMemo } from 'react';
import { List, Paper } from "@mui/material"
import { EntryCard } from './';
import { EntryStatus } from '../../interface/entries';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui/UIContext';
import styles from './EntryList.module.css'


interface Props {
  status: EntryStatus
}

export const EntryList: FC<Props> = ({ status }) => {

  const { entries, updateEntry } = useContext(EntriesContext);
  const { isDragging, endDragging } = useContext(UIContext)

  const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status), [ entries ])

  const onDropEntry = (ev: DragEvent<HTMLDivElement>) => {
    const id = ev.dataTransfer.getData('text')

    const entry = entries.find(e => e._id === id);

    entry && updateEntry({ ...entry, status })
    endDragging()
  }

  const allowDrop = (ev: DragEvent<HTMLDivElement>) => ev.preventDefault()

  return (

    <div
      onDragOver={allowDrop}
      onDrop={onDropEntry}
      className={isDragging ? styles.draggable : ''}
    >
      <Paper sx={{ height: 'calc(100vh - 180px)', overflow: 'auto', padding: '3px 5px' }}>
        {/* TODO: cambiará dependiendo si esto esta haciendo drag o no */}
        <List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all .3s' }}>
          {
            entriesByStatus.map(entry => (
              <EntryCard key={entry._id} entry={entry} />
            ))}





        </List>
      </Paper>
    </div>
  )
}
