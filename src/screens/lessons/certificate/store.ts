import { create } from 'zustand';

interface CertificateModalState {
  visible: boolean;
  onToggle: () => void;
}

export const useCertificateModalStore = create<CertificateModalState>((set) => ({
  visible: false,
  onToggle: () => set((state) => ({ visible: !state.visible })),
}));
