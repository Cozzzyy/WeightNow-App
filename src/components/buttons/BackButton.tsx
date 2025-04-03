import {useRouter} from "next/navigation";

export function BackButton() {
    const router = useRouter();

    function handleBackButtonClick() {
        router.back();
    }

    return (
        <button
            className="text-white font-bold w-[155px] h-[50px] rounded-3xl mt-4"
            style={{
                background: 'linear-gradient(93.43deg, rgba(39, 0, 130, 0.66) 17.64%, rgba(67, 0, 223, 0.66) 84.63%)',
                boxShadow: '-2px 4px 7.3px 6px rgba(0, 0, 0, 0.15)',
                position: 'fixed', // Fix the position at the bottom
                left: '50%', // Center horizontally
                bottom: '20px', // Distance from the bottom of the screen
                transform: 'translateX(-50%)', // Center the button precisely
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(93.43deg, rgba(59, 20, 150, 0.66) 17.64%, rgba(87, 20, 243, 0.66) 84.63%)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(93.43deg, rgba(39, 0, 130, 0.66) 17.64%, rgba(67, 0, 223, 0.66) 84.63%)';
            }}
            onClick={handleBackButtonClick}
        >
            Back
        </button>
    );
}
