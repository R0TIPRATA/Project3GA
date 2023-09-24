import { InputField, AmountInputField } from "../../types";

export const TextInput = ({
  label,
  name,
  value,
  required,
  handleInput,
}: InputField) => {
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
        value={value}
        required={required}
      />
    </div>
  );
};

export const AmountInput = ({
  label,
  name,
  value,
  handleInput,
  required,
}: AmountInputField) => {
  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        type="number"
        name={name}
        className="input input-bordered w-full max-w-xs"
        onChange={handleInput}
        value={value}
        required={required}
      />
    </div>
  );
};

export const UsernameInput = ({
  label,
  name,
  handleInput,
  required,
}: InputField) => {
  return (
    <div className="form-control w-full max-w-lg">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        type="text"
        name={name}
        className="input input-bordered w-full max-w-lg"
        onChange={handleInput}
        required={required}
      />
    </div>
  );
};

export const PasswordInput = ({
  label,
  name,
  handleInput,
  required,
}: InputField) => {
  return (
    <div className="form-control w-full max-w-lg">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        type="password"
        name={name}
        className="input input-bordered w-full max-w-lg"
        onChange={handleInput}
        required={required}
      />
    </div>
  );
};

export const NumberInput = ({
  label,
  name,
  value,
  required,
  handleInput,
}: InputField) => {
  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        type="number"
        name={name}
        className="input input-bordered w-full max-w-xs"
        onChange={handleInput}
        value={value}
        required={required}
      />
    </div>
  );
};

export const LongTextInput = ({
  label,
  name,
  value,
  required,
  handleInput,
}: InputField) => {
  return (
    <div className="form-control ">
      <label className="label">
        <span className="label-text">{label} </span>
      </label>
      <textarea
        name={name}
        className="textarea textarea-bordered h-24"
        placeholder="E.g. Tell your contributors how this item helps you."
        onChange={handleInput}
        value={value}
        required={required}
      ></textarea>
    </div>
  );
};

export const FileUploadInput = ({
  label,
  name,
  selectedPicture,
  required,
  handleFileUpload,
}: InputField) => {
  return (
    <div className="form-control w-full max-w-xs">
      <label className="label ">
        <span className="label-text">{label}</span>
      </label>
      {selectedPicture && (
        <div>
          <img src={selectedPicture}></img>
        </div>
      )}
      <input
        name={name}
        type="file"
        accept=".jpg, .jpeg, .png"
        className="file-input file-input-bordered w-full max-w-xs"
        onChange={handleFileUpload}
        required={required}
      />
    </div>
  );
};

export const DateInput = ({
  label,
  name,
  value,
  min,
  required,
  handleInput,
}: InputField) => {
  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        type="date"
        name={name}
        className="input input-bordered w-full max-w-xs"
        onChange={handleInput}
        value={value}
        min={min}
        required={required}
      />
    </div>
    );
};

export const CheckboxInput = ({ name, description, label, value, required }: InputField) => {
  return (
    <div className="form-control w-full mt-4 pt-0 py-4 px-4 rounded-md bg-slate-200">
      {/* <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        type="date"
        name={name}
        className="input input-bordered w-full max-w-xs"
        onChange={handleInput}
        value={value}
        min={min}
        required={required}
      /> */}
      <p className="description-text py-2">{description}</p>
      <div>
        <input
          type="checkbox"
          name={name}
          id={name}
          value={value}
          required={required}
        />
        <label htmlFor={name} className="pl-2">{label}</label>
      </div>
      <div></div>
    </div>
  );
};
