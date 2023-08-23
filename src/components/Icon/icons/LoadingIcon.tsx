import { BaseSvg, type IconProps } from '..';

export const LoadingIcon: React.FC<IconProps> = ({ size, ...props }) => (
    <BaseSvg
        size={size}
        originalSize={15}
        {...props}
    >
        <path fillRule="evenodd" clipRule="evenodd" d="M8 0.5V3.5H7V0.5H8Z" fill="currentColor"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M11.433 1.68782L9.93301 4.2859L9.06699 3.7859L10.567 1.18782L11.433 1.68782Z" fill="currentColor" fillOpacity="0.95"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M13.8122 4.43301L11.2141 5.93301L10.7141 5.06699L13.3122 3.56699L13.8122 4.43301Z" fill="currentColor" fillOpacity="0.9"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M14.5 8H11.5V7H14.5V8Z" fill="currentColor" fillOpacity="0.85"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M13.3122 11.433L10.7141 9.93301L11.2141 9.06699L13.8122 10.567L13.3122 11.433Z" fill="currentColor" fillOpacity="0.8"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M10.567 13.8122L9.06699 11.2141L9.93301 10.7141L11.433 13.3122L10.567 13.8122Z" fill="currentColor" fillOpacity="0.75"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M7 14.5V11.5H8V14.5H7Z" fill="currentColor" fillOpacity="0.7"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M3.56699 13.3122L5.06699 10.7141L5.93301 11.2141L4.43301 13.8122L3.56699 13.3122Z" fill="currentColor" fillOpacity="0.65"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M1.18782 10.567L3.7859 9.06699L4.2859 9.93301L1.68782 11.433L1.18782 10.567Z" fill="currentColor" fillOpacity="0.6"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M0.5 7H3.5V8H0.5V7Z" fill="currentColor" fillOpacity="0.55"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M1.68782 3.56699L4.2859 5.06699L3.7859 5.93301L1.18782 4.43301L1.68782 3.56699Z" fill="currentColor" fillOpacity="0.5"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M4.43301 1.18782L5.93301 3.7859L5.06699 4.2859L3.56699 1.68782L4.43301 1.18782Z" fill="currentColor" fillOpacity="0.45"/>
    </BaseSvg>
);
