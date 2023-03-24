import MainContainer from "./components/main-container"
import { ControlContextProvider } from "./context/controlContext"
import { Box } from '@mui/material'

import './style.css'

const App = () => {
  return (
    <ControlContextProvider>
      <Box>
        <MainContainer />
      </Box>
    </ControlContextProvider>
  )
}

export default App