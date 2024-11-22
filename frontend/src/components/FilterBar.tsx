import React from 'react';


import SearchBar from './SearchBar.tsx';
import ToggleButton from './ToggleButton.tsx';
import Dropdown from './Dropdown.tsx';
import PageTitle from './PageTitle.tsx';


interface FilterBarProps{
    title: string;
}

const FilterBar: React.FC<FilterBarProps>=({ title })=>{
    return(
        <div style={{display:'flex' , flexDirection:'column', padding:'20px', gap:'20px',position:'sticky'}}>
      <PageTitle text={title}/>
      <div style={{ display:"flex", height:"55px", alignItems:'flex-end',justifyContent:'space-between',width:'100%'}}>
      <ToggleButton/>
      <Dropdown
        label="Year"
        options={["1st", "2nd", "3rd","4th"]}
        defaultSelected="A-Z"
        onOptionSelect={(selected) => console.log("Selected Sort Option:", selected)}
      />

      <Dropdown
        label="Hostel"
        options={["H15 B9", "H15 B9", "H15 B9"]}
        defaultSelected="Year"
        onOptionSelect={(selected) => console.log("Selected Sort Option:", selected)}
      />

      <SearchBar
        onSearch={(query) => console.log('Search query:', query)}
        placeholder="Search for students by name"
      />
    </div>
    </div>
    )
}

export default FilterBar;

