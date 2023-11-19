/* eslint-disable @typescript-eslint/typedef */
import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Modal, StyleSheet, Text, View, ScrollView } from 'react-native';

import Button from './Button';
import Loader from './Loader';
import PlayButton from './PlayButton';
import { CustomMessage } from '../screens/main/Chat';
import { GET_MESSAGE } from '../graphql/queries';
import { SystemContextType } from '../context/SystemProvider';
import useSystem from '../hooks/useSystem';
import i18n from '../i18n';
import { Message } from '../type';

interface Props {
  message: CustomMessage,
  modalVisible: boolean,
  setModalVisible: (value: boolean) => void
}

export default function GrammarModal(props: Props): React.JSX.Element {
  const { theme }: SystemContextType = useSystem();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [data, setData] = React.useState<Message | undefined>(undefined);

  const [message] = useLazyQuery(GET_MESSAGE, {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
    onCompleted: (data) => {
      setData(data.getMessage);
      setLoading(false);
    }
  });

  useEffect(() => {
    setLoading(true);
    if (props.modalVisible) {
      message({ variables: {
        messageId: props.message._id,
        botId: props.message.user._id,
        generateTranslation: true,
        generateGrammarAnalysis: true,
        generateAudio: false
      } });
    }
  }, [props.modalVisible]);

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
                <Loader
                  loadingText={i18n.t('chat.grammarModal.loading')}
                  backgroundColor={theme.background.secondary}
                />
              ) : (
                <React.Fragment>
                  <Text style={styles.messageText}>{props.message.text}</Text>
                  <PlayButton message={props.message} size={40} />
                  <View style={styles.horizontalLine} />
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={[styles.subTitle, { flex: 1 }]}>
                      {i18n.t('chat.grammarModal.translation')}
                    </Text>
                  </View>
                  <Text style={[styles.subContent]}>
                    {data?.translation}
                  </Text>
                  <Text style={styles.subTitle}>{i18n.t('chat.grammarModal.information')}</Text>
                  <Text style={styles.subContent}>{data?.grammarAnalysis}</Text>
                </React.Fragment>
              )}
            </React.Fragment>
            <Button
              title={i18n.t('chat.grammarModal.closeButton')}
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
    justifyContent: 'flex-end',
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
