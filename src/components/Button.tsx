
import React from 'react';
import '../styles/buttons.scss'
import { ButtonProps } from '../models';


export const Button: React.FC<ButtonProps> = ({label, onClick, disabled, color, icon}:ButtonProps) => {

    return (
        icon 
        ? 
        <button type='submit' onClick={onClick} className={`button-${color} flex items-center
         just-center `} disabled={disabled}>
            <i className={"m-1 bx bx-sm bxs-" + icon + " color-white" }></i>
            <span className="color-white">{label}</span>
            
        </button>
        :
        <button type='submit' onClick={onClick} className={`button-${color}`} disabled={disabled}>
            {label}
        </button>
    )
}

