import axios,{ AxiosResponse } from "axios";

const API_BASE_URL = "http://localhost:9090";

// Types
export interface Hostel {
  hostelId: number;
  hostelName: string;
}

export interface Room {
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



export interface Student {
  id: number;
  name: string;
  rollNumber: string;
}

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

interface Rooms {
    name: string;
    roomId: number;
    roomNumber: string;
  capacity: number;
  currentOccupancy: number;
  floor: number;
  level: number;
  sunlight: boolean;
  balcony: boolean;
  hostelId: number | null;
  hostelName: string;
}

// Fetch rooms data from the API
export const fetchPublicRooms = async (page:number, size:number): Promise<Room[]> => {
  try {
    const response: AxiosResponse = await axios.get(`${API_BASE_URL}/warden/rooms`,
      {params: { page, size }} // Pass pagination parameters
    );
    return response.data.content; // Assuming the rooms are in the "content" field
  } catch (error) {
    console.error('Error fetching rooms:', error);
    throw error;
  }
};

// last 
// Fetch rooms data from the API
export const fetchPublicRoomss = async (page:number, size:number): Promise<Rooms[]> => {
  try {
    const response: AxiosResponse = await axios.get(`${API_BASE_URL}/warden/rooms`,
      {params: { page, size }} // Pass pagination parameters
    );
    return response.data.content; // Assuming the rooms are in the "content" field
  } catch (error) {
    console.error('Error fetching rooms:', error);
    throw error;
  }
};


// Fetch all hostels
// export const fetchHostels = async () => {
  //   const response = await axios.get(`${API_BASE_URL}/warden/hostels`);
  //   return response.data; // Returns the array of hostels
  // };
  export const fetchHostels = async (): Promise<Hostel[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/warden/hostels`);
      return response.data;
    } catch (error) {
    console.error("Error fetching hostels:", error);
    throw error;
  }
};

// Fetch rooms by hostel ID with pagination
export const fetchRoomsByHostelId = async (
  hostelId: number,
  page: number = 0,
  size: number = 10
): Promise<{
  rooms: Room[];
  totalPages: number;
  totalElements: number;
}> => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/warden/hostels/${hostelId}/rooms`,
      { params: { page, size } }
    );
    
    return {
      rooms: response.data.content,
      totalPages: response.data.totalPages,
      totalElements: response.data.totalElements
    };
  } catch (error) {
    console.error(`Error fetching rooms for hostel ${hostelId}:`, error);
    return { rooms: [], totalPages: 0, totalElements: 0 };
  }
};

// last 
export const fetchRoomsByHostelIds = async (
  hostelId: number,
  page: number = 0,
  size: number = 10
): Promise<{
  rooms: Rooms[];
  totalPages: number;
  totalElements: number;
}> => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/warden/hostels/${hostelId}/rooms`,
      { params: { page, size } }
    );
    
    return {
      rooms: response.data.content,
      totalPages: response.data.totalPages,
      totalElements: response.data.totalElements
    };
  } catch (error) {
    console.error(`Error fetching rooms for hostel ${hostelId}:`, error);
    return { rooms: [], totalPages: 0, totalElements: 0 };
  }
};

// Transform room data for UI components
export const transformRoomForUI = (room: Room) => {
  return {
    name: `Room ${room.roomNumber}`,
    roomId: room.roomId,
    roomNo: room.roomNumber,
    capacity: room.capacity,
    occupancy: room.currentOccupancy,
    balcony: room.balcony ? 1 : 0,
    sunny: room.sunlight ? 1 : 0,
    level: room.level,
    floor: room.floor
  };
};

//last
export const transformRoomForUIs = (room: Rooms) => {
  return {
    name: `Room ${room.roomNumber}`,
    roomId: room.roomId,
    roomNo: room.roomNumber,
    capacity: room.capacity,
    occupancy: room.currentOccupancy,
    balcony: room.balcony ? 1 : 0,
    sunny: room.sunlight ? 1 : 0,
    level: room.level,
    floor: room.floor
  };
};

// Fetch all students
// export const fetchStudents = async () => {
//   const response = await axios.get(`${API_BASE_URL}/warden/dashboard/all/student`);
//   return response.data.content; // Returns the "content" array
// };

export const fetchStudents = async (
  page: number = 0,
  size: number = 50
): Promise<Student[]> => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/warden/dashboard/all/student`,
      { params: { page, size } }
    );
    
    return response.data.content.map((student: any) => ({
      id: student.id || student.studentId,
      name: student.name || "N/A",
      rollNumber: student.rollNumber || "N/A"
    }));
  } catch (error) {
    console.error("Error fetching students:", error);
    return [];
  }
};

