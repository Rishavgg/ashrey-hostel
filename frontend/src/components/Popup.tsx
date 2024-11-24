import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from "../Context/UseAuth.tsx"; // Assuming registerUser is imported from a service
import styles from './Css/Popup.module.css';

type RegisterUserProfile = {
  name: string;
  email: string;
  contact: string;
  rollNumber: string;
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  rollNumber: Yup.string().required('Roll number is required'),
  contact: Yup.string()
      .matches(/^\d{10}$/, 'Phone number must be a 10-digit number')
      .required('Phone number is required'),
});

const Popup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  const { registerUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserProfile>({
    resolver: yupResolver(validationSchema),
  });

  const handleSave = async (form: RegisterUserProfile) => {
    await registerUser(form.name, form.email, form.rollNumber, form.contact);
  };

  // Function to close the popup
  const handleCancel = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null; // Don't render the popup if not visible

  return (
      <main className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Add a Student</h1>
        </header>

        <form
            className={styles.form}
            onSubmit={handleSubmit(handleSave)}
        >
          <section className={styles.fieldsGrid}>
            <div className={styles.fieldContainer}>
              <label className={styles.fieldLabel} htmlFor="name">
                Name
              </label>
              <input
                  type="text"
                  id="name"
                  {...register('name')}
                  className={styles.fieldInput}
              />
              {errors.name && <span className={styles.error}>{errors.name.message}</span>}
            </div>

            <div className={styles.fieldContainer}>
              <label className={styles.fieldLabel} htmlFor="email">
                Email
              </label>
              <input
                  type="email"
                  id="email"
                  {...register('email')}
                  className={styles.fieldInput}
              />
              {errors.email && <span className={styles.error}>{errors.email.message}</span>}
            </div>

            <div className={styles.fieldContainer}>
              <label className={styles.fieldLabel} htmlFor="rollNumber">
                Roll No.
              </label>
              <input
                  type="text"
                  id="rollNumber"
                  {...register('rollNumber')}
                  className={styles.fieldInput}
              />
              {errors.rollNumber && <span className={styles.error}>{errors.rollNumber.message}</span>}
            </div>

            <div className={styles.fieldContainer}>
              <label className={styles.fieldLabel} htmlFor="contact">
                Phone No.
              </label>
              <input
                  type="text"
                  id="contact"
                  {...register('contact')}
                  className={styles.fieldInput}
              />
              {errors.contact && <span className={styles.error}>{errors.contact.message}</span>}
            </div>
          </section>

          <footer className={styles.actions}>
            <button
                type="submit"
                className={`${styles.actionButton} ${styles.success}`}
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
