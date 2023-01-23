import React from 'react';

import { Attachment as AttachmentComponent } from '@src/components/Attachment';
import { getAttachmentUrl } from '@src/constants/storage';

interface AttachmentProps {
    file?: File;
    fileId: string;
    onRemoved?: (id: string) => void;
}

export const Attachment: React.FC<AttachmentProps> = ({ file, fileId, onRemoved }) => {
    const url = React.useMemo(() => {
        if (!file) return getAttachmentUrl(fileId);
        return URL.createObjectURL(file);
    }, [file, fileId]);

    const handleRemove = React.useCallback(() => {
        onRemoved?.(fileId);
    }, [fileId, onRemoved]);

    return (
        <AttachmentComponent
            url={url}
            isUploading={Boolean(file)}
            onRemove={handleRemove}
        />
    );
};
