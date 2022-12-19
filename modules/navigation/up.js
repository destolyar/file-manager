import { sep as pathSeparator } from 'path'
import { parentPort, workerData } from 'worker_threads'

const up = () => {
  const isRoot = !workerData.path.split('').includes(pathSeparator)

  if (isRoot) {
    return parentPort.postMessage(workerData.path)
  }

  const upperPath = workerData.path.split(pathSeparator).slice(0, -1).join(pathSeparator)
  parentPort.postMessage(upperPath)
}

up()
