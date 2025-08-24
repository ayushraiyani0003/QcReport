/**
 * @fileoverview Redux store configuration for User List management
 * @version 1.0.0
 */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UserListService from "../service/userService";

// Initialize service
const userService = new UserListService();

// Initial state
const initialState = {
  users: [],
  currentUser: null,
  loading: {
    fetchAll: false,
    fetchById: false,
    create: false,
    update: false,
    delete: false,
  },
  error: null,
  lastAction: null,
};

// Async Thunks

// Create new user
export const createUser = createAsyncThunk(
  "users/create",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await userService.createUser(userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch all users
export const fetchAllUsers = createAsyncThunk(
  "users/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userService.getAllUsers();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch user by ID
export const fetchUserById = createAsyncThunk(
  "users/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await userService.getUserById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update user
export const updateUser = createAsyncThunk(
  "users/update",
  async ({ id, userData }, { rejectWithValue }) => {
    try {
      const response = await userService.updateUser(id, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete user
export const deleteUser = createAsyncThunk(
  "users/delete",
  async (id, { rejectWithValue }) => {
    try {
      await userService.deleteUser(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentUser: (state) => {
      state.currentUser = null;
    },
    resetUserState: () => initialState,
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    updateUserInList: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.users.findIndex((user) => user.id === id);
      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...updates };
      }
    },
    removeUserFromList: (state, action) => {
      const id = action.payload;
      state.users = state.users.filter((user) => user.id !== id);
    },
    addUserToList: (state, action) => {
      state.users.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createUser.pending, (state) => {
        state.loading.create = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading.create = false;
        state.users.unshift(action.payload);
        state.lastAction = "create";
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading.create = false;
        state.error = action.payload;
        state.lastAction = "create";
      })
      // Fetch all
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading.fetchAll = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading.fetchAll = false;
        state.users = action.payload;
        state.lastAction = "fetchAll";
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading.fetchAll = false;
        state.error = action.payload;
        state.lastAction = "fetchAll";
      })
      // Fetch by ID
      .addCase(fetchUserById.pending, (state) => {
        state.loading.fetchById = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading.fetchById = false;
        state.currentUser = action.payload;
        state.lastAction = "fetchById";
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading.fetchById = false;
        state.error = action.payload;
        state.lastAction = "fetchById";
      })

      // Update
      .addCase(updateUser.pending, (state) => {
        state.loading.update = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading.update = false;
        const updatedUser = action.payload;
        const index = state.users.findIndex(
          (user) => user.id === updatedUser.id
        );
        if (index !== -1) {
          state.users[index] = updatedUser;
        }
        if (state.currentUser && state.currentUser.id === updatedUser.id) {
          state.currentUser = updatedUser;
        }
        state.lastAction = "update";
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading.update = false;
        state.error = action.payload;
        state.lastAction = "update";
      })

      // Delete
      .addCase(deleteUser.pending, (state) => {
        state.loading.delete = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading.delete = false;
        const deletedId = action.payload;
        state.users = state.users.filter((user) => user.id !== deletedId);
        if (state.currentUser && state.currentUser.id === deletedId) {
          state.currentUser = null;
        }
        state.lastAction = "delete";
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading.delete = false;
        state.error = action.payload;
        state.lastAction = "delete";
      });
  },
});

// Export actions
export const {
  clearError,
  clearCurrentUser,
  resetUserState,
  setCurrentUser,
  updateUserInList,
  removeUserFromList,
  addUserToList,
} = userSlice.actions;

// Selectors
export const selectUsers = (state) => state.users.users;
export const selectCurrentUser = (state) => state.users.currentUser;
export const selectLoading = (state) => state.users.loading;
export const selectError = (state) => state.users.error;
export const selectLastAction = (state) => state.users.lastAction;
export const selectIsLoading = (state) =>
  Object.values(state.users.loading).some((loading) => loading);
export const selectUserById = (id) => (state) =>
  state.users.users.find((user) => user.id === id);
export const selectUsersByName = (name) => (state) =>
  state.users.users.filter((user) =>
    user.name.toLowerCase().includes(name.toLowerCase())
  );

// Export reducer
export default userSlice.reducer;
