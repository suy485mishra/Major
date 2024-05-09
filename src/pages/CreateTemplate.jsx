import React, { useEffect } from "react";
import { useState } from "react";
import useUser from "../hooks/useUser";
import { PuffLoader } from "react-spinners";
import { FaTrash, FaUpload } from "react-icons/fa6";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { toast } from "react-toastify";
import { storage } from "../config/firebase.config";
import { adminIds, initialTags } from "../utils/helpers";
import { deleteDoc, serverTimestamp, setDoc } from "firebase/firestore";
import useTemplates from "../hooks/useTemplates";
import { doc } from "firebase/firestore";
import { db } from "../config/firebase.config";
import { useNavigate } from "react-router-dom";

const CreateTemplate = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    imageURL: null,
  });

  const [imageAsset, setImageAsset] = useState({
    isImageLoading: false,
    uri: null,
    progress: 0,
  });
  const navigate = useNavigate();
  const {
    data: templates,
    isError: templatesIsError,
    isLoading: templatesIsLoading,
    refetch: templatesRefetch,
  } = useTemplates();

  const { data: user, isLoading } = useUser();

  //handling imput field change events
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevRec) => ({ ...prevRec, [name]: value }));
  };

  const handleFileSelect = async (e) => {
    setImageAsset((prevAsset) => ({ ...prevAsset, isImageLoading: true }));
    const file = e.target.files[0];
    // console.log(file)
    if (file && isAllowed(file)) {
      const storageRef = ref(storage, `Templates/${Date.now()}-${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setImageAsset((prevAsset) => ({
            ...prevAsset,
            progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          }));
        },
        (error) => {
          if (error.message.includes("storage/unauthorized")) {
            toast.error(`Error:Authorization Revoked`);
          } else {
            toast.error(`Error:${error.message}`);
          }
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageAsset((prevAsset) => ({
              ...prevAsset,
              uri: downloadURL,
            }));
          });
          toast.success("Image Uploaded!!");
          setInterval(() => {
            setImageAsset((prevAsset) => ({
              ...prevAsset,
              isImageLoading: false,
            }));
          }, 2000);
        }
      );
    } else {
      toast.info("Invalid File Format");
    }
  };

  const isAllowed = (file) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    return allowedTypes.includes(file.type);
  };

  const deleteAnImageObject = async () => {
    // Set loading state while deleting
    setImageAsset((prevAsset) => ({
      ...prevAsset,
      isImageLoading: true,
    }));

    const deleteRef = ref(storage, imageAsset.uri);
    await deleteObject(deleteRef).then(() => {
      toast.success("Image Removed!!");
    });

    // Delay state update to give time for the toast message to show
    setTimeout(() => {
      // Reset image-related state after deletion
      setImageAsset({
        isImageLoading: false,
        uri: null,
        progress: 0,
      });
    }, 2000);
  };

  const handleSelectTags = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((selected) => selected !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  const pushToCloud = async () => {
    const timestamp = serverTimestamp();
    const id = Date.now().toString(); // Use toString() to ensure id is a string
    const _doc = {
      _id: id,
      title: formData.title,
      imageURL: imageAsset.uri,
      tags: selectedTags,
      name:
        templates && templates.length > 0
          ? `Template${templates.length + 1}`
          : "Template1",
      timestamp: timestamp,
    };

    try {
      await setDoc(doc(db, "templates", id), _doc);
      setFormData((prevData) => ({ ...prevData, title: "", imageURL: "" }));
      setImageAsset((prevAsset) => ({ ...prevAsset, uri: null }));
      setSelectedTags([]);
      templatesRefetch();
      toast.success("Data saved in the cloud");
    } catch (error) {
      console.error("Error in pushToCloud:", error);
      toast.error(`Error: ${error.message}`);
    }
  };

  //func to remove data  from cloud

  
  const removeTemplate = async (template) => {
      try {
          // Construct a reference to the file using the child method
          const deleteRef = ref(storage, `${template?.imageURL}/file.png`);
          
          // Perform the delete operation
          await deleteObject(deleteRef);
          
          // If the delete operation is successful, delete the corresponding document from Firestore
          await deleteDoc(doc(db, "templates", template?._id));
          
          // Notify the user and trigger a refetch of templates
          toast.success("Template successfully deleted from the cloud");
          templatesRefetch();
      } catch (error) {
          // Handle errors
          toast.error(`Error: ${error.message}`);
      }
  };
  

  //checking that other than admin no user can access create template route
  useEffect(() => {
    if (!isLoading && !adminIds.includes(user?.uid)) {
      navigate("/", { replace: true });
    }
  }, [user, isLoading]);

  return (
    <div
      className="w-full px-4 lg:px-10 2xl:px-32 py-4 grid grid-cols-1
   lg:grid-cols-12"
    >
      {/* LEFT CONTAINER */}
      <div className="col-span-12 lg:col-span-4 2xl:col-span-3 w-full flex-1 flex items-center justify-start flex-col gap-4 px-2">
        <div className="w-full">
          <p className="text-lg text-txtPrimary">Create a New Template</p>
        </div>

        {/* template id */}
        <div className="w-full flex items-center justify-end">
          <p className="text-base text-txtLight uppercase font-semibold">
            TempID:{" "}
          </p>
          <p className="text-sm text-txtDark capitalize font-bold">
            {templates && templates.length > 0
              ? `Template${templates.length + 1}`
              : "Template1"}
          </p>
        </div>

        {/* template title section */}
        <input
          className="w-full px-4 py-3 rounded-md bg-transparent border border-gray-300 text-lg text-txtPrimary
    focus:text-txtDark focus:shadow-md outline-none"
          type="text"
          name="title"
          placeholder="Template Title"
          value={formData.title}
          onChange={handleInputChange}
        />

        {/* file uploader section */}
        <div
          className="w-full bg-gray-100 backdrop-blur-md h-[420px] 
   lg:h-[620px] 2xl:h-[740px] rounded-md border-2 border-dotted border-gray-300 cursor-pointer flex items-center justify-center "
        >
          {imageAsset.isImageLoading ? (
            <React.Fragment>
              <div className="flex flex-col items-center justify-center gap-4">
                <PuffLoader color="#498FCD" size={40} />
                <p>{imageAsset?.progress.toFixed(2)}%</p>
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {!imageAsset?.uri ? (
                <React.Fragment>
                  <label className="w-full cursor-pointer h-full">
                    <div className="flex flex-col items-center justify-center h-full w-full">
                      <div className="flex items-center justify-center cursor-pointer flex-col gap-4">
                        <FaUpload className="2xl" />
                        <p className="text-lg  text-txtLight">
                          Click to Upload
                        </p>
                      </div>
                    </div>
                    <input
                      type="file"
                      className="w-0 h-0"
                      accept=".jpeg,.jpg,.png"
                      onChange={handleFileSelect}
                    />
                  </label>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <div className="relative w-full h-full overflow-hidden rounded-md">
                    <img
                      src={imageAsset?.uri}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      alt=""
                    />

                    {/* deleteACTION */}
                    <div
                      className="absolute top-4 right-4 w-8 h-8 rounded-md flex items-center justify-center bg-red-600 cursor-pointer"
                      onClick={deleteAnImageObject}
                    >
                      <FaTrash className="text-sm text-white cursor-pointer" />
                    </div>
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          )}
        </div>

        {/* tags */}

        <div className="w-full flex items-center flex-wrap gap-2">
          {initialTags.map((tag, i) => (
            <div
              key={i}
              className={`border border-gray-300 px-2 py-1 rounded-md cursor-pointer
   ${selectedTags.includes(tag) ? "bg-blue-500 text-white" : ""} `}
              onClick={() => handleSelectTags(tag)}
            >
              <p className="text-xs">{tag}</p>
            </div>
          ))}
        </div>

        {/* BUTTON */}
        <button
          type="button"
          className="w-full bg-blue-700 text-white rounded-md py-3"
          onClick={pushToCloud}
        >
          Save
        </button>
      </div>

      {/* RIGHT CONTAINER */}
      <div className="col-span-12 lg:col-span-8 2xl:col-span-9 w-full flex-1 py-4 px-2">
        {templatesIsLoading ? (
          <React.Fragment>
            <div className="w-full h-full flex items-center justify-center">
              <PuffLoader color="#498FCD" size={40} />
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {templates && templates.length > 0 ? (
              <React.Fragment>
                <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 g-4">
                  {templates?.map((template) => (
                    <div
                      key={template._id}
                      className="w-full h-[500px] rounded-md overflow-hidden relative"
                    >
                      <img
                        src={template?.imageURL}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                      {/* deleteACTION */}
                      <div
                        className="absolute top-4 right-4 w-8 h-8 rounded-md flex items-center justify-center bg-red-600 cursor-pointer"
                        onClick={() => removeTemplate(template)}
                      >
                        <FaTrash className="text-sm text-white cursor-pointer" />
                      </div>
                    </div>
                  ))}
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div className="w-full h-full flex flex-col gap-6 items-center justify-center">
                  <PuffLoader color="#498FCD" size={40} />
                  <p className="text-xl tracking-wider capitalize text-txtPrimary">
                    No Data
                  </p>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default CreateTemplate;
