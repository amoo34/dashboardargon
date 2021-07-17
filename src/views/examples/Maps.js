
import React from "react";

// reactstrap components
import { Card, Container, Row } from "reactstrap";
import { GoogleMap, InfoWindow, LoadScript,Marker  } from '@react-google-maps/api';
// core components
import Header from "components/Headers/Header.js";
import axios from 'axios';
import {API} from '../googleApi'
const Maps = () => {
  const containerStyle = {
    width: '100%',
    height: '500px'
  };
  const [busesData,setBusesData] = React.useState([])
  React.useEffect(async ()=>{
    // const fetchDash =async()=>{
      const {data} = await axios.get("http://localhost:3001/dashtics/buses")
      
      setBusesData(data?.busesData)
    // }
    // fetchDash()
  },[])

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow border-0">
            {busesData?.length > 0 &&
            <LoadScript
            googleMapsApiKey={API}
          >
                <GoogleMap
                
                mapContainerStyle={containerStyle}
                  center={{lat:32.68791157546772,lng:74.089534960937}}
                  zoom={10}
                >
                  { /* Child components, such as markers, info windows, etc. */ }
                  {
                    busesData?.map((bus,idx)=>{
                      console.log(bus)
                      return <Marker
                      key={idx}
                      title={`Bus Number: ${bus.busNumber} \nStarting Address : ${bus.startingAddress}\nEnding Address: ${bus.endingAddress}`}
                      name={'Dolores park'}
                      position={{lat:parseFloat(bus?.startingPoint?.lat),lng:parseFloat(bus?.startingPoint?.lng)}}
                    />
                      {/* <InfoWindow>sasa</InfoWindow> */}
                      {/* </Marker> */}
                    })
                    
                  }
                  
                </GoogleMap>
              </LoadScript>
              }
                

  
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Maps;
