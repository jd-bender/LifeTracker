import Link from "next/link";

const BackButton = (props) => (
    <Link href={`/${props.backLocation || ""}`}>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full absolute bottom-0 right-0 mb-16 mr-16">
            Back
        </button>
    </Link>
);

export default BackButton;
