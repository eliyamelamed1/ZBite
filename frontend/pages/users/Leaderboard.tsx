import React from 'react';
import { loadLeaderboardAction } from '../../redux/actions/userActions';
import store from '../../redux/store';

const Leaderboard = (props) => {
    console.log(props.listOfLeaderboardUsers);
    return <div>asdasd</div>;
};
export async function getStaticProps() {
    await store.dispatch(loadLeaderboardAction());
    const { listOfLeaderboardUsers } = store.getState().userReducer;

    return { props: { listOfLeaderboardUsers }, revalidate: 10 };
}

export default Leaderboard;
