import type { ReactNode } from "react";
import "./winner.css";

export interface WinnerProps {
    children: ReactNode;
    visible?: boolean;
}

export function Winner({ children, visible = false }: WinnerProps) {
    if (!visible) return null;

    return (
        <div className="winner-container">
            <div className="modal">
                {children}
            </div>
        </div>
    );
}