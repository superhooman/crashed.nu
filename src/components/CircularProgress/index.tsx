import React from 'react';

interface CircularProgressProps extends React.ComponentProps<'div'> {
    size?: number;
    color?: string;
    thickness?: number;
    value?: number;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
    size = 40,
    thickness = 3.6,
    value = 0,
    className,
    ...props
}) => {
    const radius = React.useMemo(() => (size - thickness) / 2, [size, thickness]);
    const circumference = React.useMemo(() => 2 * Math.PI * radius, [radius]);
    const strokeDashoffset = React.useMemo(() => {
        if (value < 100) {
            return circumference - (value / 100) * circumference;
        }
        return 0;
    }, [circumference, value]);

    const color = React.useMemo(() => {
        if (value < 100/3) {
            return 'var(--c-red)';
        }
        if (value < 100/3*2) {
            return 'var(--c-yellow)';
        }
        return 'var(--c-primary-600)';
    }, [value]);

    return (
        <div
            className={className}
            style={{
                width: size,
                height: size,
            }}
            {...props}
        >
            <svg
                viewBox={`0 0 ${size} ${size}`}
                style={{
                    transform: 'rotate(-90deg)',
                }}
            >
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="transparent"
                    stroke="var(--c-neutral-100)"
                    strokeWidth={thickness}
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="transparent"
                    stroke={color}
                    strokeWidth={thickness}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                />
            </svg>
        </div>
    );
};
