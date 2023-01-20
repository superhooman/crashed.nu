import clsx from "clsx";
import ReactMarkdown from 'react-markdown';
import type { Position } from 'react-markdown/lib/ast-to-react';
import type { Node } from "react-markdown/lib/rehype-filter";
import remarkGfm from 'remark-gfm';

import cls from './ContentRenderer.module.scss';

interface ContentRendererProps {
    content: string;
    className?: string;
}

const fallback = (content: string) => {
    const Fallback = ({ node }: { node: Node }) => {
        const payload = getOriginalPayload(content, node.position);
        return <span className={cls.fallback}>{payload}</span>
    }
    return Fallback;
}

const getOriginalPayload = (input: string, position?: Position) => {
    if (!position) {
        return ''
    }
    const lines = input.split('\n');
    const start = position.start.line - 1;
    const end = position.end.line;
    const payload = lines.slice(start, end).join('\n');
    return payload;
}

const IGNORE = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hr', 'img', 'table', 'input'];

const components = (content: string) => IGNORE.reduce((acc, tag) => {
    acc[tag] = fallback(content);
    return acc;
}, {} as Record<string, React.FC<{ node: Node }>>);

export const ContentRenderer: React.FC<ContentRendererProps> = ({ content, className }) => {
    return (
        <ReactMarkdown
            className={clsx(cls.root, 'markdown-body', className)}
            components={components(content)}
            skipHtml={true}
            remarkPlugins={[remarkGfm]}
        >
            {content}
        </ReactMarkdown>
    )
}