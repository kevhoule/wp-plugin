/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { CheckboxControl } from '@wordpress/components';
import { useState } from '@wordpress/element';


const ExpandedCheckboxControl = ({ setAttributes, isExpandedOnRender }) => {
  const [isChecked, setChecked] = useState(isExpandedOnRender);
  setAttributes({ isExpandedOnRender: isChecked })

  return (
    <CheckboxControl
      heading={__("Expanded", 'okam')}
      label={__("Is expanded on render?", 'okam')}
      help={__("If checked, the accordion will appears expanded on page load.", 'okam')}
      checked={isChecked}
      onChange={setChecked}
    />
  )
};

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
export default function Edit({ className, setAttributes, attributes }) {
  const { isExpandedOnRender } = attributes;
  return (
    <>
      <InspectorControls>
        <ExpandedCheckboxControl isExpandedOnRender={isExpandedOnRender} setAttributes={setAttributes} />
      </InspectorControls>
      <div className={className}>
        <InnerBlocks
          template={[
            ['okam/okam-wrapper', {
              hintTitle: __('Accordion - Header Block', 'okam'),
              slotName: 'header',
            }],
            ['okam/okam-wrapper', {
              hintTitle: __('Accordion - Main Content Block', 'okam'),
              useTemplate: true,
              slotName: 'content',
            }]
          ]}
          templateLock={'all'}
        />
      </div>
    </>
  );
}
