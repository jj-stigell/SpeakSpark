/* eslint-disable @typescript-eslint/typedef */
import React from 'react';
import { useQuery } from '@apollo/client';
import { Modal, StyleSheet, Text, View, ScrollView } from 'react-native';

import Button from './Button';
import Loader from './Loader';
import PlayButton from './PlayButton';
import { CustomMessage } from '../screens/main/Chat';
import { GET_MESSAGE } from '../graphql/queries';
import { SystemContextType } from '../context/SystemProvider';
import useSystem from '../hooks/useSystem';

interface Props {
  message: CustomMessage,
  modalVisible: boolean,
  setModalVisible: (value: boolean) => void
}

export default function GrammarModal(props: Props): React.JSX.Element {
  const { theme }: SystemContextType = useSystem();

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
        <View style={[
          styles.modalView,
          { backgroundColor: theme.background.secondary, maxHeight: loading ? '60%' : '95%' }
        ]}>
          <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
            <React.Fragment>
              { loading ? (
                <View style={{ alignItems: 'center' }}>
                  <Loader
                    loadingText='Loading grammar...'
                    backgroundColor={theme.background.secondary}
                  />
                </View>
              ) : (
                data?.getMessage && data.getMessage.grammarAnalysis ? (
                  <React.Fragment>
                    <Text style={styles.messageText}>{props.message.text}</Text>
                    <View style={styles.horizontalLine} />
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={[styles.subTitle, { flex: 1 }]}>Translation:</Text>
                      <PlayButton message={props.message} size={40} />
                    </View>
                    <Text style={[styles.subContent]}>
                      {data.getMessage.translation}
                    </Text>
                    <Text style={styles.subTitle}>Information:</Text>
                    <Text style={styles.subContent}>{data.getMessage.grammarAnalysis}</Text>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Text style={{ textAlign: 'center' }}>
                      Something went wrong, please try again or report a bug!
                    </Text>
                    { error && (
                      <Text style={{ marginTop: 10, textAlign: 'center' }}>
                        Encountered GraphQL error: {error.graphQLErrors[0].message}
                      </Text>
                    )}
                  </React.Fragment>
                )
              )}
            </React.Fragment>
            <Button
              title='Close'
              onPress={(): void => props.setModalVisible(!props.modalVisible)}
              style={{ marginTop: 20 }}
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
    alignItems: 'center'
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 2
    }
  },
  messageText: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center'
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  subContent: {
    fontSize: 16,
    marginBottom: 10
  },
  horizontalLine: {
    width: '75%',
    height: 2,
    backgroundColor: '#D3D3D3',
    marginVertical: 10,
    alignSelf: 'center'
  }
});
