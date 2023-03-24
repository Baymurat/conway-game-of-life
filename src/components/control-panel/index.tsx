import { Box, Button, Slider, Modal, TextField } from '@mui/material'
import { useState } from 'react'

type Props = {}

const ControlPanel = (props: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [gridWidth, setGridWidth] = useState<number | ''>('')
  const [gridHeight, setGridHeight] = useState<number | ''>('')

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      flex="2 0 auto"
      bgcolor="#fff"
      height="100%"
      borderLeft="1px solid gray"
      padding="1rem"
      gap="2rem"
    >
      <Box
        display="flex"
        flexDirection="column"
        gap="1rem"
        width="100%"
      >
        <Modal
          open={isOpen}
          onClose={() => setIsOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            display="flex"
            flexDirection="column"
            gap="1rem"
            sx={{
              position: 'absolute' as 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
            }}
          >
            <TextField
              autoComplete='off'
              fullWidth
              label="Grid Width"
              value={gridWidth}
              onChange={({ target }) => {
                const newValue = Number(target.value)
                if (!Number.isNaN(newValue)) {
                  setGridWidth(newValue)
                }
              }}
            />
            <TextField
              autoComplete='off'
              fullWidth
              label="Grid Heigth"
              value={gridHeight}
              onChange={({ target }) => {
                const newValue = Number(target.value)
                if (!Number.isNaN(newValue)) {
                  setGridHeight(newValue)
                }
              }}
            />
          </Box>
        </Modal>
        <Button
          fullWidth
          variant='contained'
          onClick={() => setIsOpen(true)}
        >
          Initialzie gameboard
        </Button>
        <Button
          fullWidth
          variant='contained'
          color='success'
        >
          Start
        </Button>
        <Button
          fullWidth
          variant='contained'
          color='error'
        >
          Clear gameboard
        </Button>
      </Box>
      <Box width="100%">
        <Slider
          defaultValue={50}
          aria-label="Default"
          valueLabelDisplay="auto"
          onChange={(_, nv) => {
            console.log(nv);
          }}
        />
      </Box>
    </Box>
  )
}

export default ControlPanel