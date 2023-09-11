import { InputField } from "../../types";

export const TextInput = ({ label, name, handleInput}:InputField) => {
    return (
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
        <input 
          type="text" 
          name={name} 
          className="input input-bordered w-full max-w-xs" 
          onChange={handleInput}
        />
      </div>
    );
  };

  // const Select = ({label, name, options}) => {
  //   <select className="select select-bordered w-full max-w-xs">
  //   </select>
  // }

 export const LongTextInput = ({ label, name, handleInput }:InputField) => {
    return (
      <div className="form-control">
        <label className="label">
          <span className="label-text">{label} </span>
        </label>
        <textarea
          name={name}
          className="textarea textarea-bordered h-24"
          placeholder="E.g. Tell your contributors how this item helps you."
          onChange={handleInput}
        >
        </textarea>
      </div>
    );
  };

 export const FileUploadInput = ({ label, name, handleInput }:InputField) => {
    return (
      <div className="form-control w-full max-w-xs">
        <label className="label ">
          <span className="label-text">{label}</span>
        </label>
        <input
          name={name}
          type="file"
          className="file-input file-input-bordered w-full max-w-xs"
          onChange={handleInput}
        />
      </div>
    );
  };