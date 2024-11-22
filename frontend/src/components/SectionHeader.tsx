import React from 'react';
import styles from './Css/SectionHeader.module.css';

interface SectionHeaderProps {
  text: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ text }) => {
  return (
    <section className={styles.SectionHeaderContainer}>
      <h2 className={styles.SectionHeaderText}>{text}</h2>
    </section>
  );
};

export default SectionHeader;

{/* <hr className={styles.dividerLine} /> */}