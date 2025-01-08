import { Skeleton } from "./ui/skeleton";

function Loading() {
  return (
    <div className="items-center flex flex-col">
      <Skeleton className="w-[80%] h-[40px] bg-white rounded-xl mt-5" />
      <Skeleton className="w-[350px] h-[220px] max-w-[80%] bg-white  rounded-xl my-6" />
      {Array.from({ length: 4 }).map((_, index) => {
        return (
          <Skeleton
            key={index}
            className="w-[80%] h-12 bg-white rounded-xl mb-1"
          />
        );
      })}
    </div>
  );
}
export default Loading;
