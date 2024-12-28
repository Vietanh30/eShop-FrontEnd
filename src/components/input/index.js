import { useState } from "react";
import { updateProfile } from "../../app/api/userApi";

const Input = ({ data, title, des, value, name }) => {
  const [state, setState] = useState(true);
  const [info, setInfo] = useState(data);

  const handleChange = (event) => {
    setInfo({
      ...info,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <div className="flex justify-between gap-4 pt-2 w-full">
        <div className="flex flex-col w-full">
          <p className="font-medium text-primary_color">{title}</p>

          <input
            onChange={handleChange}
            defaultValue={value}
            disabled={state}
            className="appearance-none block w-full bg-white 
                    text-gray-400 text-sm border-gray-200 border-b-2 py-2 px-2 
                    leading-tight focus:outline-none focus:border-gray-300 rounded"
            type="text"
            name={name}
          />
          <img className="" src={value} alt=""></img>

          <p className="text-sub_primary_color w-4/5 text-xs">{des}</p>
        </div>

        <div className="flex flex-col w-[50%]">
          {state ? (
            <button
              onClick={() => {
                setState(!state);
              }}
              className="w-fit h-fit rounded-2xl border px-4 py-1 text-sm boder-1 border-gray-300 text-gray-500 hover:border-gray-800"
            >
              Chỉnh sửa
            </button>
          ) : (
            <div className="flex flex-row gap-2">
              <button
                onClick={async () => {
                  await updateProfile(localStorage.getItem("user-token"), info);
                  setState(!state);
                }}
                className="rounded-2xl border px-4 py-1 text-sm boder-1 border-orange-400 text-orange-400 hover:border-orange-600"
              >
                Lưu
              </button>
              <button
                onClick={() => {
                  setInfo(data);
                  setState(!state);
                }}
                className="rounded-2xl border px-4 py-1 text-sm boder-1 border-gray-300 text-gray-500 hover:border-gray-800"
              >
                Hủy
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Input;
