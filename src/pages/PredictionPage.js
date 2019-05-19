import React from 'react';
import { Box, Button, FormField, Heading, Grid, TextInput } from 'grommet';
import axios from 'axios';

class Prediction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: "",
            shape: "",
            input_status: false,
            predictionResult: ""
        }
    }

    inputPrediction = (color, shape) => {
        console.log(color, shape);

        this.setState({
            input_status: true
        });

        axios.post('http://localhost:4000/input_prediction', {
            warna: color,
            bentuk: shape
        });
    }

    getPrediction = () => {
        if (this.state.input_status) {
            fetch("http://localhost:4000/get_prediction")
                .then(res => res.json())
                .then(json => this.setState({
                    predictionResult: json.prediction_result
                }));

            console.log("predict res: " + this.state.predictionResult);
        }
    }

    render() {
        const margin = {
            "bottom":"0px",
            "top":"0px"
        }
        if (this.state.input_status) {
            this.getPrediction();
        }
        return (
            <Grid
                areas={[
                    { name: 'nav', start: [0, 0], end: [0, 0] },
                    { name: 'main', start: [1, 0], end: [1, 0] }
                ]}
                columns={['small', 'auto']}
                rows={['medium']}
                gap="xsmall"
            >
                <Box gridArea='nav' background='status-unknown' pad="medium">
                    <Heading level="2" size="small" color="light-1" margin={{ "top": "100px" }}>Prediction</Heading>
                </Box>
                <Box gridArea='main' pad="large">
                    <FormField label="Color">
                        <TextInput type="text" placeholder="Masukkan Warna" onChange={e => this.setState({ color: e.target.value })} />
                    </FormField>

                    <FormField label="Shape">
                        <TextInput type="text" placeholder="Masukkan Bentuk" onChange={e => this.setState({ shape: e.target.value })} />
                    </FormField>

                    <Button alignSelf="end" label="PREDICT" color="status-ok" onClick={() => this.inputPrediction(this.state.color, this.state.shape)}></Button>
                    <Heading level="3" size="medium" margin={margin}>liked?  { this.state.predictionResult }</Heading>
                </Box>
            </Grid>
        );

    }
}

export default Prediction;