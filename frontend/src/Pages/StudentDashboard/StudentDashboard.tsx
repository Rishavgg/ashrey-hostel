// import OutpassCard from '../../components/OutpassCard.tsx'
import Navbar from '../../components/NavbarStudent.tsx'
import FilterBar from '../../components/FilterBar.tsx'
import { fetchStudentData, searchStudents} from "../../services/managerService.tsx"
import { useState } from "react";
import NameCard from '../../components/NameCard.tsx';

const handleSearch = async (searchTerm: string) => {
    if (!searchTerm) {
      // If search term is empty, reload all students
      const data = await fetchStudentData(0, 10);
      setStudents(data);
    } else {
      const data = await searchStudents(searchTerm, 0, 5); // Search for students
      setStudents(data);
    }
  };

  const [students, setStudents] = useState<any[]>([]);


const HomePage = () => {
    return (
        <div>

        {/* <div style={{display:'flex',flexDirection:'row'}}>
            <Navbar/>
            <div style={{display:'flex',flexDirection:'column',maxWidth:'79vw',width:'100%',minWidth:'fit-content'}} >
                <FilterBar title='page title' />
                <div style={{padding:'20px', gap:'20px',position:'sticky',width:'100%'}}>rest of the content here</div>
                
                </div>
        </div> */}
        

        <div style={{
            display: 'flex',
            flexDirection: 'row',
            height: '100vh',
            overflow: 'hidden'
        }}>
            {/* Navbar */}
            <Navbar/>

            {/* Main Content */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                maxWidth: '79vw',
                minWidth: '0'
            }}>
                {/* Filter Bar */}
                <FilterBar title="Warden Dashboard" onSearch={handleSearch} />

                {/* Rest of Content */}
                <div style={{
                    flexGrow: 1,
                    padding: '20px',
                    gap: '20px',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    width: '100%'
                }}>
                    Rest of the content here
                </div>
            </div>
            <div
            style={{
              padding: '20px',
              gap: '20px',
              position: 'sticky',
              width: '100%',
              display: 'flex',
              flexWrap: 'wrap',
            }}
          >
            <NameCard
              name="John Doe"
              id="211478"
              status="H 15 B9"
              year="2nd"
            />
            {students.map((student, index) => (
              <NameCard
                key={index}
                name={student.name}
                id={student.id}
                status={student.status}
                year={student.year}
              />
            ))}
            {/* Add more NameCard components as needed */}
          </div>
        </div>



        </div>
    );
};

export default HomePage;