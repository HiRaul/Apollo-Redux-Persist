/* eslint-disable @typescript-eslint/no-shadow */
import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { Text, SafeAreaView, StyleSheet, FlatList, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import { getAnimePage } from '../../services/animeService';
import { setAnimePage } from './HomePageSlice';
import { GetAnimePage } from '../../services/animeService/__generated__/GetAnimePage';
import { RootState } from '../../store';

const actionDispatch = (dispatch: Dispatch) => ({
  setAnimePage: (page: GetAnimePage['Page']) => dispatch(setAnimePage(page)),
});

const HomePage: React.FC = () => {
  const { setAnimePage } = actionDispatch(useDispatch());
  const { animePage } = useSelector((state: RootState) => state.homePage);

  const fetchAnimePage = async () => {
    const animePage = await getAnimePage(0).catch(err => {
      console.log('Error: ', err);
    });

    if (animePage) {
      setAnimePage(animePage);
    }
  };

  useEffect(() => {
    fetchAnimePage();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={animePage?.media}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <FastImage
              style={styles.image}
              source={{ uri: item?.coverImage?.medium || '' }}
            />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item?.title?.english}</Text>
              <Text style={styles.description} numberOfLines={5}>
                {item?.description}
              </Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    height: 140,
  },
  image: {
    height: 140,
    width: 100,
  },
  textContainer: {
    flex: 1,
    marginLeft: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  description: {
    marginTop: 10,
    fontSize: 12,
    flexShrink: 1,
  },
});
export default HomePage;
