import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

function App() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [skills, setSkills] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(false);

  const generateLetter = async () => {
    setLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(
        import.meta.env.VITE_GEMINI_API_KEY
      );

      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
      });

      const prompt = `
Write a professional cover letter.

Candidate Name: ${name}
Job Role: ${role}
Company: ${company}
Skills: ${skills}
`;

      const result = await model.generateContent(prompt);

      setCoverLetter(result.response.text());
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }

    setLoading(false);
  };

  const copyText = () => {
    navigator.clipboard.writeText(coverLetter);
    alert("Copied!");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center">
          AI Cover Letter Generator
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Candidate Name"
            className="w-full border p-3 rounded-lg"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Job Role"
            className="w-full border p-3 rounded-lg"
            onChange={(e) => setRole(e.target.value)}
          />

          <input
            type="text"
            placeholder="Target Company"
            className="w-full border p-3 rounded-lg"
            onChange={(e) => setCompany(e.target.value)}
          />

          <textarea
            placeholder="Key Skills"
            className="w-full border p-3 rounded-lg"
            rows="4"
            onChange={(e) => setSkills(e.target.value)}
          ></textarea>

          <button
            onClick={generateLetter}
            className="w-full bg-black text-white p-3 rounded-lg"
          >
            {loading ? "Generating..." : "Generate Cover Letter"}
          </button>
        </div>

        {coverLetter && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-3">
              Generated Letter
            </h2>

            <div className="bg-gray-100 p-4 rounded-lg whitespace-pre-line">
              {coverLetter}
            </div>

            <button
              onClick={copyText}
              className="mt-4 bg-green-600 text-white px-5 py-2 rounded-lg"
            >
              Copy to Clipboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;