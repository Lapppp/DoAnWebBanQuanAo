import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SearchProduct=()=>{
    var { name } = useParams();
    const [search, setsearch] = useState();
    useEffect(() => {
        axios.get(`http://localhost:8000/api/search/${name}`)
        .then(res=>setsearch(res.data))
        
    }, []);
    console.log(search)



    return (<>

    hello 
    
    
    
    </>)
}
export default SearchProduct ;