import React from 'react';
import CsvParse from '@vtex/react-csv-parse';
import axios from 'axios';
import {
  Box,
  Button,
  FormField,
  Grid,
  Grommet,
  Heading,
  TextInput
} from "grommet";
import PageOne from './pages/PageOne';
import PredictionPage from './pages/PredictionPage';
import PageTwo from './pages/PageTwo';
import ShowData from './pages/ShowData';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      training_data: [],
      test_data: [],
      features: [
        "color",
        "shape"
      ],
      class_name: "",
      input_status: false,
      accuracy: ""
    }
  }

  handleData = data => {
    this.setState({
      training_data: data
    });

    console.log(this.state.training_data);
  }

  handleTestData = data => {
    this.setState({
      test_data: data
    });

    console.log(this.state.test_data);
  }

  handleError = err => {
    console.log(err)
  }

  inputData = (trainingData, testData, className, fitur) => {
    console.log(trainingData, testData, className, fitur);

    this.setState({
      input_status: true
    });

    axios.post("http://localhost:4000/input_data", {
      training_data: trainingData,
      test_data: testData,
      class_name: className,
      features: fitur
    });
  };

  render() {
    const keys = [
      "color",
      "shape",
      "liked"
    ];

    const theme = {
      global: {
        font: {
          family: 'Helvetica Neue',
          size: '14px',
          height: '20px',
        },
      },
    };
    return (
      <Grommet theme={theme}>
        <div className="App">
          {/*Halaman Judul*/}
          <PageOne />
          <PageTwo />
          {/*Halaman Input*/}
          <Grid
            areas={[
              { name: 'nav', start: [0, 0], end: [0, 0] },
              { name: 'main', start: [1, 0], end: [1, 0] }
            ]}
            columns={['small', 'auto']}
            rows={['large']}
          >
            <Box gridArea='nav' background='status-ok' pad="medium" align="center">
              <Heading level="2" size="medium" color="light-1" margin={{ "top": "200px" }}>Input Data</Heading>
            </Box>

            <Box direction="column" gridArea='main' pad="large" margin={{ "top": "100px" }}>
              
              {/* Input Training data */}
              <FormField label="Training Data">
                <CsvParse keys={keys} onDataUploaded={this.handleData} onError={this.handleError}
                  render={
                    onChange => <TextInput type="file" onChange={onChange} />
                  } />
              </FormField>

              {/* input test data */}
              <FormField label="Test Data">
                <CsvParse
                  keys={keys}
                  onDataUploaded={this.handleTestData}
                  onError={this.handleError}
                  render={
                    onChange => <TextInput placeholder="Upload Data Testing" type="file" onChange={onChange} />
                  } />
              </FormField>

              {/* input kelas */}
              <FormField label="Target Class">
                <TextInput placeholder="Masukkan Nama Kelas" type="text" onChange={e => this.setState({ class_name: e.target.value })} />
              </FormField>
              <Button
                label="PROSES"
                color="status-ok"
                alignSelf="end"
                onClick={
                  () => this.inputData(this.state.training_data, this.state.test_data, this.state.class_name, this.state.features)
                }
              />
            </Box>
          </Grid>
          
          {/* Halaman Hasil */}
          <Grid
            areas={[
              { name: 'nav', start: [0,0], end: [0,0] },
              { name: 'main', start: [1,0], end: [1,0] }
            ]}
            columns={['small','auto']}
            rows={['medium']}
          >
            <Box direction="row" gridArea='nav' background='status-critical' pad="medium" align="center">
              <Heading level="2" size="medium" color="light-1">Tabel Data</Heading>
            </Box>
            <Box direction="column" gridArea='main' pad="small">
              <ShowData inputStatus={this.state.input_status} dataTrain={this.state.training_data} dataTest={this.state.test_data} />
            </Box>
          </Grid>
          
          {/* Halaman Prediction */}
          <PredictionPage />
        </div>
      </Grommet>
    );
  }
}

export default App;
