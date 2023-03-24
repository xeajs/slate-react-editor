# slate-react-editor

基于 slatejs 的、现代化插件系统的、高度可定制的、所见即所得的 React 富文本编辑器

### 立即开始

```bash
pnpm install slate-react-editor@latest

# or

npm install slate-react-editor@latest
```

### 立即使用

```tsx
import { ConfigProvider, Toolbar, Editor } from 'slate-react-editor'

export default function MyEditorPage() {
  return (
    <div>
      <Input placeholder="请输入标题" />

      <ConfigProvider defaultValue="<p>Hello Word</p>">
        <Toolbar />
        <Editor placeholder="请输入" />
      </ConfigProvider>
    </div>
  )
}
```
