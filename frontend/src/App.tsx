import { useState } from 'react'
<<<<<<< HEAD
import './App.css'

import Navbar from './assets/components/Navbar';
import NameCard from './assets/components/NameCard';
import FilterBar from './assets/components/FilterBar';
=======
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

>>>>>>> 4029552267b4148c90e680a4877724d9049f1e83
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
<<<<<<< HEAD
      
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
=======
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
>>>>>>> 4029552267b4148c90e680a4877724d9049f1e83
      </p>
    </>
  )
}

export default App
