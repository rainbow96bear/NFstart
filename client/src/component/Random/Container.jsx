import { useSelector } from "react-redux";
import RandomComponent from "./Component.jsx";

const RandomContainer = () => {
    const { account } = useSelector((state) => state.userInfo);

    return (
        <>
            <RandomComponent account={account} />
        </>
    );
};

export default RandomContainer;
