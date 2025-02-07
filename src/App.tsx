import { ChakraProvider, Container } from '@chakra-ui/react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { ChannelList } from './components/ChannelList'
import { ChannelView } from './components/ChannelView'

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Container maxW="container.xl" py={8}>
          <Routes>
            <Route path="/" element={<ChannelList />} />
            <Route path="/channel/:channelName" element={<ChannelView />} />
          </Routes>
        </Container>
      </Router>
    </ChakraProvider>
  )
}

export default App
