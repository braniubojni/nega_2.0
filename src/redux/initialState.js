const initialState = {
  auth: {
    loggedInUser: null,
    isAdmin: null,
    error: null,
  },
  channel: {
    channelId: null,
    channelName: null,
  },
  user: {
    userId: null,
    userName: null,
  },
  video: {
    videoId: null,
  },
};

export default initialState;
