'use client'

import { create } from 'zustand'

export type ModalType =
    | 'login'
    | 'register'
    | 'forgot-password'
    | 'membership'
    | null

interface ModalStore {
    activeModal: ModalType
    openModal: (type: Exclude<ModalType, null>) => void
    closeModal: () => void
    isOpen: (type: Exclude<ModalType, null>) => boolean
}

export const useModalStore = create<ModalStore>((set, get) => ({
    activeModal: null,

    openModal: (type) => {
        set({ activeModal: type })
        // 防止背景滚动
        document.body.style.overflow = 'hidden'
    },

    closeModal: () => {
        set({ activeModal: null })
        // 恢复背景滚动
        document.body.style.overflow = 'unset'
    },

    isOpen: (type) => get().activeModal === type
})) 