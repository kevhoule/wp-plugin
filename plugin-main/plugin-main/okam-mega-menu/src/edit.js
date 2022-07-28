import MenuItems from './components/MenuItems';
import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks, URLInput } from '@wordpress/block-editor';
import { withState } from '@wordpress/compose';
import { dispatch, select } from '@wordpress/data';
import { TextControl, CheckboxControl } from '@wordpress/components';
import './editor.scss';

const Edit = withState(({ isLoading: false }))
  (({ attributes, setAttributes, isLoading, setState }) => {
    const {
      itemHasUrl,
      hasExtraContent,
      itemLinkUrl,
      itemHasTitle,
      openLinkInNewTab
    } = attributes;

    const toggleLoading = (bool) => {
      setState({ isLoading: bool });
    }

    const style = isLoading ? { 'opacity': '0.75' } : {};
    const isMenuDef = select('core/editor').getEditedPostAttribute('parent') === 0;

    return (
      <div style={style} {...useBlockProps()}>

        {isMenuDef &&
          <>
            <h5>Menu definition</h5>
            <p>This is a top level menu. Add children to this post to generate a menu</p>
          </>
        }

        {isMenuDef === false &&
          <>
            <div>
              <h5>Menu Options</h5>

              <div className="flex">
                <CheckboxControl
                  label="Item has title?"
                  checked={itemHasTitle}
                  onChange={(checked) => { setAttributes({ itemHasTitle: checked }) }}
                />

                <CheckboxControl
                  label="Item has url?"
                  checked={itemHasUrl}
                  onChange={(checked) => { setAttributes({ itemHasUrl: checked }) }}
                />

                <CheckboxControl
                  label="Item has extra content?"
                  checked={hasExtraContent}
                  onChange={(checked) => { setAttributes({ hasExtraContent: checked }) }}
                />

                <CheckboxControl
                  label="Open link in new tab/window?"
                  checked={openLinkInNewTab}
                  onChange={(checked) => { setAttributes({ openLinkInNewTab: checked }) }}
                />
              </div>

              {itemHasTitle && <TextControl
                label="Menu Item Title"
                value={select('core/editor').getEditedPostAttribute('title')}
                onChange={(title) => setState(dispatch('core/editor').editPost({ title }))}
              />}

              {itemHasUrl &&
                <URLInput
                  label="Menu Item Url"
                  value={itemLinkUrl}
                  onChange={(url, post) => {
                    setAttributes({ itemLinkUrl: url });

                    if (post != null) {
                      dispatch('core/editor').editPost({ title: post?.title });
                    }
                  }}
                />
              }
            </div>
            {hasExtraContent &&
              <div>
                <h5>Extra content</h5>
                <p>This section is displayed after the menu item, on the same level.</p>
                <InnerBlocks templateLock={false} template={[['core/group', {}]]} />
              </div>
            }
          </>
        }

        {isLoading ? <div>Loading...</div> : <MenuItems toggleLoading={toggleLoading} isLoading={isLoading} />}
      </div>
    );
  });

export default Edit;