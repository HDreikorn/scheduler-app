import React from 'react';
import { checkPropTypes } from 'prop-types';

const SearchBox = ({searchChange, searchBy}) => {
    return (
        <div className='pa2'>
            <input
                className='searchBox'
                type='search'
                placeholder= {searchBy}
                onChange={searchChange}
            />
        </div>
    );
}

export default SearchBox;