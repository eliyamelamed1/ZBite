import { Fragment, useEffect, useState } from 'react';

import Autocomplete from '@mui/material/Autocomplete';
import Router from 'next/router';
import TextField from '@mui/material/TextField';
import { pageRoute } from '../../enums';
import styles from '../../styles/mui/MuiAutoComplete.module.scss';

interface Recipe {
    title?: string;
    [key: string]: any;
}

export default function MuiAutoComplete({ onChange, data }) {
    const [options, setOptions] = useState<readonly Recipe[]>([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    useEffect(() => {
        if (!Array.isArray(data)) return;

        setOptions([...data]);
    }, [data]);

    return (
        <Autocomplete
            freeSolo={true}
            onInputChange={onChange}
            onChange={(option, recipe) => {
                // if (recipe?.title) redirect to search/recipe.title/
                // else  redirect to search/recipe/
            }}
            id='asynchronous-demo'
            open={open}
            className={styles.container}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            isOptionEqualToValue={(option, value) => option.title === value.title}
            getOptionLabel={(option) => (option?.title ? option.title : (option as unknown as string))}
            options={options}
            // loading={loading}
            renderOption={(props, option) => {
                if (!option) return;

                const { title } = option;
                return (
                    <span {...props} style={{ fontSize: 15 }}>
                        {title}
                    </span>
                );
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    size='small'
                    placeholder='Search'
                    InputProps={{
                        ...params.InputProps,
                        className: styles.optionList,
                        endAdornment: (
                            <Fragment>
                                {/* {loading && <CircularProgress color='inherit' size={20} />} */}
                                {/* <button style={{ color: 'black' }}>button that will dispatch the action</button> */}
                            </Fragment>
                        ),
                    }}
                />
            )}
        />
    );
}
