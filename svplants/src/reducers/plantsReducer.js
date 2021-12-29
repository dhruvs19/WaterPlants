import { ACTION_TYPE } from "../actions/plantsActions";

const initialState = {
    plantarr:[]
}
export const plantsReducer = (state=initialState, action) => {
    switch(action.type){
        case ACTION_TYPE.FETCH_ALL:{
            return{
                ...state,
                plantarr:[...action.payload]
            }
        }
        case ACTION_TYPE.WATER_PLANT:{
            return{
                ...state,
                plantarr:state.plantarr.map(x=>x.id == action.payload?{ ...x, waterStatus: true}:x)
            }
        }
        case ACTION_TYPE.STOP_WATERING_PLANT:{
            return{
                ...state,
                plantarr:state.plantarr.map(x=>x.id == action.payload.id?action.payload:x)
            }
        }
        case ACTION_TYPE.CREATE:{
            return{
                ...state,
                plantarr:[...state.plantarr,action.payload]
            }
        }
        case ACTION_TYPE.DELETE:{
            return{
                ...state,
                plantarr:state.plantarr.filter(x => x.id != action.payload)
            }
        }
        default:
            return state;
    }
}