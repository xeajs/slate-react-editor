const defines = {
  toolbar: [],
  tipsbar: {
    image: [
      'image.w25',
      'image.w50',
      'image.w75',
      'image.w100',
      'image.align.start',
      'image.align.center',
      'image.align.end',
    ],
  },
  linebar: {},
}

export function getToolbars(): string[] {
  return defines.toolbar
}

export function getTipsbars(type: string): string[] {
  const shared: string[] = []
  return [...shared, ...(defines.tipsbar[type] || [])]
}

export function getLinebars(type: string): string[] {
  const shared: string[] = ['insert.top', 'insert.bottom', 'delete']
  return [...shared, ...(defines.linebar[type] || [])]
}
