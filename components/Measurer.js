import React from 'react';
import { StyleSheet, Modal, Text, View, Button} from 'react-native';
import { Accelerometer } from 'expo';


class Measurer extends React.Component {

  state ;

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      accelerometerData: {},
      magnitude: [],
      avgAcc: [],
      stateOfUser: {},
      clrs: {
        clrWalk: '',
        clrRun: '',
        clrFaster: ''
      }
    }
  }
  componentDidMount() {
    this._toggle();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  setModalVisible(visible) {
    this.setState({
      modalVisible: visible
    });
  };

  _toggle = () => {
    if (this._subscription) {
        this._unsubscribe();
    } else {
        this._subscribe();
    }
  };

  _slow = () => {
    Accelerometer.setUpdateInterval(100);
  };

  _fast = () => {
    Accelerometer.setUpdateInterval(50);
  };

  _subscribe = () => {
    this._subscription = Accelerometer.addListener(accelerometerData => {
      let length = this.state.magnitude.length;
      if (length === 3) {
        let i;
        let aX; let bY; let cZ;
        let accResults = [];
        let momentum = [];
        let magnitude = this.state.magnitude;
        for (i = 0; i < this.state.magnitude.length; i++){

          {/*
           setting X, Y, Z axis variables 
          */}
          const x = magnitude[i].x;
          const y = magnitude[i].y;
          const z = magnitude[i].z;
          {/*
             Calculating average acceleration 
          */}
          let avgRes = Math.sqrt(( Math.pow(x, 2) ) + ( Math.pow(z, 2) ) + (Math.pow(y, 2)));

          {/*
           combine results 
          */}
          accResults = accResults.concat(avgRes);
        }


        if( accResults.length === 3){
          for (i = 0; i < accResults.length; i++){

              momentum.push(Math.abs(accResults[i] * 0.50 - 0.50) * 3.6) ;

          }     

          for (i = 0 ; i < momentum.length; i++){
            if (i === 0) {
              aX = momentum[i];
            }
            else if (i === 1) {
              bY = momentum[i];
            }
            else if (i === 2) {
              cZ = momentum[i];
            }
          }

          {/* Calculating users speed */}
          const momentumUser = (aX + bY + cZ) / 3;

          if ( momentumUser < 0.47 ){
            this.setState({
              stateOfUser: {runOrWalk: 'Walking'},
              clrs: {clrWalk: '#c9feff'},
            });

          } else if ( momentumUser > 0.47 ){
            this.setState({
              stateOfUser: {runOrWalk: 'Running'},
              clrs: {clrRun: '#98fb98'},
            });
          }
        }

        {/* 
          saving data accelerometer data to state
        */}
        this.setState({
          magnitude: this.state.magnitude.slice(1),
          accelerometerData: accelerometerData,
          avgAcc: accResults
        });

      } else if (length < 3) {
        this.setState({
          accelerometerData: accelerometerData,
          magnitude: this.state.magnitude.concat(
              [accelerometerData]
          )
        });
      }
    });
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  render() {
    let { runOrWalk } = this.state.stateOfUser;
    let { x, y, z } = this.state.accelerometerData;

    return (
      <View style={{flex: 1, margin: 20, margin: 10, textAlign: 'center', fontSize: 20, paddingTop: 70,
          backgroundColor: this.state.clrs.clrRun || this.state.clrs.clrWalk }}>
        <View>
          <Modal
              style={styles.modal}
              animationType="slide"
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
              }}>
            <View style={styles.btnContainer}>
              <Button type="outline" title="Toggle Sensor" style={styles.snsrBtn} onPress={this._toggle}/>
              <Button type="outline" title="Fast Mode" style={styles.fstBtn} onPress={this._fast} />
              <Button type="outline" title="Slow Mode" style={styles.slwBtn} onPress={this._slow} />
            </View>
            <Button
                title="Close Modal"
                type="outline"
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}/>
          </Modal>
            <View style={styles.runContainer}>
            <Text style={styles.momentumText}>{runOrWalk}</Text>
          </View>
          <View style={styles.sensorContainer}>
            <Text style={styles.sensorText}>x: {round(x)} y: {round(y)} z: {round(z)}</Text>
          </View>
          <Button title="Options"
                  type="outline"
                  style={{paddingTop: 50}}
                  onPress={() => {this.setModalVisible(!this.state.modalVisible);}
                  }/>
        </View>
      </View>
    );
  }
}

function round(n) {
  if (!n) {
    return 0;
  }

  return Math.floor(n * 100) / 100;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    backgroundColor: 'orange',
    margin: 10,
    textAlign: 'center',
    fontSize: 20,
    paddingTop: 70,
  },
  snsrBtn: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    borderRadius: 5,
  },
  fstBtn: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    borderRadius: 5
  },
  slwBtn: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    borderRadius: 5
  },
  sensorContainer: {
    alignItems:'center',
    padding: 10
  },
  sensorText: {
    fontSize: 20
  },
  btnContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  runContainer: {
    alignItems:'center'
  },
  momentumText: {
    fontSize: 70,
    fontFamily: 'monospace',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25
  }
});

export default Measurer