import MapboxGL, { Camera, MapView } from '@rnmapbox/maps';
import { AnimatedView, Button, View } from 'widget/Native';
import TabHeader from '../widget/TabHeader';
import useMapCtr from './mapCtr';
import defaultStyle from 'themes/defaultStyle';
import colors from 'themes/colors';
import CenterModal from '../widget/CenterModal';
import TabFilter from '../widget/TabFilter';
import ActivityIndicator from 'widget/Native/ActivityIndicator';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform } from 'react-native';
//import { images } from 'assets/images';
import MapAddress from './Widget/mapAddress';
import { images } from 'assets/images';
import PrivateModal from '../../User/Membership/widget/PrivateModal';
import MapHeader from './Widget/mapHeader';

const MapScreen = () => {

    const {
        thumbnail,
        textHtml,
        myMapTutoTitle,
        myMapTutoButtonLabel,
        filters,

        adresscategories,
        allowedRegions,
        camera,
        filterDatas,
        isAllRegions,
        isAndroid,
        isFirstMap,
        isGranted,
        map,
        noTravel,
        points,
        selectedMarker,
        userLocation,

        closeFilter,
        closeTuto,
        loading,
        privateModal,
        dismissPrivateModal,
        navigateToAddress,
        onMarkerPress,
        openFilter,
        openTravel,
        refreshFavorites,
        resetSelectedMarker,
        setFilterDatas,
        showFilter,
        updateUserLocation,
    } = useMapCtr();
    const centerCoord = [12.496366, 41.902782];

    const { top } = useSafeAreaInsets();
    const styles = Platform.select({
        ios: {
            marginT: undefined,
            borderT: undefined
        },
        android: {
            marginT: top,
            borderT: 20
        }
    })

    const centerCoordinate = userLocation ? [userLocation.long, userLocation.lat] : centerCoord
    const tutoBG = { uri: thumbnail?.urlLq }

    return (
        <View flex color='white'>
            <View absolute={1} top={0} fullWidth>
                <TabHeader contentColor={colors.onSecondaryExtraDark} customRight={
                    <MapHeader noTravel={noTravel} openFilter={openFilter} openTravel={openTravel}/>}
                />
            </View>
            <View flex marginT={styles?.marginT} borderT={styles?.borderT} overflow='hidden' color='white'>
                <MapView
                    //onCameraChanged={data => console.log(JSON.stringify(data))}
                    onPress={resetSelectedMarker}
                    style={defaultStyle.flexOH}
                    rotateEnabled={false}
                    pitchEnabled={false}
                    scaleBarEnabled={false}
                    localizeLabels={true}
                    logoEnabled={false}
                    ref={map}
                    //onCameraChanged={onCameraChanged}
                    //regionDidChangeDebounceTime={1000}
                    //regionWillChangeDebounceTime={1000}
                    styleURL='mapbox://styles/gorilles/clmjafotr01qy01qx9za21iol'>
                    <Camera
                        //animationMode={'flyTo'}
                        animationDuration={1000}
                        centerCoordinate={centerCoordinate}
                        ref={camera}
                        allowUpdates={false}
                        minZoomLevel={4.5}
                        maxZoomLevel={18}
                        zoomLevel={4.5}
                    />
                    <MapboxGL.Images images={{
                        ...adresscategories.reduce((a, b) => Object.assign(a, { [b.id]: { uri: b.icon?.urlLq } }), {}),
                        favorite: images.tab.map.favorite,
                        suggestion: images.tab.map.suggestion
                    }} />
                    <MapboxGL.ShapeSource
                        hitbox={{ width: 1, height: 1 }}
                        onPress={(data) => {
                            if (data.features[0].id && data.features[0].properties?.opacity === 1)
                                onMarkerPress(data.features[0].id + '');
                        }}
                        id='markers'
                        shape={{
                            type: 'FeatureCollection',
                            features: points.map(point => {
                                return {
                                    id: point.id,
                                    geometry: {
                                        coordinates: [parseFloat(point.longitude), parseFloat(point.latitude)],
                                        type: 'Point',
                                    },
                                    type: "Feature",
                                    properties: {
                                        category: point.categoryId,
                                        isFavorite: point.isFavorite,
                                        isSuggestion: point.isSuggestion,
                                        isSelected: point.id === selectedMarker,
                                        opacity: isAllRegions ? 1 : (allowedRegions?.includes(point.regionId) ? 1 : 0.2)
                                    }
                                }
                            })
                        }}
                    >
                        {
                            adresscategories.map((adresscategory, index) => {
                                return <MapboxGL.SymbolLayer key={index} id={adresscategory.id} filter={["all", ["==", "category", adresscategory.id], ["==", "isSelected", false]]} style={{ iconImage: adresscategory.id, iconSize: 0.3, iconAnchor: 'bottom', iconAllowOverlap: true, iconOpacity: ['get', 'opacity'] }} />
                            }).concat(...adresscategories.map((adresscategory, index) => {
                                return <MapboxGL.SymbolLayer key={index + 'selected'} id={adresscategory.id + 'selected'} filter={["all", ["==", "category", adresscategory.id], ["==", "isSelected", true]]} style={{ iconImage: adresscategory.id, iconSize: 0.5, iconAnchor: 'bottom', iconAllowOverlap: true }} />
                            })).concat(<MapboxGL.SymbolLayer key={'favorite'} id={'favorite'} filter={["all", ["==", "isFavorite", true], ["==", "isSelected", false]]} style={{ iconImage: "favorite", iconSize: 0.1, iconAnchor: 'bottom', iconOffset: [50, -100], iconAllowOverlap: true }} />, <MapboxGL.SymbolLayer key={'suggestion'} id={'suggestion'} filter={["all", ["==", "isSuggestion", true], ["==", "isSelected", false]]} style={{ iconImage: "suggestion", iconSize: 0.1, iconAnchor: 'bottom', iconOffset: [50, -100], iconAllowOverlap: true }} />)
                                .concat(<MapboxGL.SymbolLayer key={'favorite selected'} id={'favorite selected'} filter={["all", ["==", "isFavorite", true], ["==", "isSelected", true]]} style={{ iconImage: "favorite", iconSize: 0.2, iconAnchor: 'bottom', iconOffset: [50, -100], iconAllowOverlap: true }} />, <MapboxGL.SymbolLayer key={'suggestion selected'} id={'suggestion selected'} filter={["all", ["==", "isSuggestion", true], ["==", "isSelected", true]]} style={{ iconImage: "suggestion", iconSize: 0.2, iconAnchor: 'bottom', iconOffset: [50, -100], iconAllowOverlap: true }} />)
                        }

                    </MapboxGL.ShapeSource>
                    {
                        isAndroid && userLocation &&
                        <MapboxGL.MarkerView
                            coordinate={[userLocation.long, userLocation.lat]}><AnimatedView animation={'pulse'} iterationCount={'infinite'}><View size={20} border={10} hexColor='#4286F5' borderW={2} borderC='white' /></AnimatedView></MapboxGL.MarkerView>
                    }
                    {!isFirstMap && !isAndroid && isGranted && <MapboxGL.UserLocation
                        visible={true}
                        requestsAlwaysUse={true}
                        minDisplacement={100}
                        onUpdate={updateUserLocation}
                    />}
                    <CenterModal blur poster title={myMapTutoTitle} titleMarginT={0} description={textHtml} headerBG={tutoBG} modal={isFirstMap} closeModal={closeTuto} bottom={<Button marginT={20} marginH={20} sm text={myMapTutoButtonLabel} onPress={closeTuto} />} />
                    {filterDatas.length > 0 && <TabFilter dark isSubscribed isVisible={showFilter} data={filterDatas} title={filters} closeModal={closeFilter} updateData={setFilterDatas} />}
                </MapView>
            </View>
            {loading && <ActivityIndicator absolute={1} top={0} left={0} right={0} bottom={0} center padding={20} />}
            {selectedMarker &&
                <View absolute={1} left={0} right={0} bottom={10}>
                    <MapAddress id={selectedMarker} callback={refreshFavorites} onPress={navigateToAddress} />
                </View>
            }
            <PrivateModal modal={privateModal} closeModal={dismissPrivateModal} />
        </View>
    )
}

export default MapScreen;