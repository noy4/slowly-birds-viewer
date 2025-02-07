import { useEffect, useState } from 'react'
import { Box, Heading, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { BASE_PATH } from '../config'

interface Channel {
  id: string
  name: string
  created: number
}

export function ChannelList() {
  const [channels, setChannels] = useState<Channel[]>([])
  
  // カラーモードに応じた色の定義
  const bgColor = useColorModeValue('white', 'gray.700')
  const borderColor = useColorModeValue('gray.200', 'gray.600')
  const hoverBgColor = useColorModeValue('blue.50', 'blue.900')
  const channelNameColor = useColorModeValue('blue.600', 'blue.200')

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
            bg={bgColor}
            borderRadius="lg"
            boxShadow="sm"
            borderWidth="1px"
            borderColor={borderColor}
            _hover={{
              bg: hoverBgColor,
              transform: 'translateY(-2px)',
              transition: 'all 0.2s',
              textDecoration: 'none'
            }}
          >
            <Text
              color={channelNameColor}
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