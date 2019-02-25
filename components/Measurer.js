import React from 'react';
import { StyleSheet, Modal, Text, TouchableOpacity, View, TouchableHighlight, Button} from 'react-native';
import { Accelerometer } from 'expo';
import FontAwesome, { Icons, IconTypes } from 'react-native-fontawesome';


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
      walks: 0,
      runs: 0,
      clrs: {
        clrWalk: '',
        clrRun: ''
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
      if (length === 3){

        let i;
        let accResults = [];
        let magnitude = this.state.magnitude;
        for (i = 0; i < this.state.magnitude.length; i++){

          {/*
            setting X, Y, Z axis variables
          */}
          const x = magnitude[i].x;
          const y = magnitude[i].y;
          const z = magnitude[i].z;
          let avgRes = Math.sqrt(( Math.pow(x, 2) ) + ( Math.pow(z, 2) ) + (Math.pow(y, 2)) );

          {/*
            combine results
           */}
          accResults = accResults.concat(avgRes);
        }
        let momentum = [];
        let a; let b; let c;

        if( accResults.length === 3){
          for (i = 0; i < accResults.length; i++){

            momentum.push(Math.abs(accResults[i] * 0.50 - 0.50) * 3.6) ;

          }

          for (i = 0 ; i < momentum.length; i++){
            if (i === 0) {
              a = momentum[i];
            }
            else if (i === 1) {
              b = momentum[i];
            }
            else if (i === 2) {
              c = momentum[i];
            }
          }

          const momentumUser = (a + b + c) / 3;

          if (  momentumUser < 0.50 ){

            this.setState({
              stateOfUser: {runOrWalk:'Walking'}
            });

            this.setState({
              clrs: {clrWalk: '#87ceeb'}
            });

          } else if (momentumUser > 0.50){

            this.setState({
              stateOfUser: {runOrWalk:'Running'},
            });

            this.setState({
              clrs: {clrRun: '#98fb98'},
              runs: this.state.runs + 1
            });
          }
        }

        {/*
          saving data accelerometer data to state
         */}
        this.setState({
          magnitude: this.state.magnitude.slice(1),
          accelerometerData: accelerometerData,
          avgAcc: accResults,
        });

      } if (length < 3) {
        this.setState({
          accelerometerData: accelerometerData,
          magnitude: this.state.magnitude.concat(
              [accelerometerData])
          ,
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
          backgroundColor: this.state.clrs.clrRun || this.state.clrs.clrWalk}}>
        <View>
          <Modal
              style={styles.modal}
              animationType="slide"
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
              }}>
            <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.snsrBtn} onPress={this._toggle}>
              <Text>Toggle Sensor</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.fstBtn} onPress={this._fast} >
              <Text>Fast Mode</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.slwBtn} onPress={this._slow} >
              <Text>Slow Mode</Text>
            </TouchableOpacity>
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
            <Text>You have ran: {this.state.runs} times</Text>
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
    borderStyle: 'solid',
    borderBottomColor: 'black',
    borderWidth: 1,
    flexDirection: 'column',
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
  toggleBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
  },
  sensor: {
    marginTop: 15,
    paddingHorizontal: 10,
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