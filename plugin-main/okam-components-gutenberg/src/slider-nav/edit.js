/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { CheckboxControl, TextareaControl } from '@wordpress/components';
import { useState } from '@wordpress/element';

const HasArrowsCheckboxControl = ({ setAttributes, hasArrows }) => {
  const [isChecked, setChecked] = useState(hasArrows);
  setAttributes({ hasArrows: isChecked })

  return (
    <CheckboxControl
      heading={__("Arrows", 'okam')}
      label={__("Display arrows?", 'okam')}
      help={__("If checked, the slider will have arrows", 'okam')}
      checked={isChecked}
      onChange={setChecked}
    />
  )
};

const HasBulletsCheckboxControl = ({ setAttributes, hasBullets }) => {
  const [isChecked, setChecked] = useState(hasBullets);
  setAttributes({ hasBullets: isChecked })

  return (
    <CheckboxControl
      heading={__("Bullets", 'okam')}
      label={__("Display Bullets?", 'okam')}
      help={__("If checked, the slider will have bullets", 'okam')}
      checked={isChecked}
      onChange={setChecked}
    />
  )
};

const GlideOptionsTextareaControl = ({ setAttributes, glideOptions }) => {
  const [value, setState] = useState(glideOptions);
  setAttributes({ glideOptions: value })

  return (
    <TextareaControl
      label='Glide Options'
      help='Example of option: {"perView": 2}'
      value={glideOptions}
      onChange={setState}
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
  const { hasArrows, hasBullets, glideOptions } = attributes;
  return (
    <>
      <InspectorControls>
        <HasArrowsCheckboxControl hasArrows={hasArrows} setAttributes={setAttributes} />
        <HasBulletsCheckboxControl hasBullets={hasBullets} setAttributes={setAttributes} />
        <GlideOptionsTextareaControl glideOptions={glideOptions} setAttributes={setAttributes} />
      </InspectorControls>
      <div className={className}>
        <div className="hint">
          <h2 className="hint__title">Slider Nav</h2>
        </div>
        <InnerBlocks allowedBlocks={['okam/okam-wrapper', {
          hintTitle: __('Slide', 'okam'),
          hintDescription: __('This is the content area of the slide. You can add any type of content.', 'okam'),
        }]} />
      </div>
    </>
  );
}
