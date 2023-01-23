import { Link2Icon } from '@radix-ui/react-icons';
import React from 'react';
import { toast } from 'react-hot-toast';

import { Button } from '@src/components/Button';
import { TextArea } from '@src/components/Input';
import { Stack } from '@src/components/Stack';
import { trpc } from '@src/utils/trpc';

import { Attachment } from '../Attachment';
import { getFileFromInput } from './utils';

const MAX_LENGTH = 1024;

interface NewPostProps {
    sub: string;
    onSuccess: () => void;
}

interface FileWithId {
    file: File;
    id: string;
}

export const NewPost: React.FC<NewPostProps> = ({ sub, onSuccess }) => {
    // const utils = trpc.useContext();
    const { mutateAsync: getUrl } = trpc.posts.getAttachmentUploadUrl.useMutation();

    const [content, setContent] = React.useState('');
    const [attachments, setAttachemnts] = React.useState<string[]>([]);
    const [files, setFiles] = React.useState<FileWithId[]>([]);

    const inputRef = React.useRef<HTMLInputElement>(null);

    const tooLong = content.length > MAX_LENGTH;

    const handleContentChange = React.useCallback<React.ChangeEventHandler<HTMLTextAreaElement>>(e => {
        setContent(e.target.value);
    }, []);

    const { mutateAsync: post, isLoading: isAdding } = trpc.posts.addPost.useMutation({
        onSuccess: () => {
            setContent('');
            onSuccess();
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    const isDisabled = tooLong || isAdding || !content || files.length > 0;

    const handleAdd = React.useCallback(() => {
        if (isDisabled) return;
        post({ content, sub, attachments }).then(() => {
            setAttachemnts([]);
            setFiles([]);
        });
    }, [content, post, sub, attachments, isDisabled]);

    const handleSubmit = React.useCallback<React.FormEventHandler<HTMLFormElement>>(e => {
        e.preventDefault();
        handleAdd();
    }, [handleAdd]);

    const handleKeyDown = React.useCallback<React.KeyboardEventHandler<HTMLFormElement>>((e) => {
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            handleAdd();
        }
    }, [handleAdd]);

    const onUploaded = React.useCallback((fileId: string, newId: string) => {
        setFiles(files => files.filter(file => file.id !== fileId));
        setAttachemnts(attachments => [...attachments, newId]);
    }, []);

    const handleUpload = React.useCallback(async ({ file, id }: FileWithId) => {
        const formData = new FormData();
        formData.append('file', file);
        getUrl()
            .then(url => {
                fetch(url, {
                    method: 'POST',
                    body: formData,
                })
                    .then(res => res.json() as unknown as { id: string })
                    .then(data => {
                        if (data.id) {
                            onUploaded(id, data.id);
                        }
                    });
        });
    }, [onUploaded, getUrl]);

    const handleFileChange = React.useCallback<React.ChangeEventHandler<HTMLInputElement>>(async (e) => {
        const file = await getFileFromInput(e);
        if (!file) return;
        const fileWithId = {
            file,
            id: `${file.name}_${new Date().getTime()}`,
        };
        setFiles(files => [...files, fileWithId]);
        handleUpload(fileWithId);
    }, [handleUpload]);

    const handleFileUploadClick = React.useCallback(() => {
        inputRef.current?.click();
    }, []);

    const handleRemove = React.useCallback((id: string) => {
        setAttachemnts(attachments => attachments.filter(attachment => attachment !== id));
    }, []);

    const noMoreAttachments = attachments.length + files.length >= 2;

    return (
        <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
            <Stack direction="column" gap={8}>
                <TextArea style={{
                    minHeight: 120,
                }} value={content} fullWidth maxLength={MAX_LENGTH} onChange={handleContentChange} placeholder="Say something..." />
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    style={{
                        display: 'none',
                    }}
                    onChange={handleFileChange}
                />
                <Stack alignItems="center" gap={8}>
                    {attachments.map(id => (
                        <Attachment key={id} fileId={id} onRemoved={handleRemove} />
                    ))}
                    {files.map(({ file, id }) => (
                        <Attachment key={id} fileId={id} file={file} />
                    ))}
                </Stack>
                <Stack gap={8}>
                    <Button disabled={noMoreAttachments} onClick={handleFileUploadClick} icon={<Link2Icon />} />
                    <Button fullWidth isLoading={isAdding} disabled={isDisabled} type="submit" variant="primary">Post</Button>
                </Stack>
            </Stack>
        </form>
    );
};
