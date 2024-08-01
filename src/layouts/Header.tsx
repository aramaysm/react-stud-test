import React from "react";
import "../styles/buttons.scss";
import { ButtonProps } from "../models";
import { Button } from "../components/Button";

interface HeaderProps {
  title: string;
  buttons?: ButtonProps[];
}

export const Header: React.FC<HeaderProps> = ({
  title,
  buttons,
}: HeaderProps) => {
  return (
    <div className="row bg-dark just-bet p-1 items-center ">
      <div className="column w-20">
        <h2 className="color-ligth">{title}</h2>
      </div>
      <div className="column w-5 items-center">
        <div className="row gap-2 items-center just-end pe-1 ">
          {buttons?.map((item) => (
            <div key={item.label} className="column items-center">
              <Button
                label={item.label}
                onClick={item.onClick}
                color={item.color}
                icon={item.icon}
                disabled={item.disabled}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
