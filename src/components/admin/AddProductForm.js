// AddProductForm.js
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";
import { TextField, Button } from "@mui/material";
import { arrayToObject } from "@/ultils/ultils";

const AddProductForm = ({ categories, onSubmit, onCloseDialog }) => {
  const initialValues = {
    name: "",
    price: "",
    cate: "",
    color: [],
    images: [],
    offer: 0,
    configDesc: [{ key: "", value: "" }],
    description: [],
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        name: Yup.string().required("Tên sản phẩm là bắt buộc"),
        price: Yup.number().required("Giá là bắt buộc").positive().integer(),
        cate: Yup.string().required("Danh mục là bắt buộc"),
        color: Yup.array()
          .of(Yup.string().required("Màu là bắt buộc"))
          .min(1, "Ít nhất một màu sắc là bắt buộc"),
        images: Yup.array()
          .of(Yup.mixed().required("Ảnh là bắt buộc"))
          .min(1, "Ít nhất một ảnh là bắt buộc"),
        offer: Yup.number().min(0).max(100, "Giảm giá không hợp lệ"),
        description: Yup.array()
          .of(Yup.string().required("Mô tả là bắt buộc"))
          .min(1, "Ít nhất một mô tả là bắt buộc"),
        configDesc: Yup.array()
          .of(
            Yup.object().shape({
              key: Yup.string().required("Tên thông số là bắt buộc"),
              value: Yup.string().required("Giá trị thông số là bắt buộc"),
            })
          )
          .required("Thông số kỹ thuật là bắt buộc"),
      })}
      onSubmit={(values) => {
        const formattedValues = {
          name: values.name,
          cate: values.cate,
          price: values.price,
          offer: values.offer,
          color: values.color, // Giữ nguyên mảng color
          images: values.images, // Chuyển đổi file thành URL
          configDesc: values.configDesc.reduce((acc, { key, value }) => {
            acc[key] = value;
            return acc;
          }, {}), // Tạo đối tượng từ mảng configDesc
          description: values.description,
        };

        // Chuyển đổi configDesc và description thành định dạng yêu cầu
        const finalOutput = {
          ...formattedValues,
          color: JSON.stringify(formattedValues.color), // Chuyển đổi thành chuỗi JSON
          configDesc: JSON.stringify(formattedValues.configDesc), // Chuyển đổi thành chuỗi JSON
          description: JSON.stringify(formattedValues.description), // Chuyển đổi thành chuỗi JSON
        };

        onSubmit(finalOutput);
      }}
    >
      {({ values, handleChange, handleSubmit, setFieldValue, errors }) => (
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="grid grid-cols-2 gap-x-6">
            <TextField
              label="Tên Sản Phẩm"
              name="name"
              value={values.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={Boolean(errors.name)}
              helperText={errors.name}
            />
            <TextField
              label="Giá"
              name="price"
              type="number"
              value={values.price}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={Boolean(errors.price)}
              helperText={errors.price}
            />
            <TextField
              name="cate"
              select
              SelectProps={{ native: true }}
              value={values.cate || ""}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={Boolean(errors.cate)}
              helperText={errors.cate}
            >
              <option value="" disabled>
                Chọn danh mục
              </option>
              {categories.map((cat) => (
                <option key={cat.slug} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </TextField>
            <TextField
              label="Giảm giá (%)"
              name="offer"
              type="number"
              value={values.offer}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={Boolean(errors.offer)}
              helperText={errors.offer}
            />
            <FieldArray name="color">
              {({ push, remove }) => (
                <FieldArraySection
                  label="Màu sắc:"
                  values={values.color}
                  errors={errors.color}
                  push={push}
                  remove={remove}
                  name="color"
                  placeholder="Nhập màu"
                  setFieldValue={setFieldValue}
                />
              )}
            </FieldArray>
            <div>
              <label className="me-2">Hình Ảnh:</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(event) =>
                  setFieldValue("images", Array.from(event.currentTarget.files))
                }
                className="mr-2 w-full"
              />
              {values.images.length > 0 && (
                <div className="flex flex-col mt-2">
                  {values.images.map((file, index) => (
                    <span key={index}>{file.name}</span>
                  ))}
                </div>
              )}
              {errors.images && (
                <div className="text-red-600">{errors.images}</div>
              )}
            </div>
            <FieldArray name="configDesc">
              {({ push, remove }) => (
                <FieldArrayConfigDesc
                  values={values.configDesc}
                  errors={errors.configDesc}
                  push={push}
                  remove={remove}
                  setFieldValue={setFieldValue}
                />
              )}
            </FieldArray>
            <FieldArray name="description">
              {({ push, remove }) => (
                <FieldArraySection
                  label="Mô Tả:"
                  values={values.description}
                  errors={errors.description}
                  push={push}
                  remove={remove}
                  name="description"
                  placeholder="Nhập mô tả"
                  setFieldValue={setFieldValue}
                />
              )}
            </FieldArray>
          </div>
          <div className="flex gap-3 justify-end">
            <Button onClick={onCloseDialog} color="primary">
              Hủy
            </Button>
            <Button type="submit" color="primary">
              Thêm
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};

const FieldArraySection = ({
  label,
  values,
  errors,
  push,
  remove,
  name,
  placeholder,
  setFieldValue,
}) => (
  <div className="mt-4">
    <label className="me-2">{label}</label>
    {values.map((value, index) => (
      <div key={index} className="flex items-center mb-2 gap-2">
        <TextField
          name={`${name}[${index}]`}
          value={value}
          onChange={(event) =>
            setFieldValue(`${name}[${index}]`, event.target.value)
          }
          placeholder={placeholder}
          className="mr-2 w-full"
          error={Boolean(errors && errors[index])}
          helperText={errors && errors[index]}
        />
        <Button
          onClick={() => remove(index)}
          variant="outlined"
          color="secondary"
        >
          -
        </Button>
      </div>
    ))}
    <Button onClick={() => push("")} variant="outlined" color="primary">
      +
    </Button>
  </div>
);

const FieldArrayConfigDesc = ({
  values,
  errors,
  push,
  remove,
  setFieldValue,
}) => (
  <div className="mt-4">
    <label className="me-2">Thông Số Kỹ Thuật:</label>
    {values.map((field, index) => (
      <div key={index} className="flex items-center mb-2 gap-2">
        <TextField
          name={`configDesc[${index}].key`}
          value={field.key}
          onChange={(event) =>
            setFieldValue(`configDesc[${index}].key`, event.target.value)
          }
          placeholder="Tên thông số"
          className="mr-2 w-full"
          error={Boolean(errors && errors[index]?.key)}
          helperText={errors && errors[index]?.key}
        />
        <TextField
          name={`configDesc[${index}].value`}
          value={field.value}
          onChange={(event) =>
            setFieldValue(`configDesc[${index}].value`, event.target.value)
          }
          placeholder="Giá trị thông số"
          className="mr-2 w-full"
          error={Boolean(errors && errors[index]?.value)}
          helperText={errors && errors[index]?.value}
        />
        <Button
          onClick={() => remove(index)}
          variant="outlined"
          color="secondary"
        >
          -
        </Button>
      </div>
    ))}
    <Button
      onClick={() => push({ key: "", value: "" })}
      variant="outlined"
      color="primary"
    >
      +
    </Button>
  </div>
);

export default AddProductForm;
