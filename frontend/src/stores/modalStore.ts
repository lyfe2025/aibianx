'use client'

import { create } from 'zustand'

export type ModalType = 'login' | 'register' | 'forgot-password' | 'membership'

interface ModalState {
    isOpen: boolean
    modalType: ModalType | null
    modalData?: any
}

interface ModalActions {
    openModal: (type: ModalType, data?: any) => void
    closeModal: () => void
    isModalOpen: (type: ModalType) => boolean
}

type ModalStore = ModalState & ModalActions

export const useModalStore = create<ModalStore>((set, get) => ({
    // 初始状态
    isOpen: false,
    modalType: null,
    modalData: undefined,

    // 打开弹窗
    openModal: (type: ModalType, data?: any) => {
        set({
            isOpen: true,
            modalType: type,
            modalData: data,
        })
    },

    // 关闭弹窗
    closeModal: () => {
        set({
            isOpen: false,
            modalType: null,
            modalData: undefined,
        })
    },

    // 检查特定弹窗是否打开
    isModalOpen: (type: ModalType) => {
        const state = get()
        return state.isOpen && state.modalType === type
    },
})) 