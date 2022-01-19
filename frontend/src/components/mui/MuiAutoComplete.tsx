import { Fragment, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Autocomplete from '@mui/material/Autocomplete';
import { RootState } from '../../redux/store';
import Router from 'next/router';
import TextField from '@mui/material/TextField';
import { debounce } from 'lodash';
import { pageRoute } from '../../enums';
import { searchRecipeAction } from '../../redux/actions/recipeActions';
import styles from '../../styles/mui/MuiAutoComplete.module.scss';

interface Recipe {
    title?: string;
    [key: string]: any;
}

export default function MuiAutoComplete() {
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState('');
    const { listOfAutoCompleteRecipes } = useSelector((state: RootState) => state.recipeReducer);

    const deb = useCallback(
        debounce((e) => {
            setSearchValue(e.target.value);
        }, 500),
        [searchValue]
    );

    const onChange = (e) => {
        deb(e);
    };

    useEffect(() => {
        if (searchValue?.trim()) {
            dispatch(searchRecipeAction(searchValue));
            console.log('dispatched');
        }
    }, [searchValue, dispatch]);

    const [options, setOptions] = useState<readonly Recipe[]>([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    useEffect(() => {
        if (!Array.isArray(listOfAutoCompleteRecipes)) return;

        setOptions([...listOfAutoCompleteRecipes]);
    }, [listOfAutoCompleteRecipes]);

    const onSubmit = () => {
        Router.push('/Search');
    };

    return (
        <Autocomplete
            freeSolo={true}
            onInputChange={onChange}
            // onChange={(option, recipe) => {
            //     Router.push('/');

            //     // if (recipe?.title) redirect to search/recipe.title/
            //     // else  redirect to search/recipe/
            // }}
            onChange={onSubmit}
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
