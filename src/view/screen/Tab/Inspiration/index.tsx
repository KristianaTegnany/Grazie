import React from 'react';
import { images } from 'assets/images'
import TabContainer from '../widget/TabContainer';
import { ActivityIndicator, AnimatedView, Button, Image, ScrollView, Text, View } from 'widget/Native';
import CardLayout from '../widget/CardLayout';
import useInspirationCtr from './inspirationCtr';
import CenterModal from '../widget/CenterModal';
import Pub from '../widget/Pub';
import { IItem } from 'store/slice/inspiration/type';

const InspirationScreen = () => {

    const {
        inspiration,
        byRegion,
        bySeason,
        byDesire,
        byLengthOfStay,
        forPros,
        headerBg,
        headerDescription,
        inspirationTutoImg,
        inspirationTutoDescription,
        inspirationTutoBtn,
        isFirstInspiration,
        isPro,
        regions,
        loadingRegion,
        seasons,
        inspirationPro,
        desires,
        durations,

        closeTuto,
        navigateToDestination,
        navigateToDetail,
    } = useInspirationCtr();

    const renderSeason = (item: IItem, i: number) => (
        <AnimatedView key={i} animation={'fadeInRight'} delay={100 * i}>
            <CardLayout
                type='sqr'
                size='sm'
                poster
                marginR={10}
                source={{ uri: item.media?.urlLq }}
                title={item.label}
                onPress={() => navigateToDetail(0, item.id)}
            />
        </AnimatedView>
    )

    const renderDesire = (item: IItem, i: number) => (
        <AnimatedView key={i} animation={'fadeInRight'} delay={200 * i}>
            <CardLayout
                type='sqr'
                size='lg'
                marginR={10}
                source={{ uri: item.media?.urlLq }}
                poster
                title={item.label}
                onPress={() => navigateToDetail(1, item.id)}
            />
        </AnimatedView>
    )

    const renderDuration = (item: IItem, i: number) => (
        <CardLayout
            key={i}
            type='win'
            size='sm'
            poster
            marginR={10}
            source={{ uri: item.media?.urlLq }}
            title={item.label}
            onPress={() => navigateToDetail(2, item.id)}
        />
    )

    const renderRegion = (item: any, i: number) => (
        <CardLayout
            key={i}
            type='sqr'
            size='md'
            poster
            marginR={i % 2 === 0 ? 10 : 0}
            marginB={10}
            //sharedId={`inspiration.${item.id}.photo`}
            source={{ uri: item.media?.urlLq }}
            title={item.label}
            onPress={() => navigateToDestination(item)}
        />
    )

    const headerBG = { uri: inspirationTutoImg?.urlLq }
    const image = { uri: headerBg?.urlLq }

    return (
        <>
            <TabContainer
                title={inspiration}
                subtitle={headerDescription}
                image={image}>

                {isPro && inspirationPro.length > 0 &&
                    <View paddingB={20}>
                        <Text rosha size={18} marginH={15} color='onSecondary'>{forPros}</Text>
                        <ScrollView horizontal row marginL={15} marginR={5} paddingV={10}>
                            {inspirationPro.map(renderDesire)}
                        </ScrollView>
                        <View absolute={-1} end top={0} left={0} bottom={0} right={0} >
                            <Image source={images.tab.inspiration.Section2Bg} height={'50%'} width={'100%'} />
                        </View>
                    </View>
                }
                {
                    seasons.length > 0 &&
                    <View paddingB={isPro ? 0 : 20} paddingT={isPro ? 20 : 0}>
                        <Text rosha size={18} marginH={15} color='onSecondary'>
                            {bySeason}
                        </Text>
                        <ScrollView horizontal row paddingL={15} paddingV={10} marginR={5}>
                            {seasons.map(renderSeason)}
                        </ScrollView>
                        <View absolute={-1} end top={0} left={0} bottom={0} right={0}>
                            <Image source={images.tab.inspiration.MoonLeft} absolute={0} left={0} bottom={0} height={150} width={80} resizeMode='contain' />
                        </View>
                    </View>
                }
                {!isPro && desires.length > 0 &&
                    <View>
                        <Text rosha size={18} marginH={15} color='onSecondary'>
                            {byDesire}
                        </Text>
                        <ScrollView horizontal row marginL={15} marginR={5} paddingV={10}>
                            {desires.map(renderDesire)}
                        </ScrollView>
                        <View absolute={-1} end top={0} left={0} bottom={0} right={0} >
                            <Image source={images.tab.inspiration.Section2Bg} height={'50%'} width={'100%'} />
                        </View>
                    </View>
                }
                {
                    durations.length > 0 && <View paddingT={20} paddingB={20}>
                        <Text rosha size={18} marginH={15} color='onSecondary'>
                            {byLengthOfStay}
                        </Text>
                        <ScrollView horizontal row marginL={15} marginR={5} paddingV={10}>
                            {durations.map(renderDuration)}
                        </ScrollView>
                        <View absolute={-1} end top={0} left={0} bottom={0} right={0}>
                            <Image source={images.tab.inspiration.MoonLeft} absolute={0} left={0} bottom={0} height={224} width={110} resizeMode='contain' />
                        </View>
                    </View>
                }
                {
                    regions.length > 0 &&
                    <View paddingT={20} paddingL={15}>
                        <Text rosha size={18} color='onSecondary'>
                            {byRegion}
                        </Text>
                        <View paddingV={10} row wrap>
                            {regions.map(renderRegion)}
                        </View>
                    </View>
                }
                <Pub marginT={0} placement='inspiration_home' />
                <CenterModal blur poster title={inspiration} description={inspirationTutoDescription} headerBG={headerBG} modal={isFirstInspiration} closeModal={closeTuto} bottom={<Button marginT={40} marginH={20} sm text={inspirationTutoBtn} onPress={closeTuto} />} />
            </TabContainer>
            {loadingRegion && <ActivityIndicator absolute={1} top={0} bottom={0} left={0} right={0} center />}
        </>
    )
}

export default InspirationScreen;