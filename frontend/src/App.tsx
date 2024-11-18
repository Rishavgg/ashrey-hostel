import { useState } from 'react'
import './App.css'

// import Navbar from './assets/components/Navbar';
import NameCard from './assets/components/NameCard';

import SearchBar from './assets/components/searchbar';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>

      {/* <Navbar/> */}

      <SearchBar
        onSearch={(query) => console.log('Search query:', query)}
        placeholder="Search for students by name"
      />
      <NameCard
        name="Jhon Doe"
        id= "211478"
        status="H 15 B9"
        year="2nd"
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
