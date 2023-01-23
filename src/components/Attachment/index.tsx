import { Cross1Icon } from '@radix-ui/react-icons';
import Image from 'next/image';
import React from 'react';

import { Loader } from '../Loader';
import cls from './Attachment.module.scss';

interface AttachmentProps {
    url: string;
    isUploading: boolean;
    onRemove: () => void;
}

export const Attachment: React.FC<AttachmentProps> = ({
    url,
    isUploading,
    onRemove,
}) => {
    return (
        <div className={cls.root}>
            <Image
                className={cls.image}
                src={url}
                width={64}
                height={64}
                alt="Attachment"
                style={{ objectFit: 'cover' }}
            />
            {isUploading ? (
                <div className={cls.loader}>
                    <Loader />
                </div>
            ) : (
                <div className={cls.overlay}>
                    <button onClick={onRemove} className={cls.removeButton}>
                        <Cross1Icon />
                    </button>
                </div>
            )}
        </div>
    );
};
