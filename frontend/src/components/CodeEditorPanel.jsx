import Editor from "@monaco-editor/react";
import { CheckCircleIcon, Loader2Icon, PlayIcon, SparklesIcon, UsersIcon } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { MonacoBinding } from "y-monaco";
import { LANGUAGE_CONFIG } from "../data/problems";

function CodeEditorPanel({
  selectedLanguage,
  code,
  isRunning,
  onLanguageChange,
  onCodeChange,
  onRunCode,
  onAiReview,
  isReviewing,
  onSubmit,
  isSubmitting,
  // Yjs collaboration props (optional — only passed in SessionPage)
  ydoc,
  yjsConnected,
  yjsPeers,
}) {
  const editorRef = useRef(null);
  const bindingRef = useRef(null);
  const [editorReady, setEditorReady] = useState(false);

  // Bind Yjs Y.Text to Monaco editor model when both are available
  useEffect(() => {
    if (!editorReady || !editorRef.current || !ydoc) return;

    // Destroy old binding if exists
    if (bindingRef.current) {
      bindingRef.current.destroy();
      bindingRef.current = null;
    }

    const ytext = ydoc.getText("monacoContent");
    const editor = editorRef.current;
    const model = editor.getModel();
    if (!model) return;

    const binding = new MonacoBinding(ytext, model, new Set([editor]));
    bindingRef.current = binding;

    return () => {
      if (bindingRef.current) {
        bindingRef.current.destroy();
        bindingRef.current = null;
      }
    };
  }, [editorReady, ydoc]);

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
    setEditorReady(true);
  };
  return (
    <div className="h-full bg-base-300 flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 bg-base-100 border-t border-base-300">
        <div className="flex items-center gap-3">
          <img
            src={LANGUAGE_CONFIG[selectedLanguage].icon}
            alt={LANGUAGE_CONFIG[selectedLanguage].name}
            className="size-6"
          />
          <select className="select select-sm" value={selectedLanguage} onChange={onLanguageChange}>
            {Object.entries(LANGUAGE_CONFIG).map(([key, lang]) => (
              <option key={key} value={key}>
                {lang.name}
              </option>
            ))}
          </select>

          {/* Collaboration status indicator */}
          {ydoc && (
            <div className="flex items-center gap-1.5 ml-2">
              <span
                className={`w-2 h-2 rounded-full ${yjsConnected ? "bg-success animate-pulse" : "bg-error"}`}
              />
              <span className="text-xs text-base-content/60 flex items-center gap-1">
                <UsersIcon className="size-3" />
                {yjsPeers || 1}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {onAiReview && (
            <button
              className="btn btn-accent btn-sm gap-2"
              disabled={isReviewing || !code?.trim()}
              onClick={onAiReview}
            >
              {isReviewing ? (
                <Loader2Icon className="size-4 animate-spin" />
              ) : (
                <SparklesIcon className="size-4" />
              )}
              AI Review
            </button>
          )}
          <button
            className="btn btn-primary btn-sm gap-2"
            disabled={isRunning || isSubmitting}
            onClick={onRunCode}
          >
            {isRunning ? (
              <>
                <Loader2Icon className="size-4 animate-spin" />
                Running...
              </>
            ) : (
              <>
                <PlayIcon className="size-4" />
                Run Code
              </>
            )}
          </button>
          {onSubmit && (
            <button
              className="btn btn-success btn-sm gap-2"
              disabled={isSubmitting || isRunning}
              onClick={onSubmit}
            >
              {isSubmitting ? (
                <>
                  <Loader2Icon className="size-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <CheckCircleIcon className="size-4" />
                  Submit
                </>
              )}
            </button>
          )}
        </div>
      </div>

      <div className="flex-1">
        <Editor
          height={"100%"}
          language={LANGUAGE_CONFIG[selectedLanguage].monacoLang}
          // When Yjs is active, it controls the document — don't pass value/onChange
          {...(ydoc ? {} : { value: code, onChange: onCodeChange })}
          onMount={handleEditorDidMount}
          theme="vs-dark"
          options={{
            fontSize: 16,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            minimap: { enabled: false },
          }}
        />
      </div>
    </div>
  );
}
export default CodeEditorPanel;
