import React from 'react';

import './BusinessList.css';
import Business from '../Business/Business';

class BusinessList extends React.Component {

    render() {
        if(!this.props.errorState && this.props.businesses.length > 0){
            return (
                <div className="BusinessList">
                    {
                        this.props.businesses.map( business => {
                            return <Business business={business} key={business.id}/>;
                        })  
                    }
                </div>
            );  
        }
        else{
            return (
                <p className='ErrorMessage'>{this.props.errorMessage}</p>
            )
        }
    }
}

export default BusinessList;