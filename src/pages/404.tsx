import { Head } from "@src/components/Head";
import { ROUTES } from "@src/constants/routes";
import { Error } from "@src/features/error";
import type { NextPage } from "next";

const NotFound: NextPage = () => {
    return (
        <>
            <Head
                title="Not Found"
                description="The page you are trying to access does not exist"
                url={ROUTES.PRIVATE.get({ full: true })}
            />
            <Error
                title="Not Found"
                text="The page you are trying to access does not exist"
            />
        </>
    );
}

export default NotFound;
