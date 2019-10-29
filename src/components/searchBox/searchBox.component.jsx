import React from 'react';

const SearchBox = ({searchfield, searchChange}) => {
    return (
        <div className='pa2'>
            <input
                className='searchBox'
                type='search'
                placeholder= 'search by course name'
                onChange={searchChange}
            />
        </div>
    );
}

export default SearchBox;