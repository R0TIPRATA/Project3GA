const AddItemForm = () => {
    
  return (
    <form>
      <div className="space-y-12">
        <h3>Add item</h3>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Item name</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Color</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Product URL(optional)</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
          />

        <div className="form-control">
        <label className="label">
            <span className="label-text">Message to contributors(optional) </span>
        </label>
        <textarea className="textarea textarea-bordered h-24" placeholder="E.g. Tell your contributors how this item helps you."></textarea>
        </div>
        </div>

        <div className="form-control w-full max-w-xs">
            <label className="label">
                <span className="label-text">Upload a picture</span>
            </label>
            <input type="file" className="file-input file-input-bordered w-full max-w-xs" />
        </div>
      </div>

      <button className="btn btn-primary">Button</button>
    </form>
  );
};

export default AddItemForm;
