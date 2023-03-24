import React, { FC, PropsWithChildren, useState, useContext } from 'react'

interface ControlContextType {
  isGameStarted: boolean
  gridWidth: number
  gridHeight: number
  speed: number
  setSpeed: (v: number) => void
  setGridWidth: (v: number) => void
  setGridHeight: (v: number) => void
  start: () => void
  clear: () => void
}

const ControlContext = React.createContext<ControlContextType | null>(null)

export const ControlContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [gridWidth, setGridWidth] = useState<number>(0)
  const [gridHeight, setGridHeight] = useState<number>(0)
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false)
  const [speed, setSpeed] = useState<number>(500)

  const start = () => setIsGameStarted(true)
  const clear = () => {
    setGridWidth(0)
    setGridHeight(0)
    setIsGameStarted(false)
  }

  return (
    <ControlContext.Provider value={{
      isGameStarted,
      gridWidth,
      gridHeight,
      speed,
      setSpeed,
      setGridWidth,
      setGridHeight,
      start,
      clear,
    }}>
      {children}
    </ControlContext.Provider>
  )
}

export const useControlContext = () => {
  const context = useContext(ControlContext)

  if (context === null) {
    throw new Error(
      'useControlContext has to be used within <ControlContextProvider>'
    )
  }

  return context
}