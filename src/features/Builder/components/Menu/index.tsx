import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

import * as cls from './styles.css';
import { Search } from '../Search';
import { CourseList } from '../CourseList';

export const Menu = () => {
    const [screen, setScreen] = React.useState<'list' | 'search'>('list');

    const toSearchScreen = React.useCallback(() => {
        setScreen('search');
    }, [setScreen]);

    const toListScreen = React.useCallback(() => {
        setScreen('list');
    }, [setScreen]);

    return (
        <>
            <motion.div
                className={cls.inside}
                animate={{ scale: screen === 'list' ? 1 : 0.9, opacity: screen === 'list' ? 1 : 0 }}
                transition={{
                    type: 'tween',
                    duration: 0.2,
                }}
            >
                <CourseList
                    onAddCourse={toSearchScreen}
                />
            </motion.div>
            <AnimatePresence>
                {screen === 'search' ? (
                    <motion.div
                        className={cls.over}
                        initial={{ translateX: '100%' }}
                        animate={{
                            translateX: '0%',
                        }}
                        exit={{
                            translateX: '100%',
                        }}
                        transition={{
                            type: 'tween',
                            duration: 0.2,
                        }}
                    >
                        <Search
                            back={toListScreen}
                        />
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </>
    );
};
