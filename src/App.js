import React from 'react';
import Paging from './Paging';
import { Text, View, Button } from 'react-native';

const Body = ({ Page, myCustomHeader, pop, stack }) => (
   <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: '#888', padding: 10 }}><Text style={{ fontSize: 24 }}>{myCustomHeader}</Text></View>
      <View style={{ marginLeft: 20, marginRight: 20 }}>
         <Page />
         <View	style={{ marginTop: 40 }}>
            <Button
               onPress={() => pop()}
               color="#841584"
               title='Go back'
            />
         </View>
      </View>
      <View style={{ bottom: 80,  position: 'absolute' }}>
         <Text>{stack.map(s => s.key + '/')}</Text>
      </View>
   </View>
)

const page1Data = (paging) => (
   <View>
      <Text style={{ marginTop: 20, marginBottom: 20 }}>Some Page 1 Text</Text>
      <Button
         onPress={() => paging.push('page-2')}
         title='Page 2'
      />
      <Button
         onPress={() => paging.push('page-3')}
         title='Page 3'
      />
   </View>
)

const page2Data = (paging) => (
   <View>
      <Text style={{ marginTop: 20, marginBottom: 20 }}>Some Page 2 Text</Text>
      <Button
         onPress={() => paging.push('page-1')}
         title='Page 1'
      />
   </View>
)

const page3Data = (paging) => (
   <View>
      <Text style={{ marginTop: 20, marginBottom: 20 }}>Some Page 3 Text</Text>
      <Button
         onPress={() => paging.push('page-1')}
         title='Page 1'
      />
      <Button
         onPress={() => paging.popTo('page-2')}
         title='Pop to Page 2'
      />
      <Button
         onPress={() => paging.pushPage(dynamicPage)}
         title='Push dynamic page'
      />
   </View>
)

const dynamicPage = {
   key: 'page-dynamic',
   myCustomHeader: 'Dynamic Page',
   getData: (paging) => (
      <View>
         <Text style={{ marginTop: 20, marginBottom: 20 }}>Some Dynamic Page Text</Text>
         <Button
            onPress={() => paging.popTo('page-1')}
            title='Pop to Page 1'
         />
         <Button
         onPress={() => paging.push('page-2')}
         title='Page 2'
      />
      </View>
   )
}

export default () => (
   <Paging
      body={Body}
      pages={[
         {
            key: 'page-1',
            myCustomHeader: 'Page 1',
            getData: page1Data
         },
         {
            key: 'page-2',
            myCustomHeader: 'Page 2',
            getData: page2Data
         },
         {
            key: 'page-3',
            myCustomHeader: 'Page 3',
            getData: page3Data
         }
      ]}
   />
)
