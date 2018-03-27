import React from 'react'
import {Modal, Text, TouchableHighlight, View} from 'react-native'

class ModalDialog extends React.Component {
  state = {
    modalVisible: true,
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible})
  }

  componentWillReceiveProps(props){
    this.setState({modalVisible: !!props.info})
  }

  render(){
    return (
      <View style={{marginTop: 22}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.')
          }}>
          <View style={{marginTop: 22}}>
            <View>
              <Text>{this.props.info}</Text>

              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>关闭</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

      </View>
    )
  }
}

export default ModalDialog
