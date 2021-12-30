const apiKey = 'YzinUXQhkFH6PnSyTBPVnAkJhCDB930umHUAa7tF3ATDHJSdEXpLgWkUQN4LYWJHR8itK3NjlP2s-ZJ31vHHrJFMtqMIb-6VYbUODJJVetIqyGPs2Jo5XQFhQbDKYXYx';

const Yelp = {
    search: function(term, location, sortBy) {
        return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${apiKey}`}
                })
            .then(response => {
                console.log(response)
                if(!response.ok) {
                    throw  Error(response.status)
                }else {
                    return response.json();
                }
            })
            .then(jsonResponse => {
                if (jsonResponse.businesses) {
                    return jsonResponse.businesses.map((business) => {
                        return {
                            id: business.id,
                            imageSrc: business.image_url,
                            name: business.name,
                            address: business.location.address1,
                            city: business.location.city,
                            state: business.location.state,
                            zipCode: business.location.zip_code,
                            category: business.categories[0].title,
                            rating: business.rating,
                            reviewCount: business.review_count
                        }
                    })
                }
            })
    }
}

export { Yelp };

