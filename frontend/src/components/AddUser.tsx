import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './Css/AddUser.module.css';

type Field = {
  label: string;
  name: string;
  type: string; // Use 'custom' for custom fields like dropdown
  validation: Yup.AnySchema;
  component?: JSX.Element; // Optional component for rendering custom fields
};

type PopupProps = {
  title: string;
  fields: Field[];
  onSubmit: (data: Record<string, string>) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
};

const AddUser: React.FC<PopupProps> = ({ title, fields, onSubmit, onCancel, isLoading = false }) => {
  const [isInternalLoading, setIsInternalLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Record<string, string>>({
    resolver: yupResolver(
      Yup.object().shape(
        fields.reduce((acc, field) => {
          acc[field.name] = field.validation;
          return acc;
        }, {} as Record<string, Yup.AnySchema>)
      )
    ),
  });

  const handleSave = async (data: Record<string, string>) => {
    setIsInternalLoading(true);
    try {
      await onSubmit(data);
    } finally {
      setIsInternalLoading(false);
    }
  };

  const isSubmitting = isLoading || isInternalLoading;

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
      </header>

      <form className={styles.form} onSubmit={handleSubmit(handleSave)}>
        <section className={styles.fieldsGrid}>
          {fields.map((field) => (
            <div className={styles.fieldContainer} key={field.name}>
              <label className={styles.fieldLabel} htmlFor={field.name}>
                {field.label}
              </label>

              {/* Render custom field if type is 'custom' */}
              {field.type === 'custom' && field.component ? (
                field.component
              ) : (
                <input
                  type={field.type}
                  id={field.name}
                  {...register(field.name)}
                  className={styles.fieldInput}
                />
              )}

              {errors[field.name] && (
                <span className={styles.error}>
                  {(errors[field.name] as any).message}
                </span>
              )}
            </div>
          ))}
        </section>

        <footer className={styles.actions}>
          <button
            type="submit"
            className={`${styles.actionButton} ${styles.success}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className={styles.buttonText}>Saving...</span>
            ) : (
              <>
                <span className={styles.buttonText}>Save</span>
                <img
                  src="/add.svg"
                  alt=""
                  className={styles.buttonIcon}
                  loading="lazy"
                />
              </>
            )}
          </button>
          <button
            type="button"
            className={`${styles.actionButton} ${styles.danger}`}
            onClick={onCancel}
            disabled={isSubmitting}
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

export default AddUser;
