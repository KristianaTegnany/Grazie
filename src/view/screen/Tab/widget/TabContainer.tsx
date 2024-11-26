import React, { PropsWithChildren, ReactNode, useCallback, useState } from 'react';
import { ListRenderItem } from 'react-native';
import { Source } from 'react-native-fast-image';
import Apollo from 'services/utils/apollo';
import debounce from 'services/utils/debounce';
import { useUser } from 'hooks/useUser';
import TabSearchContent from './TabSearchContent';
import BaseTabContainer from './BaseTabContainer';

type IProps = PropsWithChildren & {
    backBtn?: boolean;
    forwardRef?: React.Ref<any> | undefined;
    showTitle?: boolean;
    loading?: boolean;
    parentAnim?: any;
    title: string;
    subtitle?: string;
    image?: Source;
    sharedId?: string;

    data?: any;
    numColumns?: number,

    renderFooter?: ReactNode;
    renderHeader?: ReactNode;
    renderItem?: ListRenderItem<any>;
    onEndReached?: () => void;
};

let lastSearch: string = ''

const TabContainer = (props: IProps) => {
    const { isSubscribed } = useUser();

    const [showSearch, setShowSearch] = useState(false);
    const [searching, setSearching] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [canFetchMore, setCanFetchMore] = useState(false);
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [showPrivateModal, setShowPrivateModal] = useState(false);

    const closePrivateModal = () => setShowPrivateModal(false)

    const toggleSearch = () => {
        if (isSubscribed) {
            setShowSearch(show => {
                if (show) {
                    setSearching(false)
                    setSearchResults([])
                }
                return !show
            })
        } else {
            setShowPrivateModal(true);
        }
    };

    const onSearch = useCallback(debounce((text: string | null, offset?: number) => {
        if (text || text === null) {
            if (text !== null)
                lastSearch = text
            if (offset) {
                setLoadingMore(true)
            }
            else setSearching(true)

            Apollo.search(text || lastSearch, offset).then(res => {
                if (res.search?.items) {
                    const newLength = offset
                        ? offset + res.search?.items.length
                        : res.search?.items.length,
                        total = parseInt(res.search?.total);
                    if (!offset && !canFetchMore) {
                        setCanFetchMore(total > newLength);
                    } else if (canFetchMore && total === newLength) {
                        setCanFetchMore(false);
                    }

                    if (offset) {
                        setSearchResults(searchResults => {
                            return [...searchResults, ...res.search?.items]
                        })
                        setLoadingMore(false)
                    }
                    else {
                        setSearchResults(res.search?.items)
                        setSearching(false)
                    }

                }
            })
        }
    }), [])

    return <>
        <BaseTabContainer {...props} search={showSearch} onSearch={onSearch} toggleSearch={toggleSearch} />
        <TabSearchContent canFetchMore={canFetchMore} loadingMore={loadingMore} searching={searching} searchResults={searchResults} showPrivateModal={showPrivateModal} showSearch={showSearch} closePrivateModal={closePrivateModal} onSearch={onSearch} />
    </>
};

export default TabContainer;