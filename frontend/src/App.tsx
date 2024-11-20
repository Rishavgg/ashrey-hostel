import { useState } from 'react'
import './App.css'

import Navbar from './assets/components/Navbar';
import NameCard from './assets/components/NameCard';
import FilterBar from './assets/components/FilterBar';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
      
      <div style={{display:'flex',flexDirection:'row'}}>
      <div style={{width:'25%'}}><Navbar/></div>
      <div style={{width:'75%'}}><FilterBar title='page title' /></div>
      
      </div>
      

      <NameCard
        name="Jhon Doe"
        id= "211478"
        status="H 15 B9"
        year="2nd"
        // feesStatus=''
      />
      <NameCard
      name="Jhon Doe"
      id= "211478"
      status="H 15 B9"
      year="2nd"
      feesStatus='p'
      />
      <NameCard
          name="Jhon Doe"
          id= "211478"
          status="H 15 B9"
          year="2nd"
          feesStatus='u'
      />



    
      </div>
      <h1>Ashrey</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          No. of Students is {count}
        </button>
        <p>
          Edit <code> src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Ashrey - The Hostel Management WebApp
      </p>
    </>
  )
}

export default App
