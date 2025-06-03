"use client";
import { createContext, useContext, useState} from 'react';

const ToastContext = createContext();

export function ToastProvider({children}){
    const [toast, setToast] = useState(null);

    const show = (message, options = {}) => {
        setToast({ message, ...options });
        setTimeout(() => setToast(null), options.duration || 2000);

    };

    return (
        <ToastContext.Provider value={({ show })}>
            {children}
            {toast && (
                <div id="toast">
                    {toast.message}
                </div>
            )}
        </ToastContext.Provider>
    )
}

export const useToast = () => useContext(ToastContext);