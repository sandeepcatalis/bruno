import { createSlice } from '@reduxjs/toolkit';

const MAX_SNAPSHOTS_PER_ITEM = 10;

/**
 * Response Snapshots slice
 * Stores saved response snapshots for comparison.
 * Structure: { snapshots: { [itemUid]: [ { id, timestamp, status, headers, dataBuffer, duration, size, label } ] } }
 */
const initialState = {
  snapshots: {},
  compareSelection: {} // { [itemUid]: { left: snapshotId, right: snapshotId | 'current' } }
};

export const responseSnapshotsSlice = createSlice({
  name: 'responseSnapshots',
  initialState,
  reducers: {
    saveSnapshot: (state, action) => {
      const { itemUid, snapshot } = action.payload;
      if (!state.snapshots[itemUid]) {
        state.snapshots[itemUid] = [];
      }
      state.snapshots[itemUid].unshift({
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
        timestamp: Date.now(),
        ...snapshot
      });
      // Keep only the last N snapshots
      if (state.snapshots[itemUid].length > MAX_SNAPSHOTS_PER_ITEM) {
        state.snapshots[itemUid] = state.snapshots[itemUid].slice(0, MAX_SNAPSHOTS_PER_ITEM);
      }
    },
    deleteSnapshot: (state, action) => {
      const { itemUid, snapshotId } = action.payload;
      if (state.snapshots[itemUid]) {
        state.snapshots[itemUid] = state.snapshots[itemUid].filter((s) => s.id !== snapshotId);
      }
    },
    renameSnapshot: (state, action) => {
      const { itemUid, snapshotId, label } = action.payload;
      const snapshots = state.snapshots[itemUid];
      if (snapshots) {
        const snap = snapshots.find((s) => s.id === snapshotId);
        if (snap) {
          snap.label = label;
        }
      }
    },
    setCompareSelection: (state, action) => {
      const { itemUid, left, right } = action.payload;
      state.compareSelection[itemUid] = { left, right };
    },
    clearCompareSelection: (state, action) => {
      const { itemUid } = action.payload;
      delete state.compareSelection[itemUid];
    },
    clearSnapshots: (state, action) => {
      const { itemUid } = action.payload;
      delete state.snapshots[itemUid];
      delete state.compareSelection[itemUid];
    }
  }
});

export const {
  saveSnapshot,
  deleteSnapshot,
  renameSnapshot,
  setCompareSelection,
  clearCompareSelection,
  clearSnapshots
} = responseSnapshotsSlice.actions;

export default responseSnapshotsSlice.reducer;
