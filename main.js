import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { Container, Content, Button,  Text, Thumbnail, List, ListItem, Left, Body, Right } from 'native-base';
import Registry from 'tcomb-form-native';
import ImagePicker from 'react-native-image-picker';

const options = {

  title: 'Select Avatar',
  customButtons: [
    {name: 'fb', title: 'Choose Photo from Facebook'},
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

const Form = Registry.form.Form;

var Gender = Registry.enums({
  Male: 'Laki-laki',
  Female: 'Perempuan'
});

var Positive = Registry.refinement(Registry.Number, function (n) {
  return n >= 0;
});

const FormsRegistry = Registry.struct({
  name : Registry.String,
  phone:Registry.Number,
  gender:Gender
});

const Options = {
  fields: {
    name: {
      placeholder: 'Masukan Nama Anda...',
      error: '* Mohon diisi!'
    },
    phone: {
      placeholder: 'Masukan No. HP Anda...',
      error: '* Mohon diisi!'
    },
    gender: {
      error: '* Mohon diisi!'
    }
  },
  auto: 'none'
};




export default class App extends Component {

  state = {
    avatarSource: null
  };

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };
        
          // You can also display the image using data:
          // let source = { uri: 'data:image/jpeg;base64,' + response.data };

          this.setState({
            avatarSource: source,
          });
      }
    });
  }
  
  constructor(props) {
		super(props);
		this.state = {
      lists:[]
    };
  }
  
  onClickSubmit(){
    let imageSource = this.state.avatarSource
    let formValue = this.refs.form.getValue();
    let object = Object.assign({formValue, imageSource});

    if (imageSource == null) {
			return;
		};
  
    list = this.state.lists
    list.push(object);
    this.setState({
      lists: list,
      avatarSource: null
    })

  }
  
  renderRow(obj,index){
    return(
      <List key={index}>
      <ListItem avatar>
        <Left>
          <Thumbnail small source={obj.imageSource} />
        </Left>
        <Body>
          <Text>{obj.formValue.name}</Text>
          <Text note>{obj.formValue.phone}</Text>
          <Text note>{obj.formValue.gender}</Text>
        </Body>
        <Right/>
      </ListItem>
    </List>
    )
  }

  render() {
    return (
      <Container>
        <Content>

          <View style={styles.container}>
            <View style={styles.avatarView}>
              <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
                  { this.state.avatarSource == null ? <Thumbnail large style={styles.avatar} source={require('./app/img/avatar.png')} /> :
                    <Thumbnail large style={[styles.avatarView,{marginTop:25}]} source={this.state.avatarSource} />
                  }
                </View>
              </TouchableOpacity>
            </View>
            <Form
              ref='form'
              type={FormsRegistry}
              options={Options}
            />
            <Button full success onPress={()=>this.onClickSubmit()}>
              <Text>Submit</Text>
            </Button>
          </View>
          
          {this.state.lists.map((list,index)=>this.renderRow(list,index))}

        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  formInput: {
    fontSize:6
  },
  avatar: {
    width:130,
    height:130
  },
  avatarView: {
    alignSelf:'center'
  }
});
