export const Hello = {
  op: 10,
  d: null,
};

export const Heartbeat = {
  op: 1,
  d: null,
};

export const Identify = (token: string) => {
  return {
    op: 2,
    d: {
      token: token,
      intents: 513,
      properties: {
        $os: "linux",
        $browser: "chrome",
        $device: "chrome",
      },
    },
  };
};
