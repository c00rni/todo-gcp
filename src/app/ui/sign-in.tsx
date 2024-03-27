import { User } from "firebase/auth";
import { signInWithGoogle, signOut} from "../firebase/firebase";
import Image from "next/image";

interface SignInProps {
    user: User | null;
}

export default function SignIn({user}: SignInProps) {
    return(
        <>
            {user?.photoURL && console.log(user.photoURL)}
            {user ? (
                <Image
                    onClick={signOut}
                    src={user.photoURL != null ? user.photoURL : ""}
                    width={30}
                    height={30}
                    alt="Profile picture"
                    className="cursor-pointer rounded-full"
                />
            ) : (

                <div onClick={async () => await signInWithGoogle()} className="flex justify-center items-center cursor-pointer bg-white p-[1px] rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6 text-darkBlue">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                </div>
            ) }
        </>
    )
}