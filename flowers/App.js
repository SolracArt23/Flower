import * as React from 'react';
import { useState,useEffect } from 'react';
import {Text,View,StyleSheet,TouchableOpacity} from 'react-native';
import { Camera,CameraType } from 'expo-camera';

// Definir aplicacion
export default function App()
{
  //Variables
  const [type,setType] = useState(CameraType.back);
  const [permiso,Set_permiso] = useState(null);
  const [foto,set_foto] = useState(null);
  const [open,set_open] = useState(null);
  const camRef = React.useRef(null);
  
  //Solicitar permiso
  useEffect (()=>{
    (
      async ()=> {
        const { status } = await Camera.requestCameraPermissionsAsync();
        Set_permiso( status =='granted');
      }
    )();
  },[]);
  //Permiso denegado
  if(permiso ===null || permiso === false){
    return (<View>
              <Text>Acceso Denegado</Text>
            </View>
            );
  }
  //Tomar una foto
  async function  TakePicture(){
    if(camRef){
      const data = await camRef.current.takePictureAsync();
      console.log(data);
    }
  }
  //Parte visible
  return(
    <View style={{alignItems:'center',justifyContent:'center',flex:1}}>
      <Text style={{fontSize:24, fontFamily:'serif',fontWeight:'bold',paddingTop:35,paddingBottom:15}}>Camara de plantas</Text>
      <Camera
          style={Styles.camera}
          type={type}
          ref={camRef}
      >
        <View style={{flexDirection:'row',justifyContent:'space-around'}}>
          <TouchableOpacity style={Styles.botones} onPress={()=>{
            setType(
              type === CameraType.front ? CameraType.back : CameraType.front
            );
          }}>
              <Text style={{color:'white',alignSelf:'center',fontWeight:'bold'}}> Cambiar Camera</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>TakePicture()} style={Styles.botones}>
              <Text style={{color:'white',alignSelf:'center',fontWeight:'bold'}}> Tomar foto</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}


const Styles = StyleSheet.create({
  camera:{
    width:'100%',
    height:'90%',
    justifyContent:'flex-end',
    alignContent:'flex-end',
  },
  botones:{
    marginBottom:30,
    backgroundColor:'salmon',
    padding: 10,
    borderRadius:20
  }
});