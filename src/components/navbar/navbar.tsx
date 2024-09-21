import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { userSignOutAction } from "@/app/actions/authActions";
import ModeToggle from "../theme";

export default async function Navbar() {
    const session = await auth();

    return (
        <nav className="flex justify-between items-center py-3 px-4 bg-white shadow-md">
            <Link href="/" className="text-xl font-bold text-black">
                EventGREEK
            </Link>
            <div className="flex justify-between">
                {
                    session && (
                        <Link href="/createdevents">
                            <Button variant="default" className="flex mr-2 dark:bg-slate-800 dark:text-white">Create Events</Button>
                        </Link>
                    )
                }
                {!session ?
                    (
                        <Link href="/auth/signin">
                            <Button className="dark:bg-slate-800 dark:text-white" variant="default">Sign In</Button>
                        </Link>
                    ) : (
                        <form action={userSignOutAction}>
                            <Button className="dark:bg-slate-800 dark:text-white mr-2" variant="default" type="submit">
                                Sign Out
                            </Button>
                        </form>
                    )}

                    <ModeToggle />

            </div>
        </nav>
    );
}