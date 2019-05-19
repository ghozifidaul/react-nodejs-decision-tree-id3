import React from 'react';
import {
  Box,
  DataTable,
  Grid,
  Heading,
  Meter,
  Text,
} from "grommet";


class ShowData extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        accuracy: 0,
        tree_model: [],
      };
    }
  
    getResult = () => {
      if (this.props.inputStatus) {
        fetch("http://localhost:4000/get_result")
          .then(res => res.json())
          .then(json => this.setState({
            accuracy: json.akurasi,
            //tree_model: json.pohon
          }));
      }
    }
  
    render() {
      if (this.props.inputStatus) {
  
        this.getResult();
  
        return (
          <div>
            <Grid
            areas={[
              { name: 'one', start: [0, 0], end: [0, 0] },
              { name: 'two', start: [1, 0], end: [1, 0] },
              { name: 'three', start: [2, 0], end: [2, 0] }
            ]}
            columns={['1/3','1/3','1/3']}
            rows={['medium']}
            >
              {/* Train Data */}
              <Box gridArea="one" pad="small">
                <Heading alignSelf="center" level="1" size="small" margin={{"top":"0px","bottom":"0px"}}>Train Data</Heading>
                <DataTable
                  resizeable='true' 
                  size='small'
                  columns={[
                    {
                      property: 'color',
                      header: <Text>Color</Text>
                    },
                    {
                      property: 'shape',
                      header: <Text>Shape</Text>
                    },
                    {
                      property: 'liked',
                      header: <Text>Liked</Text>,
                      primary: true
                    }
                  ]}
                  data={this.props.dataTrain}
                  alignSelf="start"
                  margin={
                    { "left": "10px" }
                  }
                />
              </Box>
  
              {/* Test Data */}
              <Box gridArea="two">
                <Heading alignSelf="center" level="1" size="small" margin={{"top":"0px","bottom":"0px"}}>Test Data</Heading>
                <DataTable
                  resizeable='true' 
                  size='small'
                  columns={[
                    {
                      property: 'color',
                      header: <Text>Color</Text>
                    },
                    {
                      property: 'shape',
                      header: <Text>Shape</Text>
                    },
                    {
                      property: 'liked',
                      header: <Text>Liked</Text>,
                      primary: true
                    }
                  ]}
                  data={this.props.dataTest}
                />
              </Box>
              <Box gridArea="three" pad="small">
                <Heading level="3" alignSelf="center">Akurasi : {this.state.accuracy * 100}%</Heading>
                <Meter values={[{ value: this.state.accuracy * 100 }]} thickness="large" type="bar" margin={{ "left": "10px" }} round="true" />
              </Box>
            </Grid>
          </div>
        );
      } else {
        return <Heading level="1" size="small" color="status-critical" margin={{"top":"50px"}} alignSelf="center">Belum ada Tabel</Heading>
      }
    }
  }

export default ShowData;