import { CheckCircledIcon, CheckIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import { Button } from "@src/components/Button";
import { Input } from "@src/components/Input";
import { Loader } from "@src/components/Loader";
import { Modal, ModalTitle } from "@src/components/Modal";
import { Stack } from "@src/components/Stack";
import { Paragraph } from "@src/components/Typography";
import { ROUTES } from "@src/constants/routes";
import { ALHPANUM_UNDERSCORE_DOT } from "@src/schemas/short";
import { trpc } from "@src/utils/trpc";
import useDebounce from "@src/utils/useDebounce";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-hot-toast";

import cls from './ShortModal.module.scss';

interface Props {
    open: boolean;
    onOpenChange: (value: boolean) => void;
}

export const ShortModal: React.FC<Props> = ({ open, onOpenChange }) => {
    const { push } = useRouter();

    const [short, setShort] = React.useState('');

    const handleShortChange = React.useCallback<React.ChangeEventHandler<HTMLInputElement>>(e => {
        setShort(e.target.value);
    }, []);

    const { mutateAsync, isLoading: mutationLoading } = trpc.registrar.setShort.useMutation();

    const { data: currentShort } = trpc.registrar.short.useQuery(undefined, {
        onSuccess: str => str && setShort(prev => prev ? prev : str),
        enabled: open,
    });

    const debouncedShort = useDebounce(short, 500);

    const notTouched = currentShort === short;
    const wrong = !ALHPANUM_UNDERSCORE_DOT.test(short)
    const disabled = short.length < 3 || notTouched || wrong || debouncedShort !== short;

    const { data: valid, isLoading } = trpc.registrar.checkShort.useQuery({
        slug: debouncedShort,
    }, {
        enabled: !disabled,
        refetchOnWindowFocus: false,
    });

    const suffix = React.useMemo(() => {
        if (notTouched) {
            return null;
        }
        if (disabled) {
            return <CrossCircledIcon />
        }
        if (isLoading) {
            return <Loader />
        }
        if (valid) {
            return <CheckCircledIcon />
        }
        return <CrossCircledIcon />
    }, [valid, isLoading, disabled, notTouched]);

    const saveShort = React.useCallback(() => {
        mutateAsync({ slug: short }).then((res) => {
            if (res) {
                toast.success('Short link set');
                push(`/s/${short}`);
                onOpenChange(false);
            } else {
                toast.error('Failed to set short link');
            }
        })
    }, [mutateAsync, short, push, onOpenChange]);

    return (
        <Modal open={open} onOpenChange={onOpenChange}>
            <ModalTitle>Short link</ModalTitle>
            <Paragraph size="small" gutterBottom>Get or change short link to your schedule.</Paragraph>
            <Stack direction="column" gap={8}>
                <Input
                    placeholder="slug"
                    fullWidth
                    prefix={ROUTES.SCHEDULE_SHORT.getWithParams({ id: '' })}
                    suffix={(
                        <div className={cls.suffix}>
                            {suffix}
                        </div>
                    )}
                    value={short}
                    onChange={handleShortChange}
                />
                <Button isLoading={mutationLoading} onClick={saveShort} disabled={disabled || !valid} icon={<CheckIcon />} variant="primary">Save</Button>
                <Button onClick={() => onOpenChange(false)}>Cancel</Button>
            </Stack>
        </Modal>
    )
}
