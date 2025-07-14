import { useRef, useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { uploadResumeImage, saveResume } from "../../services/resumeApi";
import { toast } from "react-hot-toast";

function ResumeBuilder() {
  const tinymceApiKey = import.meta.env.VITE_TINYMCE_API_KEY;

  const editorRef = useRef(null);
  const [resumeName, setResumeName] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(mediaQuery.matches);
    mediaQuery.onchange = (e) => setIsDarkMode(e.matches);
  }, []);

  const handleSave = async () => {
    const content = editorRef.current?.getContent();
    if (!resumeName.trim()) return toast.error("Enter a resume name");
    try {
      await saveResume({ name: resumeName, content });
      toast.success("Resume saved successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save resume");
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <input
          type="text"
          className="px-4 py-2 rounded border w-full md:w-1/2"
          placeholder="Enter Resume Name"
          value={resumeName}
          onChange={(e) => setResumeName(e.target.value)}
        />
        <div className="flex gap-3">
          <button
            onClick={handleSave}
            disabled={!resumeName.trim()}
            className={`px-4 py-2 rounded text-white bg-blue-600 transition-opacity ${
              !resumeName.trim() ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Save
          </button>
        </div>
      </div>

      <Editor
        apiKey={tinymceApiKey}
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={`<h2 style="text-align: center;">Start building your resume</h2>`}
        init={{
          height: 600,
          menubar: "file edit view insert format tools table help",
          plugins:
            "preview importcss searchreplace autolink autosave directionality code visualblocks " +
            "visualchars fullscreen image link codesample table charmap pagebreak nonbreaking " +
            "anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons accordion",
          toolbar:
            "undo redo | accordion accordionremove | blocks fontfamily fontsize | bold italic underline strikethrough | " +
            "alignleft aligncenter alignright alignjustify | numlist bullist checklist outdent indent | " +
            "forecolor backcolor removeformat | link image table | code fullscreen preview print | " +
            "pagebreak anchor codesample | charmap emoticons | ltr rtl",
          autosave_ask_before_unload: true,
          autosave_interval: "30s",
          autosave_prefix: "{path}{query}-{id}-",
          autosave_retention: "2m",
          image_advtab: true,
          image_caption: true,
          quickbars_selection_toolbar:
            "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
          noneditable_class: "mceNonEditable",
          toolbar_mode: "sliding",
          contextmenu: "link image table",
          skin: isDarkMode ? "oxide-dark" : "oxide",
          content_css: isDarkMode ? "dark" : "default",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",

          file_picker_callback: async (callback, value, meta) => {
            if (meta.filetype === "image") {
              const input = document.createElement("input");
              input.setAttribute("type", "file");
              input.setAttribute("accept", "image/*");

              input.onchange = async () => {
                const file = input.files[0];
                if (!file) return;

                try {
                  const imageUrl = await uploadResumeImage(file); // upload to Cloudinary
                  callback(imageUrl, { title: file.name }); // insert into editor
                } catch (err) {
                  console.error("Image upload failed:", err);
                  toast.error("Failed to upload image");
                }
              };

              input.click();
            }
          },
        }}
      />
    </div>
  );
}

export default ResumeBuilder;
