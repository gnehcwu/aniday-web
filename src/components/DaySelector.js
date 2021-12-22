import { Button, Flex, Text, Tooltip, useBreakpointValue } from '@chakra-ui/react';
import { startOfWeek, addDays, getUnixTime } from 'date-fns';
import { STORE_ACTIONS, useStore, useStoreDispatch } from '../states/useStore';

const days = ['Monday', 'Tueday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

/**
 * Get unix timestamp range of days in current week.
 */
function getDayTimeRageMap(today) {
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });
  const daysMap = days.map((value, index) => {
    return [value, getUnixTime(addDays(weekStart, index)), getUnixTime(addDays(weekStart, index + 1)) - 1];
  });

  return daysMap;
}

export default function DaySelector() {
  const dispatch = useStoreDispatch();
  const { today, startTimestamp } = useStore();
  const dayTimeRangeMap = getDayTimeRageMap(today);

  const selectorSize = useBreakpointValue({ base: 'sm', md: 'md' });
  const isOnSmallScreen = useBreakpointValue({ base: true, md: false });

  // Dispatch action to update selected time range
  const pickDay = (startTimestamp, endTimestamp) => {
    dispatch({ type: STORE_ACTIONS.UPDATE_SELECT_DATE, payload: [startTimestamp, endTimestamp] });
  };

  const isActive = timeStamp => timeStamp === startTimestamp;

  return (
    <Flex
      direction={{ base: 'row', md: 'column' }}
      justifyContent="center"
      flexWrap="wrap"
      gap={{ base: '2', md: '7' }}
      paddingTop={{ base: 1, md: 0 }}
    >
      {dayTimeRangeMap.map(([day, start, end]) => (
        <Tooltip key={day} label={`Select ${day}`} placement="left">
          <Button
            fontWeight="500"
            letterSpacing="1px"
            size={selectorSize}
            _hover={{ bgGradient: 'var(--chakra-colors-bg-gradient)' }}
            _active={{ bgGradient: 'var(--chakra-colors-bg-gradient)' }}
            isActive={isActive(start)}
            onClick={() => pickDay(start, end)}
          >
            <Text fontWeight="bold">{isOnSmallScreen ? day.substr(0, 1) : day.substr(0, 3)}</Text>
          </Button>
        </Tooltip>
      ))}
    </Flex>
  );
}
