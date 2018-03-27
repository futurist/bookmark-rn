import React from 'react'
import {
  StyleSheet, Dimensions,
  Text, TextInput, View, Button, Modal, TouchableHighlight
} from 'react-native'
import {ensureHTTP} from '../../utils'
import ModalDialog from './modal'

var width = Dimensions.get('window').width
var height = Dimensions.get('window').height

export default class App extends React.Component {
  emptyData = {
    url: '',
    title: '',
    desc: '',
    tags: '',
  }

  state = {
    data: Object.assign({}, this.emptyData)
  }

  onSubmit = ()=>{
    const {data} = this.state
    fetch('http://jamesjson.herokuapp.com/api/bookmark', {
      method:'POST',
      mode: 'cors',
      body: JSON.stringify(data),
      credentials: 'include',
    }).then(r=>r.text()).then(data=>{
      alert('提交成功')
      this.onReset()
    })
    .catch(console.error)
  }

  onReset = ()=>{
    this.setState({
      data: Object.assign({}, this.emptyData)
    })
  }

  setData = (obj)=>{
    const newData = Object.assign({}, this.state.data, obj)
    this.setState({data: newData})
  }

  render () {
    const {state} = this
    const {data} = state
    return (
      <View style={styles.container}>

        <View style={styles.line}>
          <Text style={{
            flex: 1, fontSize: 18, paddingTop:4
          }}>
            New Bookmark
          </Text>
          <Button
            style={{flex:0}}
            onPress={this.onReset}
            title="Reset "
            color="#898989"
          />
          <Button
            style={{flex:0}}
            onPress={this.onSubmit}
            title="Submit"
            color="#4682b4"
            disabled={!data.url.trim()}
          />
        </View>
        <View style={styles.line}>
          <Text style={styles.inputTitle}>Url</Text>
          <TextInput
            style={styles.input}
            value={data.url}
            placeholder="Enter Url"
            onChangeText={url=>{
              this.setData({url: ensureHTTP(url)})
            }}
          />
        </View>
        <View style={styles.line}>
          <Text style={styles.inputTitle}>Title</Text>
          <TextInput
            style={styles.input}
            value={data.title}
            placeholder="Enter Title"
            onChangeText={title=>{
              this.setData({title})
            }}
          />
        </View>
        <View style={styles.line}>
          <Text style={styles.inputTitle}>Desc</Text>
          <TextInput
            style={styles.input}
            value={data.desc}
            placeholder="Enter Desc"
            onChangeText={desc=>{
              this.setData({desc})
            }}
          />
        </View>
        <View style={styles.line}>
          <Text style={styles.inputTitle}>Tags</Text>
          <TextInput
            style={styles.input}
            value={data.tags}
            placeholder="Enter Tags"
            onChangeText={tags=>{
              this.setData({tags})
            }}
          />
        </View>

        {/* <ModalDialog text={state.infoText} onclose={ret=>{
          this.setState({infoText: ''})
          }} /> */}

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  title:{
    margin: 10,
    fontSize: 18,
    minHeight: 40,
    fontWeight: 'bold',
    alignSelf: 'stretch'
  },
  line: {
    flex:0,
    flexDirection: 'row',
    margin: 10,
    // alignSelf: 'stretch',
    // borderWidth: 1,
  },
  inputTitle:{
    flex:0,
    fontSize: 16,
    minWidth: 35,
    marginRight: 10,
    // borderWidth: 1,
    paddingTop: 6,
  },
  input: {
    flex:1,
    // alignSelf: 'stretch',
    // minWidth: width - 60,
    height: 35,
    // borderWidth: 1
  },
})
