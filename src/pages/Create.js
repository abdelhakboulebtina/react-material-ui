import {React,useState} from 'react'
import {Typography,Button,Container,TextField,RadioGroup,FormControlLabel,Radio,FormControl,FormLabel} from '@material-ui/core'
import {makeStyles} from '@material-ui/core'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import { useHistory } from 'react-router-dom'
const useStyles=makeStyles({
field:{
  marginTop:20,
  marginBottom:20,
  display:'block'
}
})
export default function Create() {
  const classes=useStyles()
  const history=useHistory();
  const[title,setTitle]=useState('')
  const[details,setDetails]=useState('')
  const[category,setcategory]=useState('todos')
  const[errortitle,seterrorTitle]=useState(false)
  const[errordetails,seterrorDetails]=useState(false)
  const handleSubmit=(e)=>{
     e.preventDefault()
     seterrorTitle(false)
     seterrorDetails(false)
     if(title===''){
       seterrorTitle(true)
     }
     if(details===''){
      seterrorDetails(true)
    }
     if(title && details)
     {
      fetch('http://localhost:8000/notes',{
        method:'POST',
        headers:{"content-type":"application/json"},
        body:JSON.stringify({title,details,category})
      })
      .then(()=>history.push('/'))
     }
  }
  return (
    <Container>
     <Typography 
     variant="h6" 
     color="textSecondary"
     component="h2"
     gutterBottom
>
 Create a New Note  
     </Typography>
 
   <br/>
   <form noValidate autoComplete="off" onSubmit={handleSubmit}>  
   <TextField className={classes.field} 
              onChange={(e)=>setTitle(e.target.value)}
              label="note title" variant="outlined" color="secondary" error={errortitle} fullWidth required/>
   <TextField className={classes.field} 
              onChange={(e)=>setDetails(e.target.value)}
              label="details" variant="outlined" color="secondary" error={errordetails} fullWidth required
   multiline
   rows={3}/>

    <FormControl className={classes.field}>
    <FormLabel>Note category</FormLabel>
    <RadioGroup onChange={(e)=>setcategory(e.target.value)} value={category} >
     <FormControlLabel value="Money" label="money" control={<Radio/>}/>
     <FormControlLabel value="todos" label="todos" control={<Radio/>}/>
     <FormControlLabel value="remaiders" label="remainders" control={<Radio/>}/>
     <FormControlLabel value="work" label="work" control={<Radio/>}/>
    </RadioGroup>
    </FormControl>
   <Button
   color="secondary"
   type="submit"
   variant="contained"
   endIcon={<KeyboardArrowRightIcon/>}
   >
     Submit
   </Button>
   </form>
   
    </Container>
  )
}
