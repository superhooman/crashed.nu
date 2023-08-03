import * as RadioGroup from '@radix-ui/react-radio-group';
import React from 'react';

import type { Course } from '@src/server/PCC/typings';

import { Stack } from '@src/components/Stack';
import { Text } from '@src/components/Typography';

import cls from './Menu.module.scss';

interface MenuProps {
    courses: Course[];
    selected: string;
    setSelected: (id: string) => void;
}

export const Menu: React.FC<MenuProps> = ({ courses, selected, setSelected }) => {
    return (
        <RadioGroup.Root className={cls.root} value={selected} onValueChange={setSelected}>
            <Stack direction="column" alignItems="stretch" justifyContent="stretch" gap={8}>
            {courses.map(course => {
                const id = course.id;
    
                return (
                    <RadioGroup.Item className={cls.item} value={id} id={id} key={id}>
                        <label htmlFor={id}>
                            <Text bold size="small">{course.abbr}</Text>
                            <h2 className={cls.name}>{course.title}</h2>
                        </label>
                    </RadioGroup.Item>
                );
            })}
            </Stack>
        </RadioGroup.Root>
    );
};
