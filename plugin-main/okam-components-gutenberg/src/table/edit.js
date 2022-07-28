/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, CheckboxControl, TextControl } from '@wordpress/components';
import { useState } from '@wordpress/element';

const IsSortableCheckboxControl = ({ setAttributes, isSortable }) => {
  const [isChecked, setChecked] = useState(isSortable);
  setAttributes({ isSortable: isChecked });

  return (
    <CheckboxControl
      label={__('Allow table sort?', 'okam')}
      help={__('If checked, the table will be sortable', 'okam')}
      checked={isChecked}
      onChange={setChecked}
    />
  );
};

const SortMethodTextControl = ({ setAttributes, sortMethod }) => {
  const [sortMethodValue, setSortMethod] = useState(sortMethod);
  setAttributes({ sortMethod: sortMethodValue });

  return (
    <TextControl
      label={__('Sort Methods', 'okam')}
      help={__('Separated by comma', 'okam')}
      value={sortMethodValue}
      onChange={setSortMethod}
    />
  );
};

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @param {Object}   [props]               Properties passed from the editor.
 * @param {string}   [props.className]     Class name generated for the block.
 * @param {Function} [props.setAttributes] Set Attributes functions.
 * @param {Object}   [props.attributes]    Attributes
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ className, setAttributes, attributes }) {
  const { isSortable, sortMethod } = attributes;

  return (
    <>
      <InspectorControls>
        <PanelBody
          title={__('Table Settings', 'okam')}
          className="blocks-table-settings blocks-table-settings-okam"
        >
          <IsSortableCheckboxControl
            isSortable={isSortable}
            setAttributes={setAttributes}
          />
          <SortMethodTextControl
            sortMethod={sortMethod}
            setAttributes={setAttributes}
          />
        </PanelBody>
      </InspectorControls>
      <div className={className}>
        <InnerBlocks allowedBlocks={['core/table']} />
      </div>
    </>
  );
}
