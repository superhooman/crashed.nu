import HeadTag from 'next/head';

import { DOMAIN } from '@src/constants/routes';

interface HeadProps {
    title: string;
    description: string;
    url: string;
    image?: string;
}

export const Head: React.FC<HeadProps> = ({
    title,
    description,
    url,
    image = `${DOMAIN}/cover2.png`
}) => {
    return (
        <HeadTag>
                <title>{title}</title>
                <meta name="title" content={title} />
                <meta name="description" content={description} />

                <meta property="og:type" content="website" />
                <meta property="og:url" content={url} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={image} />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={url} />
                <meta property="twitter:title" content={title} />
                <meta property="twitter:description" content={description} />
                <meta property="twitter:image" content={image} />
        </HeadTag>
    );
};
