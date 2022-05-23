import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    margin: 10,
    borderWidth: 0.5,
    borderRadius: 20,
    alignItems: 'center',
  },
  btn: {
    backgroundColor: 'grey',
    padding: 6,
    borderRadius: 20,
  },
  btnText: {
    fontWeight: '800',
    color: 'white',
  },
  textCard: {
    padding: 20,
    fontSize: 17,
  },
  activityIndicator: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  textTitle: {
    fontWeight: '800',
  },
  statusIndicatorBl: {
    backgroundColor: 'green',
    width: 40,
    height: 40,
    borderRadius: 200,
    margin: 20,
  },
  statusIndicatorSb: {
    backgroundColor: 'red',
    width: 40,
    height: 40,
    borderRadius: 200,
    margin: 20,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
});

export default styles;
