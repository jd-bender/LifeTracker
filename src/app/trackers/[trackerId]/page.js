import BackToHomePageButton from "../../../ui/BackButton";

const TrackerPage = ({ params }) => {
    return (
        <>
            <p>page for tracker {params.trackerId}</p>

            <BackToHomePageButton backLocation="viewTrackers" />
        </>
    );
};

export default TrackerPage;