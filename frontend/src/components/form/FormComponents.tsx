import { InputField, AmountInputField } from "../../types";

export const TextInput = ({ label, name, value, required, handleInput }: InputField) => {
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
  required
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

export const UsernameInput = ({ label, name, handleInput, required }: InputField) => {
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

export const PasswordInput = ({ label, name, handleInput, required }: InputField) => {
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
  handleInput 
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

export const DateInput = ({ label, name, value, min, required, handleInput }: InputField) => {
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

