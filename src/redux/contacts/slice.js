import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { logout } from '../auth/operations';
import { fetchContacts, addContact, deleteContact } from './operations';

const initialState = {
  items: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
};

const slice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.items = payload;
      })
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.items.push(payload);
        state.isSuccess = true;
      })
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.items = state.items.filter(item => item.id !== payload);
      })
      .addCase(logout.fulfilled, state => {
        state.items = [];
      })
      .addMatcher(
        isAnyOf(
          addContact.pending,
          deleteContact.pending,
          fetchContacts.pending,
          logout.fulfilled
        ),
        state => {
          state.isError = false;
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          addContact.rejected,
          deleteContact.rejected,
          fetchContacts.rejected,
          logout.fulfilled
        ),
        state => {
          state.isLoading = false;
          state.isError = true;
        }
      )
      .addMatcher(
        isAnyOf(
          addContact.fulfilled,
          deleteContact.fulfilled,
          fetchContacts.fulfilled,
          logout.fulfilled
        ),
        state => {
          state.isLoading = false;
        }
      );
  },
});

export const contactReducer = slice.reducer;
