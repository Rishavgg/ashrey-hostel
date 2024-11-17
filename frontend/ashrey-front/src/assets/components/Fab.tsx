
import React from 'react';
import styles from './Css/FloatingActionButton.module.css';

interface FloatingActionButtonProps {
  iconSrc: string;
  iconAlt: string;
  onClick: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ iconSrc, iconAlt, onClick }) => {
  return (
    <button
      className={styles.floatingActionButton}
      onClick={onClick}
      type="button" /* Specify button type to avoid default form behavior */
    >
      <div className={styles.buttonWrapper}>
        <div className={styles.stateLayer}>
          <img src={iconSrc} alt={iconAlt} className={styles.icon} />
        </div>
      </div>
    </button>
  );
};

export default FloatingActionButton;
