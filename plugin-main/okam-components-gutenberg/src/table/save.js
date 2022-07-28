/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { InnerBlocks } from '@wordpress/block-editor';
/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @param {Object} [root0]            properties
 * @param {Object} [root0.attributes] list of attributes value
 * @param {string} [root0.className]  class name
 *
 * @return {WPElement} Element to render.
 */
export default function save({ attributes, className }) {
  const { isSortable, tableId, sortMethod } = attributes;
  return (
    <okam-table
      className={className}
      is-sortable={`${isSortable}`}
      table-id={tableId}
      sort-method={sortMethod}
    >
      <InnerBlocks.Content />
    </okam-table>
  );
}
