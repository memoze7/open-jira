import { ChangeEvent, useState, useMemo, FC, useContext } from 'react';
import { GetServerSideProps } from 'next'



import { Layout } from '../../components/layout/Layout';
import { capitalize, Card, CardContent, CardHeader, Grid, TextField, CardActions, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, IconButton } from '@mui/material';

import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import { dbEntries } from '../../database';
import { Entry, EntryStatus } from '../../interface';
import { EntriesContext } from '../../context/entries/';
import { dateFunctions } from '../../utils';

const validStatus: EntryStatus[] = [ 'pending', 'in-progress', 'finished' ]

interface Props {
  entry: Entry
}

export const EntryPage: FC<Props> = ({ entry }) => {

  const { updateEntry } = useContext(EntriesContext)

  const [ inputValue, setInputValue ] = useState(entry.description)
  const [ status, setStatus ] = useState<EntryStatus>(entry.status);
  const [ touched, setTouched ] = useState(false)


  const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [ inputValue, touched ])

  const onTextChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setInputValue(ev.target.value)

  }

  const onStatusChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setStatus(ev.target.value as EntryStatus)

  }

  const onSave = () => {
    if (inputValue.trim().length <= 0) return;

    const updatedEntry: Entry = {
      ...entry,
      status,
      description: inputValue
    }

    updateEntry(updatedEntry, true)

  }

  return (
    <Layout title={inputValue.substring(0, 20) + '...'}>
      <Grid
        container
        justifyContent={'center'}
        sx={{ marginTop: 2 }}
      >
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title='Entrada'
              subheader={`Creada ${dateFunctions.getFormatDistanceToNow(entry.createAt)}`}>
            </CardHeader>
            <CardContent>
              <TextField sx={{ marginTop: 2, marginBottom: 2 }}
                fullWidth
                placeholder='Nueva entrada'
                autoFocus
                multiline
                label="Nueva entrada"
                value={inputValue}
                onChange={onTextChange}
                onBlur={() => setTouched(true)}
                helperText={isNotValid && 'Ingrese un valor'}
                error={isNotValid}
              />
              {/* RADIO */}
              <FormControl>
                <FormLabel>
                  Estado:
                </FormLabel>
                <RadioGroup row value={status} onChange={onStatusChange}>
                  {validStatus.map(status => (
                    <FormControlLabel key={status}
                      value={status}
                      control={<Radio />}
                      label={capitalize(status)} />
                  ))}
                </RadioGroup>
              </FormControl>
              <CardActions>
                <Button
                  startIcon={<SaveAsOutlinedIcon />}
                  variant='contained'
                  fullWidth
                  onClick={onSave}
                  disabled={inputValue.length <= 0}
                >
                  Save
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <IconButton sx={{
        position: 'fixed',
        bottom: 30,
        right: 30,
        backgroundColor: 'error.dark'
      }}>
        <DeleteOutlineOutlinedIcon />
      </IconButton>
    </Layout>
  )
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string }

  const entry = await dbEntries.getEntryById(id)


  if (!entry) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      entry
    }
  }
}

export default EntryPage;