// Search for students
// This function searches for students based on a search term and returns the results
// It uses pagination to limit the number of results returned
// The search term can be a name, roll number, or any other identifier
// The function takes the search term, page number, and size (number of results per page) as parameters
// The function returns an array of students matching the search criteria
// The function handles errors and returns an empty array if an error occurs

// export const searchStudents = async (
//   searchTerm: string,
//   page: number,
//   size: number
// ) => {
//   try {
//     const response = await axios.get(
//       `${API_BASE_URL}/warden/dashboard/search`,
//       { params: { searchTerm, page, size } }
//     );

//     const students = response.data.content.map((student: any) => {
//       const { name, rollNumber, room, year } = student;

//       const blockName = room?.block?.blockName || "N/A";
//       const hostelName = room?.block?.hostel?.hostelName || "N/A";
//       const roomNumber = room?.roomNumber || "N/A";
//       const status = `H ${hostelName} ${blockName} ${roomNumber}`;

//       return {
//         name,
//         id: rollNumber,
//         status,
//         year: year ? `${year} Year` : "N/A",
//         rollNumber: rollNumber || "N/A",
//         hostelName: hostelName || "N/A",
//         roomNumber: roomNumber,
//       };
//     });

//     return students;
//   } catch (error) {
//     console.error("Error searching student data:", error);
//     return [];
//   }
// };

// Search students
export const searchStudents = async (
  searchTerm: string,
  page: number = 0,
  size: number = 10
): Promise<Student[]> => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/warden/dashboard/search`,
      { params: { searchTerm, page, size } }
    );
    
    return response.data.content.map((student: any) => ({
      id: student.id || student.studentId,
      name: student.name || "N/A",
      rollNumber: student.rollNumber || "N/A"
    }));
  } catch (error) {
    console.error("Error searching students:", error);
    return [];
  }
};

// Assign room to student
export const assignRoomToStudent = async (
  studentId: number,
  roomId: number
): Promise<any> => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/warden/students/${studentId}/assign-room/${roomId}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error assigning room ${roomId} to student ${studentId}:`, error);
    throw error;
  }
};

// Group rooms by capacity (room type)
export const groupRoomsByCapacity = (rooms: Room[]): Record<number, Room[]> => {
  return rooms.reduce((acc: Record<number, Room[]>, room) => {
    if (!acc[room.capacity]) {
      acc[room.capacity] = [];
    }
    acc[room.capacity].push(room);
    return acc;
  }, {});
};

//last
export const groupRoomsByCapacitys = (rooms: Rooms[]): Record<number, Rooms[]> => {
  return rooms.reduce((acc: Record<number, Rooms[]>, room) => {
    if (!acc[room.capacity]) {
      acc[room.capacity] = [];
    }
    acc[room.capacity].push(room);
    return acc;
  }, {});
};

// Assign a room to a student
// export const assignRoomToStudent = async (studentId: number, roomId: number) => {
//   const response = await axios.post(
//     `${API_BASE_URL}/warden/students/${studentId}/assign-room/${roomId}`
//   );
//   return response.data; // Returns the response from the server
// };
