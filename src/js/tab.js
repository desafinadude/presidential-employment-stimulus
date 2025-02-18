import $ from 'jquery';

const MENU_ITEM_SELECTOR = '.tabs-wrapper a';
const CONTENT_PANE_SELECTOR = '.tab-pane';

const SELECTED_MENU_ITEM_CLASS = 'w--current';
const SELECTED_CONTENT_PANE_CLASS = 'w--tab-active';

const $menuItemTemplate = $(MENU_ITEM_SELECTOR).first().clone(true, true);
const $contentPaneTemplate = $(CONTENT_PANE_SELECTOR).first().clone(true, true);
$contentPaneTemplate.removeAttr('data-w-tab');

export class Tab {
  constructor(menuSelector, contentSelector, title, selectCallback) {
    this._menuSelector = menuSelector;
    this._contentSelector = contentSelector;
    this._title = title;
    this.selectCallback = selectCallback;
    this.render();
  }

  select(on) {
    this._$menuItem
      .toggleClass(SELECTED_MENU_ITEM_CLASS, on)
      .attr('aria-selected', on);
    this._$contentPane
      .toggleClass(SELECTED_CONTENT_PANE_CLASS, on);
    this._$contentPane.animate({
      display: on ? 'block' : 'none',
      opacity: on ? 1 : 0,
    }, on ? 500 : 0);
  }

  get $menuItem() {
    return this._$menuIteml;
  }

  get $contentPane() {
    return this._$contentPane;
  }

  get $container() {
    return this._$container;
  }

  render() {
    this._$menuItem = $menuItemTemplate.clone(true, true);
    this._$menuItem.find('div').text(this._title);
    $(this._menuSelector).append(
      this._$menuItem,
    );
    this._$contentPane = $contentPaneTemplate.clone(true, true);
    this._$contentPane.find('.tab-inner').empty();
    $(this._contentSelector).append(
      this._$contentPane,
    );
    this._$menuItem.on('click', () => {
      this.selectCallback();
    });
    this._$container = this._$contentPane.find('.tab-inner');
    this.select(false);
  }
}
