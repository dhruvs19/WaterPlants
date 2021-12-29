import React, {useState} from 'react';
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Grid } from '@material-ui/core'
import * as actions from "../actions/plantsActions"

const initialFields = {
    name:"",
    type:""
}

const PlantForm = (props) => {

    const [values, setValues] = useState(initialFields);
    const [dialogOpen, setdialogOpen] = useState(false);

    const handleClickOpen = () => {
      setdialogOpen(true);
    };
  
    const handleClose = () => {
      setdialogOpen(false);
    };

    const handleFieldInput = e =>{
        const {name, value} = e.target
        setValues({
            ...values,
            [name]:value
        })
    }

    const submitPlantForm = e =>{
        e.preventDefault();
        console.log("Form Submitting");
        console.log(values);
        props.AddPlant(values,()=>{setdialogOpen(false); alert("Plant Added..!!");})
    }
    return (
      <div style={{marginTop:"20px", float:"right"}}>
        <Button onClick={handleClickOpen} variant='contained' color="primary">Add a new Plant</Button>
        <Dialog
          open={dialogOpen}
          onClose={handleClose}
          aria-labelledby="form-dialog-title">

          <DialogTitle id="form-dialog-title">Add a new Plant</DialogTitle>
          <form noValidate onSubmit={submitPlantForm}>
          <DialogContent>
            
                <Grid>
                    <TextField
                    name="name"
                    variant="outlined"
                    label="Plant Name"
                    value={values.name}
                    onChange={handleFieldInput}></TextField>
                </Grid>
                <Grid>
                    <TextField
                    name="type"
                    variant="outlined"
                    label="Plant Type"
                    value={values.type}
                    onChange={handleFieldInput}></TextField>
                </Grid>
            
          </DialogContent>
          <DialogActions>
            <Button color="primary" type='submit'>
              Add
            </Button>
            <Button onClick={handleClose} color="secondary">
              Close
            </Button>
          </DialogActions>
          </form>
        </Dialog>
      </div>
    );
}

const mapStateToProps = state =>({
    plantList: state.plantsReducer.plantarr
})
const mapActionToProps = {
    AddPlant: actions.CreateAPlant
}
export default connect(mapStateToProps, mapActionToProps)(PlantForm);