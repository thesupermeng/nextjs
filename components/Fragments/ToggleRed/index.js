
const textTw = 'text-[13px] font-medium';
export default function ToggleRed({ left, right, isLeft, toggle }) {
  return (
    <div
      className={`inline-flex flex-row p-[2px] gap-2 items-center justify-center common-transition cursor-pointer`}
      onClick={toggle}
    >
      <div
        className={`common-transition ${
          isLeft ? 'text-white' : 'text-white/50'
        } ${textTw}`}
      >
        {left}
      </div>
      <div
        className={`h-3 w-9 rounded-full common-transition ${
          isLeft ? 'bg-[#AAAAAA7F]' : 'bg-[#DE173E7F]'
        } relative`}
      >
        <div
          className={`absolute w-5 h-5 -top-1 rounded-full common-transition ${
            isLeft ? 'left-0 bg-[#C0C0C0]' : 'right-0 bg-tayaRed'
          }`}
        ></div>
      </div>
      <div
        className={`common-transition ${
          !isLeft ? 'text-white' : 'text-white/50'
        } ${textTw}`}
      >
        {right}
      </div>
    </div>
  );
}
