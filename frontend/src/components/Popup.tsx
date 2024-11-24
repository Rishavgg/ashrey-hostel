import React, { useState } from 'react';
import styles from './Css/Popup.module.css';

export const Popup: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rollNo: '',
    phoneNo: '',
  });

  const [isPopupVisible, setPopupVisible] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log('Saving form data:', formData);
    alert('Form data saved successfully!');
    setPopupVisible(false);
  };

  const handleCancel = () => {
    // alert('Changes discarded.');
    setPopupVisible(false);
  };

  if (!isPopupVisible) {
    return null;
  }

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Add a Student</h1>
      </header>

      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        <section className={styles.fieldsGrid}>
          <div className={styles.fieldContainer}>
            <label className={styles.fieldLabel} htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={styles.fieldInput}
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.fieldContainer}>
            <label className={styles.fieldLabel} htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={styles.fieldInput}
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.fieldContainer}>
            <label className={styles.fieldLabel} htmlFor="rollNo">
              Roll No.
            </label>
            <input
              type="text"
              id="rollNo"
              name="rollNo"
              className={styles.fieldInput}
              value={formData.rollNo}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.fieldContainer}>
            <label className={styles.fieldLabel} htmlFor="phoneNo">
              Phone No.
            </label>
            <input
              type="text"
              id="phoneNo"
              name="phoneNo"
              className={styles.fieldInput}
              value={formData.phoneNo}
              onChange={handleInputChange}
            />
          </div>
        </section>

        <footer className={styles.actions}>
          <button
            type="button"
            className={`${styles.actionButton} ${styles.success}`}
            onClick={handleSave}
          >
            <span className={styles.buttonText}>Save</span>
            <img
              src="/add.svg"
              alt=""
              className={styles.buttonIcon}
              loading="lazy"
            />
          </button>
          <button
            type="button"
            className={`${styles.actionButton} ${styles.danger}`}
            onClick={handleCancel}
          >
            <span className={styles.buttonText}>Cancel</span>
            <img
              src="/add.svg"
              alt=""
              className={styles.buttonIcon}
              loading="lazy"
            />
          </button>
        </footer>
      </form>
    </main>
  );
};

export default Popup;
