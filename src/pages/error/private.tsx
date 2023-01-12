import { Head } from "@src/components/Head";
import { ROUTES } from "@src/constants/routes";
import { Error } from "@src/features/error";
import type { NextPage } from "next";

const PrivatePage: NextPage = () => {
    return (
        <>
            <Head
                title="A private schedule"
                description="The schedule you are trying to access is private"
                url={ROUTES.PRIVATE.get({ full: true })}
            />
            <Error
                title="Private"
                text="The schedule you are trying to access is private"
            />
        </>
    );
}

export default PrivatePage;
