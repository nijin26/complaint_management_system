const Button = ({ outlined, onClick, className, type, children }) => {
  const buttonStyle = outlined
    ? `${className} px-4 py-2 rounded-md text-md font-medium border-2 text-stone-600 border-stone-600 hover:text-stone-700 hover:border-stone-700 focus:outline-none focus:text-stone-700 focus:border-stone-700`
    : `${className} px-4 py-2 rounded-md text-md font-medium text-white bg-stone-600 hover:bg-stone-700 focus:outline-none focus:bg-stone-700`;

  return (
    <button onClick={onClick} className={buttonStyle} type={type}>
      {children}
    </button>
  );
};

export default Button;
