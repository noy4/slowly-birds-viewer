import { ChakraProvider, Container, Box } from '@chakra-ui/react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { ChannelList } from './components/ChannelList'
import { ChannelView } from './components/ChannelView'
import { ThemeToggle } from './components/ThemeToggle'

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Container maxW="container.xl" py={8}>
          <Box position="fixed" top={4} right={4} zIndex={2}>
            <ThemeToggle />
          </Box>
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
