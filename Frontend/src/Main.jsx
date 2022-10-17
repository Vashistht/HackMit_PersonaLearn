import React from "react";
import { Box, Card, CardActions, CardContent, Button, Typography} from '@mui/material';
import "./index.css"

// const useStyle = makeStyles({
//     root: {
//       paddingLeft: 30,
//       paddingRight: 10,
//       marginTop: 10,
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center"
//     },
//   });

const card1 = (
    <>
        <CardContent>
            <Typography sx={{fontSize:12}} color="text.secondar" gutterBottom>Upload a Picture</Typography>
            <Typography variant="h6" component="div" sx={{fontSize: 16}}>
                Our AI will read the words 
                and convert it to your native language
            </Typography>
        </CardContent>
        <CardActions>
            <Button size = "small">Upload Image</Button>
        </CardActions>
    </>
);

const card2 = (
    <>
        <CardContent>
            <Typography sx={{fontSize:12}} color="text.secondar" gutterBottom>Upload a text file</Typography>
            <Typography variant="h6" component="div" sx={{fontSize: 16}}>
                We will give you a summary of the data 
                in your native language 
            </Typography>
        </CardContent>
        <CardActions>
            <Button size = "small">Upload .docx/.pdf file</Button>
        </CardActions>
    </>
);

const Main = () => {
   
  return (
      <div className="Outer">
        <Box sx = {{maxWidth: 215}} className="Card">
            <Card variant="outlined">{card1}</Card>
        </Box>
        <Box sx = {{maxWidth: 215}}className="Card">
            <Card variant="outlined" >{card2}</Card>
        </Box>
    </div>
  )
}

export default Main