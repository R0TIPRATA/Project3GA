const AddItemForm = () => {
  // put all field items in object array
  // loop thru all of them and add component
  const fieldItems = [
    {
      type: "text-input",
      name: "Item Name"
    },
    {
      type: "text-input",
      name: "Category"
    },
    {
      type: "text-input",
      name: "Brand"
    },
    {
      type: "text-input",
      name: "Price"
    },
    {
      type: "text-input",
      name: "Color"
    },
    {
      type: "long-text-input",
      name: "Message to contributors"
    },
    {
      type: "file-upload",
      name: "Upload a picture"
    }
  ]

  const TextInput = ({itemName}) => {
    return (
      <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">{itemName}</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
          />
      </div>
    )
  }

  const LongTextInput = ({itemName}) => {
    return (
      <div className="form-control">
        <label className="label">
            <span className="label-text">{itemName} </span>
        </label>
        <textarea className="textarea textarea-bordered h-24" placeholder="E.g. Tell your contributors how this item helps you."></textarea>
        </div>
    )
  }

  const FileUploadInput = () => {
    return(
      <div className="form-control w-full max-w-xs">
        <label className="label">
            <span className="label-text">Upload a picture</span>
        </label>
        <input type="file" className="file-input file-input-bordered w-full max-w-xs" />
      </div>
    )
  }

  return (
    <form className="space-y-12 bg-slate-50 w-1/4 m-20 p-8 rounded-3xl ">
      <div>
        <h3>Add item</h3>
        {fieldItems.map(item => {
            if(item.type === 'text-input'){
              return <TextInput itemName={item.name}/>
            }else if(item.type === 'long-text-input'){
              return <LongTextInput itemName={item.name}/>
            }else if (item.type === 'file-upload'){
              return <FileUploadInput/>
            }
          }
        )}
        
      </div>
      <button className="btn btn-primary">Add item</button>
    </form>
  );
};

export default AddItemForm;
