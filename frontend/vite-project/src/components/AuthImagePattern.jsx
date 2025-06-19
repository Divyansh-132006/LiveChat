const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-10">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="text-lg opacity-80 max-w-md">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
