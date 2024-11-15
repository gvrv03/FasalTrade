"use client";
import React, { useState } from "react";
import TextEditor from "../TextEditor/TextEditor";
import "suneditor/dist/css/suneditor.min.css";
import { BlogPreview } from "@/components/Utility/BlogPreview";

const CreateBlogs = () => {
  const [formData, setFormData] = useState({
    title: "",
    shortDesc: "",
    category: "",
    categories: [],
    keyword: "",
    keywords: [],
    thumbnail: null,
    article: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleAddItem = (field, valueField, value) => {
    if (value) {
      setFormData((prev) => ({
        ...prev,
        [field]: [...prev[field], value],
        [valueField]: "",
      }));
    }
  };

  const handleRemoveItem = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, thumbnail: file });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, shortDesc, categories, keywords, thumbnail, article } =
      formData;
    console.log({ title, shortDesc, categories, keywords, thumbnail, article });
  };

  const handleClear = () => {
    setFormData({
      title: "",
      shortDesc: "",
      category: "",
      categories: [],
      keyword: "",
      keywords: [],
      thumbnail: null,
      article: "",
    });
  };

  const {
    title,
    shortDesc,
    category,
    categories,
    keyword,
    keywords,
    thumbnail,
    article,
  } = formData;

  return (
    <>
      <div className="  fixed  md:bottom-0 md:border-none -bottom-5 border-t-2 border-gray-100 p-5 md:p-0 left-0 right-0  z-50 bg-white  md:relative  flex justify-end space-x-4 mb-6">
        <button
          type="button"
          className="bg-yellow-500 text-white  flex gap-3 items-center justify-center font-bold py-2 px-3 md:px-10  rounded-full  transition duration-300 ease-in-out"
        >
          <p className="md:block hidden" >Draft</p>
          <i className="uil uil-edit" />
        </button>
        <button
          type="reset"
          className=" bg-gray-400 text-white  flex gap-3 items-center justify-center font-bold py-2 px-3 md:px-10  rounded-full  transition duration-300 ease-in-out"
          onClick={handleClear}
        >
          <p className="md:block hidden" >Clear</p>
          <i className="uil uil-brush-alt" />
        </button>
        <button
          type="submit"
          className="bg-red-500 text-white  flex gap-3 items-center justify-center font-bold py-2 px-3 md:px-10  rounded-full  transition duration-300 ease-in-out"
          onClick={handleSubmit}
        >
          <p className="md:block hidden" >Publish</p>
          <i className="uil uil-message" />
        </button>
      </div>

      <div className="flex gap-5 md:flex-row flex-col">
        <div className="w-full max-w-4xl">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="title"
              >
                Blog Title
              </label>
              <input
                type="text"
                id="title"
                className="w-full px-3 outline-none py-2 border border-gray-300"
                placeholder="Enter blog title"
                value={title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="shortDesc"
              >
                Short Description
              </label>
              <textarea
                id="shortDesc"
                rows={3}
                className="w-full px-3 outline-none py-2 border border-gray-300"
                placeholder="Enter short description"
                value={shortDesc}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-6">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="thumbnail"
              >
                Thumbnail Image
              </label>
              <input
                type="file"
                id="thumbnail"
                accept="image/*"
                className="w-full px-3 outline-none py-2 border border-gray-300"
                onChange={handleThumbnailChange}
              />
              {thumbnail && (
                <p className="mt-2 text-green-600">
                  Selected file: {thumbnail.name}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="category"
              >
                Add Category
              </label>
              <div className="flex space-x-3">
                <input
                  type="text"
                  id="category"
                  className="flex-grow outline-none px-3 py-2 border border-gray-300"
                  placeholder="Enter category"
                  value={category}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className="bg-indigo-600 text-white px-4 py-2 shadow hover:bg-indigo-700"
                  onClick={() =>
                    handleAddItem("categories", "category", category)
                  }
                >
                  Add
                </button>
              </div>
              <div className="mt-2 flex flex-wrap">
                {categories.map((cat, index) => (
                  <div
                    key={index}
                    className="bg-indigo-100 text-indigo-700 px-3 py-1 mr-2 mb-2 flex items-center"
                  >
                    {cat}
                    <button
                      type="button"
                      className="ml-2 text-red-600 hover:text-red-800"
                      onClick={() => handleRemoveItem("categories", index)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="keyword"
              >
                Add Keywords
              </label>
              <div className="flex space-x-3">
                <input
                  type="text"
                  id="keyword"
                  className="flex-grow outline-none px-3 py-2 border border-gray-300"
                  placeholder="Enter keyword"
                  value={keyword}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className="bg-indigo-600 text-white px-4 py-2 shadow hover:bg-indigo-700"
                  onClick={() => handleAddItem("keywords", "keyword", keyword)}
                >
                  Add
                </button>
              </div>
              <div className="mt-2 flex flex-wrap">
                {keywords.map((kw, index) => (
                  <div
                    key={index}
                    className="bg-green-100 text-green-700 px-3 py-1 mr-2 mb-2 flex items-center"
                  >
                    {kw}
                    <button
                      type="button"
                      className="ml-2 text-red-600 hover:text-red-800"
                      onClick={() => handleRemoveItem("keywords", index)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="longDesc"
              >
                Long Description
              </label>
              <TextEditor
                article={article}
                height={500}
                setartical={(content) =>
                  setFormData({ ...formData, article: content })
                }
              />
            </div>
          </form>
        </div>

        <BlogPreview
          thumbnail={thumbnail}
          title={title}
          shortDesc={shortDesc}
          categories={categories}
          article={article}
        />
      </div>
    </>
  );
};

export default CreateBlogs;
