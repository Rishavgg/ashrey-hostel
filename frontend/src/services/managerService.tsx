import axios,{ AxiosResponse } from "axios";

const API_BASE_URL = "http://localhost:9090";

export const fetchStudentData = async (page: number, size: number) => {
  try {
    const response = await axios.get(
        `${API_BASE_URL}/warden/dashboard/all/student`,
        { params: { page, size } }
    );
 
 
    const students = response.data.content.map((student: any) => {
      const {
        name,
        rollNumber,
        hostelName,
        roomNumber,
        year
      } = student;
 
 
      return {
        name: name || "N/A",
        rollNumber: rollNumber || "N/A",
        hostelName: hostelName || "N/A",
        roomNumber: roomNumber || "N/A",
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

export const uploadExcel = async (file: File) => {
  const formData = new FormData();
  console.log("here before file append");
  formData.append("file", file);
  console.log("here after file append");

  try {
    console.log("here after file upload");
    const response = await axios.post(
      `${API_BASE_URL}/api/hostel-management/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data; // Return response data
  } catch (error) {
    console.error("Error uploading Excel file:", error);
    throw error; // Throw error for better error handling
  }
};

// Fetch all wardens
export const fetchWardenData = async (page: number, size: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/chiefwarden/dashboard/all/warden`, {
      params: { page, size },
    });
    return response.data.content.map((warden: any) => ({
      id: warden.id,
      name: warden.name,
      hostel: warden.hostelName || "N/A",
      contact: warden.contact || "N/A",
    }));
  } catch (error) {
    console.error("Error fetching warden data:", error);
    return [];
  }
};

// Register a new warden
export const registerWarden = async (wardenDetails: { name: string; hostel: string; contact: string }) => {
  try {
    await axios.post(`${API_BASE_URL}/chiefwarden/dashboard/add/warden`, wardenDetails);
  } catch (error) {
    console.error("Error registering warden:", error);
    throw error;
  }
};

interface Room {
  roomId: number;
  roomNumber: string;
  capacity: number;
  currentOccupancy: number;
  floor: number;
  level: number;
  sunlight: boolean;
  balcony: boolean;
  hostelId: number | null;
}

// Fetch rooms data from the API
export const fetchPublicRooms = async (): Promise<Room[]> => {
  try {
    const response: AxiosResponse = await axios.get(`${API_BASE_URL}/warden/hostels/10/rooms`, 
      // {params: { page, size }} // Pass pagination parameters
  );
    return response.data.content; // Assuming the rooms are in the "content" field
  } catch (error) {
    console.error('Error fetching rooms:', error);
    throw error;
  }
};