type ButtonProps = {
  children?: String;
};

const Button = ({ children }: ButtonProps) => {
  return (
    <button className="text-3xl font-medium p-6 bg-gray-500 rounded-xl hover:bg-gray-600">
      {children}
    </button>
  );
};

export default Button;
