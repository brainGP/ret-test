import Image from "next/image";
interface LoadingWaitProps {
  isLoading: boolean;
  error?: string | null;
}

export const LoadingWait: React.FC<LoadingWaitProps> = ({
  isLoading,
  error,
}) => {
  if (isLoading)
    return (
      <div className="flex justify-center items-center bg-transparent bg-opacity-80">
        <Image
          src="/icons/loading.svg"
          alt="loading"
          width={24}
          height={24}
          className="animate-spin"
        />
      </div>
    );
  if (error) return <div>Error: {error}</div>;
  return null;
};
