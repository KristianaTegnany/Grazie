import React, { useEffect, useState } from 'react';
import colors from 'themes/colors';
import dayjs, { Dayjs } from 'dayjs';
import { CalendarList, LocaleConfig } from 'react-native-calendars';
import { generateDateBetween } from 'services/utils/dateUtils';
import BottomModal from './PositionnedModal';
import { Button, View } from 'widget/Native';
import defaultStyle from 'themes/defaultStyle';
import { useSelector } from 'react-redux';
import { rootState } from 'store/reducer';
import Toast from 'react-native-toast-message';

LocaleConfig.locales["fr-FR"] = {
  monthNames: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",],
  monthNamesShort: ["Janv.", "Févr.", "Mars", "Avril", "Mai", "Juin", "Juil.", "Août", "Sept.", "Oct.", "Nov.", "Déc.",],
  dayNames: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi",],
  dayNamesShort: ["Dim.", "Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam."],
  today: "Aujourd'hui",
}

LocaleConfig.locales["it-IT"] = {
  monthNames: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'],
  monthNamesShort: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'],
  dayNames: ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'],
  dayNamesShort: ["Dom.", "Lun.", "Mar.", "Mer.", "Gio.", "Ven.", "Sab."],
  today: "Oggi",
}

type IProps = {
  modal: boolean;
  scError?: string;
  setModal: (data: boolean) => void;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  onSubmit?: (start: Dayjs, end: Dayjs) => void;
  btnText: string;
  insideModal?: boolean;
};

const BottomCalendar = (props: IProps) => {
  const it = useSelector((state: rootState) => state.appReducer.appDatas.isItalian)

  const [period, setPeriod] = useState<any>({});
  const [start, setStart] = useState<Dayjs | null>(null);
  const [end, setEnd] = useState<Dayjs | null>(null);

  const setDate = (date: string) => {
    if (props.scError && start && start.diff(end, 'day') === 0 && dayjs(date, { utc: true }).diff(start, 'day') >= 15) {
      Toast.show({ text2: props.scError, type: 'error' })
    }
    else if (start && start.diff(end, 'day') === 0 && start.diff(dayjs(date, { utc: true })) < 0) {
      generatePeriod(start, dayjs(date, { utc: true }))
      setEnd(dayjs(date, { utc: true }));
    }
    else {
      generatePeriod(dayjs(date, { utc: true }), dayjs(date, { utc: true }))
      setStart(dayjs(date, { utc: true }))
      setEnd(dayjs(date, { utc: true }))
    }
  };

  useEffect(() => {
    if (props.startDate && props.endDate) {
      // Should be utc: true?
      generatePeriod(dayjs(props.startDate, { utc: true }), dayjs(props.endDate, { utc: true }))
      setStart(dayjs(props.startDate, { utc: true }))
      setEnd(dayjs(props.endDate, { utc: true }))
    }
  }, [props.startDate, props.endDate])

  useEffect(() => {
    LocaleConfig.defaultLocale = it ? 'it-IT' : 'fr-FR';
  }, [it])

  const generatePeriod = (start: Dayjs, end: Dayjs) => {
    const interval = generateDateBetween(
      start!.format('YYYY-MM-DD'),
      end!.format('YYYY-MM-DD'),
    );
    const result: Record<
      string,
      {
        endingDay?: boolean;
        startingDay?: boolean;
        selected: boolean;
        textColor?: string;
        color: string;
      }
    > = {};

    interval?.map((item, i) => {
      const style =
        i === 0 || i === interval.length - 1
          ? {
            selected: true,
            color: colors.tertiary,
            textColor: colors.onSecondary,
            startingDay: i === 0,
            endingDay: i === interval.length - 1,
          }
          : {
            selected: true,
            color: colors.tertiary,
            textColor: colors.onSecondaryDark,
          };
      result[item.format('YYYY-MM-DD')] = style;
      return item;
    });

    setPeriod(result);
  };

  return (
    <BottomModal
      modal={props?.modal}
      setModal={props?.setModal}
      /*headerItem={<Text size={20} bold marginL={10} marginB={5} color='onSecondary'>Dates</Text>}*/>
      <>
        <View flex marginT={15}>
          <CalendarList
            pastScrollRange={0}
            futureScrollRange={4}
            onDayPress={e => setDate(e?.dateString)}
            theme={{
              textDayHeaderFontFamily: 'Roboto-Bold',
              textDayFontFamily: 'Roboto-Regular',
              textMonthFontFamily: 'Roboto-Regular',
              todayTextColor: colors.primaryDark,
            }}
            style={defaultStyle.fullWidth}
            disableArrowLeft={false}
            minDate={dayjs().format()}
            markingType={'period'}
            markedDates={period}
            firstDay={1}
          />
        </View>
        <View paddingH={20} marginB={30}>
          <Button
            disabled={!end || !start}
            text={props.btnText}
            onPress={() => {
              props?.onSubmit && props?.onSubmit(start!, end!);
              props?.setModal(false);
            }}
            md
          />
        </View>
      </>
    </BottomModal>
  );
};

export default BottomCalendar;
