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
      setImageUploadError("File size exceeds 5MB limit.");
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
    input.onchange = () => {
      const file = input.files[0];
      const reader = new FileReader();

      // Read the selected file as a data URL
      reader.onload = () => {
        const imageUrl = reader.result;
        const quillEditor = quill.current.getEditor();

        // Get the current selection range and insert the image at that index
        const range = quillEditor.getSelection(true);
        quillEditor.insertEmbed(range.index, "image", imageUrl, "user");
        quillEditor.setSelection(range.index + 1);
      };
      reader.readAsDataURL(file);
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

    if (!image && Object.keys(formData).length === 0) {
      console.log("No changes made");
      return;
    }

    try {
      const postData = new FormData();

      postData.append("title", formData.title);
      postData.append("category", formData.category);
      postData.append("content", value);
      postData.append("userId", currentUser._id);

      if (image) {
        const newFormData = new FormData();
        newFormData.append("image", image);

        const uploadRes = await fetch("/api/post/upload", {
          method: "POST",
          body: newFormData,
        });

        const uploadData = await uploadRes.json();
        if (uploadData.imageUrl) {
          postData.append("image", uploadData.imageUrl);
        }
      }
      console.log(postData)

      const res = await fetch(`api/article/create`, {
        method: "POST",
        body: postData,
      });
      const data = await res.json();
      console.log(data);

      if (data.success === false) {
        console.log("Error", data.message);
      }

      if (res.ok) {
        console.log(data);
      }
    } catch (err) {
      console.log("Getting Parse Error: ",err.message);
    }
    // If the formData is empty 
    // if ()
  };
  //   Handler to handle button clicked
  const handler = () => {
    console.log(value);
  };

  useEffect(() => {
    setFormData((prev) => ({ ...prev, category: "uncategorized" }));
  }, []);
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
          placeholder="Write something..."
          value={value}
          onChange={(value) => setValue(value)}
          ref={(el) => (quill.current = el)}
          formats={formats}
          modules={modules}
        />
        <Button
          onClick={handler}
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
