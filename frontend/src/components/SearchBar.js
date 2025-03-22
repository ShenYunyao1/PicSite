// frontend/src/components/SearchBar.js
import React, { useState } from 'react';

const SearchBar = () => {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        // 搜索逻辑...
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="搜索照片..."
            />
            <button onClick={handleSearch}>搜索</button>
        </div>
    );
};

export default SearchBar;