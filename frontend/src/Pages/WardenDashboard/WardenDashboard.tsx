// import OutpassCard from '../../components/OutpassCard.tsx'
import Navbar from '../../components/NavbarWarden.tsx'
import FilterBar from '../../components/FilterBar.tsx'
import NameCard from '../../components/NameCard.tsx';


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
                <FilterBar title="Page Title" />

                {/* Rest of Content */}
                <div style={{
                    padding:'20px',
                    gap:'20px',
                    position:'sticky',
                    width:'100%',
                    display:'flex',
                    flexWrap:'wrap'}}>
                    
            <NameCard
                        name="Jhon Doe"
                        id= "211478"
                        status="H 15 B9"
                        year="2nd"
                        // feesStatus='u'
                    />

                    <NameCard
                        name="Jhon Doe"
                        id= "211478"
                        status="H 15 B9"
                        year="2nd"
                        // feesStatus='u'
                        />
                        
                    <NameCard
                        name="Jhon Doe"
                        id= "211478"
                        status="H 15 B9"
                        year="2nd"
                        // feesStatus='u'
                    /><NameCard
                    name="Jhon Doe"
                    id= "211478"
                    status="H 15 B9"
                    year="2nd"
                    // feesStatus='u'
                    /><NameCard
                    name="Jhon Doe"
                    id= "211478"
                    status="H 15 B9"
                    year="2nd"
                    // feesStatus='u'
                />
                </div>
            </div>
        </div>



        </div>
    );
};

export default HomePage;


