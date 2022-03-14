import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';
import { DragEvent, FC, useContext } from 'react';
import { Entry } from '../../interface';
import { UIContext } from '../../context/ui/UIContext';

interface Props {
  entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry: { description, _id } }) => {

  const { startDragging, endDragging } = useContext(UIContext)

  const onDragStart = (ev: DragEvent<HTMLDivElement>) => {
    ev.dataTransfer.setData('text', _id)
    startDragging()

    // ho do modificar el estado para indicar que estoy haciendo drag
  }

  const onDragEnd = () => {
    // todo: cancelar on drag

    endDragging()
  }

  return (
    <Card
      sx={{ marginBottom: 1 }}
      // Eventos de drag
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line' }}> {description}</Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: '2px' }}>
          <Typography variant='body2'>Hace 30 minutos</Typography>
        </CardActions>
      </CardActionArea>

    </Card>
  )
}
