/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @param {Object} [props]           Properties passed from the editor.
 * @param {string} [props.className] Class name generated for the block.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ className, attributes }) {
  const { hintTitle, hintDescription, placeHolder, lockTemplate } = attributes;
  return (
    <div className={className}>
      <div className="hint">
        <h2 className="hint__title">{hintTitle}</h2>
        <p className="hint__description">
          {hintDescription}
        </p>
      </div>
      <InnerBlocks
        templateLock={lockTemplate}
        template={[
          [
            'core/paragraph',
            {
              placeholder: `${placeHolder}`
            }
          ]
        ]}
      />
    </div>
  );
}
