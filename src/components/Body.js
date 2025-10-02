import RestaurantCard from "./RestaurantCard";
import resList from "../utils/mockData";
import { useState, useEffect} from "react";

const Body = () => {

    const [listOfRestaurants, setListOfRestaurants] = useState([]);

    useEffect(() => {
        fetchData();
    },[]);

    const fetchData = async ()=>{
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=13.0035068&lng=77.5890953&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");

        const json = await data.json();

        console.log(json);
        setListOfRestaurants(json.data.cards[2].data.data.cards);
    };

    if(listOfRestaurants===0){
        return <Shimmer />;
    }

    return (
        <div className="body">
            <div className="filter">
                <button className="filter-btn"
                 onClick={()=>{
                    const filteredList = listOfRestaurants.filter(
                        (res) => res.info.avgRating > 4.5
                    );
                    setListOfRestaurants(filteredList);
                 }}
                >
                    Top rated restaurants</button>
            </div>
            <div className="res-container">
                {listOfRestaurants.map((restaurant) => (
                     <RestaurantCard key = {restaurant.info.id} resData = {restaurant} />
                ))}
            </div>
        </div>
    )
}

export default Body;