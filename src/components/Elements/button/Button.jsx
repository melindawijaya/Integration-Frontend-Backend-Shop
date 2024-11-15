export const Button = ({ children, handlerAction }) => {
  return (
    <div>
      <button onClick={handlerAction}>{children}</button>
    </div>
  );
};