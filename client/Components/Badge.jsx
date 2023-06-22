import Button from "./Button";

const Badge = ({ id, name, onDelete }) => {
  return (
    <div className="flex justify-between min-w-20 bg-gray-200 rounded-md px-3 py-1 my-2 ">
      <span className="mr-2">{name}</span>
      <Button type="button" onClick={() => onDelete(id)}>
        Remove
      </Button>
    </div>
  );
};
export default Badge;
