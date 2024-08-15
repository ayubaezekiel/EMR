import { RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";

import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";
import "./styles.css";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import { useEffect } from "react";

interface EditorProp {
	initialValue: string;
	onChange: (value: string) => void;
}
export function RichEditor({ onChange, initialValue }: EditorProp) {
	const editor = useEditor({
		extensions: [
			StarterKit,
			Underline,
			Superscript,
			Subscript,
			Highlight,
			TextAlign.configure({ types: ["heading", "paragraph"] }),
		],
		onUpdate: ({ editor }) => {
			onChange(editor.getHTML());
		},
		content: initialValue,
	});

	useEffect(() => {
		editor?.commands.setContent(initialValue);
	}, [editor, initialValue]);

	return (
		<MantineProvider>
			<RichTextEditor editor={editor} classNames={{ root: "rich-text-class" }}>
				<RichTextEditor.Toolbar sticky stickyOffset={60}>
					<RichTextEditor.ControlsGroup>
						<RichTextEditor.Bold />
						<RichTextEditor.Italic />
						<RichTextEditor.Underline />

						<RichTextEditor.ClearFormatting />
					</RichTextEditor.ControlsGroup>

					<RichTextEditor.ControlsGroup>
						<RichTextEditor.H1 />
						<RichTextEditor.H2 />
						<RichTextEditor.H3 />
						<RichTextEditor.H4 />
					</RichTextEditor.ControlsGroup>

					<RichTextEditor.ControlsGroup>
						<RichTextEditor.Hr />
						<RichTextEditor.BulletList />
						<RichTextEditor.OrderedList />
						<RichTextEditor.Subscript />
						<RichTextEditor.Superscript />
					</RichTextEditor.ControlsGroup>

					<RichTextEditor.ControlsGroup>
						<RichTextEditor.AlignLeft />
						<RichTextEditor.AlignCenter />
						<RichTextEditor.AlignJustify />
						<RichTextEditor.AlignRight />
					</RichTextEditor.ControlsGroup>

					<RichTextEditor.ControlsGroup>
						<RichTextEditor.Undo />
						<RichTextEditor.Redo />
					</RichTextEditor.ControlsGroup>
				</RichTextEditor.Toolbar>
				<RichTextEditor.Content />
			</RichTextEditor>
		</MantineProvider>
	);
}
