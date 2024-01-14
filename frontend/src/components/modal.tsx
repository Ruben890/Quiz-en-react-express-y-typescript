import React, { ReactNode } from "react";

interface ModalProps {
    children: ReactNode;
    title:string
    index:number
}

export const Modal: React.FC<ModalProps> = ({ children, title,index }) => {
    return (
        <dialog id={`my_modal_${index}`} className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">{title}</h3>
                <p className="py-4">Press ESC key or click the button below to close</p>
                <div className="modal-content">
                    {children}
                </div>
                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn" >
                            Close
                        </button>
                    </form>
                </div>
            </div>
        </dialog>
    );
};
