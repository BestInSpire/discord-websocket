export interface Hello {
  op: number;
  d: null;
}

export interface Heartbeat {
  op: number;
  d: null;
}

export interface Identify {
  Identify: (token: string) => {
    op: number;
    d: {
      token: string;
      intents: number;
      properties: {
        $os: string;
        $browser: string;
        $device: string;
      };
    };
  };
}

export interface Message {
  content?: string;
  author?: {
    username?: string;
    public_flags?: number;
    id?: string;
    discriminator?: string;
    avatar?: string;
  };
  timestamp?: string;
  pinned?: boolean;
  mentions?: {
    roles?: any[];
    users?: any[];
  };
  member?: {
    roles?: any[];
    premium_since?: any | null;
    pending?: boolean;
    nick?: null;
    mute?: boolean;
    joined_at?: string;
    hoisted_role?: any | null;
    deaf?: boolean;
    communication_disabled_until?: any | null;
    avatar?: any | null;
  };
  id?: string;
  components?: any[];
  channel?: {
    id?: string;
    send?: any;
  };
  attachments?: any[];
}