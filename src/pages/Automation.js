import DashboardLayout from "../layouts/DashboardLayout";
import { yupResolver } from "@hookform/resolvers/yup";
import DownloadIcon from "@mui/icons-material/Download";
import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import toast from "react-hot-toast";
import csv_file from "../assets/products.csv";
import LoadingBtn from "../components/controls/LoadingBtn";
import { productSchema } from "../helpers/validation/productSchema";
import { useForm } from "react-hook-form";
import { useCreateProductMutation } from "../app/services/productsApi";

const Automation = () => {


  const [files, setFiles] = useState(null);
  const handleChange = (file) => {
    setFiles(file);
  };

  const [
    createProduct,
    { isLoading, isError, error, data },
  ] = useCreateProductMutation();

  // React hook form
  const { handleSubmit, register, formState: { errors }, } = useForm({});

  console.log(handleSubmit);

  const onSubmit = (e) => {
    e.preventDefault()

    const productimg = e.target.products_csv;
    console.log(productimg);
    // console.log(data)
    // const productData = {
    //   productUrl: data.productUrl,
    //   image: data.image,

    // }
    // console.log(productData)
    // data submit
    // await createProduct(productData);
  };


  return (
    <DashboardLayout>
      <section className="addBulkProduct">
        <div className="addBulkProduct__form">
          <h2 className="form__title">Add Automation</h2>
          <form onSubmit={onSubmit}>
            <FileUploader
              handleChange={handleChange}
              name="products_csv"
              multiple={false}
            />

            <span className="form__info">
              {files ? `File name: ${files?.name}` : "No files uploaded yet"}
            </span>

            {/* Product Name */}
            {/* <span className="form__group" style={{ marginTop: "30px" }}>
              <label className="form__label">
                Url <span className="form__required">*</span>
              </label>
              <input
                className="form__control"
                type="url"
                // placeholder="Enter product title"
                {...register("productUrl")}
              />
              {errors?.productUrl && (
                <span className="form__error">{errors?.productUrl.message}</span>
              )}
            </span> */}

            {/* Submit button */}
            <div className="addBulkProductButton__group">
              {/* Submit button */}
              <LoadingBtn
                className="addDepartment__btn"
                color="primary"
                size="large"
                text="Add Product"
                type="submit"
                loading={isLoading}
              />
            </div>
          </form>

        </div>
      </section>
    </DashboardLayout>
  );
};

export default Automation;
