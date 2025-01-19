import Link from "next/link";

const page = () => {
  return (
    <div className="px-6 py-5">
      <div className="max-w-2xl-container mx-auto">
        <h1 className="text-xl font-bold ">Page Created </h1>
        <div>
          <Link
            href={"/music/choose-format"}
            className="text-blue-500 hover:underline hover:text-blue-600"
          >
            Choose Format
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
