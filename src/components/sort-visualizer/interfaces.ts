export enum HighlightColorEnum {
  Lock = '#e63946',
  Select = '#a8dadc',
  Divide = '#f39237',
  Pivot = '#fcdc4d',
}

export interface HighlightItem {
  index: number;
  color: HighlightColorEnum;
}

export const HighlightItemLock = (index: number) =>
  <HighlightItem>{ index, color: HighlightColorEnum.Lock };

export const HighlightItemSelect = (index: number) =>
  <HighlightItem>{ index, color: HighlightColorEnum.Select };

export const HighlightItemsDivide = (index: number) =>
  <HighlightItem>{ index, color: HighlightColorEnum.Divide };

export const HighlightItemPivot = (index: number) =>
  <HighlightItem>{ index, color: HighlightColorEnum.Pivot };
