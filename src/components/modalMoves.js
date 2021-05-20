import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const moves = data => {
  return (
    !!data.moves && data.moves.map((item,key) => {
      return (
        <>
          <Text style={{marginRight: 10}} key={key}>*{item.move.name}</Text>
        </>
      );
    })
  );
};
export const Moves = ({visible, onClose, data}) => {
  console.log('movimientos', data);
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={() => {}}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.btnClose} onPress={onClose} >
          <Text style={styles.labelBtn}>X</Text>
        </TouchableOpacity>
        <View style={styles.card}>
          <Text style={styles.title}>Movimientos {data.name}</Text>
          <ScrollView>
            <View style={styles.contData}>{moves(data)}</View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.80)',
    position: 'relative',
    justifyContent: 'center',
    flex: 1,
  },
  btnClose: {
    height: 30,
    width: 60,
    backgroundColor: '#D33B3B',
    alignSelf: 'flex-end',
    borderRadius: 10,
    marginRight: 20,
    marginBottom: 10,
  },
  labelBtn: {
    color: 'white',
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 20,
  },
  card: {
    height: 500,
    marginHorizontal: 30,
    backgroundColor: 'white',
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  contData: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    borderBottomWidth:1,
    marginBottom:10
  },
});

export default Moves;
