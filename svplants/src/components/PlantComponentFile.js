import { Grid, TableCell, TableContainer, Table, TableBody, TableHead, TableRow, Button, ButtonGroup } from '@material-ui/core'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as action from "../actions/plantsActions"
import DeleteIcon from "@material-ui/icons/Delete";
import PlantForm from "./PlantForm"

const PlantComponentFile = (props) => {
    
    //componentDidMount
    useEffect(() => {
        props.getAllPlants();
    }, [])

    useEffect(() => {
        /* Interval functions to check which plant was last watered 6 hours before
         * and then create an alert for the user to know
         */
        const interval = setInterval(() => {
            CheckPlantsForWater()
          }, 60000);
        
          return () => clearInterval(interval);
    }, [props.plantList])

    const CheckPlantsForWater = () =>{
        let now = new Date().getTime();
        console.log("Current Time: "+ now);
        console.log(props.plantList);
        // Iterating throught the planList in props to check the last_watered time in each
        props.plantList.forEach(function(elem, plantDate, hours){
            plantDate = Date.parse(elem.last_watered);
            hours = (Math.abs(now - plantDate) / 36e5).toFixed(2);
            console.log(`${elem.name} was last watered: ${hours} hours ago`);
            // Checking if the time is over 6 hours
            if(hours>=6){
                alert(`"${elem.name}" was last watered 6 hours before, Needs Watering!`);
            }
        })
    }
    
    const WaterThePlant = (plant) =>{
        props.WaterThePlant(plant)
    }
    const formateDate = timeStamp =>{
        var x=new Date(timeStamp);
        var Datestring = `${x.getDate()}/${x.getMonth()+1}/${x.getFullYear()} - ${x.getHours()}:${x.getMinutes()}:${x.getSeconds()}`;
        return Datestring;
    }
    const DeletePlant = plantid => {
        props.DeleteAPlant(plantid);
    }
    return (
        <div>
            <Grid container>
                <Grid item lg={6}><h1>Water Plants Application</h1></Grid>
                <Grid item lg={6}><PlantForm/></Grid>
            </Grid>
            
            <Grid container>
                <Grid item lg={12}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Last Watered</TableCell>
                                <TableCell>Water The Plant</TableCell>
                                <TableCell>Delete Plant</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                            props.plantList.map((plant, index)=>{
                                return(
                                    <TableRow key={index}>
                                        <TableCell>{plant.id}</TableCell>
                                        <TableCell>{plant.name}</TableCell>
                                        <TableCell>{plant.type}</TableCell>
                                        <TableCell>{ formateDate(plant.last_watered)}</TableCell>
                                        <TableCell>
                                            <Button variant="contained" color="primary"
                                                disabled={plant.waterStatus}
                                                onClick={()=>{WaterThePlant(plant)}}>
                                                {plant.waterStatus==false?"water":"watering"}
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <Button>
                                                <DeleteIcon
                                                    color="secondary"
                                                    onClick={()=>{DeletePlant(plant.id)}} />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                </Grid>
            </Grid>
        </div>
    )
}
const mapStateToProps = state =>({
        plantList: state.plantsReducer.plantarr
    })
const mapActionToProps = {
    getAllPlants: action.fetchAllPlants,
    WaterThePlant:action.WaterThePlant,
    DeleteAPlant: action.DeleteAPlant,
}
export default connect(mapStateToProps, mapActionToProps)(PlantComponentFile);
