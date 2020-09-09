import * as PIXI from 'pixi.js';
import { TabGroup, FocusController } from './ctl/FocusController';
import { InteractiveGroup } from './InteractiveGroup';
import { IFocusable } from './IFocusable';

/**
 * @namespace PUXI
 * @interface
 * @property {PIXI.Container}[background]
 * @property {number}[tabIndex]
 * @property {PUXI.TabGroup}[tabGroup]
 */
export interface IFocusableOptions
{
    background?: PIXI.Container;
    tabIndex?: number;
    tabGroup?: any;
    focusController?: FocusController;
}

/**
 * Represents a view that can gain or loose focus. It is primarily subclassed by
 * input/form widgets.
 *
 * Generally, it is a good idea not use layouts on these types of widgets.
 *
 * @class
 * @extends PUXI.Widget
 * @memberof PUXI
 */
export abstract class FocusableWidget extends InteractiveGroup implements IFocusable
{
    _isFocused: boolean;
    _isMousePressed: boolean;
    _focusController: FocusController;

    tabIndex: number;
    tabGroup: TabGroup;


    /**
     * @param {PUXI.IInputBaseOptions} options
     * @param {PIXI.Container}[options.background]
     * @param {number}[options.tabIndex]
     * @param {any}[options.tabGroup]
     */
    constructor(options: IFocusableOptions = {})
    {
        super();

        if (options.background)
        {
            super.setBackground(options.background);
        }

        // for detached context (from stage)
        if (options.focusController)
        {
            this._focusController = options.focusController
        }

        // Prevents double focusing/blurring.
        this._isFocused = false;

        // Used to lose focus when mouse-down outside widget.
        this._isMousePressed = false;

        this.interactive = true;

        /**
         * @member {number}
         * @readonly
         */
        this.tabIndex = options.tabIndex;

        /**
         * The name of the tab group in which this widget's focus will move on
         * pressing tab.
         * @member {PUXI.TabGroup}
         * @readonly
         */
        this.tabGroup = options.tabGroup;

        this.insetContainer.on('pointerdown', () =>
        {
            this.focus();
            this._isMousePressed = true;
        });

        this.insetContainer.on('pointerup', () => { this._isMousePressed = false; });
        this.insetContainer.on('pointerupoutside', () => { this._isMousePressed = false; });
    }

    /**
     * Brings this widget into focus.
     */
    focus(): void
    {
        if (this.isFocused)
        {
            return;
        }

        this.focusController.notifyFocus(this);

        this._isFocused = true;
        this.bindEvents();

        this.emit('focusChanged', true);
        this.emit('focus');
    }

    /**
     * Brings this widget out of focus.
     */
    blur(): void
    {
        if (!this._isFocused)
        {
            return;
        }

        this.focusController.notifyBlur();

        this._isFocused = false;
        this.clearEvents();

        this.emit('focusChanged', false);
        this.emit('blur');
    }

    /**
     * Whether this widget is in focus.
     * @member {boolean}
     * @readonly
     */
    get isFocused(): boolean
    {
        return this._isFocused;
    }

    private bindEvents = (): void =>
    {
        this.stage.on('pointerdown', this.onDocumentPointerDownImpl);
        document.addEventListener('keydown', this.onKeyDownImpl);
    };

    private clearEvents = (): void =>
    {
        this.stage.off('pointerdown', this.onDocumentPointerDownImpl);
        document.removeEventListener('keydown', this.onKeyDownImpl);
    };

    protected onKeyDownImpl = (e: any): void =>
    {
        const focusCtl = this.stage.focusController;

        if (e.which === 9 && focusCtl.useTab)
        {
            focusCtl.onTab();
            e.preventDefault();
        }
        else if (e.which === 38 && focusCtl.useBack)
        {
            focusCtl.onBack();
            e.preventDefault();
        }
        else if (e.which === 40 && focusCtl.useForward)
        {
            focusCtl.onForward();
            e.preventDefault();
        }

        this.emit('keydown');
    };

    private onDocumentPointerDownImpl = (): void =>
    {
        if (!this._isMousePressed)
        {
            this.blur();
        }
    };

    initialize(): void
    {
        super.initialize();
        this.focusController.in(this, this.tabIndex, this.tabGroup);
    }

    /**
     * Fired when the widget comes into focus.
     * @event focus
     */

    /**
     * Fired when the widget goes out of focus.
     * @event blur
     */

    /**
     * Fired when the widgets comes into or goes out of focus.
     * @event focusChanged
     * @param {boolean} isFocused - whether the widget is in focus.
     */

    protected get focusController() {
        return this._focusController || this.stage.focusController
    }
}
