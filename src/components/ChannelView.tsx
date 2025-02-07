import { useEffect, useState } from 'react'
import { useParams, Link as RouterLink } from 'react-router-dom'
import { Box, Stack, Heading, Text, Button, Flex, Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, Image, useDisclosure, useColorModeValue } from '@chakra-ui/react'
import { formatMessageText, formatReaction } from '../utils/messageFormatter'
import { SlackMessage, SlackUser } from '../types/slack'
import { BASE_PATH } from '../config'
import dayjs from 'dayjs'
import 'dayjs/locale/ja'

dayjs.locale('ja')

interface MessagesByDate {
  [date: string]: SlackMessage[]
}

export function ChannelView() {
  const { channelName } = useParams<{ channelName: string }>()
  const [messages, setMessages] = useState<MessagesByDate>({})
  const [users, setUsers] = useState<{ [key: string]: SlackUser }>({})
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()

  // カラーモードに応じた色の定義
  const dateBgColor = useColorModeValue('blue.50', 'blue.900')
  const messageBgColor = useColorModeValue('white', 'gray.700')
  const messageBorderColor = useColorModeValue('gray.200', 'gray.600')
  const reactionBgColor = useColorModeValue('gray.100', 'gray.600')

  const handleImageClick = (url: string) => {
    setSelectedImage(url)
    onOpen()
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        // ユーザー情報の読み込み
        const usersResponse = await fetch(`${BASE_PATH}data/users.json`)
        const usersData = await usersResponse.json()
        const usersMap = usersData.reduce((acc: { [key: string]: SlackUser }, user: SlackUser) => {
          acc[user.id] = user
          return acc
        }, {})
        setUsers(usersMap)

        // チャンネルのメッセージ読み込み
        const messagesResponse = await fetch(`${BASE_PATH}data/channels/${channelName}.json`)
        const messagesData = await messagesResponse.json()
        
        // 日付でソート
        const sortedMessages: MessagesByDate = {}
        Object.keys(messagesData)
          .sort()
          .forEach((date) => {
            sortedMessages[date] = messagesData[date]
          })

        setMessages(sortedMessages)
      } catch (error) {
        console.error('データの読み込みに失敗しました:', error)
      }
    }

    if (channelName) {
      loadData()
    }
  }, [channelName])

  if (!channelName) {
    return <Box>チャンネルが見つかりません</Box>
  }

  return (
    <>
      <Box>
        <Flex alignItems="center" mb={6}>
          <Button
            as={RouterLink}
            to="/"
            colorScheme="blue"
            variant="ghost"
            size="sm"
            mr={4}
          >
            ← チャンネル一覧に戻る
          </Button>
          <Heading size="lg">#{channelName}</Heading>
        </Flex>
        <Stack spacing={8}>
          {Object.entries(messages).map(([date, dailyMessages]) => (
            <Box key={date}>
              <Box
                bg={dateBgColor}
                p={2}
                borderRadius="md"
                mb={4}
              >
                <Text fontSize="lg" fontWeight="bold">
                  {dayjs(date).format('YYYY年M月D日(ddd)')}
                </Text>
              </Box>
              <Stack spacing={4}>
                {dailyMessages.map((message) => (
                  <Box
                    key={message.ts}
                    p={4}
                    bg={messageBgColor}
                    borderRadius="lg"
                    boxShadow="sm"
                    borderWidth="1px"
                    borderColor={messageBorderColor}
                  >
                    <Text fontWeight="bold" mb={2}>
                      {users[message.user]?.real_name || message.user}
                    </Text>
                    <Box whiteSpace="pre-wrap">
                      {formatMessageText(message, handleImageClick)}
                    </Box>
                    {message.reactions && (
                      <Flex mt={2} flexWrap="wrap" gap={2}>
                        {message.reactions.map((reaction) => (
                          <Box
                            key={reaction.name}
                            bg={reactionBgColor}
                            px={2}
                            py={1}
                            borderRadius="md"
                            fontSize="sm"
                            display="flex"
                            alignItems="center"
                          >
                            {formatReaction(reaction.name)}
                            <Text ml={1}>{reaction.count}</Text>
                          </Box>
                        ))}
                      </Flex>
                    )}
                  </Box>
                ))}
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent bg="transparent" boxShadow="none" maxW="90vw">
          <ModalCloseButton color="white" />
          <ModalBody p={0}>
            {selectedImage && (
              <Image
                src={selectedImage}
                alt="拡大画像"
                maxH="90vh"
                objectFit="contain"
                borderRadius="md"
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}