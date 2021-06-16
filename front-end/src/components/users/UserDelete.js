// TODO - change PropTypes id to .isRequired
// TODO - check the redirect

import React from 'react';
import { connect } from 'react-redux';
import { userDeleteAction } from '../../redux/actions/auth';

// import { Redirect } from 'react-router-dom';

const userDelete = ({ id, userDeleteAction }) => {
    // if (redirect == true) return (<Redirect to='/' />).then(() => window.location.reload());

    const onSubmit = (e) => {
        e.preventDefault();
        userDeleteAction(id);
    };
    // add permissions
    return (
        <div data-testid='userDelete'>
            <form onSubmit={(e) => onSubmit(e)}>
                <button type='submit'>delete user</button>
            </form>
        </div>
    );
};

export default connect(null, { userDeleteAction })(userDelete);
