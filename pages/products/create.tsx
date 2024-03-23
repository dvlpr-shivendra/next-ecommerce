import React, { ChangeEvent, FormEvent, useState } from "react";
import { post, postMultipart } from "@/helpers/http";
import { backendUrl } from "@/helpers/urls";

export default function CreateProduct() {
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<number | null>(null);
  const [description, setDescription] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const data = {
      title,
      description,
      images,
      price,
    };

    post(backendUrl("products"), data).then((res) => {
      setTitle("");
      setPrice(null);
      setDescription("");
      setImages([]);
      // @ts-ignore
      document.querySelector("input#images").value = null;
    });
  }

  function uploadImages(e: ChangeEvent) {
    e.preventDefault();

    const formData = new FormData();

    // @ts-ignore
    const files = e.target.files;

    for (let i = 0; i < files.length; i++) {
      formData.append(`files[]`, files[i]);
    }

    postMultipart(backendUrl("files/upload"), formData).then((res) => {
      setImages(res.files);
    });
  }

  return (
    <div className="mt-20 p-8 card bg-base-100 shadow-xl w-2/5 mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Product</h1>
      <form onSubmit={onSubmit} className="space-y-8">
        <div className="space-y-8">
          <div className="form-control">
            <label className="label">Title</label>
            <input
              className="input input-bordered"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-control">
            <label className="label">Price</label>
            <input
              className="input input-bordered"
              type="number"
              value={price || ""}
              onChange={(e) => setPrice(+e.target.value)}
            />
          </div>

          <div className="form-control">
            <label className="label">Images</label>
            <input
              id="images"
              className="file-input file-input-bordered"
              type="file"
              onChange={uploadImages}
              multiple
            />
          </div>

          <div className="form-control">
            <label className="label">Description</label>
            <textarea
              className="textarea textarea-bordered"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button className="btn btn-primary btn-block" type="submit">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}
