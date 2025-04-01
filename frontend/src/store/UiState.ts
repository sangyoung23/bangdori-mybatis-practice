import { create } from 'zustand'
import { UiState } from 'types/uiState.type'

export const useUiStateStore = create<UiState>(set => ({
    isLoading: false,
    setIsLoading: loading => set({ isLoading: loading }),
}))
