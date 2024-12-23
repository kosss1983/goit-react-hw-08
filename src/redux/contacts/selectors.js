import { createSelector } from '@reduxjs/toolkit';
import { selectNameFilter } from '../filters/selectors';

export const selectContacts = state => state.contacts.items;
export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, filter) => {
    const filterCnt = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    if (filterCnt.length > 0) {
      return filterCnt;
    }

    return contacts.filter(contact =>
      contact.number.toLowerCase().includes(filter.toLowerCase())
    );
  }
);
export const selectIsLoading = state => state.contacts.isLoading;
export const selectIsError = state => state.contacts.isError;
export const selectIsSuccess = state => state.contacts.isSuccess;
