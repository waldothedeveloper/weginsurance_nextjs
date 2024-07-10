
interface Directory {
  [key: string]: Array<{ id: number;[key: string]: any }>;
}

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const directory: Directory = {};
let idCounter = 1;

alphabet.forEach((letter) => {
  const numOfIds = Math.floor(Math.random() * 5) + 1;
  directory[letter] = Array.from({ length: numOfIds }, () => ({
    id: idCounter++,
  }));
});

export default function UserSkeleton() {
  return (
    <>
      {Object.keys(directory)
        .sort()
        .map((letter) => (
          <div key={letter} className="relative">
            <div className="sticky top-0 z-10 border-y border-b-gray-200 border-t-gray-100 bg-gray-50 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900">
              <h3>{letter}</h3>
            </div>
            <ul role="list" className="divide-y divide-gray-100 animate-pulse">
              {directory[letter].map((obj) => (
                <li key={obj.id} className="flex gap-x-4 px-3 py-5">
                  <div className="size-12 relative bg-gray-400 rounded-full" />
                  <div className="min-w-0 pt-3">
                    <p className="text-sm font-semibold leading-6 h-3 bg-gray-400 w-32 rounded-sm" />
                    <p className="mt-1 truncate text-xs leading-5 h-2 bg-gray-400 w-48 rounded-sm" />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
    </>
  );
}
