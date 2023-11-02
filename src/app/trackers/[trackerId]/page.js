import BackButton from "../../../ui/BackButton";

const TrackerPage = ({ params }) => {
    return (
        <>
            <p>page for tracker {params.trackerId}</p>

            <BackButton backLocation="viewTrackers" />
        </>
    );
};

export default TrackerPage;