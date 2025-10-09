import { LoaderCircle } from "lucide-react";

const FullPageLoader = () => {
  return (
    <div className="w-full h-fit min-h-screen flex flex-col justify-center items-center text-primary">
      <LoaderCircle className="animate-spin" size={48} />
    </div>
  );
};

export default FullPageLoader;
