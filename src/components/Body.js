import RestaurantCard from "./RestaurantCard";
import { useState, useEffect} from "react";
import Shimmer from "./Shimmer";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {

    const [listOfRestaurants, setListOfRestaurants] = useState([]);
    const [filteredRestaurants,setFilteredRestaurants] = useState([]);
    const [searchText, setSearchText] = useState("");

    console.log("Body Rendered");

    useEffect(() => {
        fetchData();
    },[]);

    const fetchData = async ()=>{
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.74740330841686&lng=83.23294121772051&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
       // const data = await fetch("https://raw.githubusercontent.com/namastedev/namaste-react/refs/heads/main/swiggy-api");
        const json = await data.json();

        console.log(json);
        setListOfRestaurants(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFilteredRestaurants(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    };

    const OnlineStatus = useOnlineStatus();
    if(OnlineStatus === false)
        return (
            <h1>
                Looks like you're offline!!! Please check your internet connection;
            </h1>
        );

    return listOfRestaurants.length === 0 ? (<Shimmer />) : (
        <div className="body">
            <div className="filter">
                <div className="search">
                    <input 
                        type="text" 
                        className="search-box"
                        value={searchText}
                        onChange={(e) => {
                            setSearchText(e.target.value);
                        }}
                    />
                    <button
                        onClick={() => {
                            console.log(searchText);
                            const filteredRestaurants = listOfRestaurants.filter(
                               (res) => res.info.name.toLowerCase().includes(searchText.toLowerCase())
                            );

                            setFilteredRestaurants(filteredRestaurants);

                        }}
                        
                    >
                         Search
                    </button>
                </div>
                <button className="filter-btn"
                 onClick={()=>{
                    const filteredList = listOfRestaurants.filter(
                        (res) => res.info.avgRating > 4.4
                    );
                    setListOfRestaurants(filteredList);
                 }}
                >
                    Top rated restaurants</button>
            </div>
            <div className="res-container">
                {filteredRestaurants.map((restaurant) => (
                     <RestaurantCard key = {restaurant.info.id} resData = {restaurant} />
                ))}
            </div>
        </div>
    )
}

export default Body;