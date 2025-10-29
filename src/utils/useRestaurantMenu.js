/** 

import { useEffect, useState } from "react";
import {MENU_API} from "../utils/constants";

const useRestaurantMenu = (resId) => {

    const [resInfo , setRestInfo] = useState(null);

    useEffect(() => {
        fetchMenu();
    }, []);

    const fetchMenu = async () => {
        const data = await fetch(MENU_API + resId );
        const json = await data.json();

        setRestInfo(json);
        
    };  

    return resInfo;
};

export default useRestaurantMenu; 


*/