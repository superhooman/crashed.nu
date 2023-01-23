import { Modal } from '@src/components/Modal';
import { getAttachmentUrl } from '@src/constants/storage';
import Image from 'next/image';

import cls from './AttachmentPreview.module.scss';

interface AttachmentPreviewProps {
    id: string;
    open: boolean;
    onOpenChange: (value: boolean) => void;
}

export const AttachmentPreview: React.FC<AttachmentPreviewProps> = ({ id, onOpenChange, open }) => {
    return (
        <Modal
            open={open}
            onOpenChange={onOpenChange}
            maxWidth="lg"
            className={cls.root}
        >
            <Image fill className={cls.attachment} src={getAttachmentUrl(id)} alt="Attachment" />
        </Modal>
    );
};
