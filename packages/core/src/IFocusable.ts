export interface IFocusable {
    tabIndex: number
    tabGroup: string

    blur(): void
    focus(): void
}