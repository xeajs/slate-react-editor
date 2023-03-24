const defaultDefine = {
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
  tipopen: {},
}

export function getDefineToolbar() {
  return defaultDefine.toolbar
}
export function getDefineTipsbar(type: string): string[] {
  return defaultDefine.tipsbar[type] || []
}
export function getDefineTipopen(type: string): string[] {
  return defaultDefine.tipopen[type] || []
}
