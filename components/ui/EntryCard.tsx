import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';
import { DragEvent, FC, useContext } from 'react';
import { Entry } from '../../interface';
import { UIContext } from '../../context/ui/UIContext';
import { useRouter } from 'next/router';
import { dateFunctions } from '../../utils';

interface Props {
  entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry: { description, _id, createAt } }) => {

  const { startDragging, endDragging } = useContext(UIContext)
  const router = useRouter()

  const onDragStart = (ev: DragEvent<HTMLDivElement>) => {
    ev.dataTransfer.setData('text', _id)
    startDragging()

    // ho do modificar el estado para indicar que estoy haciendo drag
  }

  const onDragEnd = () => {
    // todo: cancelar on drag

    endDragging()
  }

  const onClick = () => {
    router.push('/entries/' + _id)
  }

  return (
    <Card
      sx={{ marginBottom: 1 }}
      onClick={onClick}
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
          <Typography variant='body2'>{dateFunctions.getFormatDistanceToNow(createAt)}</Typography>
        </CardActions>
      </CardActionArea>

    </Card>
  )
}
