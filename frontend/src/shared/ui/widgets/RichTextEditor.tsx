"use client"

import type { CSSProperties } from "react"

import dynamic from "next/dynamic"

import { Skeleton } from "@/shared/ui/skeleton"

import "react-quill-new/dist/quill.snow.css"

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => (
    <div aria-hidden className="overflow-hidden rounded-[3px] border border-[#ccc]">
      <Skeleton className="h-10.5 border-b border-[#ccc] bg-white/40" />
      <Skeleton className="h-(--rte-height) min-h-32 bg-white/40" />
    </div>
  ),
})

interface RichTextEditorProps {
  value?: string
  onChange: (html: string) => void
  placeholder?: string
  height?: string
}

const formats = ["bold", "italic", "underline", "list", "link"]

const modules = {
  toolbar: [["bold", "italic", "underline"], [{ list: "ordered" }, { list: "bullet" }], ["link"]],
}

export function RichTextEditor({ value, onChange, placeholder, height }: RichTextEditorProps) {
  return (
    <div style={{ "--rte-height": height ?? "auto" } as CSSProperties}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        formats={formats}
        modules={modules}
        className="[&_.ql-container]:bg-white [&_.ql-editor]:h-(--rte-height)! [&_.ql-editor]:bg-white [&_.ql-toolbar]:bg-white"
      />
    </div>
  )
}
