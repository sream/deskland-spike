import { createServer } from 'node:http'
import { Server } from 'socket.io'

const PORT = Number(process.env.PORT ?? 3001)
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN ?? 'http://localhost:5173'

const httpServer = createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'content-type': 'application/json' })
    res.end(JSON.stringify({ ok: true }))
    return
  }

  if (req.url === '/') {
    res.writeHead(200, { 'content-type': 'text/plain' })
    res.end('Deskland Spike socket server')
    return
  }

  res.writeHead(404, { 'content-type': 'text/plain' })
  res.end('Not found')
})

const io = new Server(httpServer, {
  cors: {
    origin: CLIENT_ORIGIN,
  },
})

io.on('connection', (socket) => {
  console.log(`connected: ${socket.id}`)

  socket.on('disconnect', () => {
    console.log(`disconnected: ${socket.id}`)
  })
})

httpServer.listen(PORT, () => {
  console.log(`socket server listening on :${PORT}`)
})