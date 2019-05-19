import React from 'react';
import { Box, Grid, Heading, Grommet } from 'grommet';

class PageOne extends React.Component {
    render() {
        const theme = {
            global: {
                font: {
                    family: 'Helvetica Neue',
                },
            },
        };

        return (
            <Grommet theme={theme}>
                <Grid
                    areas={[
                        { name: 'nav', start: [0, 0], end: [0, 0] },
                        { name: 'main', start: [1, 0], end: [1, 0] }
                    ]}
                    columns={['small', 'auto']}
                    rows={['large']}
                    gap="xsmall"
                >
                    <Box gridArea='nav' background='status-warning' pad="small">
                    </Box>
                    <Box direction="column" gridArea='main' pad="large">

                        <Heading
                            level="2"
                            size="medium"
                            color="dark-3"
                            margin={
                                {
                                    "top": "200px",
                                    "bottom": "0px"
                                }
                            }
                        >Tugas Data Mining</Heading>

                        <Heading
                            level="1"
                            size="medium"
                            color="status-warning"
                            margin={
                                {
                                    "top": "0px",
                                    "bottom": "0px"
                                }
                            }
                        >Decision Tree Menggunakan Algoritma ID3</Heading>


                        <Heading level="2" size="small" color="dark-3" margin={{ "top": "0px", "bottom": "0px" }}>Ghozi FH (32601500958)</Heading>
                    </Box>
                </Grid>
            </Grommet>
        )
    }
}

export default PageOne;