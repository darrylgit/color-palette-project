import React from "react";
import {
  PDFViewer,
  Document,
  Page,
  Text,
  View
} from "@react-pdf/renderer";

//local storage uses api endpoint as key
import ENDPOINTS from '../../constants/api';

const PDFScreen = props => {
  let rebuild_sheme_from_storage = () => {
    let randomsWithHashTag =[]
    let randomsWithOutHashTag = props.match.params.scheme.split(',')
    randomsWithOutHashTag.forEach(item => {
      randomsWithHashTag.push("#"+item)
    })

    //return objects from local storage using hex, params only provide hex
    let storedSchemeObjsList = localStorage.getItem(ENDPOINTS.BASE)
    let schemeObjsPDFList =[]
    let schemeObj ={}

    if(storedSchemeObjsList !==null){
      //parse list 
      storedSchemeObjsList = JSON.parse(storedSchemeObjsList)
      randomsWithHashTag.forEach(hex => {
        schemeObj = storedSchemeObjsList.find(obj => {
          return obj.hex === hex
        })

        schemeObjsPDFList.push(schemeObj)
      })
    }

    return schemeObjsPDFList
  }

  return(
    <div className="container-fluid no-gutters align-items-center">
      <PDFViewer className="container-fluid no-gutters">
        <Document>
          <Page orientation="landscape" className="container-fluid" style={{padding:80}}>
           <View style={{flexGrow:1, flexDirection:"row"}}>
            {
              rebuild_sheme_from_storage().map(item => 
                <View style={{flex:1, height:400, padding:4}}>
                <View style={{backgroundColor:item.hex, width:"100%", height:"100%", justifyContent:"center"}}>
                  <View style={{height:100}}>
                   <Text style={{textAlign:"center", fontSize:16, color:"rgba(0,0,0,.5)"}}>{item.hex}</Text>
                    <Text style={{textAlign:"center", fontSize:16, color:"rgba(0,0,0,.25)"}}>{item.name}</Text>
                  </View>
                </View>
                </View>
              )
            }
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  )
}

export default PDFScreen;

