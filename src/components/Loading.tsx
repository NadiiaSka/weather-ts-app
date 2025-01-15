import { Skeleton } from "./ui/skeleton";

function Loading() {
  return (
    <div className="items-center flex flex-col">
      <Skeleton className="w-[100%] h-[40px] bg-white rounded-lg mt-5" />
      <Skeleton className="max-w-[100%] w-[350px] h-[220px]  bg-white  rounded-xl my-6" />
      {Array.from({ length: 4 }).map((_, index) => {
        return (
          <Skeleton
            key={index}
            className="w-[100%] h-14 bg-white rounded-xl mb-1"
          />
        );
      })}
    </div>
  );
}
export default Loading;
