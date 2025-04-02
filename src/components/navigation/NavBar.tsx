import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";



export function NavBar() {

    return (
        <div className="flex justify-between justify-items-center pl-4 pr-4 pt-2 h-auto">
            <div className="flex gap-1">
                <h1 className="text-3xl text-[#4B00FB] font-bold text-center">WEIGHT</h1>
                <h1
                    className="text-3xl font-bold text-center italic text-[transparent] bg-clip-text"
                    style={{ WebkitTextStroke: "0.5px white" }}
                >
                    NOW
                </h1>
            </div>
            <div className="flex gap-3">
                <Avatar className="w-10 h-10">
                    <AvatarImage src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4866.jpg" alt="@shadcn" />
                    <AvatarFallback>
                        CN
                    </AvatarFallback>
                </Avatar>

            </div>
        </div>
    )
}