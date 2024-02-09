import { UserButton, currentUser } from "@clerk/nextjs";

const Navbar = async() => {

    const user = await currentUser();

    return (
        <div className="w-full px-3 h-full flex justify-between items-center bg-white border-b border-zinc-200">
            <div className="text-lg font-semibold">Hello, {user?.firstName} {user?.lastName}</div>
            <div><UserButton afterSignOutUrl="/" /></div>
        </div>
    );
}

export default Navbar;