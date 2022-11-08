import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useGetProductByShopIdQuery } from "../app/services/productsApi";
import CustomModal from "../components/controls/CustomModal";
import DashboardLayout from "../layouts/DashboardLayout";
import { productColumns } from "../table/columns/productColumns";
import Tables from "../table/tables/Tables";
import Addproduct from "./additional-pages/Addproduct";

const Products = () => {
  // States
  const [open, setOpen] = useState(false);
  const [SearchValue, setSearchValue] = useState()

  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const sort = 1;
  // Redux element
  const { userInfo } = useSelector((state) => state.auth);
  const pathname =
    userInfo?.users?.role === "admin"
      ? `product?sort=${sort}&page=${pageIndex}&limit=${pageSize}`
      : `product?sort=${sort}&page=${pageIndex}&limit=${pageSize}&shop=${userInfo?.users?.shop}`;
  const { isLoading, data: productsData } = useGetProductByShopIdQuery(
    pathname
  );
  const pathnames = 'product?sort=1&page=0&limit=100000000000';
  const { isLoadings, data: productData } = useGetProductByShopIdQuery(pathnames);
  // table elements
  const columns = useMemo(() => productColumns, []);
  const pagination = useMemo(() => ({ pageIndex, pageSize }), [
    pageIndex,
    pageSize,
  ]);
  var data = useMemo(() => (productsData ? productsData?.products : []), [
    productsData,
  ]);
  var Search;
  if (SearchValue) {
    Search = productData?.products?.filter(name => {
      return name.productName.toLowerCase().indexOf(SearchValue.toLowerCase()) !== -1;
    });
    data = Search
  }
  const table = useReactTable({
    data,
    columns,
    state: {
      pagination: pagination,
    },
    pageCount: Math.ceil(productsData?.totalProducts / pageSize),
    onPaginationChange: setPagination,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <DashboardLayout>
      {/* Table */}
      <Tables
        table={table}
        title="Product list"
        isButton={true}
        btnText="Add Product"
        setOpen={setOpen}
        loading={isLoading}
        bulkProducts={true}
        setSearchValue={setSearchValue}
      />

      {/* Others */}
      <CustomModal open={open} onClose={setOpen}>
        <Addproduct setOpen={setOpen} />
      </CustomModal>
    </DashboardLayout>
  );
};

export default Products;