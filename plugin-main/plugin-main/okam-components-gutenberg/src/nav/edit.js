/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */

import { __ } from '@wordpress/i18n';
import { InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { CheckboxControl, TextControl } from '@wordpress/components';
import { useState } from '@wordpress/element';


const BeforeMenuVisibleCheckboxControl = ({ setAttributes, isBeforeMenuVisible }) => {
  const [value, setValue] = useState(isBeforeMenuVisible);
  setAttributes({ isBeforeMenuVisible: value })

  return (
    <CheckboxControl
      heading={__("Before Menu Visibility", 'okam')}
      label={__("Toggle Before Menu Visibility", 'okam')}
      help={__("if true, the before-nav content will be visible", 'okam')}
      checked={value}
      onChange={setValue}
    />
  )
};

const AfterMenuVisibleCheckboxControl = ({ setAttributes, isAfterMenuVisible }) => {
  const [value, setValue] = useState(isAfterMenuVisible);
  setAttributes({ isAfterMenuVisible: value })

  return (
    <CheckboxControl
      heading={__("After Menu Visibility", 'okam')}
      label={__("Toggle After Menu Visibility", 'okam')}
      help={__("if true, the before-nav content will be visible", 'okam')}
      checked={value}
      onChange={setValue}
    />
  )
};


const BurgerModeBreakpointControl = ({ setAttributes, burgerModeBreakpoint }) => {
  const [value, setValue] = useState(burgerModeBreakpoint);
  setAttributes({ burgerModeBreakpoint: value })

  return (
    <TextControl
      label={__("The max screen width in px to display the menu in burger style", 'okam')}
      value={value}
      onChange={(value) => setValue(Number(value))}
    />
  )
};

const SubMenuSelectorControl = ({ setAttributes, subMenuSelector }) => {
  const [value, setValue] = useState(subMenuSelector);
  setAttributes({ subMenuSelector: value })

  return (
    <TextControl
      label={__("Sub menu selector to target all sub menu. Default is wordpress nav class name", 'okam')}
      value={value}
      onChange={(value) => setValue(value)}
    />
  )
};

const SubMenuContainerSelectorControl = ({ setAttributes, subMenuContainerSelector }) => {
  const [value, setValue] = useState(subMenuContainerSelector);
  setAttributes({ subMenuContainerSelector: value })

  return (
    <TextControl
      label={__("The class selector of the sub menu container that contains both the sub menu label and the sub menu itself", 'okam')}
      value={value}
      onChange={(value) => setValue(value)}
    />
  )
};



const SubMenuClassControl = ({ setAttributes, subMenuClass }) => {
  const [value, setValue] = useState(subMenuClass);
  setAttributes({ subMenuClass: value })

  return (
    <TextControl
      label={__("Menu and submenu class name. Default is wordpress nav class name", 'okam')}
      value={value}
      onChange={(value) => setValue(value)}
    />
  )
};

const MenuIdControl = ({ setAttributes, menuId }) => {
  const [value, setValue] = useState(menuId);
  setAttributes({ menuId: value })

  return (
    <TextControl
      label={__("The main nav menu ID.", 'okam')}
      value={value}
      onChange={(value) => setValue(value)}
    />
  )
};

const AllowMultipleSubMenuOpenControl = ({ setAttributes, allowMultipleSubMenuOpen }) => {
  const [value, setValue] = useState(allowMultipleSubMenuOpen);
  setAttributes({ allowMultipleSubMenuOpen: value })

  return (
    <CheckboxControl
      heading={__("Multiple Sub Menu Open", 'okam')}
      label={__("Allow multiple sub Menu to be opened?", 'okam')}
      help={__("if true, allows multiple sub menu to be open at once ", 'okam')}
      checked={value}
      onChange={setValue}
    />
  )
};

const ToggleMenuTextControl = ({ setAttributes, toggleMenuText }) => {
  const [value, setValue] = useState(toggleMenuText);
  setAttributes({ toggleMenuText: value })

  return (
    <TextControl
      label={__("a11y text to open/close the menu.", 'okam')}
      value={value}
      onChange={(value) => setValue(value)}
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
  const {
    isBeforeMenuVisible,
    isAfterMenuVisible,
    burgerModeBreakpoint,
    subMenuSelector,
    subMenuClass,
    menuId,
		allowMultipleSubMenuOpen,
		subMenuContainerSelector,
    toggleMenuText } = attributes;
  return (
    <>
      <InspectorControls>
        <BeforeMenuVisibleCheckboxControl
          isBeforeMenuVisible={isBeforeMenuVisible} setAttributes={setAttributes}
        />

        <AfterMenuVisibleCheckboxControl
          isAfterMenuVisible={isAfterMenuVisible} setAttributes={setAttributes}
        />

        <BurgerModeBreakpointControl
          burgerModeBreakpoint={burgerModeBreakpoint} setAttributes={setAttributes}
        />

				<SubMenuContainerSelectorControl
					subMenuContainerSelector={subMenuContainerSelector} setAttributes={setAttributes}
				/>

        <SubMenuSelectorControl
          subMenuSelector={subMenuSelector} setAttributes={setAttributes}
        />

        <SubMenuClassControl
          subMenuClass={subMenuClass} setAttributes={setAttributes}
        />

        <MenuIdControl
          menuId={menuId} setAttributes={setAttributes}
        />

        <AllowMultipleSubMenuOpenControl
          allowMultipleSubMenuOpen={allowMultipleSubMenuOpen} setAttributes={setAttributes}
        />

        <ToggleMenuTextControl
          toggleMenuText={toggleMenuText} setAttributes={setAttributes}
        />

      </InspectorControls>
      <div className={className}>
        <InnerBlocks
          template={[
            ['okam/okam-wrapper', {
              hintTitle: __('Nav - Before Nav Blocks', 'okam'),
              slotName: 'before-nav',
            }],

            ['okam/okam-wrapper', {
              hintTitle: __('Nav - Main Nav Block', 'okam'),
              noWrap: true,
              lockTemplate: true,
            }, [[
              'core/navigation', { "orientation": "vertical" }
            ]]],

            ['okam/okam-wrapper', {
              hintTitle: __('Nav - After Nav Block', 'okam'),
              slotName: 'after-nav',
            }]
          ]}
          templateLock={'all'}
        />
      </div>
    </>
  );
}
