import { HugeiconsIcon } from "@hugeicons/react";
import { Loading02Icon } from "@hugeicons-pro/core-solid-rounded";

const FullPageLoader = () => {
  return (
    <div className="w-full h-fit min-h-screen flex flex-col justify-center items-center text-primary">
      <HugeiconsIcon icon={Loading02Icon} className="animate-spin" size={48} />
    </div>
  );
};

export default FullPageLoader;
