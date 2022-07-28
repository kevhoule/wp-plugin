/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';
/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save({ className, attributes }) {
  const {
    isBeforeMenuVisible,
    isAfterMenuVisible,
    burgerModeBreakpoint,
    subMenuSelector,
    subMenuClass,
		menuId,
		subMenuContainerSelector,
    allowMultipleSubMenuOpen,
    toggleMenuText } = attributes;
  return (
    <okam-navigation
      className={className}
      allow-multiple-sub-menu-open={`${allowMultipleSubMenuOpen}`}
      burger-mode-breakpoint={`${burgerModeBreakpoint}`}
      is-after-menu-visible={`${isAfterMenuVisible}`}
			is-before-menu-visible={`${isBeforeMenuVisible}`}
			sub-menu-container-selector={`${subMenuContainerSelector}`}
      menu-id={`${menuId}`}
      sub-menu-class={`${subMenuClass}`}
      sub-menu-selector={`${subMenuSelector}`}
      toggle-menu-text={`${toggleMenuText}`}
    >
      <InnerBlocks.Content />
    </okam-navigation>
  );
}
