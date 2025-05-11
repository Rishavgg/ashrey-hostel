import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import SelectHostel from "./SelectHostel";
import Dropdown from "./DropdownNames";
import styles from "./Css/ManualAllocation.module.css";
import {
  fetchHostels,
  fetchRoomsByHostelId,
  fetchStudents,
  assignRoomToStudent,
  transformRoomForUI,
  Hostel,
  Student,
} from "../services/managerService";

type UIRoom = {
  name: string;
  roomId: number;
  roomNo: string;
  capacity: number;
  occupancy: number;
  balcony: number;
  sunny: number;
  level: number;
  floor: number;
};

type FormValues = {
  hostel: Hostel | null;
  roomType: number | null;
  room: UIRoom | null;
  student1: Student | null;
  student2: Student | null;
};

type AssignRoomFormProps = {
  onSuccess?: () => void;
  onCancel?: () => void;
};

const AssignRoomForm: React.FC<AssignRoomFormProps> = ({
  onSuccess,
  onCancel,
}) => {
  // State for dropdown options
  const [hostels, setHostels] = useState<Hostel[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentRooms, setCurrentRooms] = useState<UIRoom[]>([]);
  const [roomTypes, setRoomTypes] = useState<number[]>([]); // Available room capacities (1, 2, etc.)
  
  // Form state
  const [selectedHostel, setSelectedHostel] = useState<Hostel | null>(null);
  const [selectedRoomType, setSelectedRoomType] = useState<number | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<UIRoom | null>(null);
  const [selectedStudent1, setSelectedStudent1] = useState<Student | null>(null);
  const [selectedStudent2, setSelectedStudent2] = useState<Student | null>(null);
  const [isStudent2Required, setIsStudent2Required] = useState<boolean>(false);
  const [isStudent2Allowed, setIsStudent2Allowed] = useState<boolean>(false);

  // Validation schema
  const validationSchema = Yup.object({
    hostel: Yup.mixed().nullable().test(
      'is-hostel',
      'Hostel is required',
      (value) => value !== null
    ),
    roomType: Yup.number().nullable().required("Room type is required"),
    room: Yup.mixed().nullable().test(
      'is-room', 
      'Room is required',
      (value) => value !== null
    ),
    student1: Yup.mixed().nullable().test(
      'is-student',
      'Student 1 is required',
      (value) => value !== null
    ),
    student2: Yup.mixed().nullable().test(
      'is-required-student2',
      'Student 2 is required for this room',
      (value) => !isStudent2Required || value !== null
    ),
  });

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema) as any, // Type casting resolver to avoid type mismatch
    defaultValues: {
      hostel: null,
      roomType: null,
      room: null,
      student1: null,
      student2: null,
    },
  });

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      try {
        const [hostelsData, studentsData] = await Promise.all([
          fetchHostels(),
          fetchStudents(),
        ]);
        setHostels(hostelsData);
        setStudents(studentsData);
      } catch (error) {
        console.error("Failed to load initial data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // When hostel changes, fetch rooms
  useEffect(() => {
    const loadRooms = async () => {
      if (!selectedHostel) {
        setCurrentRooms([]);
        setRoomTypes([]);
        return;
      }

      setIsLoading(true);
      try {
        const { rooms } = await fetchRoomsByHostelId(selectedHostel.hostelId);
        const transformedRooms = rooms.map(transformRoomForUI);
        setCurrentRooms(transformedRooms);

        // Extract unique room types (capacities)
        const uniqueCapacities = [...new Set(rooms.map(room => room.capacity))];
        setRoomTypes(uniqueCapacities.sort((a, b) => a - b));
      } catch (error) {
        console.error("Failed to load rooms:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRooms();
  }, [selectedHostel]);

  // Filter rooms based on selected room type
  const filteredRooms = selectedRoomType
    ? currentRooms.filter(room => room.capacity === selectedRoomType && room.occupancy < room.capacity)
    : [];

  // Update student2 requirement based on selected room
  useEffect(() => {
    if (selectedRoom) {
      const isDoubleRoom = selectedRoom.capacity === 2;
      const remainingSpaces = selectedRoom.capacity - selectedRoom.occupancy;
      
      // Show student2 field for double rooms with multiple spaces available
      setIsStudent2Allowed(isDoubleRoom && remainingSpaces > 1);
      
      // Require student2 field for double rooms with no occupants (optional when assigning to a room with 1 occupant)
      setIsStudent2Required(false); // Make it optional in all cases, as you might want to assign only one student
      
      // Reset student2 if not allowed
      if (!isStudent2Allowed) {
        setSelectedStudent2(null);
        setValue("student2", null);
      }
    } else {
      setIsStudent2Allowed(false);
      setIsStudent2Required(false);
    }
  }, [selectedRoom, setValue]);

  const handleSave = async (data: FormValues) => {
    if (!data.room || !data.student1) {
      console.error("Missing required data");
      return;
    }

    setIsLoading(true);
    try {
      const results = [];
      let success = false;
      
      // Assign room to student1
      try {
        await assignRoomToStudent(data.student1.id, data.room.roomId);
        results.push("Successfully assigned first student.");
        success = true;
      } catch (error) {
        console.error("Failed to assign first student:", error);
        results.push("Failed to assign first student.");
      }
      
      // If student2 exists and was selected in the form, attempt to assign room to student2 as well
      if (selectedStudent2 && isStudent2Allowed) {
        try {
          await assignRoomToStudent(selectedStudent2.id, data.room.roomId);
          results.push("Successfully assigned second student.");
          success = true;
        } catch (error) {
          console.error("Failed to assign second student:", error);
          results.push("Failed to assign second student.");
        }
      }
      
      if (success) {
        // Reset form on any success
        reset();
        setSelectedHostel(null);
        setSelectedRoomType(null);
        setSelectedRoom(null);
        setSelectedStudent1(null);
        setSelectedStudent2(null);
        
        // Show detailed result message
        alert(results.join("\n"));
        if (onSuccess) onSuccess();
      } else {
        // If everything failed
        alert("Failed to assign any students to the room. Please try again.");
      }
    } catch (error) {
      console.error("Error in assignment process:", error);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit(handleSave)}>
        <section className={styles.formFields}>
          <div className={styles.hostelSelect}>
            <div className={styles.hostelSelectSingle}>
              {/* Hostel Dropdown */}
              <div className={styles.fieldWrapper}>
                <label className={styles.fieldLabel}>Hostel</label>
                <Dropdown
                  label="Hostel"
                  options={hostels.map((hostel) => hostel.hostelName)}
                  defaultSelected=""
                  onOptionSelect={(name) => {
                    const selected = hostels.find((h) => h.hostelName === name);
                    setSelectedHostel(selected || null);
                    setValue("hostel", selected || null);
                    
                    // Reset dependent fields
                    setSelectedRoomType(null);
                    setSelectedRoom(null);
                    setValue("roomType", null);
                    setValue("room", null);
                  }}
                />
                {errors.hostel && (
                  <span className={styles.errorMessage}>{errors.hostel.message}</span>
                )}
              </div>

              {/* Room Type Dropdown */}
              <div className={styles.fieldWrapper}>
                <label className={styles.fieldLabel}>Room Type</label>
                <Dropdown
                  label="Room Type"
                  options={roomTypes.map(type => 
                    type === 1 ? "Single Room" : `${type}-Person Room`)}
                  defaultSelected=""
                  disabled={!selectedHostel}
                  onOptionSelect={(name) => {
                    const capacity = name === "Single Room" ? 1 : 
                                   parseInt(name.split("-")[0]);
                    setSelectedRoomType(capacity);
                    setValue("roomType", capacity);
                    
                    // Reset room selection
                    setSelectedRoom(null);
                    setValue("room", null);
                  }}
                />
                {errors.roomType && (
                  <span className={styles.errorMessage}>{errors.roomType.message}</span>
                )}
              </div>
            </div>

            {/* Room Dropdown */}
            <div className={styles.fieldWrapper}>
              <label className={styles.fieldLabel}>Room</label>
              <SelectHostel
                options={filteredRooms}
                defaultSelected={undefined}
                disabled={!selectedRoomType}
                onOptionSelect={(room) => {
                  setSelectedRoom(room);
                  setValue("room", room);
                }}
              />
              {errors.room && (
                <span className={styles.errorMessage}>{errors.room.message}</span>
              )}
              {selectedRoom && (
                <span className={styles.roomInfo}>
                  Available spaces: {selectedRoom.capacity - selectedRoom.occupancy} of {selectedRoom.capacity}
                </span>
              )}
            </div>
          </div>

          <div className={styles.studentSelect}>
            {/* Student 1 Dropdown */}
            <div className={styles.fieldWrapper}>
              <label className={styles.fieldLabel}>Student 1</label>
              <Dropdown
                label="Student 1"
                options={students.map((student) => `${student.name} (${student.rollNumber})`)}
                defaultSelected=""
                onOptionSelect={(name) => {
                  const rollNumber = name.match(/\((.*?)\)$/)?.[1] || "";
                  const selected = students.find((s) => s.rollNumber === rollNumber);
                  setSelectedStudent1(selected || null);
                  setValue("student1", selected || null);
                }}
              />
              {errors.student1 && (
                <span className={styles.errorMessage}>{errors.student1.message}</span>
              )}
            </div>

            {/* Student 2 Dropdown - Show only for double rooms with available spaces */}
            {isStudent2Allowed && (
              <div className={styles.fieldWrapper}>
                <label className={styles.fieldLabel}>
                  Student 2 {isStudent2Required ? "(Required)" : "(Optional)"}
                </label>
                <Dropdown
                  label="Student 2"
                  options={students
                    .filter(s => s.id !== selectedStudent1?.id) // Remove student1 from options
                    .map((student) => `${student.name} (${student.rollNumber})`)}
                  defaultSelected=""
                  onOptionSelect={(name) => {
                    const rollNumber = name.match(/\((.*?)\)$/)?.[1] || "";
                    const selected = students.find((s) => s.rollNumber === rollNumber);
                    setSelectedStudent2(selected || null);
                    setValue("student2", selected || null);
                  }}
                />
                {errors.student2 && (
                  <span className={styles.errorMessage}>{errors.student2.message}</span>
                )}
              </div>
            )}
          </div>
        </section>

        <footer className={styles.formActions}>
          {onCancel && (
            <button
              type="button"
              className={`${styles.actionButton} ${styles.cancelButton}`}
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancel
            </button>
          )}
          
          <button
            type="submit"
            className={`${styles.actionButton} ${styles.successButton}`}
            disabled={isLoading}
          >
            {isLoading ? (
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
        </footer>
      </form>
    </main>
  );
};

export default AssignRoomForm;