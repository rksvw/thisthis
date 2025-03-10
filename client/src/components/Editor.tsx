import { useState, useMemo, useRef, useCallback } from "react";
import QuillEditor from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from "flowbite-react";

function Editor() {
  // Editor state
  const [value, setValue] = useState("");

  //   Editor ref
  const quill = useRef();

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

  //   Handler to handle button clicked
  const handler = () => {
    console.log(value);
  };
  return (
    <div className="mt-20 px-12 py-8">
      <label className="text-xl font-bold text-white">Editor Content</label>
      <QuillEditor
        className="mt-4 h-[500px] text-white"
        theme="snow"
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
      >
        Submit
      </Button>
    </div>
  );
}

export default Editor;
