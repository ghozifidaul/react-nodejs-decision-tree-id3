import React from 'react';
import { Box, Heading, Grid } from 'grommet';

class PageTwo extends React.Component{
    render(){
        const margin = {
            "bottom":"0px",
            "top":"0px",
            "left":"50px"
        }
        return(
            <Grid 
                areas={[
                    { name:'nav', start:[0,0], end:[0,0] },
                    { name:'main', start:[1,0], end:[1,0] }
                ]}
                columns={['small','auto']}
                rows={['large']}
            >
                <Box gridArea="nav" background="brand">
                </Box>
                <Box gridArea="main" pad="large">
                    <Heading level="2" size="medium"> Library : </Heading>
                    <Heading level="2" size="medium" margin={margin}>
                        <a href="https://github.com/serendipious/nodejs-decision-tree-id3">https://github.com/serendipious/nodejs-decision-tree-id3</a>
                    </Heading>
                    <Heading level="2" size="medium">Front End : </Heading>
                    <Heading level="2" size="medium" margin={margin}>
                        <a href="https://reactjs.org">https://reactjs.org</a>
                    </Heading>
                    <Heading level="2" size="medium">Back End : </Heading>
                    <Heading level="2" size="medium" margin={margin}>
                        <a href="https://nodejs.org/en/">https://nodejs.org/en/</a>
                    </Heading>
                </Box>
            </Grid>
        )
    }
}

export default PageTwo;