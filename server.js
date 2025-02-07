import express from 'express'
import { readdir } from 'fs/promises'
import { join } from 'path'
import cors from 'cors'

const app = express()
app.use(cors())

const SLACK_DATA_PATH = '/Users/noy/repos/slowly-birds-log/slowly birds 友の会 Slack export Jul 29 2021 - Nov 15 2023'

app.get('/api/files/:channel', async (req, res) => {
  try {
    const channelPath = join(SLACK_DATA_PATH, req.params.channel)
    const files = await readdir(channelPath)
    const jsonFiles = files.filter(file => file.match(/^\d{4}-\d{2}-\d{2}\.json$/))
    res.json(jsonFiles)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.use(express.static('public'))

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})