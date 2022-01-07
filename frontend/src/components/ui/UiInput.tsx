import React from 'react';
import styles from '../../styles/ui/UiInput.module.scss';

interface DataTypes {
    type: string;
    placeholder: string;
    name: string;
    value: any;
    onChange: any;
    required: boolean;
}
const UiInput: React.FC<DataTypes> = React.memo(({ type, placeholder, name, value, onChange, required = false }) => {
    const input = () => {
        if (required)
            return (
                <input
                    className={styles.input}
                    required
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    onChange={(e) => onChange(e)}
                />
            );
        return (
            <input
                className={styles.input}
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={(e) => onChange(e)}
            />
        );
    };
    return <>{input()}</>;
});

export default UiInput;
