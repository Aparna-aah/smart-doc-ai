import React, { useState, useRef } from "react";
import {
  Upload,
  FileText,
  Globe,
  MessageCircle,
  Sparkles,
  Download,
  Copy,
  Send,
  Brain,
  Languages,
  Moon,
  Sun,
  History,
} from "lucide-react";
import { motion } from "framer-motion";

const API =
  import.meta.env.VITE_API_BASE_URL ||
  "https://smart-doc-ai-fusb.onrender.com/api";

export default function App() {
  const fileInput = useRef();

  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [translation, setTranslation] = useState("");
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [dark, setDark] = useState(true);
  const [history, setHistory] = useState([]);
  const [language, setLanguage] = useState("English");

  const uploadFile = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    try {
      const res = await fetch(`${API}/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      setSummary(data.summary || "");
      setHistory((prev) => [...prev, file.name]);
    } catch (err) {
      alert("Upload failed.");
    }

    setLoading(false);
  };

  return (
    <div
      className={`min-h-screen ${
        dark
          ? "bg-slate-950 text-white"
          : "bg-white text-slate-900"
      } transition-all`}
            <div className="absolute inset-0 overflow-hidden">

        <div className="absolute w-96 h-96 bg-purple-700 rounded-full blur-[170px] opacity-30 top-10 left-10"/>

        <div className="absolute w-96 h-96 bg-cyan-600 rounded-full blur-[170px] opacity-30 bottom-0 right-0"/>

      </div>

      <nav className="relative flex justify-between items-center p-8">

        <h1 className="text-4xl font-bold flex items-center gap-3">

          <Sparkles className="text-cyan-400"/>

          Smart Document AI

        </h1>

        <button
          onClick={()=>setDark(!dark)}
          className="p-3 rounded-full bg-white/10"
        >

          {dark ? <Sun/> : <Moon/>}

        </button>

      </nav>

      <section className="relative flex flex-col items-center justify-center py-24">

        <motion.h1

        initial={{opacity:0,y:40}}

        animate={{opacity:1,y:0}}

        transition={{duration:.8}}

        className="text-7xl font-black text-center leading-tight">

          Analyze

          <span className="text-cyan-400">

            {" "}Documents

          </span>

          <br/>

          Using AI

        </motion.h1>

        <motion.p

        initial={{opacity:0}}

        animate={{opacity:1}}

        transition={{delay:.5}}

        className="text-xl text-slate-300 mt-8 max-w-3xl text-center">

          Upload PDFs, Images or Documents and instantly

          extract text, generate summaries,

          translate into multiple languages

          and ask questions about your document.

        </motion.p>
                    <motion.div

        whileHover={{scale:1.03}}

        className="mt-14 w-[700px] rounded-3xl

        border border-white/10

        bg-white/5

        backdrop-blur-xl

        p-10">

          <div

          onClick={()=>fileInput.current.click()}

          className="border-2 border-dashed

          border-cyan-500

          rounded-2xl

          cursor-pointer

          p-14

          text-center">

            <Upload

            className="mx-auto w-20 h-20 text-cyan-400"/>

            <h2 className="text-3xl mt-5 font-bold">

              Drag & Drop Files

            </h2>

            <p className="mt-3 text-slate-300">

              PDF • DOCX • Images

            </p>

            <button

            className="mt-8 px-8 py-4 rounded-xl

            bg-cyan-500

            hover:bg-cyan-400

            font-bold">

              Browse Files

            </button>

            <input

            ref={fileInput}

            type="file"

            hidden

            onChange={(e)=>setFile(e.target.files[0])}

            />

          </div>

          {file && (

            <div className="mt-8">

              <p className="text-green-400">

                Selected: {file.name}

              </p>

              <button

              onClick={uploadFile}

              className="mt-5 px-8 py-4 rounded-xl

              bg-purple-600

              hover:bg-purple-500">

                {loading ? "Analyzing..." : "Analyze Document"}

              </button>

            </div>

          )}

        </motion.div>

      </section>
              {/* ================= SUMMARY + TRANSLATION ================= */}

<div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-8 pb-12">

  {/* Summary */}

  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8"
  >

    <div className="flex items-center justify-between">

      <div className="flex items-center gap-3">

        <Brain className="text-cyan-400" />

        <h2 className="text-2xl font-bold">

          AI Summary

        </h2>

      </div>

      <button
        onClick={() => navigator.clipboard.writeText(summary)}
      >

        <Copy className="hover:text-cyan-400"/>

      </button>

    </div>

    <div className="mt-6">

      {summary ? (

        <p className="leading-8 text-slate-300">

          {summary}

        </p>

      ) : (

        <p className="text-slate-500">

          Upload a document to generate an AI summary.

        </p>

      )}

    </div>

  </motion.div>

  {/* Translation */}

  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8"
  >

    <div className="flex items-center gap-3">

      <Languages className="text-green-400"/>

      <h2 className="text-2xl font-bold">

        Translation

      </h2>

    </div>

    <select

      value={language}

      onChange={(e)=>setLanguage(e.target.value)}

      className="w-full mt-6 rounded-xl bg-slate-900 p-4"

    >

      <option>English</option>

      <option>Hindi</option>

      <option>Malayalam</option>

      <option>Tamil</option>

      <option>Telugu</option>

      <option>French</option>

      <option>German</option>

      <option>Spanish</option>

      <option>Japanese</option>

      <option>Chinese</option>

    </select>

    <button

      className="mt-6 px-6 py-3 rounded-xl bg-green-500 hover:bg-green-400"

    >

      Translate

    </button>

    <div className="mt-6">

      <p className="text-slate-300 whitespace-pre-wrap">

        {translation || "Translation will appear here."}

      </p>

    </div>

  </motion.div>

</div>

{/* ================= CHAT ================= */}

<div className="max-w-7xl mx-auto px-8">

<motion.div

className="rounded-3xl

bg-white/5

border border-white/10

backdrop-blur-xl

p-8"

>

<div className="flex items-center gap-3">

<MessageCircle className="text-purple-400"/>

<h2 className="text-2xl font-bold">

Ask Questions

</h2>

</div>

<input

value={question}

onChange={(e)=>setQuestion(e.target.value)}

placeholder="Ask anything about your document..."

className="mt-6

w-full

rounded-xl

bg-slate-900

p-4"

/>

<button

className="mt-5

flex items-center gap-2

px-6

py-3

rounded-xl

bg-purple-600

hover:bg-purple-500"

>

<Send size={18}/>

Ask AI

</button>

<div className="mt-8 rounded-xl bg-slate-900 p-6">

<p className="text-slate-300">

{answer || "AI response will appear here."}

</p>

</div>

</motion.div>

</div>
  const translateSummary = async () => {

  try{

    const res = await fetch(`${API}/translate`,{

      method:"POST",

      headers:{

        "Content-Type":"application/json"

      },

      body:JSON.stringify({

        text:summary,

        target_language:language

      })

    });

    const data=await res.json();

    setTranslation(data.translation);

  }

  catch(err){

    alert("Translation failed");

  }

};

const askQuestion=async()=>{

try{

const res=await fetch(`${API}/chat`,{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

question,

context:summary

})

});

const data=await res.json();

setAnswer(data.answer);

}

catch{

alert("Chat Failed");

}

};
{/* ================= DASHBOARD ================= */}

<div className="max-w-7xl mx-auto px-8 mt-16">

  <h2 className="text-4xl font-bold mb-10">

    Dashboard

  </h2>

  <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">

    <motion.div
      whileHover={{ scale: 1.05 }}
      className="rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 p-8 shadow-xl"
    >
      <FileText size={45} />
      <h1 className="text-5xl font-bold mt-5">
        {history.length}
      </h1>
      <p className="mt-3 text-lg">
        Documents
      </p>
    </motion.div>

    <motion.div
      whileHover={{ scale: 1.05 }}
      className="rounded-3xl bg-gradient-to-br from-purple-500 to-pink-600 p-8 shadow-xl"
    >
      <Brain size={45} />
      <h1 className="text-5xl font-bold mt-5">
        {summary ? "1" : "0"}
      </h1>
      <p className="mt-3 text-lg">
        AI Summary
      </p>
    </motion.div>

    <motion.div
      whileHover={{ scale: 1.05 }}
      className="rounded-3xl bg-gradient-to-br from-green-500 to-emerald-600 p-8 shadow-xl"
    >
      <Languages size={45} />
      <h1 className="text-5xl font-bold mt-5">
        {translation ? "1" : "0"}
      </h1>
      <p className="mt-3 text-lg">
        Translations
      </p>
    </motion.div>

    <motion.div
      whileHover={{ scale: 1.05 }}
      className="rounded-3xl bg-gradient-to-br from-orange-500 to-red-600 p-8 shadow-xl"
    >
      <MessageCircle size={45} />
      <h1 className="text-5xl font-bold mt-5">
        {answer ? "1" : "0"}
      </h1>
      <p className="mt-3 text-lg">
        AI Chats
      </p>
    </motion.div>

  </div>

</div>

{/* ================= HISTORY ================= */}

<div className="max-w-7xl mx-auto px-8 mt-20">

  <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8">

    <div className="flex items-center gap-3 mb-8">

      <History className="text-yellow-400"/>

      <h2 className="text-3xl font-bold">

        Recent Documents

      </h2>

    </div>

    {history.length===0?

    (

      <p className="text-slate-400">

        No uploaded documents.

      </p>

    ):

    (

      history
    >
