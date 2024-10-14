"use client";

import { Box, Button, Flex } from "@radix-ui/themes";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Heading1, List } from "lucide-react";
import React, { useEffect } from "react";

interface MenuBarProps {
  editor: Editor | null;
}

const MenuBar: React.FC<MenuBarProps> = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <Flex gap="2" mb="2">
      <Button
        type="button"
        variant={editor.isActive("bold") ? "solid" : "soft"}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold size={16} />
      </Button>
      <Button
        type="button"
        variant={editor.isActive("bulletList") ? "solid" : "soft"}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List size={16} />
      </Button>
      <Button
        type="button"
        variant={editor.isActive("heading", { level: 1 }) ? "solid" : "soft"}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        <Heading1 size={16} />
      </Button>
    </Flex>
  );
};

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  content,
  onChange,
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        heading: {
          levels: [1],
        },
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none",
      },
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content, false);
    }
  }, [content, editor]);

  return (
    <Flex direction="column" gap="2">
      <Box
        style={{
          border: "1px solid var(--gray-a7)",
          borderRadius: "var(--radius-2)",
        }}
      >
        <Box p="2">
          <MenuBar editor={editor} />
        </Box>

        <EditorContent
          editor={editor}
          style={{ borderTop: "1px solid var(--gray-a7)", padding: 4 }}
        />
      </Box>
    </Flex>
  );
};

export default RichTextEditor;
