import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Knowledge from "../components/Knowledge";

interface HomeProps {
    children: React.ReactNode;
}

function HomeLayout(props: HomeProps) {
    const [isLoaded, setLoaded] = useState(false);
    const router = useRouter();
    // state functions
    useEffect(() => {
        setLoaded(true);
    }, []);

    if (!isLoaded) {
        return <></>;
    }
    return (
        <>
            <div
                className="w-screen h-screen absolute top-0 left-0"
                style={{
                    backgroundImage: 'url("/img/14687.png")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'bottom center',
                    backgroundRepeat: 'no-repeat',
                }}
            />
            <Knowledge>
                <canvas width="1700" height="500" id="patchy-main" className="fixed" />
            </Knowledge>
            <header id="main-header" className="h-full">
                <div id="main-header-center" className="min-h-screen w-full">
                    <div className="flex justify-center items-center min-h-screen h-full">
                        {props.children}
                    </div>
                </div>
            </header>
        </>
    );
}

export default HomeLayout;