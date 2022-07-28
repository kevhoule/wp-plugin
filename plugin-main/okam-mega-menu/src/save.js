/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { select } from '@wordpress/data';
/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the className name.
 *
 * @see https://developer.wordpress.org/editor/packages/packages-editor/#useBlockProps
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/editor/developers/api/edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save() {
	return (
		<InnerBlocks.Content />
	);
}
