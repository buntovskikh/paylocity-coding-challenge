import React, { type PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

type ModalProps = PropsWithChildren & {
  isOpen: boolean;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ children, onClose, isOpen }) => {
  return (
    <>
      {isOpen &&
        createPortal(
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg relative max-w-md w-full">
              <button className="absolute top-2 right-2 text-2xl font-bold text-gray-600 hover:text-gray-900" onClick={onClose}>
                &times;
              </button>
              {children}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};

export default Modal;
