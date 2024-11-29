import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import SelectHostel from "./SelectHostel"; // Your hostel dropdown component
import Dropdown from "./DropdownNames"; // Your existing Dropdown component
import styles from "./Css/ManualAllocation.module.css";

type Room = {
  name: string;
  balcony: number;
  sunny: number;
  level: number;
  roomNo: string;
};

type Student = {
  id: string;
  name: string;
};

type AssignRoomFormProps = {
  hostelOptions: Room[];
  studentOptions: Student[];
  defaultHostel?: Room;
  defaultStudent1?: Student;
  defaultStudent2?: Student;
  onSubmit: (data: { hostel: Room; student1: Student; student2?: Student }) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
};

const AssignRoomForm: React.FC<AssignRoomFormProps> = ({
  hostelOptions,
  studentOptions,
  defaultHostel,
  defaultStudent1,
  defaultStudent2,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [isInternalLoading, setIsInternalLoading] = useState(false);
  const [selectedHostel, setSelectedHostel] = useState<Room | undefined>(defaultHostel);
  const [selectedStudent1, setSelectedStudent1] = useState<Student | undefined>(defaultStudent1);
  const [selectedStudent2, setSelectedStudent2] = useState<Student | undefined>(defaultStudent2);

  // Validation schema
  const validationSchema = Yup.object().shape({
    hostel: Yup.object().required("Hostel is required"),
    student1: Yup.object()
      .nullable()
      .required("Student 1 is required"), // Allow nullable but still enforce required
    student2: Yup.object().nullable(), // Optional field
  });

  const {
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleSave = async () => {
    if (selectedHostel && selectedStudent1) {
      setIsInternalLoading(true);
      try {
        await onSubmit({
          hostel: selectedHostel,
          student1: selectedStudent1,
          student2: selectedStudent2,
        });
      } finally {
        setIsInternalLoading(false);
      }
    }
  };

  const isSubmitting = isLoading || isInternalLoading;

  return (
    <main className={styles.formContainer}>
      <header className={styles.formHeader}>
        <h1 className={styles.formTitle}>Assign Room</h1>
      </header>

      <form className={styles.form} onSubmit={handleSubmit(handleSave)}>
        <section className={styles.formFields}>
          {/* Hostel Dropdown */}
          <div className={styles.fieldWrapper}>
            <label className={styles.fieldLabel}>Hostel</label>
            <SelectHostel
              options={hostelOptions}
              defaultSelected={selectedHostel}
              onOptionSelect={setSelectedHostel}
            />
            {errors.hostel && <span className={styles.errorMessage}>{errors.hostel.message}</span>}
          </div>

          {/* Student 1 Dropdown */}
          <div className={styles.fieldWrapper}>
            <label className={styles.fieldLabel}>Student 1</label>
            <Dropdown
              label="Student 1"
              options={studentOptions.map((student) => student.name)}
              defaultSelected={defaultStudent1?.name}
              onOptionSelect={(name) => {
                const selected = studentOptions.find((s) => s.name === name);
                setSelectedStudent1(selected || undefined);
              }}
            />
            {errors.student1 && (
              <span className={styles.errorMessage}>{errors.student1.message}</span>
            )}
          </div>

          {/* Student 2 Dropdown */}
          <div className={styles.fieldWrapper}>
            <label className={styles.fieldLabel}>Student 2 (Optional)</label>
            <Dropdown
              label="Student 2"
              options={studentOptions.map((student) => student.name)}
              defaultSelected={defaultStudent2?.name}
              onOptionSelect={(name) => {
                const selected = studentOptions.find((s) => s.name === name);
                setSelectedStudent2(selected || undefined);
              }}
            />
          </div>
        </section>

        <footer className={styles.formActions}>
          <button
            type="submit"
            className={`${styles.actionButton} ${styles.successButton}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className={styles.buttonText}>Assigning...</span>
            ) : (
              <>
                <span className={styles.buttonText}>Assign</span>
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
            className={`${styles.actionButton} ${styles.cancelButton}`}
            onClick={onCancel}
            disabled={isSubmitting}
          >
            <span className={styles.buttonText}>Cancel</span>
            <img
              src="/cancel.svg"
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

export default AssignRoomForm;
