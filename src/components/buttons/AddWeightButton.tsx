interface AddWeightButtonProps {
    handleOpenDialog: () => void;
}

export function AddWeightButton({ handleOpenDialog }: AddWeightButtonProps) {
    return (
        <button
            onClick={handleOpenDialog}
            className="text-white font-bold w-[155px] h-[50px] rounded-3xl fixed bottom-4 left-1/2 transform -translate-x-1/2 transition-all duration-200"
            style={{
                background: 'linear-gradient(93.43deg, rgba(39, 0, 130, 0.66) 17.64%, rgba(67, 0, 223, 0.66) 84.63%)',
                boxShadow: '-2px 4px 7.3px 6px rgba(0, 0, 0, 0.15)'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(93.43deg, rgba(59, 20, 150, 0.66) 17.64%, rgba(87, 20, 243, 0.66) 84.63%)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(93.43deg, rgba(39, 0, 130, 0.66) 17.64%, rgba(67, 0, 223, 0.66) 84.63%)';
            }}
        >
            Add Weight
        </button>
    )
}