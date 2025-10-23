import { useEffect } from "react";

const RestaurantMenu = () => {

   /**  useEffect(() => {
        fetchMenu();
    }, []);

    const fetchMenu = async () => {
        const data = await fetch("https://corsproxy.io/?url=https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=17.74740330841686&lng=83.23294121772051&restaurantId=597634&catalog_qa=undefined&submitAction=ENTER");
        const json = await data.json();

        console.log(json);
    };  
*/
    return(
        <div className = "menu">
            <h1>Name of the Restaurant</h1>
            <h2>Menu</h2>
            <ul>
                <li>Biryani</li>
                <li>Burgers</li>
                <li>Diet Coke</li>
            </ul>
        </div>
    )
}

export default RestaurantMenu;