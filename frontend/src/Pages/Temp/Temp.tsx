// import OutpassCard from '../../components/OutpassCard.tsx'
import Navbar from '../../components/Navbar.tsx'
import FilterBar from '../../components/FilterBar.tsx'


const HomePage = () => {
    return (
        <div>
            {/* <OutpassCard
                name="John Doe"
                id="93890234729"
                status="3rd"
                year="H15 B9"
                placeOfVisit="Place of visit"
                reasonForVisit="Reason for visit"
                leaveDate="21/11/2023"
                returnDate="25/11/2023"
                daysDifference={4}
            /> */}
            <div>      
            <div style={{display:'flex',flexDirection:'row'}}>
            <div style={{width:'25%'}}><Navbar/></div>
            <div style={{width:'75%'}}><FilterBar title='page title' /></div>
            
            </div>



        </div>
        </div>
    );
};

export default HomePage;