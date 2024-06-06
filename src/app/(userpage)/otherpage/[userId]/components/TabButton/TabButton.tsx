import React from "react";
import { ORDER } from "@/components/Dropdown/constants";
import cn from "@/utils/classNames";
import styles from "./TabButton.module.scss";

type TabButtonProps = {
  button: string;
  onSelectButton: (value: string) => void;
};

type TabButtonComponentProps = {
  children: React.ReactNode;
  button: string;
  onSelectButton: (value: string) => void;
  active: string;
};

function TabButtonComponent({ children, button, onSelectButton, active }: TabButtonComponentProps) {
  return (
    <div
      className={cn(styles.selectButton, styles[`${active === button ? "active" : ""}`])}
      onClick={() => onSelectButton(active)}
      onKeyDown={() => onSelectButton(active)}
      role='button'
      tabIndex={0}
    >
      <span>{children}</span>
    </div>
  );
}

export default function TabButton({ button, onSelectButton }: TabButtonProps) {
  return (
    <div className={cn(styles.buttonBox)}>
      {ORDER.PROFILE.map((profile) => (
        <TabButtonComponent
          key={profile.id}
          button={button}
          onSelectButton={onSelectButton}
          active={profile.value}
        >
          {profile.option}
        </TabButtonComponent>
      ))}
    </div>
  );
}
