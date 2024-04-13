import React, { useState } from 'react';
// use shadcn ComboBox to search for events
const SearchBar: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        // Perform search logic here
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
            />
            {/* Add search button or additional search functionality here */}
        </div>
    );
};

export default SearchBar;