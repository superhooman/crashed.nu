
import { Property } from "@src/components/Property";
import { Stack } from "@src/components/Stack"
import { Paragraph, Text } from "@src/components/Typography"
import type { Course } from "@src/server/PCC/typings";
import React from "react";

import cls from './CourseCard.module.scss';

interface CourseCardProps {
    course: Course;
}

export const CourseCard: React.FC<React.PropsWithChildren<CourseCardProps>> = ({ course, children }) => {
    const { abbr, title, credits, department, school, academicLevel } = course;

    return (
        <div className={cls.root}>
            <Text color="secondary" size="small">{abbr}</Text>
            <Stack direction="column" gap={4}>
                <Paragraph bold type="primary">{title}</Paragraph>
                <Property label="School" value={school} />
                <Property label="Department" value={department} />
                <Property label="Level" value={academicLevel} />
                <Property label="ECTS Credits" value={credits} />
            </Stack>
            {children && (
                <Stack className={cls.footer} alignItems="center" justifyContent="space-between" gap={4}>
                    {children}
                </Stack>
            )}
        </div>
    )
}