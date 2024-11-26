import 'react-native';
import React from 'react';


import { render, screen, waitFor } from '@testing-library/react-native';
import RenderArticle from 'screen/Tab/Mag/widget/articleItem';
import { IArticle } from 'store/slice/mag/type';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Apollo from "services/utils/apollo";

jest.mock('hooks/useUser', () => ({
  __esModule: true,
  useUser: () => ({
    isPro: false,
    isSubscribed: false,
  }),
}))

jest
  .spyOn(Apollo, 'getFavoriteLists')
  .mockResolvedValue(() => ({
    favoritesLists: []
  }));

const RenderMAGArticle = ({ article, category, isSubscribed }: { article: IArticle, category: number, isSubscribed: boolean }) => {
  const goToArticle = jest.fn()
  const onGreenPress = jest.fn()
  const onFatoPress = jest.fn()
  const updateArticleFavorite = jest.fn()
  const italy = 'Italy'

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RenderArticle article={article} category={category} index={0} isSubscribed={isSubscribed} italy={italy} goToArticle={goToArticle} onFatoPress={onFatoPress} onGreenPress={onGreenPress} updateArticleFavorite={updateArticleFavorite} />
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

let article: IArticle = {
  category: {
    id: '1',
    label: 'categ1'
  },
  hasVideo: false,
  id: '1',
  isFavorite: false,
  isGreen: true,
  isHandmade: false,
  isPublic: false,
  title: 'My article',
  region: {
    id: 'region1',
    label: 'region1'
  },
  summary: 'summary',
  thumbnail: {
    urlLq: 'url'
  }
},
  category = 1,
  isSubscribed = false

it('article render correctly in MAG', async () => {

  await waitFor(async () => {
    await render(
      <RenderMAGArticle article={article} category={category} isSubscribed={isSubscribed} />)
  })

  screen.unmount()
});

it('no private flag when article.isPublic = true && isSubscribed = false', async () => {

  article.isPublic = true

  await waitFor(async () => {
    await render(
      <RenderMAGArticle article={article} category={category} isSubscribed={isSubscribed} />)
  })

  expect(screen.queryByTestId('privateflag')).toBeNull()
  screen.unmount()
});

it('no private flag when article.isPublic = false && isSubscribed = true', async () => {

  isSubscribed = true

  await waitFor(async () => {
    await render(
      <RenderMAGArticle article={article} category={category} isSubscribed={isSubscribed} />)
  })

  expect(screen.queryByTestId('privateflag')).toBeNull()
  screen.unmount()
});

it('showing private flag when article.isPublic = false && isSubscribed = false', async () => {

  await waitFor(async () => {
    await render(
      <RenderMAGArticle article={article} category={category} isSubscribed={isSubscribed} />)
  })

  expect(screen.queryByTestId('privateflag')).toBeNull()
  screen.unmount()
});
