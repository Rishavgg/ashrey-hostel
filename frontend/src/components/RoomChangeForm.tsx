import React, { useState } from "react";
import styles from "./Css/ManualAllocation.module.css";
import Dropdown from "./DropdownNames"; // Custom styled dropdown

type Room = {
  id: string;
  roomNo: string;
};

type RoomChangeFormProps = {
  mode: "swap" | "change";
  studentName: string;
  currentRoom: Room;
  swapCandidates: string[];
  availableRooms: Room[];
  onSubmit: (data: { type: "swap" | "change"; target: string | Room }) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
};

const RoomChangeForm: React.FC<RoomChangeFormProps> = ({
  mode,
  studentName,
  currentRoom,
  swapCandidates,
  availableRooms,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [selectedSwapTarget, setSelectedSwapTarget] = useState<string | undefined>();
  const [selectedRoom, setSelectedRoom] = useState<Room | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (mode === "swap" && selectedSwapTarget) {
        await onSubmit({ type: "swap", target: selectedSwapTarget });
      } else if (mode === "change" && selectedRoom) {
        await onSubmit({ type: "change", target: selectedRoom });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <section className={styles.formFields}>
          {/* Static Info */}
          <div className={styles.fieldWrapper}>
            <label className={styles.fieldLabel}>Student</label>
            <div className={styles.valueDisplay}>{studentName}</div>
          </div>

          <div className={styles.fieldWrapper}>
            <label className={styles.fieldLabel}>Current Room</label>
            <div className={styles.valueDisplay}>{currentRoom.roomNo}</div>
          </div>

          {/* Conditional Section */}
          {mode === "swap" ? (
            <div className={styles.fieldWrapper}>
              <label className={styles.fieldLabel}>Swap With</label>
              <Dropdown
                label="Select Student"
                options={swapCandidates}
                onOptionSelect={(name) => setSelectedSwapTarget(name)}
              />
            </div>
          ) : (
            <div className={styles.fieldWrapper}>
              <label className={styles.fieldLabel}>New Room</label>
              <Dropdown
                label="Select Room"
                options={availableRooms.map((r) => r.roomNo)}
                onOptionSelect={(roomNo) => {
                  const room = availableRooms.find((r) => r.roomNo === roomNo);
                  setSelectedRoom(room);
                }}
              />
            </div>
          )}
        </section>

        <footer className={styles.formActions}>
          <button
            type="submit"
            className={`${styles.actionButton} ${styles.successButton}`}
            disabled={isSubmitting || isLoading}
          >
            {isSubmitting || isLoading ? (
              <span className={styles.buttonText}>Submitting...</span>
            ) : (
              <>
                <span className={styles.buttonText}>Submit</span>
                <img src="/add.svg" alt="" className={styles.buttonIcon} loading="lazy" />
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onCancel}
            className={`${styles.actionButton} ${styles.cancelButton}`}
          >
            Cancel
          </button>
        </footer>
      </form>
    </main>
  );
};

export default RoomChangeForm;
