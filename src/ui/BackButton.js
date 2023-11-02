import Link from "next/link";
import { blueButton, bottomRightAbsolute } from "./styles";

const BackButton = (props) => (
    <Link href={`/${props.backLocation || ""}`}>
        <button className={`${blueButton} ${bottomRightAbsolute}`}>Back</button>
    </Link>
);

export default BackButton;