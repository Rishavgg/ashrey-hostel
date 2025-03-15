import React from 'react';
import PageTitle from '../../components/PageTitle';
import RequestCard from '../../components/RequestCard';

const AddEditStudent: React.FC = () => {
  return (
    <div>
      <div
        style={{
          width: '79vw',
          padding: '20px',
          position: 'sticky',
          boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 4px',
          backgroundColor: 'white',
          top: 0,
          zIndex: 10,
        }}
      >
        <PageTitle text="Allocation Requests" />
      </div>

      <br />

      <div style={{ padding: '0px 25px', display: 'flex', flexWrap: 'wrap', gap: '0px' }}>
        {/* 🔁 Swap Request */}
        <RequestCard
          type="swap"
          students={[
            { name: 'Jhon Doe', initials: 'J', room: 'H15 B9' },
            { name: 'Jane Smith', initials: 'J', room: 'H7 L5' },
          ]}
        />

        {/* 🛏️ Apply - 2 Students */}
        <RequestCard
          type="apply"
          newRoom="H15 B26"
          students={[
            { name: 'Alice Brown', initials: 'A', room: 'H12 B3' },
            { name: 'Tom Green', initials: 'T', room: 'H2 B7' },
          ]}
        />

        {/* 🛏️ Apply - 3 Students */}
        <RequestCard
          type="apply"
          newRoom="H10 L2"
          students={[
            { name: 'Sara Lee', initials: 'S', room: 'H1 B1' },
            { name: 'Chris Ray', initials: 'C', room: 'H3 L6' },
            { name: 'Nina White', initials: 'N', room: 'H8 L3' },
          ]}
        />
        <RequestCard
          type="apply"
          newRoom="H10 L2"
          students={[
            { name: 'Sara Lee', initials: 'S', room: 'H1 B1' },
            { name: 'Chris Ray', initials: 'C', room: 'H3 L6' },
            { name: 'Nina White', initials: 'N', room: 'H8 L3' },
          ]}
        />
      </div>
    </div>
  );
};

export default AddEditStudent;
