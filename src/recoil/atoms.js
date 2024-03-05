import { atom, selector } from 'recoil';

export const atomlogInState = atom({
  key: 'recoil_logIn',
  default: {
    goPage: false,
  },
});

export const selectorLogInState = selector({
  key: 'recoil_update_login',
  set: ({ set }, newState) => set(atomlogInState, newState),
  get: ({ get }) => get(atomlogInState),
});
