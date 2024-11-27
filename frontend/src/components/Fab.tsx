import React, { ChangeEvent } from 'react';
import styles from './Css/FloatingActionButton.module.css';

interface FloatingActionButtonProps {
  iconSrc: string;
  iconAlt: string;
  onClick?: () => void; // Optional for non-file-upload usage
  isFileUpload?: boolean; // Flag to determine upload behavior
  onFileSelect?: (file: File) => void; // Callback for file upload
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  iconSrc,
  iconAlt,
  onClick,
  isFileUpload = false,
  onFileSelect,
}) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onFileSelect && event.target.files?.[0]) {
      onFileSelect(event.target.files[0]);
    }
  };

  return isFileUpload ? (
    <label className={styles.floatingActionButton}>
      <input
        type="file"
        accept=".xlsx, .xls" // Restrict file type to Excel formats
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <div className={styles.buttonWrapper}>
        <div className={styles.stateLayer}>
          <img src={iconSrc} alt={iconAlt} className={styles.icon} />
        </div>
      </div>
    </label>
  ) : (
    <button
      className={styles.floatingActionButton}
      onClick={onClick}
      type="button"
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
