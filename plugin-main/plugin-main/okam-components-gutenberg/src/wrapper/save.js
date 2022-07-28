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
  const { useTemplate, slotName, noWrap } = attributes;
  if (noWrap === true) {
    return (
      <>
        <InnerBlocks.Content />
      </>
    )
  }
  return (
    <div
      {...(slotName == null ? {} : { slot: slotName })}
      className={className}
    >
      { useTemplate === true ?
        <template class="template">
          <InnerBlocks.Content />
        </template>
        : <InnerBlocks.Content />
      }
    </div>
  );
}
