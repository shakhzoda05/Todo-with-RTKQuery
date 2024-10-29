import React, { useState, useEffect } from 'react';

const Modal = ({ isOpen, onClose, onConfirm, title, message, initialTitle }) => {
    const [titleInput, setTitleInput] = useState(initialTitle || '');

    useEffect(() => {
        setTitleInput(initialTitle || '');
    }, [initialTitle, isOpen]);

    if (!isOpen) return null;

    const handleConfirm = () => {
        onConfirm(titleInput);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
            <div className="bg-white rounded-lg p-6 shadow-lg w-80">
                <h2 className="text-xl font-semibold mb-4 text-pink-600">{title}</h2>
                <p className="text-gray-700 mb-3">{message}</p>
                <input
                    type="text"
                    value={titleInput}
                    onChange={(e) => setTitleInput(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-pink-400"
                    placeholder="Update your message"
                />
                <div className="mt-5 flex justify-end">
                    <button
                        onClick={onClose}
                        className="mr-2 border w-[55px] border-gray-300 p-2 rounded-md hover:bg-gray-200 text-gray-700"
                    >
                        No
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="bg-pink-500 w-[55px] text-white p-2 rounded-md hover:bg-pink-400 transition duration-300"
                    >
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;