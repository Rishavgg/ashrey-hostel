import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import FilterBar from '../../components/FilterBar';
import StudentList from '../../components/StudentList';

interface Student {
  id: string;
  name: string;
  status: string;
  year: string;
  feesStatus?: 'u' | 'p'; // Optional: 'u' for unpaid, 'p' for paid
}

const WardenDashboard: React.FC = () => {
  // Mock student data
  const students: Student[] = [
    {
      id: '211478',
      name: 'Jhon Doe',
      status: 'H15 B9',
      year: '1st Year',
      feesStatus: 'u', // Unpaid fees
    },
    {
      id: '211479',
      name: 'Jane Smith',
      status: 'H12 A3',
      year: '2nd Year',
      feesStatus: 'p', // Paid fees
    },
    {
      id: '211480',
      name: 'Alice Johnson',
      status: 'H10 C1',
      year: '3rd Year',
      feesStatus: 'u',
    },
  ];

  // State hooks for managing the dashboard
  const [view, setView] = useState<string>('Tile');
  const [sortOption, setSortOption] = useState<string>('A-Z');
  const [groupOption, setGroupOption] = useState<string>('Year');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Handler functions
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log('Filtered students by search:', query);
  };

  const handleSortChange = (sort: string) => {
    setSortOption(sort);
    console.log('Sort students by:', sort);
  };

  const handleGroupChange = (group: string) => {
    setGroupOption(group);
    console.log('Group students by:', group);
  };

  const handleToggleView = (selectedView: string) => {
    setView(selectedView);
    console.log('View changed to:', selectedView);
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flexGrow: 1 }}>
        <Navbar />
        <FilterBar
          title="Find a Student"
          onSearch={handleSearch}
          onSortChange={handleSortChange}
          onGroupChange={handleGroupChange}
          onToggleView={handleToggleView}
        />
        <StudentList
          students={students} // Pass the student data array
          view={view} // Tile or table view
          searchQuery={searchQuery} // Search term from the SearchBar
          sortOption={sortOption} // Selected sorting option
          groupOption={groupOption} // Selected grouping option
        />
      </div>
    </div>
  );
};

export default WardenDashboard;
