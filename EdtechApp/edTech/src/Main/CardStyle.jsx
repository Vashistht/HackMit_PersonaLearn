import React from 'react'
import { Box, Card, CardActions, CardContent, Button, Typography} from '@mui/material';
import { Container } from '@mui/system';
import CardMedia from '@mui/material/CardMedia';
import { shadows } from '@mui/system';

export default function CardStyle(props){
  return (
        <Card sx={{ maxWidth: 400,
        mt:3, ml: 1, mb: 5, boxShadow: 3 }}>
            <Container 
                sx={{
                    display:"flex",
                    flexDirection: 'row',
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                <CardMedia
                    component="img"
                    height="120"
                    image={props.item.img}
                    alt="resource image"
                    sx={{
                        mt: 1,
                        maxWidth: 240
                    }}
                    />
                    <Container 
                        sx={{
                            display:"flex",
                            flexDirection: "column",
                            justifyContent: "center",
                        }}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" sx={{fontSize:16, fontWeight: "Bold"}}>
                                {props.item.name}
                            </Typography>
                            <Button>
                            <CardMedia
                                component="img"
                                height="120"
                                image={props.item.source}
                                onClick={() => window.open(`${props.item.imgLink}`, '_blank')}
                                alt="company icon like youtube or khan academy"
                                sx={{
                                    maxWidth: 30,
                                    height: 30,
                                    
                                }}
                            /></Button>
                        </CardContent>
                    </Container>
                </Container>
                <Container 
                    sx={{
                        display:"flex",
                        flexDirection: 'row',
                        alignItems: "center",
                        justifyContent: "space-evenly"
                    }}>
                    <Typography variant="h6" color="text.secondary" sx={{size:"10px", ml: 2}}>
                        Additional Resources
                    </Typography>
                    <CardActions>
                        <Button size="small"
                            onClick={() => window.open(`${props.item.link}`, '_blank')}
                            sx = {{
                                fontSize: 15,
                                letterSpacing: "0.05rem",
                                ml: 1
                            }}
                            >Learn More
                        </Button>
                    </CardActions>
                </Container>
            </Card>
  )
}




