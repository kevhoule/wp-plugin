/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { CheckboxControl } from '@wordpress/components';
import { useState } from '@wordpress/element';


const CLoseBtnCheckboxControl = ({ setAttributes, hideCloseBtn }) => {
  const [isChecked, setChecked] = useState(hideCloseBtn);
  setAttributes({ hideCloseBtn: isChecked })

  return (
    <CheckboxControl
      heading={__("Close Button", 'okam')}
      label={__("Display close button?", 'okam')}
      help={__("If checked, an close button will be diplayed next to the opened lightbox", 'okam')}
      checked={isChecked}
      onChange={setChecked}
    />
  )
};


const ReloadScriptBtnCheckboxControl = ({ setAttributes, reloadScript }) => {
  const [isChecked, setChecked] = useState(reloadScript);
  setAttributes({ reloadScript: isChecked })

  return (
    <CheckboxControl
      heading={__("Reload script", 'okam')}
      label={__("Reload script when opening lightbox?", 'okam')}
      help={__("If checked, this will reload and evaluate the script appended to the lighbtox. Make sure the scripts tag are safe before enabling this", 'okam')}
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
  const { hideCloseBtn, reloadScript } = attributes;
  return (
    <>
      <InspectorControls>
        <CLoseBtnCheckboxControl hideCloseBtn={hideCloseBtn} setAttributes={setAttributes} />
        <ReloadScriptBtnCheckboxControl reloadScript={reloadScript} setAttributes={setAttributes} />
      </InspectorControls>
      <div className={className}>
        <InnerBlocks
          template={[
            ['okam/okam-wrapper', {
              hintTitle: __('Lightbox - Visible Block', 'okam'),
            }],
            ['okam/okam-wrapper', {
              hintTitle: __('Lightbox - Content to display inside the lightbox', 'okam'),
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
