import { create } from 'zustand';

interface H5PContentState {
  helpBoxModal: boolean;
  setHelpBoxModal: () => void;
}

export const useH5PStore = create<H5PContentState>((set) => ({
  helpBoxModal: false,
  setHelpBoxModal: () => set((state) => ({ helpBoxModal: !state.helpBoxModal }))
}));