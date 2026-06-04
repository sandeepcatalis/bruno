import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // { [collectionUid]: { running: bool, port: number, pid: number, startedAt: number, routeCount: number } }
  servers: {}
};

export const mockServersSlice = createSlice({
  name: 'mockServers',
  initialState,
  reducers: {
    mockServerStarted: (state, action) => {
      const { collectionUid, port, pid, routeCount } = action.payload;
      state.servers[collectionUid] = {
        running: true,
        port,
        pid,
        startedAt: Date.now(),
        routeCount
      };
    },
    mockServerStopped: (state, action) => {
      const { collectionUid } = action.payload;
      delete state.servers[collectionUid];
    },
    mockServerError: (state, action) => {
      const { collectionUid } = action.payload;
      delete state.servers[collectionUid];
    }
  }
});

export const {
  mockServerStarted,
  mockServerStopped,
  mockServerError
} = mockServersSlice.actions;

export default mockServersSlice.reducer;
