import React from 'react'
import YoutubeEmbed from "./YoutubeEmbed";
import { Container } from '@mui/system';
const MainBody = () => {
  return (
    <Container
        sx={{
            mt: 2,
            pl: 5,
        }}>
        <YoutubeEmbed embedId='5Jppcxc1Qzc'/>
    </Container>
  )
}

export default MainBody