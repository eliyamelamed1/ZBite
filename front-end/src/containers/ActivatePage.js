// this page currently is not used (cause we disabled activate email on the backend)

import React, { useState } from 'react';

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { verify } from '../redux/actions/auth';

const activatePage = (props) => {
    const [verified, setVerified] = useState(false);

    const verify_account = () => {
        const { uid } = props.match.params;
        const { token } = props.match.params;

        props.verify(uid, token);
        setVerified(true);
    };

    if (verified) return <Redirect to='/' />;

    return (
        <div data-testid='activatePage'>
            <div>
                <h1>Verify your Account</h1>
                <button onClick={verify_account} type='button'>
                    Verify
                </button>
            </div>
        </div>
    );
};

export default connect(null, { verify })(activatePage);
