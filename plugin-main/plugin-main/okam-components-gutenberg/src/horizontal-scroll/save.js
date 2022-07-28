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
export default function save({ attributes, className }) {
  const { autoHide, forceVisible, direction, timeout, clickOnTrack, scrollbarMinSize, scrollbarMaxSize} = attributes;
  return (
    <okam-horizontal-scroll
      auto-hide={`${autoHide}`}
      force-visible={`${forceVisible}`}
      direction={`${direction}`}
      timeout={`${timeout}`}
      click-on-track={`${clickOnTrack}`}
      scrollbar-min-size={`${scrollbarMinSize}`}
      scrollbar-max-size={`${scrollbarMaxSize}`}
      className={className}
    >
      <InnerBlocks.Content />
    </okam-horizontal-scroll>
  );
}
