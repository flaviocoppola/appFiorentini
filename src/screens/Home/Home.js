import {FlatList, View, ActivityIndicator} from 'react-native';
import React, {PureComponent} from 'react';
import {XMLParser} from 'fast-xml-parser';
import {PacmanIndicator} from 'react-native-indicators';

import {USER, PASSWORD, URI} from '@env';

import FlatListItem from '../../Components/FlatListItem';

let xmlDeviceList =
  `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
<soap:Header>\
  <wsse:Security xmlns:wsse="http://schemas.xmlsoap.org/ws/2003/06/secext">\
    <wsse:UsernameToken wsu:Id="sample" xmlns:wsu="http://schemas.xmlsoap.org/ws/2003/06/utility">\
      <wsse:Username>${USER}</wsse:Username>\
      <wsse:Password Type="wsse:PasswordText">${PASSWORD}</wsse:Password>\
    </wsse:UsernameToken>\
  </wsse:Security>\
</soap:Header>\
<soap:Body>\
  <DevicesList xmlns="http://connecting.website.com/WSDL_Service">\
  </DevicesList>\
</soap:Body>\
</soap:Envelope>`;


export default class Home extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    this.fetchXml();
  }

  fetchXml = () => {
    fetch(URI, {
      method: 'POST',
      headers: {'Content-Type': 'text/xml'},
      body: xmlDeviceList,
    })
      .then(response => response.text())
      .then(textResponse => {
        const parser = new XMLParser();
        let jObj = parser.parse(textResponse);
        let json =
          jObj['SOAP-ENV:Envelope']['SOAP-ENV:Body']['ns1:DevicesListResponse'][
            'return'
          ]['item'];
        this.setState({data: json});
        // console.log(this.state.data);
        this.setState({isLoading : false})
      })
      .catch(error => {
        console.log(error);
      })
  };

  renderItem = ({item}) => <FlatListItem name={item.name} id={item.id} />;

  render() {
    const {data, isLoading} = this.state;

    return (
      <View style={{flex: 1}}>
        {isLoading ? (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <PacmanIndicator />
          </View>
        ) : (
          <FlatList
            data={data}
            renderItem={this.renderItem}
            keyExtractor={item => item.id}
          />
        )}
      </View>
    );
  }
}
