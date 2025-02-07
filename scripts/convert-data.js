import { readdir, readFile, writeFile, mkdir } from 'fs/promises'
import { join, dirname } from 'path'

// GitHub Actionsとローカルでのパスを環境変数で切り替え
const SLACK_DATA_PATH = process.env.SLACK_DATA_PATH || '../slowly birds 友の会 Slack export Jul 29 2021 - Nov 15 2023'
const OUTPUT_PATH = './public/slack-data'

async function copyFile(src, dest) {
  try {
    const content = await readFile(src, 'utf-8')
    await writeFile(dest, content, 'utf-8')
  } catch (error) {
    console.error(`ファイルのコピーに失敗しました: ${src} -> ${dest}`, error)
    throw error
  }
}

async function convertData() {
  try {
    // 出力ディレクトリの作成
    await mkdir(OUTPUT_PATH, { recursive: true })

    // 基本ファイルのコピー
    const baseFiles = ['users.json', 'channels.json', 'integration_logs.json', 'canvases.json']
    for (const file of baseFiles) {
      try {
        await copyFile(join(SLACK_DATA_PATH, file), join(OUTPUT_PATH, file))
      } catch (error) {
        console.warn(`${file}のコピーをスキップしました:`, error.message)
      }
    }

    // チャンネル情報の読み込み
    const channels = JSON.parse(await readFile(join(SLACK_DATA_PATH, 'channels.json'), 'utf-8'))

    // チャンネルごとのメッセージデータの変換
    for (const channel of channels) {
      try {
        const channelPath = join(SLACK_DATA_PATH, channel.name)
        const channelOutputPath = join(OUTPUT_PATH, channel.name)

        // チャンネルディレクトリの作成
        await mkdir(channelOutputPath, { recursive: true })

        // チャンネル内のファイル一覧取得
        const files = await readdir(channelPath)
        const jsonFiles = files.filter(file => file.match(/^\d{4}-\d{2}-\d{2}\.json$/))

        // 各日付のJSONファイルをコピー
        for (const file of jsonFiles) {
          await copyFile(
            join(channelPath, file),
            join(channelOutputPath, file)
          )
        }
      } catch (error) {
        console.error(`チャンネル ${channel.name} の処理中にエラーが発生しました:`, error)
      }
    }

    console.log('データ変換が完了しました')
  } catch (error) {
    console.error('データ変換中にエラーが発生しました:', error)
    process.exit(1)
  }
}

convertData()