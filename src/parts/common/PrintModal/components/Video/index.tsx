import cls from './Video.module.scss';

const VIDEO_URL = 'https://eu2.contabostorage.com/6f2fd43d5d384e5199d673e08117a5ee:superhooman/resources/export_pdf.mp4';

export const Video = () => {
    return (
        <video className={cls.video} controls autoPlay playsInline muted loop>
            <source src={VIDEO_URL} type="video/mp4" />
        </video>
    );
};
