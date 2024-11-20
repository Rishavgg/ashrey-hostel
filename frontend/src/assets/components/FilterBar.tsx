import React from 'react';


import SearchBar from './SearchBar';
import ToggleButton from './ToggleButton';
import Dropdown from './Dropdown';
import PageTitle from './PageTitle';


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
        label="Sort"
        options={["A-Z", "Z-A", "Date"]}
        defaultSelected="A-Z"
        onOptionSelect={(selected) => console.log("Selected Sort Option:", selected)}
      />

      <Dropdown
        label="Group"
        options={["Year", "Month", "Day"]}
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

