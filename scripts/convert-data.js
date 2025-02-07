import { readdir, readFile, writeFile, mkdir } from 'fs/promises'
import { join, dirname } from 'path'

const SLACK_DATA_PATH = '/Users/noy/repos/slowly-birds-log/slowly birds 友の会 Slack export Jul 29 2021 - Nov 15 2023'
const OUTPUT_PATH = './public/data'

async function convertData() {
  try {
    // 出力ディレクトリの作成
    await mkdir(OUTPUT_PATH, { recursive: true })

    // users.jsonとchannels.jsonのコピー
    const users = JSON.parse(await readFile(join(SLACK_DATA_PATH, 'users.json'), 'utf-8'))
    const channels = JSON.parse(await readFile(join(SLACK_DATA_PATH, 'channels.json'), 'utf-8'))

    await writeFile(join(OUTPUT_PATH, 'users.json'), JSON.stringify(users, null, 2))
    await writeFile(join(OUTPUT_PATH, 'channels.json'), JSON.stringify(channels, null, 2))

    // チャンネルごとのメッセージデータの変換
    for (const channel of channels) {
      try {
        const channelPath = join(SLACK_DATA_PATH, channel.name)
        const files = await readdir(channelPath)
        const jsonFiles = files.filter(file => file.match(/^\d{4}-\d{2}-\d{2}\.json$/))

        const channelData = {}
        for (const file of jsonFiles) {
          const date = file.replace('.json', '')
          const messages = JSON.parse(await readFile(join(channelPath, file), 'utf-8'))
          channelData[date] = messages
        }

        // チャンネルごとのディレクトリを作成
        const channelOutputPath = join(OUTPUT_PATH, 'channels')
        await mkdir(channelOutputPath, { recursive: true })

        const outputChannelPath = join(channelOutputPath, `${channel.name}.json`)
        await writeFile(outputChannelPath, JSON.stringify(channelData, null, 2))
      } catch (error) {
        console.error(`チャンネル ${channel.name} の処理中にエラーが発生しました:`, error)
      }
    }

    // index.jsonの作成(チャンネル一覧とメタデータ)
    const index = {
      channels: channels.map(channel => ({
        id: channel.id,
        name: channel.name,
        created: channel.created
      })),
      exportDate: new Date().toISOString()
    }
    await writeFile(join(OUTPUT_PATH, 'index.json'), JSON.stringify(index, null, 2))

    console.log('データ変換が完了しました')
  } catch (error) {
    console.error('データ変換中にエラーが発生しました:', error)
  }
}

convertData()