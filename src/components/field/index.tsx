import { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { useCustomRef } from '../../utils/hooks';
import { calculateNextGeneration } from '../../utils/logic';
import { useControlContext } from '../../context/controlContext'

const GameField = () => {
  const { gridWidth, gridHeight, isGameStarted, speed } = useControlContext();
  const [divRef, setDivRef] = useCustomRef<HTMLDivElement>();
  const [basis, setBasis] = useState<number>(0)
  const [cells, setCells] = useState<number[][]>([[]])

  useEffect(() => {
    if (divRef !== null) {
      const { clientWidth, clientHeight } = divRef
      const basisValue = gridWidth > gridHeight
        ? clientWidth / gridWidth
        : clientHeight / gridHeight

      setBasis(basisValue)
    }

  }, [divRef, gridWidth, gridHeight])

  useEffect(() => {
    const arr = new Array(gridHeight).fill(0).map(() => new Array(gridWidth).fill(0))
    setCells(arr)
  }, [gridWidth, gridHeight])

  useEffect(() => {
    let intervalId: NodeJS.Timer
    if (isGameStarted) {
      let nextCells = cells
      intervalId = setInterval(() => {
        nextCells = calculateNextGeneration(nextCells)
        setCells(nextCells)
      }, speed)
    }

    return () => {
      clearInterval(intervalId)
    }
  }, [isGameStarted, speed])

  return (
    <Box
      flex="10 0 auto"
      bgcolor="#fff"
      height="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      ref={setDivRef}
      overflow="scroll"
    >
      {cells.map((row, y) => (
        <Box
          display="flex"
          key={y}
        >
          {row.map((cell, x) => (
            <Box
              key={`${y}${x}`}
              border="1px solid gray"
              width={basis}
              height={basis}
              bgcolor={`${cell === 1 ? '#000' : '#fff'}`}
              sx={{
                '&:hover': {
                  cursor: `${isGameStarted ? 'initial' : 'pointer'}`
                }
              }}
              onClick={() => {
                if (!isGameStarted) {
                  setCells((prev) => prev.map((row, yU) => row.map((cell, xU) => {
                    if (y === yU && x === xU) {
                      return cell === 1 ? 0 : 1
                    }

                    return cell
                  })))
                }
              }}
            >
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  )
}

export default GameField