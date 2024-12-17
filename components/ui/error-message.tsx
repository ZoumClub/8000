interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="rounded-md bg-red-50 p-3">
      <div className="flex">
        <div className="text-sm text-red-700">
          {message}
        </div>
      </div>
    </div>
  );
}