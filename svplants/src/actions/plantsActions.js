import api from "./api"

export const ACTION_TYPE = {
    CREATE:'CREATE',
    UPDATE:'UPDATE',
    DELETE:'DELETE',
    FETCH_ALL:'FETCH_ALL',
    WATER_PLANT:'WATER_PLANT',
    STOP_WATERING_PLANT:'STOP_WATERING_PLANT'
}

export const fetchAllPlants = () => dispatch => {
    api.plants().fetchAll()
    .then(
        response => {
            response.data = response.data.map(v => ({...v, waterStatus: false}))
            console.log(response);
            dispatch({
            type:ACTION_TYPE.FETCH_ALL, 
            payload:response.data
        })
    })
    .catch(err=> console.log(err))
}
export const WaterThePlant = (plant) => dispatch => {
    api.plants().setLastWateredPlant(plant.id)
    .then(
        response => {
            console.log(response.data)
            if(response.data.last_watered == plant.last_watered){
                alert("Plant has already watered, please wait for 30 second before again watering");
            }else{
                dispatch({
                    type:ACTION_TYPE.WATER_PLANT, 
                    payload:plant.id
                })
                response.data.waterStatus = false;
                setTimeout(() => {
                    dispatch({
                        type:ACTION_TYPE.STOP_WATERING_PLANT, 
                        payload:response.data
                    })
                }, 10000);
            }
    })
    .catch(err=> console.log(err))
}
export const CreateAPlant = (plant) => dispatch => {
    api.plants().create(plant)
    .then(
        response => {
            response.data.waterStatus = false;
            dispatch({
            type:ACTION_TYPE.CREATE, 
            payload:response.data
        })
    })
    .catch(err=> console.log(err))
}
export const DeleteAPlant = (plantid) => dispatch => {
    api.plants().delete(plantid)
    .then(
        response => {
            console.log(response);
            dispatch({
            type:ACTION_TYPE.DELETE, 
            payload:plantid
        })
    })
    .catch(err=> console.log(err))
}

