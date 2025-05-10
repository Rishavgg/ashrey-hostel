// import FilterBar from "../../components/FilterBar";
import PageTitle from "../../components/PageTitle";
import MassAllocationComponent from "../../components/MassAllocationComponent";

const MassAllocation: React.FC = () => {
    return (
      <div>
        <div style={{width:'79vw', padding:"20px", position:"sticky", boxShadow:"rgba(0, 0, 0, 0.1) 0px 2px 4px"}}>
        <PageTitle text="Mass Allocation" />
        </div>

        <br />
        
        {/* <h2>Under Construction</h2> */}
        <div
            style={{
              padding:"20px",
            }}
          >
        <MassAllocationComponent

            room="H15 B26"
            level={3}
            floor={-3}
            balcony={true}
            sunny={false}
            studentPairs={[
              {
                id: "pair1",
                status: "green",
                student1: {
                  name: "Jhon Doe",
                  roll: "H15 B9",
                  hostel: "H15",
                },
                student2: {
                  name: "Jhon Doe",
                  roll: "H7 L5",
                  hostel: "H7",
                },
              },
              {
                id: "pair2",
                status: "purple",
                student1: {
                  name: "Jhon Doe",
                  roll: "H15 B9",
                  hostel: "H15",
                },
                student2: {
                  name: "Jhon Doe",
                  roll: "H7 L5",
                  hostel: "H7",
                },
              },
            ]}
          />
        {/* Add your find-a-student page content here */}
      </div>
      </div>
    );
  };
  
  export default MassAllocation;