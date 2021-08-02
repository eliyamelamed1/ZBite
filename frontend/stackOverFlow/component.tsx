import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { testAction } from '../redux/actions/user';

const Component = () => {
    const dispatch = useDispatch();
    const [button, setButton] = useState('');
    const { loggedUserData } = useSelector((state) => state.userReducer);

    useEffect(() => {
        console.log(loggedUserData);
        try {
            if (loggedUserData) {
                setButton('enable');
            } else {
                setButton('disable');
            }
        } catch {}
    }, [dispatch, loggedUserData]);

    const onSubmit = (e) => {
        e.preventDefault();
        try {
            dispatch(testAction());
        } catch {}
    };

    return (
        <div>
            <form onSubmit={(e) => onSubmit(e)}>
                <button>{button}</button>
            </form>
        </div>
    );
};

export default Component;
