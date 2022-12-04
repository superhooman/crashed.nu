import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import * as SelectBase from '@radix-ui/react-select';

import cls from './Select.module.scss';

interface AdvanceOption {
    label: React.ReactNode;
    value: string;
}

type Props = SelectBase.SelectProps & {
    items: AdvanceOption[];
    label?: string;
}

export const Select: React.FC<Props> = ({ label, items, ...props }) => {
    return (
        <SelectBase.Root  {...props}>
            <SelectBase.Trigger className={cls.root}>
                {label && <label className={cls.label}>{label}</label>}
                <div className={cls.select}>
                    <SelectBase.Value className={cls.value} />
                    <SelectBase.Icon>
                        <ChevronDownIcon className={cls.chevron} />
                    </SelectBase.Icon>
                </div>
            </SelectBase.Trigger>

            <SelectBase.Portal>
                <SelectBase.Content className={cls.content}>
                    <SelectBase.ScrollUpButton className={cls.scrollButton}>
                        <ChevronUpIcon />
                    </SelectBase.ScrollUpButton>
                    <SelectBase.Viewport>
                        {items.map(({ value, label }) => (
                            <SelectBase.Item className={cls.item} value={value} key={value}>
                                <div className={cls.itemContent}>
                                    <SelectBase.ItemText>
                                        {label}
                                    </SelectBase.ItemText>
                                </div>
                                <SelectBase.ItemIndicator className={cls.check}>
                                    <CheckIcon />
                                </SelectBase.ItemIndicator>
                            </SelectBase.Item>
                        ))}
                    </SelectBase.Viewport>
                    <SelectBase.ScrollDownButton className={cls.scrollButton}>
                        <ChevronDownIcon />
                    </SelectBase.ScrollDownButton>
                </SelectBase.Content>
                </SelectBase.Portal>
        </SelectBase.Root>
    );
};
