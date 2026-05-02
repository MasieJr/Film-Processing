import Link from "next/link";

type buttonLinkProps = {
  labelText: string;
  btnLabel: string;
  goto: string;
};

export default function buttonLink({
  labelText,
  btnLabel,
  goto,
}: buttonLinkProps) {
  return (
    <div className="bg-[#F3F4F6] dark:bg-[#2c2c2c] w-full border border-gray-300 dark:border-blue-500 p-6 rounded-xl flex flex-col items-center mb-8 mx-2">
      <p className="text-center text-xl mb-6 text-black dark:text-white">
        {labelText}
      </p>

      <Link href={goto} className="w-full sm:w-auto">
        <button className="w-full sm:w-auto bg-[#143A7C] dark:bg-[#41B544] text-white rounded-xl p-4 text-2xl font-semibold transition-transform active:scale-95">
          {btnLabel}
        </button>
      </Link>
    </div>
  );
}
