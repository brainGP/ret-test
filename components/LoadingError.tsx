import Image from "next/image";
interface LoadingErrorProps {
  isLoading: boolean;
  error?: string | null;
}

export const LoadingError: React.FC<LoadingErrorProps> = ({
  isLoading,
  error,
}) => {
  if (isLoading)
    return (
      <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-80">
        <Image
          src="/icons/loading.svg"
          alt="loading"
          width={50}
          height={50}
          className="animate-spin"
        />
      </div>
    );
  if (error) return <div>Error: {error}</div>;
  return null;
};
