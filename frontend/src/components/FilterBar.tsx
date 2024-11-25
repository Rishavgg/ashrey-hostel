// import React from 'react';


// import SearchBar from './SearchBar.tsx';
// import ToggleButton from './ToggleButton.tsx';
// import Dropdown from './Dropdown.tsx';
// import PageTitle from './PageTitle.tsx';


// interface FilterBarProps{
//     title: string;
// }

// const FilterBar: React.FC<FilterBarProps>=({ title })=>{
//     return(
//         <div style={{display:'flex' , flexDirection:'column', padding:'20px', gap:'20px',position:'sticky',width:'100%'}}>
//       <PageTitle text={title}/>
//       <div style={{ display:"flex", height:"55px", alignItems:'flex-end',justifyContent:'space-between',width:'100%',gap:'20px'}}>
//       <ToggleButton/>
//       <Dropdown
//         label="Year"
//         options={["1st", "2nd", "3rd","4th"]}
//         defaultSelected="A-Z"
//         onOptionSelect={(selected) => console.log("Selected Sort Option:", selected)}
//       />

//       <Dropdown
//         label="Hostel"
//         options={["H15 B9", "H15 B9", "H15 B9"]}
//         defaultSelected="Year"
//         onOptionSelect={(selected) => console.log("Selected Sort Option:", selected)}
//       />

//       <SearchBar
//         onSearch={(query) => console.log('Search query:', query)}
//         placeholder="Search for students by name"
//       />
//     </div>

    
//     </div>
//     )
// }

// export default FilterBar;

import React from 'react';

import SearchBar from './SearchBar.tsx';
import ToggleButton from './ToggleButton.tsx';
import Dropdown from './DropdownSearch.tsx';
import PageTitle from './PageTitle.tsx';

interface FilterBarProps {
  title: string;
}

const FilterBar: React.FC<FilterBarProps> = ({ title }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        gap: '20px',
        position: 'sticky',
        top: 0,
        width: '100%',
        backgroundColor: '#ffffff', // Add background to avoid transparency
        zIndex: 10, // Ensure it stays above other elements
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow for separation
      }}
    >
      {/* Page Title */}
      <PageTitle text={title} />

      {/* Controls (ToggleButton, Dropdowns, SearchBar) */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap', // Allows wrapping for elements
          gap: '20px',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <ToggleButton />
        <Dropdown
          label="Year"
          options={['Any','1st', '2nd', '3rd', '4th']}
          defaultSelected="Any"
          onOptionSelect={(selected) =>
            console.log('Selected Year Option:', selected)
          }
        />
        <Dropdown
          label="Hostel"
          options={['Any','H1','H2','H3','H4','H5','H6','H7','H8']}
          defaultSelected="Any"
          onOptionSelect={(selected) =>
            console.log('Selected Hostel Option:', selected)
          }
        />
        <SearchBar
          onSearch={(query) => console.log('Search query:', query)}
          placeholder="Search for students by name"
        />
      </div>
    </div>
  );
};

export default FilterBar;
