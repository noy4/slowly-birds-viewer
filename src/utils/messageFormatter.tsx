import React from 'react';

const URL_PATTERN = /<(https?:\/\/[^>|]+)(?:\|[^>]+)?>/g;
const USER_MENTION_PATTERN = /<@([A-Z0-9]+)>/g;
const SLACK_EMOJI_PATTERN = /:([a-zA-Z0-9_\-+]+):/g;
const IMAGE_PATTERN = /<(https?:\/\/[^>]+\.(png|jpg|jpeg|gif))>/gi;

// 一般的な絵文字のマッピング
const EMOJI_MAP: { [key: string]: string } = {
  // 顔文字と感情
  'smile': '😊',
  'grin': '😁',
  'laughing': '😄',
  'joy': '😂',
  'rofl': '🤣',
  'wink': '😉',
  'thinking_face': '🤔',
  'worried': '😟',
  'sob': '😭',
  'scream': '😱',
  'angry': '😠',
  'rage': '😡',
  'triumph': '😤',
  'sunglasses': '😎',
  'smirk': '😏',
  'neutral_face': '😐',
  'expressionless': '😑',
  'unamused': '😒',
  'roll_eyes': '🙄',
  'flushed': '😳',
  'innocent': '😇',
  'heart_eyes': '😍',

  // ジェスチャーと人
  '+1': '👍',
  '-1': '👎',
  'wave': '👋',
  'raised_hands': '🙌',
  'pray': '🙏',
  'clap': '👏',
  'muscle': '💪',
  'point_up': '☝️',
  'ok_hand': '👌',
  'v': '✌️',
  'crossed_fingers': '🤞',
  'metal': '🤘',
  'call_me_hand': '🤙',
  'writing_hand': '✍️',
  'raising_hand': '🙋',

  // シンボル
  'heart': '❤️',
  'broken_heart': '💔',
  'star': '⭐',
  'sparkles': '✨',
  'zap': '⚡',
  'fire': '🔥',
  'boom': '💥',
  'question': '❓',
  'exclamation': '❗',
  'warning': '⚠️',
  'white_check_mark': '✅',
  'x': '❌',
  'no_entry': '⛔',
  '100': '💯',

  // 物と自然
  'eyes': '👀',
  'ear': '👂',
  'nose': '👃',
  'brain': '🧠',
  'robot': '🤖',
  'rocket': '🚀',
  'hourglass': '⌛',
  'watch': '⌚',
  'sunny': '☀️',
  'cloud': '☁️',
  'umbrella': '☔',
  'rainbow': '🌈',
  'earth_asia': '🌏',
  'moon': '🌙',
  'crystal_ball': '🔮',

  // 感情と活動
  'tada': '🎉',
  'gift': '🎁',
  'trophy': '🏆',
  'medal': '🏅',
  'art': '🎨',
  'musical_note': '🎵',
  'headphones': '🎧',
  'video_game': '🎮',
  'dart': '🎯',
  'book': '📚',
  'bulb': '💡',
  'moneybag': '💰',
  'chart': '📊',
  'mailbox': '📫',
  'phone': '📱',

  // その他
  'thumbsup': '👍',
  'thumbsdown': '👎',
  'zzz': '💤',
  'sweat_drops': '💦',
  'dash': '💨',
};

export const formatMessageText = (text: string): React.ReactNode[] => {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;

  // URLの処理
  const processedText = text.replace(URL_PATTERN, (_, url) => url);

  // 画像URLの処理
  let match;
  while ((match = IMAGE_PATTERN.exec(processedText)) !== null) {
    if (match.index > lastIndex) {
      parts.push(...processText(processedText.slice(lastIndex, match.index)));
    }

    const imageUrl = match[1];
    parts.push(
      <img
        key={`img-${match.index}`}
        src={imageUrl}
        alt="メッセージ内の画像"
        style={{ maxWidth: '300px', maxHeight: '300px', borderRadius: '4px', margin: '4px 0' }}
      />
    );

    lastIndex = IMAGE_PATTERN.lastIndex;
  }

  if (lastIndex < processedText.length) {
    parts.push(...processText(processedText.slice(lastIndex)));
  }

  return parts;
};

const processText = (text: string): React.ReactNode[] => {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;

  // ユーザーメンションの処理
  text = text.replace(USER_MENTION_PATTERN, '@user');

  // Slack絵文字の処理
  let match;
  while ((match = SLACK_EMOJI_PATTERN.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(
        <span key={`text-${lastIndex}`}>
          {text.slice(lastIndex, match.index)}
        </span>
      );
    }

    const emojiName = match[1];
    parts.push(
      <span
        key={`emoji-${match.index}`}
        role="img"
        aria-label={emojiName}
        style={{ 
          fontSize: '1.2em',
          display: 'inline-flex',
          alignItems: 'center',
          verticalAlign: 'middle',
          margin: '0 1px'
        }}
      >
        {EMOJI_MAP[emojiName] || `:${emojiName}:`}
      </span>
    );

    lastIndex = SLACK_EMOJI_PATTERN.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(
      <span key={`text-${lastIndex}`}>{text.slice(lastIndex)}</span>
    );
  }

  return parts;
};

export const formatReaction = (name: string): React.ReactNode => {
  return (
    <span 
      role="img" 
      aria-label={name}
      style={{ 
        fontSize: '1.2em',
        display: 'inline-flex',
        alignItems: 'center',
        verticalAlign: 'middle'
      }}
    >
      {EMOJI_MAP[name] || `:${name}:`}
    </span>
  );
};