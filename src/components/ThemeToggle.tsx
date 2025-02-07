import { Button, useColorMode, Icon, Tooltip } from '@chakra-ui/react'
import { SunIcon, MoonIcon, SettingsIcon } from '@chakra-ui/icons'

export const ThemeToggle = () => {
  const { colorMode, setColorMode } = useColorMode()

  const cycleColorMode = () => {
    if (colorMode === 'light') {
      setColorMode('dark')
    } else if (colorMode === 'dark') {
      setColorMode('light')
    } else {
      setColorMode('light')
    }
  }

  const getIcon = () => {
    switch (colorMode) {
      case 'light':
        return SunIcon
      case 'dark':
        return MoonIcon
      default:
        return SettingsIcon
    }
  }

  const getTooltipLabel = () => {
    switch (colorMode) {
      case 'light':
        return 'ライトモード(クリックでダークモードへ)'
      case 'dark':
        return 'ダークモード(クリックでライトモードへ)'
      default:
        return 'システム設定に従う(クリックでライトモードへ)'
    }
  }

  return (
    <Tooltip label={getTooltipLabel()}>
      <Button
        onClick={cycleColorMode}
        size="md"
        variant="ghost"
        aria-label="テーマ切り替え"
      >
        <Icon as={getIcon()} />
      </Button>
    </Tooltip>
  )
}