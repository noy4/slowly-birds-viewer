export interface SlackUser {
  id: string;
  name: string;
  real_name: string;
  profile: {
    display_name: string;
    image_24?: string;
    image_32?: string;
    image_48?: string;
    image_72?: string;
    image_192?: string;
    image_512?: string;
    image_1024?: string;
    image_original?: string;
  };
}

export interface SlackChannel {
  id: string;
  name: string;
  created: number;
  creator: string;
}

export interface SlackMessage {
  client_msg_id?: string;
  type: string;
  text: string;
  user: string;
  ts: string;
  team?: string;
  thread_ts?: string;
  reply_count?: number;
  reactions?: {
    name: string;
    users: string[];
    count: number;
  }[];
}

export interface DailyMessages {
  [key: string]: SlackMessage[];
}

export interface ChannelData {
  channelInfo: SlackChannel;
  messages: DailyMessages;
}