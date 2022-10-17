import React from 'react';
import {Paper, Container, CardActions, Button, Typography, Box} from '@mui/material';
import PercentRoundedIcon from '@mui/icons-material/PercentRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import FunctionsRoundedIcon from '@mui/icons-material/FunctionsRounded';
import EastRoundedIcon from '@mui/icons-material/EastRounded';
import SearchBar from "./SearchBar";

const commonStyles = {
    bgcolor: 'background.paper',
    borderColor: 'text.primary',
    m: 1,
    border: 1,
    width: '3rem',
    height: '3rem',
  };

function TitleBar(){
    return (
        <Container
            sx={{
                maxWidth: '90%',
                display: 'flex',
                alignItems: "center",
            }}>
            <Paper 
                sx={{
                    mt: '2rem',
                    padding: '1rem',
                    backgroundColor: '#F5F5F7',
                    height: 80,
                    maxWidth: 300,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: "center",
                    justifyContent: "space-between"
                }}
            >
                <CardActions>
                    <Button size="small">
                        <FunctionsRoundedIcon 
                            sx={{
                                height: 55,
                                fontSize: 60,
                                color: 'text.primary'
                            }}
                            />
                    </Button>
                </CardActions>

                <Typography variant="h6" component="h1"
                    sx={{
                        fontWeight: 'bold',
                        
                    }}>
                    Calculus I
                </Typography>

                <CardActions>
                    <Button size="small" sx={{pl: 2}}>
                        <Typography sx={{
                            color: 'text.secondary',
                            fontSize: 30
                        }}>80</Typography>
                        <PercentRoundedIcon 
                            sx={{
                                height: 55,
                                fontSize: 30,
                                color: 'text.secondary'
                            }}
                            />
                    </Button>
                </CardActions>
            </Paper>
            
            
                <Box 
                    sx={{ 
                    ...commonStyles, 
                    borderRadius: '50%',
                    mt: "2rem",
                    ml: "2rem",
                    fontWeight: "bold"
                    }}>
                    <ArrowBackRoundedIcon 
                        sx=
                        {{
                            height: 50,
                            width: 35,
                            pl: 1
                        }}
                        />
                </Box>

                <Box 
                    sx={{ 
                    ...commonStyles, 
                    borderRadius: '50%',
                    mt: "2rem",
                    ml: "2rem",
                    fontWeight: "bold"
                    }}>
                    <EastRoundedIcon 
                        sx=
                        {{
                            height: 50,
                            width: 35,
                            pl: 1, 
                            
                        }}
                        />
                </Box>
                <SearchBar/>
        </Container>
    )
}

export default TitleBar

// <div>
//             <div className="courseInfo">
//                 <h1>Insert Icon1</h1>
//                 <h1>Insert %completion</h1>
//                 <h1>Insert Course Name</h1>
//             </div>
//             <div className="arrows">
//                 <h1>Navigate between Pages</h1>
//                 <h1>Left arrow/right arrow</h1>
//             </div>
//         </div>