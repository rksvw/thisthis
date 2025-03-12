import { useState, useRef, useCallback, useEffect } from "react";
import QuillEditor from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button, TextInput, FileInput, Select, Alert } from "flowbite-react";
import { CircularProgressbar } from "react-circular-progressbar";
import { useSelector } from "react-redux";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

function Editor() {
  const [formData, setFormData] = useState({});
  const [image, setImage] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [publishError, setPublishError] = useState(null);
  // Editor state
  const [value, setValue] = useState("");
  const { currentUser, error, loading } = useSelector((state) => state.user);

  //   Editor ref
  const quill = useRef();

  const handlePostImage = (e) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    if (file.size > MAX_FILE_SIZE) {
      setImageUploadError("File size exceeds 5MB limit");
      return;
    }
    setImage(file);
    console.log(file);
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "clean",
  ];

  const imageHandler = useCallback(() => {
    // Create an input element of type 'file'
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    // When a file is selected
    input.onchange = async () => {
      const file = input.files[0];
      if (!file) return;

      const imageData = new FormData();
      imageData.append("image", file);

      try {
        const res = await fetch("/api/post/upload", {
          method: "POST",
          body: imageData
        })

        const data = await res.json();
        if (!res.ok || !data.imageUrl) {
          throw new Error("Failed to upload image");
        }

        const quillEditor = quill.current.getEditor();
        const range = quillEditor.getSelection(true);
        quillEditor.insertEmbed(range.index, "image", data.imageUrl);
        quillEditor.setSelection(range.index + 1);
      } catch(err) {
        console.log("Image upload Error:", err.message);
      }
    };
  }, []);

  //   modules
  const modules = {
    toolbar: {
      container: [
        [{ header: [2, 3, 4, false] }],
        ["bold", "italic", "underline", "blockquote"],
        [{ color: [] }],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image"],
        ["clean"],
      ],
      handlers: {
        image: imageHandler,
      },
    },
    clipboard: {
      matchVisual: true,
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!value.trim()) {
      console.log("Content cannot be empty");
      return;
    }

    // if (!image && Object.keys(formData).length === 0) {
    //   console.log("No changes made");
    //   return;
    // }

    try {
      let imageUrl = "";

      if (image) {
        const imageFormData = new FormData();
        imageFormData.append("image", image);

        const uploadRes = await fetch("/api/post/upload", {
          method: "POST",
          body: imageFormData,
        });

        const uploadData = await uploadRes.json();
        if (uploadData.imageUrl) {
          imageUrl = uploadData.imageUrl;
        }
      }

      const postData = {
        title: formData.title || "",
        category: formData.category || "uncategorized",
        content: value, // Editor content,
        userId: currentUser?._id || "",
        image: imageUrl,
      };

      const res = await fetch(`api/article/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to publish");
      }

      console.log("Article created: ", data);
    } catch (err) {
      console.error("Getting Parse Error: ", err.message);
      setPublishError(err.message);
    }
    // If the formData is empty
    // if ()
  };
  //   Handler to handle button clicked
  // const handler = () => {
  //   console.log(value);
  // };

  useEffect(() => {
    // This ensures that formData.content updates whenever the editor content changes.
    setFormData((prev) => ({
      ...prev,
      category: "uncategorized",
      content: value,
    }));
  }, [value]);
  return (
    <>
      <h1 className="mb-5  mt-2 flex justify-center rounded-sm border-2 bg-white py-2 font-mono text-3xl font-bold text-[#8900D9]">
        Create Post
      </h1>
      <form className="mt-20 px-12 py-8" onSubmit={handleSubmit}>
        <div className="flex flex-col justify-between gap-4">
          <TextInput
            id="title"
            type="text"
            name="title"
            placeholder="Title"
            required
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value={"uncategorized"}>Select a category</option>
            <option value={"javascript"}>JavaScript</option>
            <option value={"reactjs"}>React.js</option>
            <option value={"nextjs"}>Next.js</option>
          </Select>
        </div>
        {/* <div className="my-5">
          <Dropdown
            label="Pick category"
            onChange={(e) => setCategory(e.target.value)}
          >
            <Dropdown.Item value="reactjs">React.js</Dropdown.Item>
            <Dropdown.Item value="nodejs">Node.js</Dropdown.Item>
            <Dropdown.Item value="mysql">MySQL</Dropdown.Item>
            <Dropdown.Item value="expressjs">Express.js</Dropdown.Item>
          </Dropdown>
          <div> */}
        {/* <div className="mb-2 block">
              <Label htmlFor="file-upload" value="Upload file" />
            </div>
            <FileInput id="file-upload" helperText="PNG, JPG or JPEG" />
          </div>
        </div> */}
        <div>
          <FileInput type="file" accept="images/*" onChange={handlePostImage} />
          {/* <Button
            type="button"
            gradientDuoTone={"greenToBlue"}
            size={"sm"}
            outline
            onClick={handleUploadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className="h-16 w-16">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}`}
                />
              </div>
            ) : (
              "Upload image"
            )}
          </Button> */}
        </div>
        {imageUploadError && (
          <Alert color={"failure"}>{imageUploadError}</Alert>
        )}
        {formData.image && (
          <img
            src={formData.image}
            alt="upload"
            className="h-72 w-full object-cover"
          />
        )}
        <QuillEditor
          className="mt-4 h-[500px] text-white"
          theme="snow"
          id="content"
          placeholder="Write something..."
          value={value}
          onChange={(value) => setValue(value)}
          ref={(el) => (quill.current = el)}
          formats={formats}
          modules={modules}
        />
        <Button
          className="mx-auto mt-20"
          outline
          gradientDuoTone="greenToBlue"
          type="submit"
        >
          Publish
        </Button>
        {publishError && (
          <Alert className="mt-5" color={"failure"}>
            {publishError}
          </Alert>
        )}
      </form>
    </>
  );
}

export default Editor;
