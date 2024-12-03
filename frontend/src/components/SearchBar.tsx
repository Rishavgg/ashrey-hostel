import React, { useState } from 'react';
import styles from './Css/SearchBar.module.css';

interface SearchBarProps {
  onSearch?: (query: string) => void; // Function to handle search
  placeholder?: string; // Custom placeholder text for the input
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder = "Who are you looking for?" }) => {
  const [query, setQuery] = useState<string>(''); // State to store the search query

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value); // Update the query state
    if (onSearch) {
      onSearch(value); // Trigger onSearch callback on every change
    }
  };

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder={placeholder} // Use the custom placeholder
        value={query}
        onChange={handleInputChange} // Trigger search on change
        className={styles.searchInput} // Add CSS for styling the input
      />
      <div
        className={styles.searchIcon}
        role="button" // Makes it accessible
        tabIndex={0} // Allow keyboard focus
        onKeyDown={(e) => e.key === 'Enter' && onSearch && onSearch(query)} // Trigger on Enter key for accessibility
      >
        <div className={styles.iconWrapper}>
          <div className={styles.iconContainer}>
            <div className={styles.iconInner}>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/d6efea5f7c3649c8b97e0c2c59aefd56/8078b41ec0fe3376c595ddb828f65d73a14699d5cbf96954433302b524a7c6fc?apiKey=d6efea5f7c3649c8b97e0c2c59aefd56&"
                className={styles.searchIconImage}
                alt="Search Icon"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
