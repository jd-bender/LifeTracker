import Link from "next/link";

interface IBackButton {
    backLocation?: string;
}

const BackButton = ({ backLocation }: IBackButton) => (
    <Link href={`/${backLocation || ""}`}>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full fixed bottom-0 right-0 mb-10 mr-10">
            Back
        </button>
    </Link>
);

export default BackButton;
