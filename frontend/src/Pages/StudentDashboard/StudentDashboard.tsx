// import OutpassCard from '../../components/OutpassCard.tsx'
import Navbar from '../../components/NavbarStudent.tsx'
// import FilterBar from '../../components/FilterBar.tsx'


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
        </div>



        </div>
    );
};

export default HomePage;