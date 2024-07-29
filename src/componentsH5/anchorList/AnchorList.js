export const AnchorList = ({ list, highlightAnchor, onClick }) => {
  return (
    <div className='absolute overflow-y-auto top-0 bottom-0 right-0 flex items-start justify-center p-2 text-xs'>
      <ul className='flex flex-col gap-1'>
        {list.map((a) => (
          <li
            key={a}
            onClick={() => {
              onClick(a);
            }}
            className={`${
              a === highlightAnchor && 'bg-tayaRed'
            } rounded-full flex items-center justify-center w-4 h-4`}
          >
            {a}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const parseAnchoredList = (keyFn, list) => {
  const anchoredObj = {};
  list.forEach((li) => {
    const key = keyFn(li);
    anchoredObj[key] = anchoredObj[key] || [];
    anchoredObj[key].push(li);
    // console.log('key', key);
  });
  return Object.keys(anchoredObj)
    .sort()
    .map((key) => {
      return { anchor: key, data: anchoredObj[key] };
    });
};
