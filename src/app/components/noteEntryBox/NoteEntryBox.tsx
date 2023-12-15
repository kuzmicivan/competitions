"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Camera from "../camera/Camera";

export type NoteEntryFormData = {
  title: string;
  body: string;
  photo?: string;
};

const NoteEntryBox: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<NoteEntryFormData>({
    title: "",
    body: "",
    photo: null,
  });

  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const photo = webcamRef.current.getScreenshot();
    setFormData({ ...formData, photo });
    setCameraShown(false);
  }, [webcamRef, formData]);

  const [isCameraShown, setCameraShown] = useState(false);

  const [hasCamera, setHasCamera] = useState<boolean>(false);

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const cameraDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );
      setHasCamera(cameraDevices.length > 0);
    });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const createNote = useCallback(() => {
    const postData = {
      ...formData,
      photo: formData.photo
        ? Buffer.from(formData.photo).toString("base64")
        : null,
    };
    axios.post("/api/notes", postData).then(() => router.push("/"));
  }, [formData]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFormData({ ...formData, photo: base64String });
      };
      reader.readAsDataURL(file);
    }
  };
  

  return (
    <div>
      {isCameraShown ? (
        <Camera
          onCapture={capture}
          ref={webcamRef}
          onClose={() => setCameraShown(false)}
        />
      ) : (
        <>
          <div className="text-3xl font-bold mb-2">Add note</div>
          <form onSubmit={handleSubmit}>
            <div className="relative bg-slate-200 px-1 py-1 rounded text-blue-800 w-[500px] flex flex-col justify-center gap-1">
              <div className="flex justify-between gap-1">
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Add title"
                  className="w-full rounded px-2 py-1 focus:outline-none placeholder:text-slate-500 placeholder:font-thin"
                  value={formData.title}
                  onChange={handleChange}
                />
              {!hasCamera ? (
                  <button onClick={() => setCameraShown(true)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-8 h-8 bg-white p-1 rounded hover:stroke-blue-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                      />
                    </svg>
                  </button>
                ) : (
                  <label className="cursor-pointer stroke-blue-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-8 h-8 bg-white p-1 rounded hover:stroke-blue-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                      />
                    </svg>
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      style={{ display: "none" }}
                      accept="image/*"
                    />
                  </label>
                )}
              </div>
              <div className="flex flex-col justify-between">
                <textarea
                  id="body"
                  name="body"
                  placeholder="Add text"
                  className="w-full rounded px-2 py-1 h-80 focus:outline-none placeholder:text-slate-500 placeholder:font-thin"
                  value={formData.body}
                  onChange={handleChange}
                />
              </div>
              {formData.photo && (
                <div className="absolute flex flex-col justify-between top-10 -right-2">
                  <div className="relative w-fit">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 fill-red-500 stroke-black absolute -right-3 -top-3 hover:stroke-white"
                      onClick={() => setFormData({ ...formData, photo: null })}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <img
                      className="w-32 h-20"
                      src={formData.photo}
                      alt={`captured-photo`}
                    />
                  </div>
                </div>
              )}
              <button
                type="submit"
                onClick={createNote}
                disabled={!formData.title || !formData.body}
                className={`w-full ${
                  !formData.title || !formData.body
                    ? "bg-opacity-50 cursor-not-allowed"
                    : "hover:bg-blue-700 hover:text-white"
                } p-2 rounded-lg bg-blue-800 text-slate-200`}
              >
                Add
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default NoteEntryBox;
