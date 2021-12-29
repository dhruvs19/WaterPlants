import axios from "axios";

const baseurl = 'https://localhost:44319/api/';

export default {
    plants(url = baseurl + "Plants/"){
        return{
            fetchAll:()=>axios.get(url),
            setLastWateredPlant:(plantid)=>axios.get(url+"update_last_watered/"+ plantid),
            getPlantByID: id => axios.get(url+id),
            create: newPlant => axios.post(url, newPlant),
            delete: id => axios.delete(url + id)
        }
    }
}