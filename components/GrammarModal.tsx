/* eslint-disable @typescript-eslint/typedef */
import React from 'react';
import { useQuery } from '@apollo/client';
import { Modal, StyleSheet, Text, View, ScrollView } from 'react-native';

import Button from './Button';
import Loader from './Loader';
import PlayButton from './PlayButton';
import { useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import { ColorScheme } from '../utils/colors';
import { CustomMessage } from '../screens/main/Chat';
import { GET_MESSAGE } from '../graphql/queries';

interface Props {
  message: CustomMessage,
  modalVisible: boolean,
  setModalVisible: (value: boolean) => void
}

export default function GrammarModal(props: Props): React.JSX.Element {
  const theme: ColorScheme = useAppSelector((state: RootState) => state.system.theme);

  const { data, loading, error } = useQuery(GET_MESSAGE, {
    variables: {
      messageId: props.message?._id ?? '',
      generateTranslation: true,
      generateGrammarAnalysis: true,
      generateAudio: false
    },
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
        <View style={[styles.modalView, { backgroundColor: theme.background.primary }]}>
          <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
            <Text style={styles.modalText}>
              { loading ? (
                <View style={{ marginTop: 20, alignItems: 'center' }}>
                  <Loader loadingText='Loading grammar...' />
                </View>
              ) : (
                data?.getMessage && data.getMessage.grammarAnalysis ? (
                  <React.Fragment>
                    <Text style={styles.messageText}>{props.message.text}</Text>
                    <View style={styles.horizontalLine} />
                    <Text style={styles.analysisTitle}>Translation</Text>
                    <Text style={styles.grammarAnalysis}>{data.getMessage.translation}</Text>
                    <PlayButton message={props.message} />
                    <Text style={styles.analysisTitle}>Analysis</Text>
                    <Text style={styles.grammarAnalysis}>{data.getMessage.grammarAnalysis}</Text>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Text>Something went wrong, please try again or report a bug!</Text>
                    { error && <Text>Encountered error {error.graphQLErrors[0].message}</Text> }
                  </React.Fragment>
                )
              )}
            </Text>
            <Button
              title='Hide Grammar'
              onPress={(): void => props.setModalVisible(!props.modalVisible)}
            />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

// eslint-disable-next-line @typescript-eslint/typedef
const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'flex-end', // Change this to 'center' if you want it to be vertically centered.
    alignItems: 'center',
    marginTop: 1
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    maxHeight: '80%'
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
    fontSize: 20,        // Increase the font size for the message text
    marginBottom: 20    // Increase the margin to create more space
  },
  grammarAnalysis: {
    fontSize: 14        // Smaller font size for the grammar analysis
  },
  horizontalLine: {
    width: '75%',
    height: 40,
    backgroundColor: 'black',
    marginVertical: 10,
    alignSelf: 'center'
  },
  analysisTitle: {
    fontSize: 18,       // Font size for the analysis title
    fontWeight: 'bold', // Make it bold
    marginBottom: 10    // Space between title and analysis content
  }
});
