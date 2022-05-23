import {Text, View, TouchableOpacity, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {XMLParser} from 'fast-xml-parser';
import { WaveIndicator } from 'react-native-indicators';
import {USER, PASSWORD, URI} from '@env';


import styles from './Details.style';

const Details = ({route, navigation}) => {
  const {id} = route.params;
  const [stato, setStato] = useState('Vuoto');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    deviceStatus();
  }, []);

  const deviceStatus = () => {
    fetch(URI, {
      method: 'POST',
      headers: {'Content-Type': 'text/xml'},
      body: `<?xml version="1.0" encoding="utf-8"?>
      <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Header>	     
          <wsse:Security xmlns:wsse="http://schemas.xmlsoap.org/ws/2003/06/secext">
            <wsse:UsernameToken wsu:Id="sample" xmlns:wsu="http://schemas.xmlsoap.org/ws/2003/06/utility">
              <wsse:Username>${USER}</wsse:Username>
              <wsse:Password Type="wsse:PasswordText">${PASSWORD}</wsse:Password>
            </wsse:UsernameToken>
          </wsse:Security>
        </soap:Header>
        <soap:Body>
          <DeviceLock xmlns="http://connecting.website.com/WSDL_Service">
            <device>${id}</device>
          </DeviceLock>
        </soap:Body>
      </soap:Envelope>`,
    })
      .then(response => response.text())
      .then(textResponse => {
        const parser = new XMLParser();
        let jObj = parser.parse(textResponse);
        let json =
          jObj['SOAP-ENV:Envelope']['SOAP-ENV:Body']['ns1:DeviceLockResponse'][
            'return'
          ];
        // console.log(json);
        if (json === false) {
          setStato('Sbloccato');
        } else {
          setStato('Bloccato');
        }
        // console.log(stato)
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const changeStatus = () => {
    fetch(URI, {
      method: 'POST',
      headers: {'Content-Type': 'text/xml'},
      body: `<?xml version="1.0" encoding="utf-8"?>
      <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Header>	     
          <wsse:Security xmlns:wsse="http://schemas.xmlsoap.org/ws/2003/06/secext">
            <wsse:UsernameToken wsu:Id="sample" xmlns:wsu="http://schemas.xmlsoap.org/ws/2003/06/utility">
              <wsse:Username>${USER}</wsse:Username>
              <wsse:Password Type="wsse:PasswordText">${PASSWORD}</wsse:Password>
            </wsse:UsernameToken>
          </wsse:Security>
        </soap:Header>
        <soap:Body>
          <DeviceLock xmlns="http://connecting.website.com/WSDL_Service">
            <device>${id}</device>
                  <status xsi:type="xsd:boolean">${
                    stato === 'Sbloccato' ? 'true' : 'false'
                  }</status>
          </DeviceLock>
        </soap:Body>
      </soap:Envelope>`,
    })
      .then(response => response.text())
      .then(textResponse => {
        const parser = new XMLParser();
        let jObj = parser.parse(textResponse);
        let json =
          jObj['SOAP-ENV:Envelope']['SOAP-ENV:Body']['ns1:DeviceLockResponse'][
            'return'
          ];
        // console.log(json);
        Alert.alert(
          'Stato modificato correttamente',
          `Dispositivo ${stato === 'Bloccato' ? 'Sbloccato' : 'Bloccato'}`,
        );
        deviceStatus();
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      {loading === true ? (
        <View style={styles.activityIndicator}>
          <WaveIndicator />
        </View>
      ) : (
        <>
          <Text style={styles.textCard}>
            <Text style={styles.textTitle}>ID Macchina: </Text>
            {id}
          </Text>
          <View style={styles.statusContainer}>
            <View>
              <Text style={styles.textCard}>
                <Text style={styles.textTitle}>Stato Macchina: </Text>
                {stato}
              </Text>
            </View>
            {stato === 'Sbloccato' ? (
              <View style={styles.statusIndicatorSb} />
            ) : (
              <View style={styles.statusIndicatorBl} />
            )}
          </View>

          <TouchableOpacity style={styles.btn} onPress={() => changeStatus()}>
            <Text style={styles.btnText}>Cambia stato macchina</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default Details;
