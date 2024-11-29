type NavbarProps = {
    onPageChange: (page: string) => void;
  };
  
  const Navbar: React.FC<NavbarProps> = ({ onPageChange }) => {
    return (
      <nav>
        <ul>
          <li onClick={() => onPageChange('Find a student')}>Find a Student</li>
          <li onClick={() => onPageChange('Hostel fees status')}>Hostel Fees Status</li>
          <li onClick={() => onPageChange('Manual Allocation')}>Manual Allocation</li>
          <li onClick={() => onPageChange('Mass Allocation')}>Mass Allocation</li>
          <li onClick={() => onPageChange('Add/edit student details')}>
            Add/Edit Student Details
          </li>
        </ul>
      </nav>
    );
  };
  
  export default Navbar;
  