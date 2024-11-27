import axios from "axios";

const API_BASE_URL = "http://localhost:9090";

export const fetchStudentData = async (page: number, size: number) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/warden/dashboard/all/student`,
      { params: { page, size } }
    );

    const students = response.data.content.map((student: any) => {
      const { name, rollNumber, room, year } = student;

      const blockName = room?.block?.blockName || "N/A";
      const hostelName = room?.block?.hostel?.hostelName || "N/A";
      const roomNumber = room?.roomNumber || "N/A";
      const status = `H ${hostelName} ${blockName} ${roomNumber}`;

      return {
        name,
        id: rollNumber,
        status,
        year: year ? `${year} Year` : "N/A",
      };
    });

    return students;
  } catch (error) {
    console.error("Error fetching student data:", error);
    return [];
  }
};

export const fetchStudentProfile = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/students/profile`);
    const data = response.data;

    // Transform data for use in the Profile component
    const profileData = {
      studentId: data.studentId,
      rollNumber: data.rollNumber,
      email: data.email,
      name: data.name,
      contact: data.contact,
      hostelName: data.room?.block?.hostel?.hostelName || "N/A",
      blockName: data.room?.block?.blockName || "N/A",
      roomNumber: data.room?.roomNumber || "N/A",
      year: data.year || "N/A",
      status: `H ${data.room?.block?.hostel?.hostelName || "N/A"} ${data.room?.block?.blockName || "N/A"} ${data.room?.roomNumber || "N/A"}`, // Full room status
      profilePic: "/default-profile.png", // Replace with an actual API field if available
    };

    return profileData;
  } catch (error) {
    console.error("Error fetching student profile data:", error);
    throw error;
  }
};

export const searchStudents = async (
  searchTerm: string,
  page: number,
  size: number
) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/warden/dashboard/search`,
      { params: { searchTerm, page, size } }
    );

    const students = response.data.content.map((student: any) => {
      const { name, rollNumber, room, year } = student;

      const blockName = room?.block?.blockName || "N/A";
      const hostelName = room?.block?.hostel?.hostelName || "N/A";
      const roomNumber = room?.roomNumber || "N/A";
      const status = `H ${hostelName} ${blockName} ${roomNumber}`;

      return {
        name,
        id: rollNumber,
        status,
        year: year ? `${year} Year` : "N/A",
      };
    });

    return students;
  } catch (error) {
    console.error("Error searching student data:", error);
    return [];
  }
};