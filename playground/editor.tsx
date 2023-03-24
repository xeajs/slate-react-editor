import { Button } from 'antd'
import { createRoot } from 'react-dom/client'
import { ConfigProvider, Editor, i18nChangeLanguage, Toolbar } from '../src'
import '../src/theme/index.css'

export default function AppEditor() {
  // value={'<p>a<sub>sd</sub>f<sup>asd</sup>fa<s><u><em><strong>sdfa但是撒</strong></em></u></s></p>'}
  return (
    <div style={{ maxWidth: '768px', margin: '0 auto' }}>
      <ConfigProvider
        // defaultValue={'<img src="https://arweave.net/VZUcSKMUIgDMPJUTLgojk8CZ4bY23k96qazuWnBe3x8"></img>'}
        defaultValue={
          '<img src="https://arweave.net/VZUcSKMUIgDMPJUTLgojk8CZ4bY23k96qazuWnBe3x8"></img><p>12345</p><p>678910</p><p><br /></p><img src="https://arweave.net/VZUcSKMUIgDMPJUTLgojk8CZ4bY23k96qazuWnBe3x8"></img><p><br /></p><p><br /></p>'
        }
        // defaultValue={[
        //   {
        //     type: 'paragraph',
        //     children: [
        //       {
        //         text: '111',
        //       },
        //       {
        //         text: '22',
        //         bold: true,
        //       },
        //     ],
        //   },
        //   {
        //     type: 'image',
        //     src: 'https://source.unsplash.com/kFrdX5IeQzI',
        //     children: [{ text: '' }],
        //   },
        //   {
        //     type: 'paragraph',
        //     children: [
        //       {
        //         text: 'This example shows images in action. It features two ways to add images. You can either add an image via the toolbar icon above, or if you want in on a little secret, copy an image URL to your clipboard and paste it anywhere in the editor!',
        //       },
        //     ],
        //   },
        //   {
        //     type: 'paragraph',
        //     children: [
        //       {
        //         text: 'You can delete images with the cross in the top left. Try deleting this sheep:',
        //       },
        //     ],
        //   },
        //   {
        //     type: 'image',
        //     src: 'https://source.unsplash.com/zOwZKwZOZq8',
        //     children: [{ text: '' }],
        //   },
        // ]}
        onChange={(e, val) => {
          console.log(val)
        }}
      >
        <Button
          onClick={() => {
            i18nChangeLanguage('en-US')
          }}
        >
          英文
        </Button>
        <Toolbar />

        <br />
        <br />
        <br />
        <Editor style={{ minHeight: '300px', border: '1px solid #f9f9f9' }} placeholder="请输入" />
      </ConfigProvider>
    </div>
  )
}

createRoot(document.getElementById('root') as HTMLElement).render(<AppEditor />)
