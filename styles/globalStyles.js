import {StyleSheet} from 'react-native';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 12,
    marginVertical: 12,
  },
  content: {
    flex: 1,
  },
  btnPrimary: {
    backgroundColor: '#F1C40F',
  },
  divider: {
    marginTop: 20,
  },
  titleOrder: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    color: '#2C3E50',
    fontSize: 24,
    fontWeight: '600',
  },
  imgOrder: {
    height: 50,
    width: '100%',
  },
  productPrice: {
    marginVertical: 2,
    // textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  floatEnd: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
});
export default globalStyles;
