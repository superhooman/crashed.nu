import { Modal } from "@src/components/Modal";
import { getAttachmentUrl } from "@src/constants/storage";
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
            <img className={cls.attachment} src={getAttachmentUrl(id)} />
        </Modal>
    );
};
