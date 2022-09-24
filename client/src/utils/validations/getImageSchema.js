import * as Yup from "yup";

const getImageSchema = Yup.object({
  key: Yup.string().trim().required("Required"),
});

export default getImageSchema;
