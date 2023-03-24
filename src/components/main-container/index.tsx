import { Box } from '@mui/material'
import ControlPanel from '../control-panel'
import GameField from '../field'

type Props = {}

const MainContainer = (props: Props) => {
  return (
    <Box
      width={'100vw'}
      height="100vh"
      display={"flex"}
      alignItems="center"
      justifyContent="center"
      padding="2rem"
      bgcolor="#7f7fef"
    >
      <GameField />
      <ControlPanel />
    </Box>
  )
}

export default MainContainer