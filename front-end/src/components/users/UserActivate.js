// this page currently is not used (cause we disabled activate email on the backend)
// Test redirect after successful dispatch

import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';

import { Redirect } from 'react-router-dom';
import { verify } from '../../redux/actions/auth';

const userActivate = (props) => {
    const dispatch = useDispatch();
    const [verified, setVerified] = useState(false);

    const onSubmit = () => {
        const { uid } = props.match.params;
        const { token } = props.match.params;

        try {
            dispatch(verify({ uid, token }));
            setVerified(true);
        } catch {
            // TODO - add err msg
        }
    };

    if (verified) return <Redirect to='/' />;

    return (
        <div data-testid='userActivate'>
            <div>
                <h1>Verify your Account</h1>
                <button onClick={onSubmit} type='button'>
                    Verify
                </button>
            </div>
        </div>
    );
};

export default connect()(userActivate);
