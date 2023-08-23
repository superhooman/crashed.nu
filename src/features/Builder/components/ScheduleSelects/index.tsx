import { Box, Flex, Grid, Text } from '@radix-ui/themes';
import React from 'react';
import useSWR from 'swr';
import { ArrowLeftIcon, ArrowUpIcon } from '@radix-ui/react-icons';

import type { Schedule } from '@src/server/PCC/types';

import { getSchedules } from '@src/app/actions/getSchedule';
import { Loader } from '@src/components/Loading';
import { getTypes, typeDict, typeReg } from '@src/utils/data/getScheduleTypes';
import { getRange } from '@src/utils/data/time';
import { Select } from '@src/components/Select';

import * as cls from './styles.css';
import { useSchedule } from '../../contexts/schedule';

export const ScheduleSelects = () => {
  const { selectedCourse, selected } = useSchedule();
  const [enabled, setEnabled] = React.useState(false);

  React.useLayoutEffect(() => {
    setEnabled(true);
  }, []);

  const course = React.useMemo(() => selected.find(({ id }) => id === selectedCourse), [selectedCourse, selected]);

  if (!enabled) {
    return null;
  }

  if (!course) {
    return <NoSelected />;
  }

  return (
    <ScheduleSelectsInner
      term={course.term}
      courseId={course.id}
      selection={course.selection}
    />
  );
};

interface Props {
  term: string;
  courseId: string;
  selection: Record<string, string>;
}

const ScheduleSelectsInner: React.FC<Props> = ({
  term,
  courseId,
  selection
}) => {
  const { selectSection } = useSchedule();
  const { data, isLoading, isValidating } = useSWR({ key: 'schedule', term, courseId }, getSchedules, {
    keepPreviousData: false,
    revalidateIfStale: false,
  });
  const types = React.useMemo(() => Array.from(getTypes(data ?? [])), [data]);

  const isEmpty = types.length === 0;

  const getSelectionHandler = React.useCallback((type: string) => (value: string) => {
    selectSection(courseId, type, value);
  }, [selectSection, courseId]);

  if (isLoading || isValidating) {
    return (
      <Flex align="center" px="2" gap="2">
        <Loader />
        <Text size="1" color="gray">Loading...</Text>
      </Flex>
    );
  }

  if (!data) {
    return null;
  }

  if (isEmpty) {
    return (
      <Flex height="100%" align="center">
        <Text size="1" color="gray">There is no schedule for this course</Text>
      </Flex>
    );
  }

  return (
    <Grid columns={{
      initial: '1',
      md: '4',
    }} gap="2" width="100%">
      {types.map((el) => (
        <Type
          onSelect={getSelectionHandler(el)}
          type={el}
          schedule={data}
          key={el}
          value={selection[el]}
        />
      ))}
    </Grid>
  );
};

export const NoSelected = () => {
  const [enabled, setEnabled] = React.useState(false);

  React.useLayoutEffect(() => {
    setEnabled(true);
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <Flex align="center" width="100%" justify={{
      initial: 'end',
      sm: 'start',
    }} gap="2" px="2">
      <Box display={{
        initial: 'none',
        sm: 'block',
      }}>
        <Text color="gray">
          <ArrowLeftIcon display="block" />
        </Text>
      </Box>
      <Text size="2" color="gray">Select a course to get started</Text>
      <Box display={{
        initial: 'block',
        sm: 'none',
      }}>
        <Text color="gray">
          <ArrowUpIcon display="block" />
        </Text>
      </Box>
    </Flex>
  );
};

interface TypeProps {
  schedule: Schedule[];
  type: string;
  value?: string,
  onSelect: (v: string) => void;
}

const ScheduleItem: React.FC<Schedule> = ({ st, times, days, faculty }) => (
  <div className={cls.scheduleItem}>
    <Text className={cls.text} size="1" as="div">{st} • {getRange(times)} {days}</Text>
    <Text className={cls.text} as="div">{faculty}</Text>
  </div>
);

const Type: React.FC<TypeProps> = ({ schedule, type, onSelect, value = '-1' }) => {
  const options = React.useMemo(() => schedule.filter(({ st }) => st.match(typeReg)?.[0] === type).map((schedule, i) => ({
    label: <ScheduleItem {...schedule} />,
    value: `${i}`,
  })), [schedule, type]);

  const changeHanlder = React.useCallback((value: string) => {
    onSelect(value);
  }, [onSelect]);

  return (
    <Select
      onValueChange={changeHanlder}
      value={value}
      size="3"
      radius="medium"
      className={cls.fullWidth}
      options={[
        {
          label: (
            <div className={cls.scheduleItem}>
              <Text className={cls.text} size="1" as="div">{typeDict[type] || type}</Text>
              <Text className={cls.text} as="div">Not selected</Text>
            </div>
          ),
          value: '-1'
        },
        ...options,
      ]} />
  );
};
