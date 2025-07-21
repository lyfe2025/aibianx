'use client'

import { create } from 'zustand'

// 定义弹窗类型
export type ModalType = 'login' | 'register' | 'forgotPassword' | 'membership' | 'payment' | 'test' | null

// 定义弹窗数据类型
export interface ModalData {
    login?: Record<string, unknown>
    register?: Record<string, unknown>
    forgotPassword?: Record<string, unknown>
    membership?: Record<string, unknown>
    payment?: {
        plan?: {
            name: string
            price: number
            originalPrice?: number
            period: string
            features: string[]
        }
    }
    test?: Record<string, unknown>
}

interface ModalStore {
    type: ModalType
    data: ModalData
    isOpen: boolean
    openModal: (type: ModalType, data?: ModalData) => void
    closeModal: () => void
}

export const useModalStore = create<ModalStore>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    openModal: (type: ModalType, data: ModalData = {}) => {
        set({
            type,
            data,
            isOpen: true
        })
    },
    closeModal: () => {
        set({
            type: null,
            data: {},
            isOpen: false
        })
    }
})) 