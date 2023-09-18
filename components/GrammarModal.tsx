/* eslint-disable @typescript-eslint/typedef */
import { ButtonSpinner } from '@gluestack-ui/themed';
import React from 'react';
import { Modal, StyleSheet, Text, Pressable, View, ScrollView } from 'react-native';
import { GET_MESSAGE } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import { IMessage } from 'react-native-gifted-chat';

export default function GrammarModal(props: {
  message: IMessage,
  modalVisible: boolean,
  setModalVisible: (value: boolean) => void
}): React.JSX.Element {

  console.log(props.message?._id);

  const { data, loading } = useQuery(GET_MESSAGE, {
    variables: { messageId: props.message?._id ?? '' },
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
    skip: !props.modalVisible
  });

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={(): void => {
        props.setModalVisible(!props.modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
            <Text style={styles.modalText}>
              { loading && (
                <View style={{ alignItems: 'center' }}>
                  <ButtonSpinner mr="$2" size="large"/>
                  <Text>Loading grammar...</Text>
                </View>
              )}
              {
                data?.getMessage && data.getMessage.grammarAnalysis &&
                <>
                  <Text style={styles.messageText}>{props.message.text}</Text>
                  <View style={styles.horizontalLine} />
                  <Text style={styles.grammarAnalysis}>{data.getMessage.grammarAnalysis}</Text>
                </>
              }
            </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={(): void => props.setModalVisible(!props.modalVisible)}>
              <Text style={styles.textStyle}>Hide Grammar</Text>
            </Pressable>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

// eslint-disable-next-line @typescript-eslint/typedef
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 1
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: '#F194FF'
  },
  buttonClose: {
    backgroundColor: '#2196F3'
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  },
  messageText: {
    fontSize: 18,        // Larger font size for the message text
    marginBottom: 10    // Some margin to create space between text and line
  },
  grammarAnalysis: {
    fontSize: 14        // Smaller font size for the grammar analysis
  },
  horizontalLine: {
    height: 10,          // Thin horizontal line
    backgroundColor: '#D3D3D3',   // Light gray color
    marginVertical: 10 // Margin to separate from both top and bottom content
  }
});
