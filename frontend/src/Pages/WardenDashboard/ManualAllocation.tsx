import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Dropdown from "../../components/DropdownNames"; // Dropdown component
import styles from "../../components/Css/ManualAllocation.module.css";
import FilterBar from "../../components/FilterBar";
import {
  fetchStudents,
  fetchHostels,
  fetchRooms,
  assignRoomToStudent,
} from "../../services/managerService";

type Room = {
  roomId: number;
  roomNo: string;
};

type Student = {
  studentId: number;
  name: string;
  rollNumber: string;
};

type Hostel = {
  hostelId: number;
  hostelName: string;
};

// Define form values type
type FormValues = {
  hostel: number | null;
  room: number | null;
  student: number | null;
};

const AssignRoomForm: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [hostels, setHostels] = useState<Hostel[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      hostel: null,
      room: null,
      student: null,
    },
  });

  // Fetch students and hostels on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const studentsData = await fetchStudents();
        const hostelsData = await fetchHostels();
        setStudents(studentsData);
        setHostels(hostelsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    loadData();
  }, []);

  // Fetch rooms when a hostel is selected
  const fetchRoomsForHostel = async (hostelId: number) => {
    try {
      const roomsData = await fetchRooms(hostelId);
      setRooms(roomsData);
    } catch (error) {
      console.error("Error fetching rooms:", error);
      setRooms([]);
    }
  };

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    if (data.room && data.student) {
      setIsSubmitting(true);
      try {
        await assignRoomToStudent(data.student, data.room);
        alert("Room assigned successfully!");
      } catch (error) {
        console.error("Error assigning room:", error);
        alert("Failed to assign the room. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <main className={styles.formContainer}>
      <FilterBar
        title="Manual Allocation"
        onSearch={(searchTerm: string) => {
          const filteredStudents = students.filter((student) =>
            student.rollNumber.includes(searchTerm)
          );
          setStudents(filteredStudents);
        }}
        onToggle={(view) => console.log("View toggled to:", view)}
      />

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <section className={styles.formFields}>
          {/* Hostel Dropdown */}
          <div className={styles.fieldWrapper}>
            <label className={styles.fieldLabel}>Hostel</label>
            <Dropdown
              label="Hostel"
              options={hostels.map((hostel) => hostel.hostelName)}
              onOptionSelect={(hostelName) => {
                const selectedHostel = hostels.find(
                  (hostel) => hostel.hostelName === hostelName
                );
                setValue("hostel", selectedHostel?.hostelId || null); // Explicitly set number or null
                setRooms([]); // Reset rooms
                if (selectedHostel) fetchRoomsForHostel(selectedHostel.hostelId);
              }}
            />
            {errors.hostel && (
              <span className={styles.errorMessage}>
                Please select a hostel.
              </span>
            )}
          </div>

          {/* Room Dropdown */}
          <div className={styles.fieldWrapper}>
            <label className={styles.fieldLabel}>Room</label>
            <Dropdown
              label="Room"
              options={rooms.map((room) => room.roomId.toString())}
              onOptionSelect={(roomId) => {
                setValue("room", parseInt(roomId) || null); // Explicitly set number or null
              }}
            />
            {errors.room && (
              <span className={styles.errorMessage}>Please select a room.</span>
            )}
          </div>

          {/* Student Dropdown */}
          <div className={styles.fieldWrapper}>
            <label className={styles.fieldLabel}>Student</label>
            <Dropdown
              label="Student"
              options={students.map((student) => student.rollNumber)}
              onOptionSelect={(rollNumber) => {
                const selectedStudent = students.find(
                  (student) => student.rollNumber === rollNumber
                );
                setValue("student", selectedStudent?.studentId || null); // Explicitly set number or null
              }}
            />
            {errors.student && (
              <span className={styles.errorMessage}>
                Please select a student.
              </span>
            )}
          </div>
        </section>

        <footer className={styles.formActions}>
          <button
            type="submit"
            className={`${styles.actionButton} ${styles.successButton}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Assigning..." : "Assign"}
          </button>
        </footer>
      </form>
    </main>
  );
};

export default AssignRoomForm;
