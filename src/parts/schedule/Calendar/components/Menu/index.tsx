import { CalendarIcon, CopyIcon, FileIcon, HeartIcon, Link1Icon, Share2Icon, UpdateIcon } from '@radix-ui/react-icons';
import splitbee from '@splitbee/web';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { toast } from 'react-hot-toast';
import QRCode from 'react-qr-code';

import { Adaptive } from '@src/components/Adaptive';
import { Button } from '@src/components/Button';
import { Card } from '@src/components/Card';
import { Copyright } from '@src/components/Copyright';
import { Divider } from '@src/components/Divider';
import { Input } from '@src/components/Input';
import { Stack } from '@src/components/Stack';
import { Switch } from '@src/components/Switch';
import { Text } from '@src/components/Typography';
import { ROUTES } from '@src/constants/routes';
import { trpc } from '@src/utils/trpc';

interface MenuProps {
    isSharable: boolean;
    isOwner: boolean;
    url: string;
    name: string;
    setPrintModal: (value: boolean) => void;
    setShortModal: (value: boolean) => void;
}

export const Menu: React.FC<MenuProps> = ({
    isSharable,
    isOwner,
    url,
    name,
    setPrintModal,
    setShortModal,
}) => {
    const { query } = useRouter();

    const [sharable, setSharable] = React.useState(isSharable);

    const copyLink = React.useCallback(async () => {
        navigator.clipboard.writeText(url);
        toast.success('Copied to clipboard!');
    }, [url]);

    const shareLink = React.useCallback(async () => {
        splitbee.track('Share');
        if (typeof navigator.share !== 'undefined') {
            await navigator.share({
                title: 'Schedule',
                url,
            });
        } else {
            copyLink();
        }
    }, [url, copyLink]);

    const isShort = url.includes(ROUTES.SCHEDULE_SHORT.getWithParams({ id: '' }));

    const { mutateAsync: share, isLoading: shareLoading } = trpc.registrar.share.useMutation({
        onSuccess: (value) => {
            !value ? toast('Now your schedule is private') : toast.success('You can share your schedule now');
            setSharable(value);
        },
    });

    if (!isOwner) {
        return (
            <Stack direction="column" gap={12} fullWidth>
                <Text size="small" color="secondary">You are viewing {name}&apos;s schedule</Text>
                <Link href={ROUTES.AUTH.get()}>
                    <Button variant="primary" fullWidth icon={<HeartIcon />}>Sign in</Button>
                </Link>
            </Stack>
        );
    }

    return (
        <Stack direction="column" justifyContent="space-between" fullWidth gap={24}>
            <Stack
                direction="column"
                gap={12}
                fullWidth
            >
                <Stack justifyContent="space-between" alignItems="center">
                    <Text size="small" color="secondary">
                        Share your schedule
                    </Text>
                    <Switch checked={sharable} onCheckedChange={share} isLoading={shareLoading} />
                </Stack>
                <Divider noMargin />
                {
                    sharable ? (
                        <>
                            <Adaptive
                                mobile={(
                                    <Stack direction="column" gap={12}>
                                        <Card>
                                            <QRCode
                                                value={url || 'none'}
                                                bgColor="var(--c-bg)"
                                                fgColor="var(--c-text)"
                                                style={{
                                                    height: 'auto',
                                                    maxWidth: '100%',
                                                    minWidth: '100%',
                                                    display: 'block',
                                                }}
                                            />
                                        </Card>
                                        <Button variant="primary" onClick={shareLink} icon={<Share2Icon />} fullWidth>Share</Button>
                                    </Stack>
                                )}
                                desktop={
                                    <Stack gap={8}>
                                        <Input value={url} disabled fullWidth />
                                        <Button variant="primary" onClick={copyLink} icon={<CopyIcon />} />
                                    </Stack>
                                }
                            />
                            {isShort ? null : (
                                <Button onClick={() => setShortModal(true)} fullWidth icon={<Link1Icon />}>
                                    Shorten link
                                </Button>
                            )}
                        </>
                    ) : null
                }
                <Button icon={<FileIcon />} onClick={() => setPrintModal(true)}>
                    Export as PDF
                </Button>
                <Link href={`/api/cal/${query.id}`} download>
                    <Button fullWidth icon={<CalendarIcon />}>Download iCal</Button>
                </Link>
                <Divider noMargin />
                <Link href={ROUTES.SCHEDULE.get({ query: { refetch: 1 } })}>
                    <Button fullWidth icon={<UpdateIcon />}>
                        Resync schedule
                    </Button>
                </Link>
            </Stack>
            <Stack direction="column" gap={12}>
                <Copyright />
            </Stack>
        </Stack>
    );
};
