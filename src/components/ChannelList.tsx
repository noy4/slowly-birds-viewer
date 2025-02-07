import { useEffect, useState } from 'react'
import { Box, Heading, Stack, Text } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { BASE_PATH } from '../config'

interface Channel {
  id: string
  name: string
  created: number
}

export function ChannelList() {
  const [channels, setChannels] = useState<Channel[]>([])

  useEffect(() => {
    const loadChannels = async () => {
      try {
        const response = await fetch(`${BASE_PATH}data/index.json`)
        const data = await response.json()
        // チャンネル名でソート
        const sortedChannels = [...data.channels].sort((a, b) => a.name.localeCompare(b.name))
        setChannels(sortedChannels)
      } catch (error) {
        console.error('チャンネル一覧の読み込みに失敗しました:', error)
      }
    }

    loadChannels()
  }, [])

  return (
    <Box maxW="container.md" mx="auto">
      <Heading mb={8} textAlign="center">Slowly Birds 友の会 チャンネル一覧</Heading>
      <Stack spacing={4}>
        {channels.map(channel => (
          <Box
            key={channel.id}
            as={RouterLink}
            to={`/channel/${channel.name}`}
            p={4}
            bg="white"
            borderRadius="lg"
            boxShadow="sm"
            borderWidth="1px"
            _hover={{
              bg: 'blue.50',
              transform: 'translateY(-2px)',
              transition: 'all 0.2s',
              textDecoration: 'none'
            }}
          >
            <Text
              color="blue.600"
              fontSize="lg"
              fontWeight="medium"
            >
              #{channel.name}
            </Text>
          </Box>
        ))}
      </Stack>
    </Box>
  )
}