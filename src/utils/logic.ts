export const calculateNextGeneration = (arr: number[][]): number[][] => {
  const result: number[][] = arr.map((row, y) => {
    const newRow = row.map((cell, x) => {
      const neighbours = getNeighbours([x, y], arr)
      const liveCount = neighbours.reduce((acc, curr) => (acc += curr), 0)
      const isUnderPopulate = liveCount < 2
      const isOverPopulate = liveCount > 3
      const becomeAlive = liveCount === 3
      return (isUnderPopulate || isOverPopulate) ? 0 : becomeAlive ? 1 : cell
    })

    return newRow
  })

  const uncheckedRightBorder = arr.map((row) => row[0])
  const uncheckedLeftBorder = arr.map((row) => row[row.length - 1])

  const leftBorder = checkBorder(uncheckedLeftBorder)
  const rightBorder = checkBorder(uncheckedRightBorder)
  const topBorder = checkBorder(arr[0])
  const botBorder = checkBorder(arr[arr.length - 1])

  if (leftBorder.length > 0) {
    result.forEach((row, index) => {
      row.splice(0, 0, leftBorder[index])
    })
  }

  if (rightBorder.length > 0) {
    result.forEach((row, index) => {
      row[row.length] = rightBorder[index]
    })
  }

  if (topBorder.length > 0) {
    result.splice(0, 0, topBorder)
  }

  if (botBorder.length > 0) {
    result[result.length] = botBorder
  }

  return result
}

const checkBorder = (arr: number[]) => {
  const result = new Array(arr.length).fill(0)
  for (let i = 1; i < arr.length - 1; i++) {
    if (arr[i - 1] === 1 && arr[i] === 1 && arr[i + 1] === 1) {
      result[i] = 1
    }
  }

  const liveCellsCount = result.reduce((acc, curr) => (acc += curr), 0)
  return liveCellsCount === 0 ? [] : result
}

const getNeighbours = (currentCell: [number, number], cells: number[][]) => {
  const [currentX, currentY] = currentCell

  const maxLength = cells.length

  const x1 = currentX - 1
  const x2 = currentX
  const x3 = currentX + 1
  const x4 = currentX + 1
  const x5 = currentX + 1
  const x6 = currentX
  const x7 = currentX - 1
  const x8 = currentX - 1

  const y1 = currentY - 1
  const y2 = currentY - 1
  const y3 = currentY - 1
  const y4 = currentY
  const y5 = currentY + 1
  const y6 = currentY + 1
  const y7 = currentY + 1
  const y8 = currentY

  const possbileNeighbours: [number, number, boolean][] = [
    [x1, y1, x1 > -1 && y1 > -1],
    [x2, y2, y2 > -1],
    [x3, y3, y3 > -1 && x3 < cells[y3].length],
    [x4, y4, x4 < cells[y4].length],
    [x5, y5, y5 < maxLength && x5 < cells[y5].length],
    [x6, y6, y6 < maxLength],
    [x7, y7, x7 > -1 && y7 < maxLength],
    [x8, y8, x8 > -1]
  ]

  const r = possbileNeighbours
    .filter(([, , condition]) => condition)
    .map(([x, y]) => cells[y][x])

  return r
}