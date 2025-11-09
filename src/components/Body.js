import RestaurantCard from "./RestaurantCard";
import { useState, useEffect, useContext} from "react";
import Shimmer from "./Shimmer";
import useOnlineStatus from "../utils/useOnlineStatus";
import { Link } from "react-router";
import UserContext from "../utils/UserContext";

const Body = () => {

    const [listOfRestaurants, setListOfRestaurants] = useState([]);
    const [filteredRestaurants,setFilteredRestaurants] = useState([]);
    const [searchText, setSearchText] = useState("");

    //console.log("Body Rendered", listOfRestaurants);

    useEffect(() => {
        fetchData();
    },[]);

    const fetchData = async ()=>{
     
        const data = await fetch("https://namastedev.com/api/v1/listRestaurants");
        //const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.74740330841686&lng=83.23294121772051&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
       // NOT REQUIRED const data = await fetch("https://raw.githubusercontent.com/namastedev/namaste-react/refs/heads/main/swiggy-api");
        const json = await data.json();

        console.log(json);

        
        


        setListOfRestaurants(json?.data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFilteredRestaurants(json?.data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    };

    const OnlineStatus = useOnlineStatus();
    if(OnlineStatus === false)
        return (
            <h1>
                Looks like you're offline!!! Please check your internet connection;
            </h1>
        );

        const {loggedInUser, setUserName} = useContext(UserContext);

    return listOfRestaurants.length === 0 ? (<Shimmer />) : (
        <div className="body">
            <div className="filter flex">
                <div className="search m-4 p-4">
                    <input 
                        type="text" 
                        className="border border-solid border-black"
                        value={searchText}
                        onChange={(e) => {
                            setSearchText(e.target.value);
                        }}
                    />
                    <button 
                        className="px-4 py-2 bg-green-100 m-4 rounded-lg"
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
                <div className="search m-4 p-4 flex items-center">
                        <button className="px-4 py-2 bg-gray-100 rounded-lg"
                 onClick={()=>{
                    const filteredList = listOfRestaurants.filter(
                        (res) => res.info.avgRating > 4.4
                    );
                    setListOfRestaurants(filteredList);
                 }}
                >
                    Top rated restaurants</button>
                </div>

                 <div className="search m-4 p-4 flex items-center">
                    <label>UserName : </label>
                    <input className="border border-black p-2" 
                     value = {loggedInUser}
                     onChange={(e) => setUserName(e.target.value)}/>

                 </div>

                
            </div>
            <div className="flex flex-wrap">
                {filteredRestaurants.map((restaurant) => (
                    <Link key = {restaurant.info.id} to = {"/restaurants/" + restaurant.info.id }> <RestaurantCard  resData = {restaurant} /> </Link>
                ))}
            </div>
        </div>
    )
}

export default Body;