import React from 'react';
import Spinner from "../functional/Spinner";

class SearchBar extends React.Component {

    handleSearchTextChange = (e) => {
        this.props.onSearchTextChange(e.target.value);
    }

    render() {
        return (
            <div className="block-search">
                <input className='form-control'
                       type="search"
                       value={this.props.filterText}
                       onChange={this.handleSearchTextChange}
                       placeholder='Search...'/>
                {this.props.loading && <Spinner/>}
            </div>
        )
    }
}

export default SearchBar;
