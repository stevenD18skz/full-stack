export function UserPhoto({first_name, last_name, x, y, z}) {

  const width = `w-${x}`;
  const heigh = `h-${y}`;

  return (
    <div>
      <div className={`${width} ${heigh} rounded-full bg-blue-400 relative`}>
        <span className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-neutral-100 ${z}`}>
          {first_name[0].toUpperCase()}
          {last_name[0].toUpperCase()}
        </span>
      </div>
    </div>
  );
}