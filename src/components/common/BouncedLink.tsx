import IconPlus from "@/components/icons/IconPlus";
import Link from "next/link";

const BouncedLink = ({ url }: { url: string }) => {
  return (
    <Link
      href={url}
      className="size-10 rounded-full bg-primary flex items-center justify-center text-white fixed right-5 bottom-5 animate-bounce"
    >
      <IconPlus></IconPlus>
    </Link>
  );
};

export default BouncedLink;
