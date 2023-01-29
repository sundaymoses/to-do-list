import React, { useState } from 'react'
import {Avatar, Box, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, makeStyles, Paper, TextField, Typography} from '@material-ui/core'
import { green, indigo, red } from '@material-ui/core/colors'
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
const useStyles=makeStyles((theme)=>({
  container:{
    maxWidth:"1140px",
margin:theme.spacing(3,0,3,0),
padding:theme.spacing(3),
  },
  heading:{
    textAlign:"center",
    marginBottom:theme.spacing(3),
    color:indigo[500],
   
  },
  formComponent:{
padding:theme.spacing(2)
  },
  secondColumn:{
    padding:theme.spacing(2),
    margin:theme.spacing(4,0,3,0),
    backgroundColor:"white",
    minHeight:"300px",
    height:"auto",
  },
  RemainingTaskTitle:{
   paddingLeft:theme.spacing(2),
   color:indigo[500],
   marginBottom:theme.spacing(2),
  },
  ListItemAvatar:{
    backgroundColor:indigo[500],
   
  },
  noTask:{
    textAlign:"center",
    color:"grey"
  }

}))
const FormComponent = () => {
  //include the usestates to capture the entered data 
  const [inputData, setInputData]=useState("");
  const[error, setError]=useState("");
  const[remainingItems, setRemainingItems]=useState([
  
 
]);
//function to handle submit
  const handleSubmit=(e)=>{
e.preventDefault();
console.log("submitted");
//send the info to the secondColumn Grid
if(inputData.length >= 5 && inputData!==" "){
  const initial={
    id:Math.random(),
    title: inputData
  }
  const originalData= [...remainingItems];
  originalData.push(initial);
  setRemainingItems(originalData);
  setInputData("")
}


  }
  //Function to handle submit
  const handleChange=({target})=>{
    console.log("event",target.value);
    //generate the error method
   target.value.length <=5 ? setError("Atleast 5 characters!"): setError("")
   //pass the correct and complete data
    setInputData(target.value);
  }
  //handling the marked event
  const handleCheckDone=()=>{
    console.log("i was clicked!");
  }
  //handling the delete event
  const handleDelete=(id)=>{
    console.log("id", id);
    const intialData=[...remainingItems];
    const newData=intialData.filter((item)=>item.id!==id)
    setRemainingItems(newData);
  }
  const classes=useStyles()
  return (
    <Box className={classes.container}>
    <Grid container>
    <Grid item xs={12}>
    <Paper elevation={3}>
    <form onSubmit={handleSubmit} className={classes.formComponent}>
    <Typography variant="h5" className={classes.heading}>What'chu planning?</Typography>
    <Grid container justifyContent='center'>
    <Grid item xs={8}>
       <TextField
       
       label="Press enter to add a text " 
        variant="outlined"
        size='small'
        fullWidth={true}
        onChange={handleChange}
        value={inputData}
        helperText={error}
        error={error ? true:false}
        />

       
    </Grid>
    </Grid>
    
    
    </form>
    </Paper>
    
    
    </Grid>
   
    <Grid item xs={12}>
    <Grid container spacing={2}>
    <Grid item xs={12} sm={6} lg={6}>
    
    <List className={classes.secondColumn}>
    <Typography variant="h5" className={classes.RemainingTaskTitle}>
{" "}
    Your Undone Tasks:
    </Typography>
    {/*Mapping the useState DOM of remaining array*/}
    {remainingItems.length>0 ? remainingItems.map((item,id)=> 
      <ListItem key={id}>
        <ListItemAvatar className={classes.ListItemAvatar1}>
          <Avatar className={classes.ListItemAvatar} style={{color: "white"}}>
           {item.title[0]}
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={item.title}  />
        <ListItemSecondaryAction>
        <IconButton onClick={()=>handleCheckDone(item.id)}>
             <DoneOutlineIcon style={{color: green[500]}}/>
        </IconButton>
         <IconButton onClick={()=>handleDelete(item.id)}>
            < DeleteForeverOutlinedIcon style={{color: red[500]}}/>
        </IconButton>
        </ListItemSecondaryAction>
      </ListItem> )
    :<Typography className={classes.noTask}>No task added yet!</Typography>}
      
      </List>
    </Grid>
    <Grid item xs={12} sm={6} lg={6}>
    </Grid>
    </Grid>
    </Grid>
    </Grid>
    </Box>
  )
}

export default FormComponent

