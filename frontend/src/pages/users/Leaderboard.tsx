import React from 'react';
import UiCircleImage from '../../components/ui/UiCircleImage';
import emptyImageIcon from '../../assets/icons/upload_image.svg';
import { loadLeaderboardAction } from '../../redux/actions/userActions';
import scoreIcon from '../../assets/icons/score-icon.svg';
import store from '../../redux/store';
import styles from '../../styles/pages/leaderboard.module.scss';

interface User {
    photo_main?: { src: string };
    name: string;
    score: number;
}
interface DataTypes {
    listOfLeaderboardUsers: User[];
}

const Leaderboard: React.FC<DataTypes> = (props) => {
    const { listOfLeaderboardUsers } = props;
    for (let i = 0; i < 10; i++) {
        if (listOfLeaderboardUsers?.[i] == undefined) listOfLeaderboardUsers[i] = null;
    }

    const topThreeUsers = listOfLeaderboardUsers?.slice(0, 3);
    const lastSevenUsers = listOfLeaderboardUsers?.slice(-7);

    const threeUsersContainer = (
        <ul className={styles.threeUsersContainer}>
            {topThreeUsers.map((user, index) => (
                <div key={index} className={styles.card}>
                    <li>
                        <section className={styles.image_container}>
                            {user?.photo_main?.src ? (
                                <UiCircleImage src={user?.photo_main?.src} />
                            ) : (
                                emptyImageIcon.src && <UiCircleImage src={emptyImageIcon.src} />
                            )}
                        </section>
                        <span className={styles.full_name}>{user?.name}</span>
                        <section className={styles.score_section}>
                            {scoreIcon?.src && <UiCircleImage src={scoreIcon?.src} />}
                            {user?.score ? (
                                <span className={styles.score_text}>{user?.score.toFixed(1)}</span>
                            ) : (
                                <span className={styles.score_text}>0</span>
                            )}
                        </section>
                    </li>
                    <span className={styles.ranking_placement}>{index + 1}</span>
                </div>
            ))}
        </ul>
    );

    const sevenUsersContainer = (
        <ul className={styles.sevenUsersContainer}>
            {lastSevenUsers.map((user, index) => (
                <li key={index}>
                    <section className={styles.image_name_and_placement_section}>
                        <span className={styles.ranking_placement}>{index + 4}</span>

                        <section className={styles.image_container}>
                            {user?.photo_main?.src ? (
                                <UiCircleImage src={user?.photo_main?.src} />
                            ) : (
                                emptyImageIcon.src && <UiCircleImage src={emptyImageIcon.src} />
                            )}
                        </section>
                        <span className={styles.full_name}>{user?.name}</span>
                    </section>
                    <section className={styles.score_section}>
                        {scoreIcon.src && <UiCircleImage src={scoreIcon.src} />}
                        {user?.score ? (
                            <span className={styles.score_text}>{user?.score}</span>
                        ) : (
                            <span className={styles.score_text}>0</span>
                        )}
                    </section>
                </li>
            ))}
        </ul>
    );

    return (
        <div className={styles.mainContainer}>
            {threeUsersContainer}
            {sevenUsersContainer}
        </div>
    );
};
export async function getStaticProps() {
    await store.dispatch(loadLeaderboardAction());
    const listOfLeaderboardUsers = store.getState().userReducer.listOfLeaderboardUsers || [];

    return { props: { listOfLeaderboardUsers }, revalidate: 10 };
}

export default Leaderboard;
