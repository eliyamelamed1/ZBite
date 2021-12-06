import Image from 'next/image';
import React from 'react';
import { loadLeaderboardAction } from '../../redux/actions/userActions';
import profileIcon from '../../styles/icons/upload_image.svg';
import scoreIcon from '../../styles/icons/score-icon.svg';
import store from '../../redux/store';
import styles from '../../styles/pages/leaderboard.module.scss';

const Leaderboard = (props) => {
    const firstContainer = (
        <ul className={styles.firstContainer}>
            <div className={styles.first_place}>
                <li>
                    <section className={styles.image_and_name_section}>
                        {profileIcon.src && (
                            <Image src={profileIcon.src} height={100} width={100} alt='profile picture' />
                        )}
                        <span className={styles.full_name}>Full Name</span>
                    </section>
                    <section className={styles.score_section}>
                        {scoreIcon.src && <Image src={scoreIcon.src} height={100} width={100} alt='profile picture' />}
                        <span className={styles.score_text}>Score: 2.0K</span>
                    </section>
                </li>
                <span className={styles.ranking_placement}>1</span>
            </div>
            <div className={styles.second_place}>
                <li>
                    <section className={styles.image_and_name_section}>
                        {profileIcon.src && (
                            <Image src={profileIcon.src} height={100} width={100} alt='profile picture' />
                        )}
                        <span className={styles.full_name}>Full Name</span>
                    </section>
                    <section className={styles.score_section}>
                        {scoreIcon.src && <Image src={scoreIcon.src} height={100} width={100} alt='profile picture' />}
                        <span className={styles.score_text}>Score: 2.0K</span>
                    </section>
                </li>
                <span className={styles.ranking_placement}>2</span>
            </div>

            <div className={styles.third_place}>
                <li>
                    <section className={styles.image_and_name_section}>
                        {profileIcon.src && (
                            <Image src={profileIcon.src} height={100} width={100} alt='profile picture' />
                        )}
                        <span className={styles.full_name}>Full Name</span>
                    </section>
                    <section className={styles.score_section}>
                        {scoreIcon.src && <Image src={scoreIcon.src} height={100} width={100} alt='profile picture' />}
                        <span className={styles.score_text}>Score: 2.0K</span>
                    </section>
                </li>
                <span className={styles.ranking_placement}>3</span>
            </div>
        </ul>
    );

    const secondContainer = (
        <ul className={styles.secondContainer}>
            <li>
                <section className={styles.image_name_and_placement_section}>
                    <span className={styles.ranking_placement}>04</span>
                    {profileIcon.src && <Image src={profileIcon.src} height={100} width={100} alt='profile picture' />}
                    <span className={styles.full_name}>Full Name</span>
                </section>
                <section className={styles.score_section}>
                    {scoreIcon.src && <Image src={scoreIcon.src} height={100} width={100} alt='profile picture' />}
                    <span className={styles.score_text}>Score: 2.0K</span>
                </section>
            </li>
            <li>
                <section className={styles.image_name_and_placement_section}>
                    <span className={styles.ranking_placement}>04</span>
                    {profileIcon.src && <Image src={profileIcon.src} height={100} width={100} alt='profile picture' />}
                    <span className={styles.full_name}>Full Name</span>
                </section>
                <section className={styles.score_section}>
                    {scoreIcon.src && <Image src={scoreIcon.src} height={100} width={100} alt='profile picture' />}
                    <span className={styles.score_text}>Score: 2.0K</span>
                </section>
            </li>
            <li>
                <section className={styles.image_name_and_placement_section}>
                    <span className={styles.ranking_placement}>04</span>
                    {profileIcon.src && <Image src={profileIcon.src} height={100} width={100} alt='profile picture' />}
                    <span className={styles.full_name}>Full Name</span>
                </section>
                <section className={styles.score_section}>
                    {scoreIcon.src && <Image src={scoreIcon.src} height={100} width={100} alt='profile picture' />}
                    <span className={styles.score_text}>Score: 2.0K</span>
                </section>
            </li>
            <li>
                <section className={styles.image_name_and_placement_section}>
                    <span className={styles.ranking_placement}>04</span>
                    {profileIcon.src && <Image src={profileIcon.src} height={100} width={100} alt='profile picture' />}
                    <span className={styles.full_name}>Full Name</span>
                </section>
                <section className={styles.score_section}>
                    {scoreIcon.src && <Image src={scoreIcon.src} height={100} width={100} alt='profile picture' />}
                    <span className={styles.score_text}>Score: 2.0K</span>
                </section>
            </li>
            <li>
                <section className={styles.image_name_and_placement_section}>
                    <span className={styles.ranking_placement}>04</span>
                    {profileIcon.src && <Image src={profileIcon.src} height={100} width={100} alt='profile picture' />}
                    <span className={styles.full_name}>Full Name</span>
                </section>
                <section className={styles.score_section}>
                    {scoreIcon.src && <Image src={scoreIcon.src} height={100} width={100} alt='profile picture' />}
                    <span className={styles.score_text}>Score: 2.0K</span>
                </section>
            </li>
            <li>
                <section className={styles.image_name_and_placement_section}>
                    <span className={styles.ranking_placement}>04</span>
                    {profileIcon.src && <Image src={profileIcon.src} height={100} width={100} alt='profile picture' />}
                    <span className={styles.full_name}>Full Name</span>
                </section>
                <section className={styles.score_section}>
                    {scoreIcon.src && <Image src={scoreIcon.src} height={100} width={100} alt='profile picture' />}
                    <span className={styles.score_text}>Score: 2.0K</span>
                </section>
            </li>
            <li>
                <section className={styles.image_name_and_placement_section}>
                    <span className={styles.ranking_placement}>04</span>
                    {profileIcon.src && <Image src={profileIcon.src} height={100} width={100} alt='profile picture' />}
                    <span className={styles.full_name}>Full Name</span>
                </section>
                <section className={styles.score_section}>
                    {scoreIcon.src && <Image src={scoreIcon.src} height={100} width={100} alt='profile picture' />}
                    <span className={styles.score_text}>Score: 2.0K</span>
                </section>
            </li>
        </ul>
    );

    return (
        <div className={styles.mainContainer}>
            {firstContainer}
            {secondContainer}
        </div>
    );
};
export async function getStaticProps() {
    await store.dispatch(loadLeaderboardAction());
    const { listOfLeaderboardUsers } = store.getState().userReducer;

    return { props: { listOfLeaderboardUsers }, revalidate: 10 };
}

export default Leaderboard;
