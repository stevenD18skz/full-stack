export function UserPhoto() {
  const name_user = "Ana Sofia";
  const last_user = "Cantillo";

  return (
    <div>
      <div className="w-20 h-20 rounded-full bg-blue-500 relative">
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-orange-200 text-4xl">
          {name_user[0]}
          {last_user[0]}
        </span>
      </div>
    </div>
  );
}