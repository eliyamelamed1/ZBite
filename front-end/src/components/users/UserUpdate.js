// TODO - change PropTypes id to .isRequired

import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userUpdateAction } from '../../redux/actions/auth';

const userUpdate = ({ id, userUpdateAction }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
    });
    const { name, email } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        userUpdateAction(id, email, name);
    };

    return (
        <div data-testid='userUpdate'>
            <form onSubmit={(e) => onSubmit(e)}>
                <div>
                    <input
                        type='text'
                        placeholder='name'
                        name='name'
                        value={name}
                        onChange={(e) => onChange(e)}
                        required
                    />
                </div>
                <div>
                    <input
                        type='text'
                        placeholder='email'
                        name='email'
                        value={email}
                        onChange={(e) => onChange(e)}
                        required
                    />
                </div>

                <button type='submit'>update user</button>
            </form>
        </div>
    );
};
userUpdate.propTypes = {
    id: PropTypes.array.isRequired,
};

export default connect(null, { userUpdateAction })(userUpdate);
