// this page currently is not used (cause we disabled activate email on the backend)

import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';

import { Redirect } from 'react-router-dom';
import { verify } from '../../redux/actions/auth';

const userActivate = (props) => {
    const dispatch = useDispatch();
    const [verified, setVerified] = useState(false);

    const verify_account = () => {
        const { uid } = props.match.params;
        const { token } = props.match.params;

        dispatch(verify(uid, token));
        setVerified(true);
    };

    if (verified) return <Redirect to='/' />;

    return (
        <div data-testid='userActivate'>
            <div>
                <h1>Verify your Account</h1>
                <button onClick={verify_account} type='button'>
                    Verify
                </button>
            </div>
        </div>
    );
};

export default connect()(userActivate);
