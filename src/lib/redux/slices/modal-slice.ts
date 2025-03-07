import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export const MODAL_TYPE = {
    MANAGEMENT_SYSTEM: 'MANAGEMENT_SYSTEM',
    BANK_ACCOUNT: 'BANK_ACCOUNT',
    TRX_NAME: 'TRX_NAME',
    ASSIGN_BANK: 'ASSIGN_BANK',
    ALERT: 'ALERT',
} as const

export type ModalType = keyof typeof MODAL_TYPE | null

export type InitialModalState = {
    isOpen: boolean;
    type: ModalType
}

const initialModalState: InitialModalState = {
    isOpen: false,
    type: null
}

const modalSlice = createSlice(
    {
        name: 'modal-slice',
        initialState: initialModalState,
        reducers: {
            onOpen: (state, action: PayloadAction<ModalType>) => {
                state.isOpen = true;
                state.type = action.payload
            },
            onClose: (state) => {
                state.isOpen = false;
                state.type = null
            }
        }
    }
)

export const { onClose, onOpen } = modalSlice.actions
export const modalReducer = modalSlice.reducer