export default function LoadingOverlay({loadingText}){

    return (
        <div
    className="fixed inset-0 flex justify-center items-center bg-[#1b325e] bg-opacity-50"
    style={{
    zIndex: 9999,
    }}
    >
    <div className="loader text-white text-xl">{loadingText}</div>
    </div>
    )
}
    