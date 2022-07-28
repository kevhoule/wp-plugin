/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { CheckboxControl, TextControl, NumberControl } from '@wordpress/components';
import { useState } from '@wordpress/element';


const AutoHideCheckboxControl = ({ setAttributes, autoHide }) => {
  const [value, setValue] = useState(autoHide);
  setAttributes({ autoHide: value })

  return (
    <CheckboxControl
      heading={__("Auto hide", 'okam')}
      label={__("Auto hide the bar?", 'okam')}
      help={__("automatically hides the scrollbar if the user is not scrolling", 'okam')}
      checked={value}
      onChange={setValue}
    />
  )
};

const ClickOnTrackControl = ({ setAttributes, clickOnTrack }) => {
  const [value, setValue] = useState(clickOnTrack);
  setAttributes({ clickOnTrack: value })

  return (
    <CheckboxControl
      heading={__("Click on track", 'okam')}
      label={__("Allow click on track?", 'okam')}
      help={__("controls the click on track behaviour.", 'okam')}
      checked={value}
      onChange={setValue}
    />
  )
};

const DirectionControl = ({ setAttributes, direction }) => {
  const [value, setValue] = useState(direction);
  setAttributes({ direction: value })

  return (
    <TextControl
      heading={__("Direction", 'okam')}
      label={__("Switch between LTR or RTL", 'okam')}
      value={value}
      onChange={setValue}
    />
  )
};

const ForceVisibleControl = ({ setAttributes, forceVisible }) => {
  const [value, setValue] = useState(forceVisible);
  setAttributes({ forceVisible: value })

  return (
    <TextControl
      heading={__("Force Track Visibility", 'okam')}
      label={__("force the track to be visible?", 'okam')}
      help={__("force the track to be visible (same behaviour as overflow: scroll), value: \"x\" \| \"y\" \| boolean", 'okam')}
      value={value}
      onChange={setValue}
    />
  )
};

const ScrollbarMaxSizeControl = ({ setAttributes, scrollbarMaxSize }) => {
  const [value, setValue] = useState(scrollbarMaxSize);
  setAttributes({ scrollbarMaxSize: value })

  return (
    <TextControl
      label={__("Controls the max size of the scrollbar in px.", 'okam')}
      value={value}
      onChange={(value) => setValue(Number(value))}
    />
  )
};

const ScrollbarMinSizeControl = ({ setAttributes, scrollbarMinSize }) => {
  const [value, setValue] = useState(scrollbarMinSize);
  setAttributes({ scrollbarMinSize: value })

  return (
    <TextControl
      label={__("Controls the min size of the scrollbar in px.", 'okam')}
      value={value}
      onChange={(value) => setValue(Number(value))}
    />
  )
};

const TimeOutControl = ({ setAttributes, timeout }) => {
  const [value, setValue] = useState(timeout);
  setAttributes({ timeout: value })

  return (
    <TextControl
      label={__("Define the delay until the scrollbar hides. Has no effect if autoHide is false.", 'okam')}
      value={value}
      onChange={(value) => setValue(Number(value))}
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
  const { autoHide, clickOnTrack, direction, forceVisible, scrollbarMaxSize, scrollbarMinSize, timeout } = attributes;

  return (
    <>
      <InspectorControls>
        <AutoHideCheckboxControl autoHide={autoHide} setAttributes={setAttributes} />
        <ClickOnTrackControl clickOnTrack={clickOnTrack} setAttributes={setAttributes} />
        <DirectionControl direction={direction} setAttributes={setAttributes} />
        <ForceVisibleControl forceVisible={forceVisible} setAttributes={setAttributes} />
        <ScrollbarMaxSizeControl scrollbarMaxSize={scrollbarMaxSize} setAttributes={setAttributes} />
        <ScrollbarMinSizeControl scrollbarMinSize={scrollbarMinSize} setAttributes={setAttributes} />
        <TimeOutControl timeout={timeout} setAttributes={setAttributes} />
      </InspectorControls>
      <div className={className}>
        <InnerBlocks
          template={[
            ['okam/okam-wrapper', {
              hintTitle: __('Horizontal Scroll - Visible Block', 'okam'),
              noWrap: true,
            }]
          ]}
          templateLock={'all'}
        />
      </div>
    </>
  );
}
