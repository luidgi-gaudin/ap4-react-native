type ColorVariants = {
    light: string;
    main: string;
    dark: string;
};

type TextColors = {
    primary: string;
    secondary: string;
    disabled: string;
};

type SystemColors = {
    ios: string;
    android: string;
};

type Colors = {
    primary: ColorVariants;
    secondary: ColorVariants;
    success: ColorVariants;
    warning: ColorVariants;
    error: ColorVariants;
    info: ColorVariants;
    background: ColorVariants;
    text: TextColors;
    divider: string;
    border: string;
    system: {
        statusBar: SystemColors;
        ripple: string;
    };
};

export const colors: Colors = {
    primary: {
        light: '#66B2FF',
        main: '#007AFF',
        dark: '#0055B2'
    },
    secondary: {
        light: '#A6ACB2',
        main: '#6C757D',
        dark: '#495057'
    },
    success: {
        light: '#48C774',
        main: '#28A745',
        dark: '#1E7E34'
    },
    warning: {
        light: '#FFD54F',
        main: '#FFC107',
        dark: '#FFA000'
    },
    error: {
        light: '#EF5350',
        main: '#DC3545',
        dark: '#C62828'
    },
    info: {
        light: '#4FC3F7',
        main: '#17A2B8',
        dark: '#0288D1'
    },
    background: {
        light: '#FFFFFF',
        main: '#F8F9FA',
        dark: '#121212'
    },
    text: {
        primary: '#212529',
        secondary: '#6C757D',
        disabled: '#ADB5BD'
    },
    divider: '#E9ECEF',
    border: '#DEE2E6',
    system: {
        statusBar: {
            ios: '#000000',
            android: '#000000'
        },
        ripple: '#00000020'
    }
} as const;