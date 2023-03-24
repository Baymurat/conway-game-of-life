import { Box, Button, Slider, Modal, TextField } from '@mui/material'
import { useControlContext } from '../../context/controlContext'
import { useState } from 'react'

const ControlPanel = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [gridWidth, setGridWidth] = useState<number | ''>('')
  const [gridHeight, setGridHeight] = useState<number | ''>('')

  const {
    start,
    clear,
    setSpeed,
    setGridWidth: contextSetGridWidth,
    setGridHeight: contextSetGridHeight
  } = useControlContext();

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
            <Button
              fullWidth
              variant='contained'
              color='success'
              onClick={() => {
                contextSetGridWidth(gridWidth === '' ? 0 : gridWidth)
                contextSetGridHeight(gridHeight === '' ? 0 : gridHeight)
                setGridWidth('')
                setGridHeight('')
                setIsOpen(false)
              }}
            >
              Accept
            </Button>
            <Button
              fullWidth
              variant='contained'
              onClick={() => {
                setGridWidth('')
                setGridHeight('')
                setIsOpen(false)
              }}
            >
              Cancel
            </Button>
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
          onClick={start}
        >
          Start
        </Button>
        <Button
          fullWidth
          variant='contained'
          color='error'
          onClick={clear}
        >
          Clear gameboard
        </Button>
      </Box>
      <Box width="100%">
        <Slider
          defaultValue={100}
          aria-label="Default"
          valueLabelDisplay="auto"
          onChange={(_, nv) => {
            setSpeed(Number(nv));
          }}
        />
      </Box>
    </Box>
  )
}

export default ControlPanel