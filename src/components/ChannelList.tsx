import { useEffect, useState } from 'react'
import { Box, Heading, Stack, Text, useColorModeValue, HStack } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { BASE_PATH } from '../config'
import { createIcon } from '@chakra-ui/icons'

const SlowlyBirdIcon = createIcon({
  displayName: 'SlowlyBird',
  viewBox: '0 0 32 32',
  path: (
    <>
      {/* グラデーション定義 */}
      <defs>
        <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="wingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      
      {/* 体 - より自然な形状に */}
      <path
        d="M10 16C10 22 14 25 18 25C22 25 26 22 26 16C26 10 22 7 18 7C14 7 10 10 10 16Z"
        fill="url(#bodyGradient)"
      />
      
      {/* 翼 - より詳細な形状 */}
      <path
        d="M12 18C8 19 4 17 2 14C2 14 3 19 6 21C9 23 12 21 13 19C13.5 18 13 17 12 18Z"
        fill="url(#wingGradient)"
      />
      
      {/* くちばし - より自然な形状 */}
      <path
        d="M24 14.5L27 16L24 17.5V14.5Z"
        fill="#F5A623"
      />
      
      {/* 目 - 光の反射を追加 */}
      <circle cx="16" cy="14" r="1.8" fill="white" />
      <circle cx="16.2" cy="14" r="1" fill="black" />
      <circle cx="15.8" cy="13.6" r="0.4" fill="white" />
    </>
  ),
})

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
      <HStack mb={8} justify="center" spacing={3}>
        <SlowlyBirdIcon boxSize={16} color="blue.500" />
        <Heading>Slowly Birds 友の会 チャンネル一覧</Heading>
      </HStack>
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