/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import { useState } from '@wordpress/element';

const TabsAriaLabelTextControl = ({ setAttributes, tabsAriaLabel }) => {
  const [tabsAriaLabelValue, settabsAriaLabel] = useState(tabsAriaLabel);
  setAttributes({ tabsAriaLabel: tabsAriaLabelValue });

  return (
    <TextControl
      heading={__("Aria Label Text", 'okam')}
      label={__("For accessiblity purpose, part of aria text of the tab", 'okam')}
      value={tabsAriaLabelValue}
      onChange={settabsAriaLabel}
    />
  );
};

const TabsArrayTextControl = ({ setAttributes, tabsArray }) => {
  const [tabsArrayValue, setTabsArray] = useState(tabsArray);
  setAttributes({ tabsArray: tabsArrayValue });

  return (
    <TextControl
      value={tabsArrayValue}
      onChange={setTabsArray}
    />
  );
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
  const { tabsAriaLabel, tabsArray } = attributes;
  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Tabs Settings', 'okam')}>
          <TabsAriaLabelTextControl
            tabsAriaLabel={tabsAriaLabel}
            setAttributes={setAttributes}
          />
        </PanelBody>
      </InspectorControls>
      <div className={className}>
        <div className="hint">
          <h2 className="hint__title">Tabs Label</h2>
          <p>{__('Insert the labels between quote marks, separated by comma, inside brackets. Example: ["Tab label 1", "Tab label 2", "Tab label 3"]', 'okam')}</p>
        </div>
        <TabsArrayTextControl
          tabsArray={tabsArray}
          setAttributes={setAttributes}
        />
        <br />
        <div className="hint">
          <h2 className="hint__title">Tabs Content</h2>
        </div>
        <InnerBlocks allowedBlocks={['okam/okam-wrapper', {
          hintTitle: __('Tab', 'okam'),
          hintDescription: __('This is the content area of the slide. You can add any type of content.', 'okam'),
        }]} />
      </div>
    </>
  );
}
