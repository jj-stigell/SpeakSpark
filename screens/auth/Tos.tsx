/* eslint-disable max-len */
import React from 'react';
import { View, Text, ScrollView, Dimensions, StyleSheet } from 'react-native';

import Button from '../../components/Button';
import useSystem from '../../hooks/useSystem';
import { SystemContextType } from '../../context/SystemProvider';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function TermsAndConditions({ navigation }: { navigation: any }): React.JSX.Element {
  const { theme }: SystemContextType = useSystem();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.font.primary }]}>Terms and conditions</Text>
      <ScrollView style={styles.tcContainer}>
        <Text style={[styles.tcP, { color: theme.font.primary }]}>Welcome to use SpeakSpark. If you continue to browse and use this application, you are agreeing to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern SpeakSpark’s relationship with you in relation to this application. If you disagree with any part of these terms and conditions, please do not use our application.</Text>
        <Text style={[styles.tcP, { color: theme.font.primary }]}>The term ‘SpeakSpark’ or ‘us’ or ‘we’ refers to the owner of the application. The term ‘you’ refers to the user or viewer of our application.</Text>
        <Text style={[styles.tcP, { color: theme.font.primary }]}>The use of this application is subject to the following terms of use.</Text>
        <Text style={[styles.tcL, { color: theme.font.primary }]}>{'\u2022'} The content of the pages of this application is for your general information and use only. It is subject to change without notice.</Text>
        <Text style={[styles.tcL, { color: theme.font.primary }]}>{'\u2022'} Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this application for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.</Text>
        <Text style={[styles.tcL, { color: theme.font.primary }]}>{'\u2022'} Your use of any information or materials on this application is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through this application meet your specific requirements.</Text>
        <Text style={[styles.tcL, { color: theme.font.primary }]}>{'\u2022'} This application contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.</Text>
        <Text style={[styles.tcL, { color: theme.font.primary }]}>{'\u2022'} All trademarks reproduced in this application, which are not the property of, or licensed to the operator, are acknowledged on the application. Unauthorised use of this application may give rise to a claim for damages and/or be a criminal offence.</Text>
        <Text style={[styles.tcL, { color: theme.font.primary }]}>{'\u2022'} Your use of this application and any dispute arising out of such use of the application is subject to the laws of European Union.</Text>
        <Text style={[styles.tcP, { color: theme.font.primary }]}>Breach of Terms &amp; Legal Consequences</Text>
        <Text style={[styles.tcL, { color: theme.font.primary }]}>{'\u2022'} If you violate these terms of service, we have the right to suspend or delete your account at our discretion. If your actions are deemed illegal, we may report you to law enforcement agencies. Be aware that we are obligated to disclose your information to third parties when mandated by law.</Text>
        <Text style={[styles.tcP, { color: theme.font.primary }]}>Service Costs</Text>
        <Text style={[styles.tcL, { color: theme.font.primary }]}>{'\u2022'} As of now, usage of our service is free. But, as the expenses for hosting continue to rise, we might consider adopting a &quot;freemium&quot; model in the future. In this model, basic accounts would remain free, while users would have the option to pay for additional features.</Text>
        <Text style={[styles.tcP, { color: theme.font.primary }]}>Policy changes</Text>
        <Text style={[styles.tcL, { color: theme.font.primary }]}>{'\u2022'} If significant changes to this policy are made, we will notify you via a message when using the application, logging in, or via email.</Text>
        <Text style={[styles.tcP, { color: theme.font.primary }]}>Transfer</Text>
        <Text style={[styles.tcL, { color: theme.font.primary }]}>{'\u2022'} In the event of a company acquisition, restructure, or bankruptcy, we may transfer your data to a different legal entity. The new legal entity shall respect your privacy in the same way and notify you if they wish to use your data in a way not described here.</Text>
        <Text style={[styles.tcP, { color: theme.font.primary }]}>Contact</Text>
        <Text style={[styles.tcL, { color: theme.font.primary }]}>{'\u2022'} If you have any questions, please contact us via email: support@speakspark.io</Text>
        <Text style={[styles.tcP, { color: theme.font.primary }]}>Disclaimer of Warranties</Text>
        <Text style={[styles.tcL, { color: theme.font.primary }]}>{'\u2022'} Use of the service is at your own risk. While we endeavor to ensure the integrity of your data, ultimately the responsibility is in your hands.</Text>
        <Text style={[styles.tcL, { color: theme.font.primary }]}>{'\u2022'} THE SERVICE IS PROVIDED &quot;AS IS&quot;. WHEN ALLOWED BY LOCAL LAW, WE HEREBY DISCLAIM ALL WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING, WITHOUT LIMITATION, THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE MAKE NO WARRANTY THAT THE SERVICE WILL BE ERROR-FREE OR THAT ACCESS WILL BE CONTINUOUS OR UNINTERRUPTED. YOU UNDERSTAND THAT USE OF THE SERVICE IS ENTIRELY AT YOUR DISCRETION AND RISK.</Text>
        <Text style={[styles.tcP, { color: theme.font.primary }]}>Limitation of Liability</Text>
        <Text style={[styles.tcL, { color: theme.font.primary }]}>{'\u2022'} TO THE EXTENT NOT PROHIBITED BY LAW, IN NO EVENT SHALL WE BE LIABLE FOR ANY GENERAL, SPECIAL, CONSEQUENTIAL, INCIDENTAL OR OTHER DAMAGES, INCLUDING, WITHOUT LIMITATION, LOSS OF DATA, INCORRECT DATA, BUSINESS INTERRUPTION, OR ANY OTHER DAMAGES OR LOSSES INCURRED BY YOUR USE OF, OR INABILITY TO USE THIS SERVICE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES, AND REGARDLESS OF THE THEORY OF LIABILITY.</Text>
        <Text style={[styles.tcP, { color: theme.font.primary }]}>Last updated: 2023-09-18</Text>
      </ScrollView>
      <Button
        title={'Go back'}
        onPress={(): void => navigation.navigate('Register')}
        style={{ marginTop: 10 }}
      />
    </View>
  );
}

// eslint-disable-next-line @typescript-eslint/typedef
const styles = StyleSheet.create({
  container:{
    marginTop: 30,
    marginHorizontal: 10
  },
  title: {
    fontSize: 22,
    alignSelf: 'center'
  },
  tcContainer: {
    marginVertical: 15,
    height: Dimensions.get('window').height * 0.75
  },
  tcP: {
    marginVertical: 10,
    fontSize: 14
  },
  tcL:{
    marginLeft: 10,
    marginVertical: 10,
    fontSize: 12
  }
});
