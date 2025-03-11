"use client";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

type Props = {
  addTask: (description: string) => void;
};

export default function AddForm({ addTask }: Props) {
  return (
    <Formik
      initialValues={{ task: "" }}
      validationSchema={Yup.object({
        task: Yup.string().required("Task is required"),
      })}
      onSubmit={(values, { resetForm }) => {
        addTask(values.task);
        resetForm();
      }}
    >
      {({ errors, touched, isValid }) => (
        <Form className="flex flex-col gap-1 w-full mt-4">
          {/* Input Field*/}
           <div className="flex items-center bg-gray-100 rounded-full overflow-hidden shadow-sm w-full">
            <Field
              type="text"
              name="task"
              className="flex-1 bg-[#F1ECE6] text-gray-600 placeholder-gray-400 px-4 py-3 outline-none border-none"
              placeholder="What do you need to do?"
            />
            <button
              type="submit"
              className={`px-6 py-3 font-bold rounded-r-full transition-all border-none ${
                isValid ? "bg-sky-400 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!isValid}
            >
              ADD
            </button>
          </div>

          {/* Inline Error Message */}
          {errors.task && touched.task ? (
            <div className="text-red-500 text-sm">{errors.task}</div>
            ) : (
            <div className="text-transparent text-sm"> &nbsp;</div>
            )}
        </Form>
      )}
    </Formik>
  );
}
