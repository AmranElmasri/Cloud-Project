import * as Yup from "yup";

const insertImageSchema = Yup.object({
  key: Yup.string().trim().required("Required"),
});

export default insertImageSchema;
