type LoadingSpinnerProps = {
  description: string;
};

export default function LoadingSpinner({ description }: LoadingSpinnerProps) {
  return (
    <div className="container mx-auto p-4 flex justify-center items-center min-h-[50vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="text-gray-500">{description}</p>
      </div>
    </div>
  );
}
