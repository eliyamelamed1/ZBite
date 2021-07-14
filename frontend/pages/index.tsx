import { connect, useSelector } from 'react-redux';

import React from 'react';

const homePage = () => {
    return (
        <React.Fragment>
            <div>home page</div>
        </React.Fragment>
    );
};

export default connect()(homePage);
