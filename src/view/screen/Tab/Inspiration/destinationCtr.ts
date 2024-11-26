import useAppNavigator from 'hooks/useAppNavigator';
import {useEffect, useState} from 'react';
import Apollo from 'services/utils/apollo';
import Toast from 'react-native-toast-message';
import {query_inspiration_destination} from 'services/utils/apollo/query';
import {useSelector} from 'react-redux';
import {rootState} from 'store/reducer';

export default function useDestinationCtr() {
  const navigator = useAppNavigator();
  const {detail} = navigator.getParams<{detail: any}>();

  const [destination, setDestination] = useState<any>();
  const [destinationLabel, setDestinationLabel] = useState('');
  const [suggestionDescription, setSuggestionDescription] = useState('');

  const roles = useSelector(
    (state: rootState) => state.userReducer.userInfo.roles,
  );

  const isPro =
    roles?.length > 1 &&
    roles.filter(role => role.id.includes('pro')).length > 0;

  const refresh = async () => {
    const response = await Apollo.query(query_inspiration_destination, {
      id: detail.id,
    });
    if (response.error) {
      Toast.show({text2: response.error.message, type: 'error'});
    } else if (response.data && response.data.inspiration) {
      setDestination(response.data.inspiration);
      setDestinationLabel(response.data.translation.destination);
      setSuggestionDescription(
        response.data.translation.inspirationSuggestionsSubTitle,
      );
    } else {
      setDestination(null);
    }
  };

  const favoriteCallback = () => {
    refresh();
  };

  useEffect(() => {
    refresh();
  }, [detail]);

  return {
    destination,
    destinationLabel,
    detail,
    isPro,
    suggestionDescription,

    favoriteCallback,
  };
}
