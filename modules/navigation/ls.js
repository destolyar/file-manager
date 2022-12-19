import { parentPort, workerData } from 'worker_threads'
import { readdirSync, lstatSync } from 'fs'

const ls = () => {
  const directoryFiles = readdirSync(workerData.path, (err, files) => {
    if(err) {
      throw new Error("Error while ls executing")
    }

    return files
  })
  const files = directoryFiles.filter(item => lstatSync(item).isFile())
  const directories = directoryFiles.filter(item => lstatSync(item).isDirectory())

  const filesRow = files.map(file => ({ Name: file, Type: "file" }))
  const directoriesRow = directories.map(directory => ({ Name: directory, Type: "directory" }))

  console.table([...directoriesRow, ...filesRow])
  parentPort.postMessage(workerData.path)
}

ls()