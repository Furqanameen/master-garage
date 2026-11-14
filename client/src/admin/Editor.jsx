import { useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import { adminApi } from './adminApi.js';

function Btn({ on, active, children, title }) {
  return (
    <button type="button" title={title} className={active ? 'ed-btn ed-btn--on' : 'ed-btn'} onClick={on}>
      {children}
    </button>
  );
}

export default function Editor({ value, onChange, placeholder = 'Write the page the same way as the current blogs: headings, paragraphs, lists and images.' }) {
  const fileRef = useRef();
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3, 4] } }),
      Underline,
      Image.configure({ inline: false, allowBase64: false }),
      Link.configure({ openOnClick: false, autolink: true, HTMLAttributes: { rel: 'noopener noreferrer' } }),
      Placeholder.configure({ placeholder }),
    ],
    content: value || '',
    onUpdate: ({ editor: ed }) => onChange(ed.getHTML()),
  });

  async function addImage(e) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file || !editor) return;
    const body = new FormData();
    body.append('file', file);
    const { url } = await adminApi('/upload', { method: 'POST', body });
    editor.chain().focus().setImage({ src: url, alt: file.name.replace(/\.[^.]+$/, '') }).run();
  }

  function addLink() {
    const prev = editor.getAttributes('link').href || '';
    const url = window.prompt('Link URL', prev);
    if (url === null) return;
    if (!url) editor.chain().focus().unsetLink().run();
    else editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }

  if (!editor) return <div className="ed-shell">Loading editor…</div>;

  return (
    <div className="ed-shell">
      <div className="ed-bar" role="toolbar" aria-label="Formatting">
        <Btn title="Bold" active={editor.isActive('bold')} on={() => editor.chain().focus().toggleBold().run()}><b>B</b></Btn>
        <Btn title="Italic" active={editor.isActive('italic')} on={() => editor.chain().focus().toggleItalic().run()}><i>I</i></Btn>
        <Btn title="Underline" active={editor.isActive('underline')} on={() => editor.chain().focus().toggleUnderline().run()}><u>U</u></Btn>
        <span className="ed-sep" />
        <Btn title="Heading 2" active={editor.isActive('heading', { level: 2 })} on={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</Btn>
        <Btn title="Heading 3" active={editor.isActive('heading', { level: 3 })} on={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>H3</Btn>
        <span className="ed-sep" />
        <Btn title="Bullet list" active={editor.isActive('bulletList')} on={() => editor.chain().focus().toggleBulletList().run()}>• List</Btn>
        <Btn title="Numbered list" active={editor.isActive('orderedList')} on={() => editor.chain().focus().toggleOrderedList().run()}>1. List</Btn>
        <Btn title="Quote" active={editor.isActive('blockquote')} on={() => editor.chain().focus().toggleBlockquote().run()}>Quote</Btn>
        <span className="ed-sep" />
        <Btn title="Link" active={editor.isActive('link')} on={addLink}>Link</Btn>
        <Btn title="Insert image" on={() => fileRef.current?.click()}>Image</Btn>
        <Btn title="Horizontal line" on={() => editor.chain().focus().setHorizontalRule().run()}>Line</Btn>
        <Btn title="Undo" on={() => editor.chain().focus().undo().run()}>Undo</Btn>
      </div>
      <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => addImage(e).catch((err) => window.alert(err.message))} />
      <EditorContent editor={editor} className="ed-body prose" />
    </div>
  );
}
