import Item from "./Item";

const getNumItems = () => {
  return 3; //to code this
}

const Items = () => {
  return (
    <div className="flex-col justify-center bg-slate-50 p-10 rounded-3xl">
      <h2 className="p-2 inline-block pb-8">Wishlist Items ({getNumItems()})</h2>
      <Item />
    </div>
  );
};

export default Items;
