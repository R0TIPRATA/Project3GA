import { FileUploadInput, LongTextInput, TextInput } from "./FormComponents";

const EditItemForm = () => {
  const fieldItems = [
    {
      type: "text-input",
      label: "Item Name",
      name: "itemName"
    },
    {
      type: "text-input",
      label: "Category",
      name: "category"
    },
    {
      type: "text-input",
      label: "Brand",
      name: "brand"
    },
    {
      type: "text-input",
      label: "Price",
      name: "price"
    },
    {
      type: "text-input",
      label: "Color",
      name: "color"
    },
    {
      type: "long-text-input",
      label: "Message to contributors",
      name: "itemMessageContributor"
    },
    {
      type: "file-upload",
      label: "Upload a picture",
      name: "itemPicture"
    },
  ];


  return (
    <form className="w-[300px] p-8 rounded-3xl ">
      <div>
        <h3>Add item</h3>
        {fieldItems.map((item, index) => {
          if (item.type === "text-input") {
            return <TextInput key={index} label={item.label} name={item.name}/>;
          } else if (item.type === "long-text-input") {
            return <LongTextInput key={index} label={item.label} name={item.name} />;
          } else if (item.type === "file-upload") {
            return <FileUploadInput key={index} label={item.label} name={item.name}/>;
          }
        })}
      </div>
      <button className="btn btn-primary float-right m-1">Cancel</button>
      <button className="btn btn-primary float-right m-1">Save</button>
    </form>
  );
};

export default EditItemForm;
