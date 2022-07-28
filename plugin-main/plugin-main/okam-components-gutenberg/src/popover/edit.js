/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { useState } from '@wordpress/element';

const XExpandOnSelectControl = ({ setAttributes, xExpandOn }) => {
  const [value, setState] = useState(xExpandOn);
  setAttributes({ xExpandOn: value })

  return (
    <SelectControl
      label={__('Popover X axis position', 'okam')}
      value={xExpandOn}
      options={[
        { value: null, label: 'Select position', disabled: true },
        { value: 'start', label: 'Start' },
        { value: 'center', label: 'Center' },
        { value: 'end', label: 'End' },
      ]}
      onChange={setState}
    />
  )
};

const YExpandOnSelectControl = ({ setAttributes, yExpandOn }) => {
  const [value, setState] = useState(yExpandOn);
  setAttributes({ yExpandOn: value })
  return (
    <SelectControl
      label={__('Popover Y axis position', 'okam')}
      value={yExpandOn}
      options={[
        { value: null, label: 'Select position', disabled: true },
        { value: 'bottom', label: 'Bottom' },
        { value: 'top', label: 'Top' },
      ]}
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
  const { xExpandOn, yExpandOn } = attributes;
  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Popover Settings', 'okam')} >
          <XExpandOnSelectControl xExpandOn={xExpandOn} setAttributes={setAttributes} />
          <YExpandOnSelectControl yExpandOn={yExpandOn} setAttributes={setAttributes} />
        </PanelBody>
      </InspectorControls>
      <div className={className}>
        <InnerBlocks
          template={[
            ['okam/okam-wrapper', {
              hintTitle: __('Popover - Visible Block', 'okam'),
              slotName: 'button',
            }],
            ['okam/okam-wrapper', {
              hintTitle: __('Popover - Content to display inside the popover', 'okam'),
              slotName: 'panel',
            }]
          ]}
          templateLock={'all'}
        />
      </div>
    </>
  );
}
